'use client'
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const DialogForm = ({ open, onClose, onSuccess }) => {
  const [values, setValues] = useState({
    coursename: '',
    coursecode: '',
    credits: '',
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!values.coursename || !values.coursecode || !values.credits) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        "${process.env.NEXT_PUBLIC_API_URL}/courses",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Course added successfully");
      onSuccess(response.data.course);
      onClose();
      setValues({ coursename: '', coursecode: '', credits: '', description: '', image: '' });
    } catch (error) {
      alert("Failed to add course. Please try again.");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Course</DialogTitle>
      <DialogContent>
        <TextField
          name="coursename"
          label="Course Name"
          required
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={values.coursename}
        />
        <TextField
          name="coursecode"
          label="Course Code"
          required
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={values.coursecode}
        />
        <TextField
          name="credits"
          label="Credits"
          type="number"
          required
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={values.credits}
        />
        <TextField
          name="description"
          label="Description"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          onChange={handleChange}
          value={values.description}
        />
        <TextField
          name="image"
          label="Image URL"
          fullWidth
          margin="normal"
          onChange={handleChange}
          value={values.image}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: "16px" }}
        >
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
