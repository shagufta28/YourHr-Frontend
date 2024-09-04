import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

// Styled component for the image
const ImageSection = styled(Box)(({ theme }) => ({
    backgroundImage: 'url(/images/img.jpg)', // Replace with your image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflowX:'hidden',
    height: '97vh',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

const FormSection = styled(Container)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    [theme.breakpoints.down('md')]: {
        height: 'auto',
        padding: '20px',
    },
}));

const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://yourhr-backend-rsrj.onrender.com/api/login', credentials);
            alert("User log in succesfull");  // Show login successful message
            localStorage.setItem('token', response.data.token);  // Save token
            navigate('/dashboard'); 
            
 // Redirect to dashboard
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || 'Error logging in');
        }
    };

    return (
        <Grid container>
            <Grid item xs={false} md={6}>
                <ImageSection />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormSection>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <Button
                            variant="outlined"
                            component={Link}
                            to="/"
                            sx={{ mb: 3 }}
                        >
                            Back
                        </Button>
                        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                            Login
                        </Typography>
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        fullWidth
                                        value={credentials.email}
                                        onChange={handleChange}
                                        required
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                            style: {
                                                borderRadius: 8,
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Password"
                                        name="password"
                                        type="password"
                                        fullWidth
                                        value={credentials.password}
                                        onChange={handleChange}
                                        required
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{
                                            style: {
                                                borderRadius: 8,
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        fullWidth
                                        sx={{
                                            py: 1.5,
                                            fontSize: '1rem',
                                            bgcolor: '#007bff',
                                            '&:hover': {
                                                bgcolor: '#0056b3',
                                            },
                                            borderRadius: 8,
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Grid>
                                {error && (
                                    <Grid item xs={12}>
                                        <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                                        Don't have an account?{' '}
                                        <Link to="/signup" style={{ textDecoration: 'none', color: '#007bff' }}>
                                            Sign Up
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </motion.div>
                </FormSection>
            </Grid>
        </Grid>
    );
};

export default LoginForm;
