'use client'
import Link from "next/link";
import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import { Button } from "@mui/material";
import Avatar from "@mui/material";


export default function Nav(){
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = () => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        setIsLoggedIn(true);

      }
    };

    checkUserLoggedIn();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    alert("You have been logged out.");
  };

    return(
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Course Helper
            </Typography>
            {isLoggedIn ? (


              <Button color="inherit" onClick={handleLogOut}>
              Log Out
            </Button>

          ) : (
            <Button color="inherit" onClick={() => router.push("/login")}>
              Log In
            </Button>
          )}


          </Toolbar>
        </AppBar>
      </Box>
    );
}