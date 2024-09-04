import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Container, Card, CardContent, Grid, Box } from '@mui/material';

function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://yourhr-backend-rsrj.onrender.com/api/user', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                alert('Error fetching user data');
            }
        };

        fetchUserData();
    }, []);

    const handleViewResume = () => {
        if (user && user.resume) {
            window.open(user.resume, '_blank');
        } else {
            alert('No resume available to view.');
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Grid container justifyContent="flex-end">
                <Button 
                    component={Link}
                    variant="outlined" 
                    to="/login" 
                    sx={{ mb: 2 }}
                >
                    Logout
                </Button>
            </Grid>

            {user ? (
                <Card sx={{ maxWidth: 600, mx: 'auto', p: 4, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                            Welcome, {user.name}
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" component="div">
                                    <strong>Email:</strong> {user.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" component="div">
                                    <strong>Phone:</strong> {user.phoneNumber}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="div">
                                    <strong>Qualifications:</strong> {user.qualifications}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                                <strong>Resume:</strong>
                            </Typography>

                            {user.resume ? (
                                <Button variant="contained" color="primary" onClick={handleViewResume}>
                                    View Resume
                                </Button>
                            ) : (
                                <Typography variant="body1">No resume available</Typography>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            ) : (
                <Typography variant="body1">Loading...</Typography>
            )}
        </Container>
    );
}

export default Dashboard;
