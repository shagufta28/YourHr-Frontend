import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Grid, Container, Card, CardContent, Typography, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Import your Firebase configuration

function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        qualifications: '',
        resume: null,
    });
    const [resumeError, setResumeError] = useState(false); // State for handling resume upload errors
    const [phoneError, setPhoneError] = useState(false); // State for phone number validation

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Ensure that only numeric input is accepted for the phoneNumber field
        if (name === "phoneNumber" && (!/^\d*$/.test(value) || value.length > 10)) {
            return; // Prevent any non-numeric characters or exceeding 10 digits
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, resume: e.target.files[0] });
        setResumeError(false); // Reset error when the user uploads a resume
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if resume is uploaded
        if (!formData.resume) {
            setResumeError(true);
            return;
        }

        // Validate phone number length (should be 10 digits)
        if (formData.phoneNumber.length !== 10) {
            setPhoneError(true);
            return;
        } else {
            setPhoneError(false);
        }

        try {
            // Initialize Firebase storage
            const storageRef = ref(storage, `resumes/${Date.now()}_${formData.resume.name}`);

            // Upload the file to Firebase Storage
            const snapshot = await uploadBytes(storageRef, formData.resume);

            // Get the download URL of the uploaded file
            const downloadURL = await getDownloadURL(snapshot.ref);
            

            console.log('File uploaded successfully:', downloadURL);

            // Proceed with form submission
            const form = new FormData();
            for (const key in formData) {
                if (key !== 'resume') { // Skip appending resume again
                    form.append(key, formData[key]);
                }
            }
            form.append('resume', downloadURL); // Include the resume URL in the form data

            // Submit the form data to the backend
            await axios.post('https://yourhr-backend-rsrj.onrender.com/api/signup', form, {
                headers: { 'Content-Type': 'application/json' }
            });

            alert("User Registration Successful. Login to proceed");
            navigate('/login'); // Redirect to login after successful signup
        } catch (error) {
            console.error('Error uploading file or submitting form:', error);
            alert('Error registering user');
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom align="center">
                        Sign Up
                    </Typography>
                    
                    {/* Show error message if resume is not uploaded */}
                    {resumeError && (
                        <Alert severity="error" style={{ marginBottom: '20px' }}>
                            Please upload your resume before submitting the form.
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Name" 
                                    name="name" 
                                    fullWidth 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                    variant="outlined"
                                    style={{ marginBottom: '10px' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Email" 
                                    name="email" 
                                    type="email" 
                                    fullWidth 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                    variant="outlined"
                                    style={{ marginBottom: '10px' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Password" 
                                    name="password" 
                                    type="password" 
                                    fullWidth 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    required 
                                    variant="outlined"
                                    style={{ marginBottom: '10px' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Phone Number" 
                                    name="phoneNumber" 
                                    type="tel" 
                                    fullWidth 
                                    value={formData.phoneNumber} 
                                    onChange={handleChange} 
                                    required 
                                    variant="outlined"
                                    error={phoneError}
                                    helperText={phoneError ? 'Phone number must be exactly 10 digits and numeric' : ''}
                                    inputProps={{ maxLength: 10, pattern: "[0-9]*" }}
                                    style={{ marginBottom: '10px' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    label="Qualifications" 
                                    name="qualifications" 
                                    fullWidth 
                                    value={formData.qualifications} 
                                    onChange={handleChange} 
                                    variant="outlined"
                                    style={{ marginBottom: '10px' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button 
                                    variant="contained" 
                                    component="label"
                                    fullWidth
                                    style={{ marginBottom: '10px' }}
                                >
                                    Upload Resume
                                    <input 
                                        type="file" 
                                        hidden 
                                        name="resume" 
                                        onChange={handleFileChange} 
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button 
                                    variant="contained" 
                                    type="submit" 
                                    fullWidth
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                    </form>

                    <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
                        Already have an account? 
                        <Button 
                            component={Link} 
                            to="/login" 
                            variant="text" 
                            style={{ marginLeft: '5px' }}
                        >
                            Login
                        </Button>
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
}

export default SignupForm;
