'use client'
import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import  Grid from '@mui/material/Grid';
import axios from 'axios';

const Viewcard = ({ open, course, onUpdate, onDelete, onClose }) => {
  const [values, setValues] = useState({
    name: '',
    code: '',
    credits: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (course) {
      setValues({
        name: course.coursename,
        code: course.coursecode,
        credits: course.credits,
        description: course.description,
        imageUrl: course.image,
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!values.name || !values.code || !values.credits) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      console.log("Updating course with values:", values); // Log values being sent
      const response = await axios.put(
        `https://course-helper-woad.vercel.app/courses/${course.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Course updated successfully");
      console.log("Course updated:", response.data);
      onUpdate(response.data);
      onClose(); // Use handleClose instead of onClose
    } catch (error) {
      alert("Failed to update course.\nLogin if you haven't already.");
      console.error("Error updating course:", error.response ? error.response.data : error.message);
    }
  };
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`http://localhost:5000/courses/${course.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Course deleted successfully");
      console.log("Course deleted");
      onDelete(course.id);
      onClose();
    } catch (error) {
      alert("Failed to delete course.\nLogin if you haven't already.");
      console.error("Error deleting course:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Course</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={4} style={{ marginTop: '10px' }}>
            <Grid size={12}>
              <TextField
                label="Full Name*"
                variant="outlined"
                fullWidth
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Course Code*"
                variant="outlined"
                fullWidth
                name="code" // Changed to lowercase
                type="text"
                value={values.code} // Changed to lowercase
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Credits*"
                variant="outlined"
                fullWidth
                type="number"
                name="credits" // Changed to lowercase
                value={values.credits} // Changed to lowercase
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                type="text"
                name="description" // Changed to lowercase
                value={values.description} // Changed to lowercase
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                name="imageUrl" // Changed to lowercase
                value={values.imageUrl} // Changed to lowercase
                type="text"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleUpdate} color="primary" variant="contained">Update</Button>
            <Button onClick={handleDelete} color="secondary" variant="contained">Delete</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Viewcard;
