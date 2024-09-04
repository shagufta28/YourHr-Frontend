import React from 'react';
import { Button, Container, Typography, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage = () => {
    return (
        <Container
            maxWidth="lg"
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '97vh',
                textAlign: 'center',
                p: 2,
                color: '#fff',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/images/img.jpg)', // Ensure path is correct
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(10px)',
                    zIndex: -1, // Place image behind the content
                }
            }}
        >
            <Box
                component={motion.div}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                sx={{ mb: 4 }}
            >
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Welcome to YourHR
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    Find your ideal job role based on your qualifications and preferences.
                </Typography>
            </Box>

            <Grid container spacing={2} sx={{ maxWidth: '500px' }}>
                <Grid item xs={12} sm={6}>
                    <Box
                        component={motion.div}
                        initial={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Button
                            variant="contained"
                            fullWidth
                            component={Link}
                            to="/login"
                            sx={{ py: 2, fontSize: '1.2rem' }}
                        >
                            Login
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box
                        component={motion.div}
                        initial={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Button
                            variant="contained"
                            fullWidth
                            component={Link}
                            to="/signup"
                            sx={{ py: 2, fontSize: '1.2rem' }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
