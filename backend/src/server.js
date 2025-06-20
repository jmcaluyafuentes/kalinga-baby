import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to Kalinga Baby app.')
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}.`)
});
