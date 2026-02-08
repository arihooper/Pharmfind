require('dotenv').config();
const express = require('express');
const { Client } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

let dbConnected = false;

const cors = require('cors');

// before your routes
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000'], // Allow both ports
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

async function connectDB() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Database connected');
    dbConnected = true;
    await client.end();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    dbConnected = false;
  }
}

app.get('/', (req, res) => {
  res.json({
    service: 'PharmaFind API',
    database: dbConnected ? '✅ Connected' : '❌ Not connected',
    time: new Date().toISOString()
  });
});

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

start();
