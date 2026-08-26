const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    if (data.includes('marginTop:"30px"') || data.includes('margin-top: 30px') || data.includes('margin-top:30px')) {
      console.log('FOUND 30px margin in HTML!');
    } else {
      console.log('NOT FOUND in HTML!');
    }
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
