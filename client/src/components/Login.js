import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Dummy data for admin login
const adminData = {
  username: 'admin',
  password: 'admin123',
};

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Validate credentials
    if (username === adminData.username && password === adminData.password) {
      navigate('/admin-dashboard'); // Navigate to dashboard after successful login
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Admin Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login as Admin
        </Button>
      </form>
      <Typography variant="body2" style={{ marginTop: '20px' }}>
        You can log in with the following credentials:
        <br />
        <strong>Username:</strong> {adminData.username}
        <br />
        <strong>Password:</strong> {adminData.password}
      </Typography>
      <Typography variant="body2" style={{ marginTop: '10px' }}>
        <strong>Thank you for considering my application!</strong>
      </Typography>
      <Button 
        variant="outlined" 
        color="primary" 
        fullWidth 
        style={{ marginTop: '10px' }} 
        onClick={() => navigate('/user-form')}
      >
        Go to User Submission Form
      </Button>
    </Container>
  );
};

export default Login;
