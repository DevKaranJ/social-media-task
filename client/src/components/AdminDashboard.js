import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin', {
          headers: {
            username: 'admin',
            password: 'admin123'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setUsers(data.data);
        } else {
          alert('Failed to fetch users.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Error fetching users. Please check the console for more details.');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/${id}`, {
        method: 'DELETE',
        headers: {
          username: 'admin',
          password: 'admin123'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setUsers(users.filter((user) => user._id !== id));
        alert(data.message);
      } else {
        alert('Failed to delete user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user. Please check the console for more details.');
    }
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Admin Dashboard
      </Typography>
      {users.length === 0 ? (
        <Typography variant="body1">No users found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.socialMediaHandle}
                  </Typography>
                </CardContent>
                <CardMedia>
                  {user.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5000/${image}`}
                      alt="User upload"
                      width="100%"
                    />
                  ))}
                </CardMedia>
                <CardContent>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(user._id)}>
                    Delete User
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AdminDashboard;
