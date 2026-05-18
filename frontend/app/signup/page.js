'use client'
import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const images = [
        "url('https://c.wallhere.com/photos/18/38/background_solid_bright-1073142.jpg!d')",
        "url('https://wallpapercave.com/wp/wp2424412.jpg')",
    ];
    const [currentImage, setCurrentImage] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000); // Change background every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userDetails = {
            username: data.get("username"),
            password: data.get("password"),
        };

        try {
            // Call the signup API
            const response = await axios.post("https://course-helper-woad.vercel.app/auth/register", userDetails);

            if (response) {
                alert("Signup successful! Redirecting to login...");
                router.push("/login"); // Redirect to login page
            }
        } catch (error) {
            console.error("Error during signup:", error.response?.data || error.message);
            alert("Signup failed. Please try again.");
        }
    };

    return (
        <div className="boxx" style={{ width: '100%', height: '735px', border: '1px solid black', display: 'grid', placeItems: 'center', backgroundImage: images[currentImage], color: 'white' }}>
            <div className="box" style={{ zIndex: "1000", border: '1px solid black', width: '450px', height: '500px', display: 'grid', placeItems: 'center', backgroundColor: 'white' }}>
                <h1 style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', marginTop: '40px', color: 'black' }}>Sign Up</h1>
                <form style={{ width: '400px', height: '500px', color: 'black' }} onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={5}>
                        <Grid size={12}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                required
                                id="username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                required
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                name="password"
                            />
                        </Grid>
                    </Grid>
                    <FormControlLabel control={<Checkbox />} label="Remember me" style={{ marginLeft: '2px' }} />
                    <Button type="submit" variant="contained" style={{ marginTop: '90px', backgroundColor: '#4F86F7', color: 'white' }}>Sign Up</Button>
                    <Grid container style={{ marginTop: '20px' }}>
                        <Grid item xs>
                            <Link href="/login" variant="body2" style={{ color: '#4F86F7', marginTop: '-2', textDecoration: 'none' }}>
                                Already have an account? Sign In
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
}

