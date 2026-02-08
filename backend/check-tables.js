// quick-test.js
require('dotenv').config();

console.log('🔧 Testing Supabase Connection...\n');

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

client.connect()
  .then(() => {
    console.log('✅ CONNECTED!');
    return client.query('SELECT NOW()');
  })
  .then(res => {
    console.log('⏰ Database time:', res.rows[0].now);
    console.log('🎉 Success! Database is ready.');
    client.end();
  })
  .catch(err => {
    console.error('❌ FAILED:', err.message);
    console.log('\n💡 Your DATABASE_URL:', process.env.DATABASE_URL);
    console.log('💡 Try adding: ?sslmode=require at the end');
    client.end();
  });