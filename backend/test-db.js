require('dotenv').config();
const { Client } = require('pg');

async function testDB() {
  console.log('\n🧪 Testing Supabase Database Connection');

  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found');
    process.exit(1);
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('🔄 Connecting...');
    await client.connect();

    const res = await client.query('SELECT 1 AS ok, NOW() AS time');
    console.log('✅ CONNECTED');
    console.log('🧮 Result:', res.rows[0].ok);
    console.log('⏰ Time:', res.rows[0].time.toISOString());

    await client.end();
    console.log('🎉 Database is READY\n');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ CONNECTION FAILED');
    console.error('Message:', err.message);
    console.error('Code:', err.code);
    console.error('Host:', err.hostname);
    process.exit(1);
  }
}

testDB();
