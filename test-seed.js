const https = require('https');

const data = JSON.stringify({
  authorization: 'seed-db-2024'
});

const options = {
  hostname: 'basecamp-clone-gold.vercel.app',
  port: 443,
  path: '/api/seed',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  },
  timeout: 60000 // 60 second timeout
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers, null, 2)}`);
  
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Body:');
    try {
      const parsed = JSON.parse(responseData);
      console.log(JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log(responseData);
    }
  });
});

req.on('error', (e) => {
  console.error(`Request error: ${e.message}`);
});

req.on('timeout', () => {
  console.error('Request timed out after 60 seconds');
  req.destroy();
});

req.write(data);
req.end();

console.log('Testing seed endpoint...');