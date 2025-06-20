import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to Kalinga Baby app.')
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}.`)
});
