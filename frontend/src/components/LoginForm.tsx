import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

type Props = { onSuccess?: () => void };

const LoginForm = ({ onSuccess }: Props) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, form);
      localStorage.setItem('token', res.data.token);
      if (onSuccess) onSuccess();
      navigate('/'); // redirect after login
    } catch (err) {
      // @ts-expect-error error has type of any
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} sx={{ mt: 2 }} />
      <TextField fullWidth label="Password" type="password" name="password" value={form.password} onChange={handleChange} sx={{ mt: 2 }} />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>Login</Button>
    </Box>
  );
};

export default LoginForm;
