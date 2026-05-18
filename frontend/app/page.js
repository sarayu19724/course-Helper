'use client';

import { useState, useEffect } from "react";
import React from "react";
import MyCard from './card';
import DialogForm from "./form";
import Nav from "./navbar";
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Viewcard from "./viewcard";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/courses');
        setCourses(response.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Failed to fetch courses. Please try again.");
      }
    };
    fetchCourses();
  }, []);

  const handleClickOpen = () => {
    if (!isLoggedIn) {
      alert("Please login to add a course.");
      router.push("/login");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleViewCourse = (course) => {
    if (!isLoggedIn) {
      alert("Please login to view course details.");
      router.push("/login");
      return;
    }
    setSelectedCourse(course);
  };

  const handleCloseViewDialog = () => setSelectedCourse(null);

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
    setSelectedCourse(null);
  };

  const handleUpdateCourse = (id, updatedCourse) => {
    setCourses(courses.map((course) => (course.id === id ? updatedCourse : course)));
    setSelectedCourse(null);
  };

  const handleAddCourseSuccess = async () => {
    const response = await axios.get('http://localhost:5000/courses');
    setCourses(response.data || []);
  };

  return (
    <>
      <Nav />
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
              <MyCard course={course} onClick={() => handleViewCourse(course)} />
            </Grid>
          ))}
        </Grid>

        <Button
          sx={{ position: 'fixed', bottom: 30, right: 30 }}
          variant="contained"
          onClick={handleClickOpen}
        >
          Add Course
        </Button>

        <DialogForm open={open} onClose={handleClose} onSuccess={handleAddCourseSuccess} />
        {selectedCourse && (
          <Viewcard
            open={Boolean(selectedCourse)}
            course={selectedCourse}
            onClose={handleCloseViewDialog}
            onUpdate={handleUpdateCourse}
            onDelete={handleDeleteCourse}
          />
        )}
      </Box>
    </>
  );
}