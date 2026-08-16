const { Client } = require('pg');
const client = new Client({
  connectionString: "postgresql://postgres.pwssemfgggqotrmyrgtg:Propscope2026@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
});
client.connect()
  .then(() => { console.log('Connected!'); process.exit(0); })
  .catch(e => { console.error('Connection error:', e); process.exit(1); });
