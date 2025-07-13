import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert} from '@mui/material';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

type Props = { onSuccess?: () => void };

const RegisterForm = ({ onSuccess }: Props) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post(`${apiUrl}/api/auth/register`, form);
      setSuccess('Registration successful! You can now log in.');
      if (onSuccess) onSuccess();
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      // @ts-expect-error error has type of any
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Register</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <TextField fullWidth label="Name" name="name" value={form.name} onChange={handleChange} sx={{ mt: 2 }} />
      <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} sx={{ mt: 2 }} />
      <TextField fullWidth label="Password" type="password" name="password" value={form.password} onChange={handleChange} sx={{ mt: 2 }} />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>Register</Button>
    </Box>
  );
};

export default RegisterForm;
