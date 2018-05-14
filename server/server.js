const path = require('path');
const express = require('express');
const app = express();

app.use(express.static('./src/'));

app.get("/", function (req, res) {
  const p = path.resolve(__dirname, 'src', 'pc.html');
  res.sendFile(p);
});


const server = app.listen(3333, 'localhost', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`server listening at ${host}:${port}`);
});
