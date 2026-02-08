// api-server.js - Complete PharmaFind API
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access token required' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Below are some API ROUTES 

// 1.  health check
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as time, version() as version');
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: result.rows[0].time,
      version: result.rows[0].version.split(',')[0]
    });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', error: error.message });
  }
});

// 2. user registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, phone, role = 'patient' } = req.body;
    
    // validateing input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // insert user
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, name, phone, role) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, email, name, role, created_at`,
      [email, hashedPassword, name, phone, role]
    );
    
    // generate JWT token
    const token = jwt.sign(
      { id: result.rows[0].id, email, role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: result.rows[0],
      token
    });
    
  } catch (error) {
    if (error.code === '23505') { // Unique violation
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// 3.  user login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // find user
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    
    // verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // remove password hash from response
    delete user.password_hash;
    
    res.json({
      success: true,
      message: 'Login successful',
      user,
      token
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. search medicines (Public - no auth required)
app.get('/api/medicines/search', async (req, res) => {
  try {
    const { query, lat, lng, radius = 5 } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query required' });
    }
    
    // Base search query
    let searchQuery = `
      SELECT 
        m.id, m.brand_name, m.generic_name, m.form, m.strength,
        p.id as pharmacy_id, p.name as pharmacy_name, 
        p.latitude, p.longitude, p.address, p.contact_phone,
        i.price, i.quantity,
        i.last_updated
      FROM medicines m
      JOIN inventory i ON m.id = i.medicine_id
      JOIN pharmacies p ON i.pharmacy_id = p.id
      WHERE (m.brand_name ILIKE $1 OR m.generic_name ILIKE $1)
      AND i.quantity > 0
    `;
    
    const params = [`%${query}%`];
    
    // adding location filter if coordinates provided
    if (lat && lng) {
      searchQuery += `
        AND (
          6371 * acos(
            cos(radians($${params.length + 1})) * 
            cos(radians(p.latitude)) * 
            cos(radians(p.longitude) - radians($${params.length + 2})) + 
            sin(radians($${params.length + 1})) * 
            sin(radians(p.latitude))
          ) <= $${params.length + 3}
        )
      `;
      params.push(parseFloat(lat), parseFloat(lng), parseFloat(radius));
    }
    
    searchQuery += ' ORDER BY i.price ASC, i.last_updated DESC';
    
    const result = await pool.query(searchQuery, params);
    
    res.json({
      success: true,
      count: result.rows.length,
      medicines: result.rows
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. get pharmacy details (Public)
app.get('/api/pharmacies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const pharmacy = await pool.query(
      `SELECT p.*, u.name as owner_name, u.email as owner_email
       FROM pharmacies p
       LEFT JOIN users u ON p.owner_id = u.id
       WHERE p.id = $1`,
      [id]
    );
    
    if (pharmacy.rows.length === 0) {
      return res.status(404).json({ error: 'Pharmacy not found' });
    }
    
    // get pharmacy inventory
    const inventory = await pool.query(
      `SELECT m.*, i.price, i.quantity, i.last_updated
       FROM inventory i
       JOIN medicines m ON i.medicine_id = m.id
       WHERE i.pharmacy_id = $1 AND i.quantity > 0
       ORDER BY m.brand_name`,
      [id]
    );
    
    res.json({
      success: true,
      pharmacy: pharmacy.rows[0],
      inventory: inventory.rows,
      inventory_count: inventory.rows.length
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. PHARMACIST => update inventory (Protected)
app.put('/api/pharmacy/inventory', authenticateToken, async (req, res) => {
  try {
    const { medicine_id, quantity, price } = req.body;
    const userId = req.user.id;
    
    // verify user is a pharmacist and owns a pharmacy
    const pharmacy = await pool.query(
      'SELECT id FROM pharmacies WHERE owner_id = $1',
      [userId]
    );
    
    if (pharmacy.rows.length === 0) {
      return res.status(403).json({ error: 'No pharmacy associated with this account' });
    }
    
    const pharmacyId = pharmacy.rows[0].id;
    
    // update or insert inventory
    const result = await pool.query(
      `INSERT INTO inventory (pharmacy_id, medicine_id, quantity, price) 
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (pharmacy_id, medicine_id) 
       DO UPDATE SET quantity = $3, price = $4, last_updated = NOW()
       RETURNING *`,
      [pharmacyId, medicine_id, quantity, price]
    );
    
    res.json({
      success: true,
      message: 'Inventory updated successfully',
      inventory: result.rows[0]
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. get user profile ET (Protected)
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await pool.query(
      `SELECT id, email, name, phone, role, created_at 
       FROM users WHERE id = $1`,
      [req.user.id]
    );
    
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      user: user.rows[0]
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'PharmaFind API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      search: 'GET /api/medicines/search?query=medicine_name',
      pharmacy: 'GET /api/pharmacies/:id',
      profile: 'GET /api/user/profile (requires auth)',
      inventory: 'PUT /api/pharmacy/inventory (requires auth)'
    },
    
  });
});

// start server
async function startServer() {
  try {
    // Test database connection
    await pool.query('SELECT 1');
    console.log('✅ Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 PharmaFind API running at http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🔐 Register: POST http://localhost:${PORT}/api/auth/register`);
      console.log(`💊 Search: GET http://localhost:${PORT}/api/medicines/search?query=amoxicillin`);
    });
    
  } catch (error) {
    console.error('❌ Failed to connect to database:', error.message);
    process.exit(1);
  }
}

startServer();