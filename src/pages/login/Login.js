import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert
} from '@mui/material';
import {
  Movie as MovieIcon,
  Login as LoginIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const { login } = useApp();
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    if (user.trim().length < 3 || pass.length < 4) {
      setError(
        'Enter a username (3+ characters) and password (4+ characters).'
      );
      return;
    }

    setError('');
    login(user.trim());
    nav('/');
  };

  return (
    <main
      style={{
        minHeight: 'calc(100vh - 70px)',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        background:
          'radial-gradient(circle at top, #27231a 0, #09090b 48%)'
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 470,
          p: 2,
          boxShadow: '0 30px 90px rgba(0,0,0,.45)'
        }}
      >
        <CardContent>
          <Box textAlign="center" mb={3}>
            <MovieIcon
              sx={{
                fontSize: 48,
                color: '#f5c518'
              }}
            />

            <Typography
              variant="h4"
              fontWeight={950}
            >
              Welcome to MOVIEX
            </Typography>

            <Typography color="text.secondary">
              Your personal movie discovery space
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={submit}
          >
            <TextField
              fullWidth
              label="Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              margin="normal"
              autoComplete="username"
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              margin="normal"
              autoComplete="current-password"
            />

            <Button
              fullWidth
              type="submit"
              size="large"
              variant="contained"
              startIcon={<LoginIcon />}
              sx={{
                mt: 2,
                py: 1.5
              }}
            >
              Sign in
            </Button>
          </Box>
        </CardContent>
      </Card>
    </main>
  );
}