import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Alert, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginSchema } from '../utils/validation';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

type Props = { onSuccess?: () => void };

const LoginForm = ({ onSuccess }: Props) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' }); // Clear individual field error
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Validate using Zod
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const errors: { email?: string; password?: string } = {};
      result.error.issues.forEach((err) => {
        if (err.path[0] === 'email') errors.email = err.message;
        if (err.path[0] === 'password') errors.password = err.message;
      });
      setFieldErrors(errors);
      return;
    }

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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: 'auto' }}
    >
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        fullWidth
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        error={!!fieldErrors.email}
        helperText={fieldErrors.email}
        sx={{ mt: 2 }}
      />

      <TextField
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        name="password"
        value={form.password}
        onChange={handleChange}
        error={!!fieldErrors.password}
        helperText={fieldErrors.password}
        sx={{ mt: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((show) => !show)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
