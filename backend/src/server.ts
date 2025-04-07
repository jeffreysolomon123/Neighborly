import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
app.use(express.json());

// Mount auth routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Server running ✅');
});

app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});
