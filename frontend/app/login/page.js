'use client'
import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
    const images = [
        "url('https://images6.alphacoders.com/480/480421.jpg')",
        "url('https://www.thebalancemoney.com/thmb/cfLSIpcpwiluW-kJDTu16bXNhjo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/school-books-on-desk--education-concept-871454068-5b548900c9e77c005b04fc8c.jpg')",
    ];
    const [currentImage, setCurrentImage] = useState(0);
    const router = useRouter();

    // Change background image every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const loginDetails = {
            username: data.get("username"),
            password: data.get("password"),
        };

        try {
            // Make an API call to the login endpoint
            const response = await axios.post("http://localhost:5000/auth/login", loginDetails);

            if (response.status === 200) {
                const { token } = response.data;
                // Save JWT token to localStorage
                localStorage.setItem("jwtToken", token);

                alert("Login successful! Redirecting...");
                router.push("/"); // Redirect to homepage
            }
        } catch (error) {
            console.error("Error during login:", error.response?.data || error.message);
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div className="boxx" style={{ width: '100%', height: '735px', border: '1px solid black', display: 'grid', placeItems: 'center', backgroundImage: images[currentImage], color: 'white' }} onClick={() => setCurrentImage((prevImage) => (prevImage + 1) % images.length)}>
            <div className="box" style={{ zIndex: "1000", border: '1px solid black', width: '450px', height: '500px', display: 'grid', placeItems: 'center', backgroundColor: 'white' }} onClick={(e) => e.stopPropagation()}>
                <h1 style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', marginTop: '40px', color: 'black' }}>Login</h1>
                <form style={{ width: '400px', height: '500px', color: 'black' }} onSubmit={handleSubmit}>
                    <Grid container spacing={6}>
                        <Grid size={12}>
                            <TextField
                                label="Username"
                                id="username"
                                name="username"
                                autoComplete="username"
                                required
                                variant="outlined"
                                fullWidth
                                color="primary" // Changed to 'primary' for better visibility
                                autoFocus
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                label="Password"
                                name="password"
                                id="password"
                                autoComplete="current-password"
                                variant="outlined"
                                fullWidth
                                required
                                type="password"
                            />
                        </Grid>
                    </Grid>
                    <FormControlLabel control={<Checkbox />} label="Remember me" style={{ marginLeft: '2px' }} />
                    <Button type="submit" style={{ marginTop: '100px', backgroundColor: '#4F86F7', color: 'white' }}>Login</Button>
                    <Grid container style={{ marginTop: '20px' }}>
                        <Grid size="grow">
                            <Link href="/signup" variant="body2" style={{ color: '#4F86F7', marginTop: '-2', textDecoration: 'none' }}>
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
}