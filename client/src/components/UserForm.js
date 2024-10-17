import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';

const UserForm = () => {
  const [name, setName] = useState('');
  const [socialMediaHandle, setSocialMediaHandle] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialMediaHandle', socialMediaHandle);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]); // Append each image file
    }

    // Post the formData to the server
    try {
      const response = await fetch('https://social-media-task-dd17.onrender.com/api/users', { // Update URL here
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error submitting user:', errorData);
        setError('Failed to submit user: ' + errorData.message);
        return;
      }

      const data = await response.json();
      if (data.success) {
        alert('User submitted successfully!');
        // Clear the form
        setName('');
        setSocialMediaHandle('');
        setImages([]);
        setError('');
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        User Submission Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Social Media Handle"
          variant="outlined"
          fullWidth
          margin="normal"
          value={socialMediaHandle}
          onChange={(e) => setSocialMediaHandle(e.target.value)}
          required
        />
        <input
          type="file"
          multiple
          onChange={(e) => setImages([...e.target.files])}
          required
          style={{ marginTop: '10px' }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          Submit
        </Button>
        {error && <Alert severity="error" style={{ marginTop: '10px' }}>{error}</Alert>}
      </form>
    </Container>
  );
};

export default UserForm;
