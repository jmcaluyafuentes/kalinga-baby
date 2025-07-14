import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { registerSchema } from "../utils/validation";

const apiUrl = import.meta.env.VITE_API_URL;

type Props = { onSuccess?: () => void };

const RegisterForm = ({ onSuccess }: Props) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // New states for show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const result = registerSchema.safeParse(form);
    if (!result.success) {
      const errors: typeof fieldErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof typeof fieldErrors;
        errors[field] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    try {
      await axios.post(`${apiUrl}/api/auth/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (onSuccess) onSuccess();
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      // @ts-expect-error error has type of any
      setError(err.response?.data?.message || "Registration failed. Please try again!");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto" }}
    >
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        fullWidth
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={!!fieldErrors.name}
        helperText={fieldErrors.name}
        sx={{ mt: 2 }}
      />

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

      <TextField
        fullWidth
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        error={!!fieldErrors.confirmPassword}
        helperText={fieldErrors.confirmPassword}
        sx={{ mt: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                onClick={() => setShowConfirmPassword((show) => !show)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
