import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/course-requirements.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import apiUrl from '../components/api-url';

const Objectives = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const [title, setTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [requirements, setRequirements] = useState([]);
  const [editingRequirement, setEditingRequirement] = useState(null);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
    
    
   
    const handleSnackbarClose = () => {
        setSnackbar({ open: false, message: "", severity: "" });
    };


    const checkCourseOwner = async () => {
      //console.log('user.auth_token:',user);
      try {
        const response = await axios.get(`${apiUrl}/api/check-course-owner/${id}/`,{
            headers: {
                Authorization: `Token ${user?.auth_token}`,
            },
        });
        
        if(response.data.success){
          console.log('all good');
        }else{
          navigate('/access-denied/');
        }
      
      } catch (error) {
        navigate('/access-denied/');
      }
  };

  const fetchRequirements = async () => {
    try {
      const response = await axios.get(`${apiUrl}/courses/${id}/add-objectives/`);
      setRequirements(response.data);
    } catch (error) {
      console.error('Error fetching requirements:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);

      const response = await axios.post(`${apiUrl}/courses/${id}/add-objectives/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${user.auth_token}`,
        },
      });

      if (response.data.success) {

        console.log('Objectives created successfully:', response.data);
        setTitle('');
        fetchRequirements();
        setSnackbar({
          open: true,
          message: "success!",
          severity: "success",
      });
      } else {
        console.error('Failed to create requirement:', response.data.message);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "an error occurred",
        severity: "error",
    });
      console.error('An error occurred during requirement creation:', error);
    }
  };

  const handleDelete = async (requirementId) => {
    try {
      const response = await axios.delete(`${apiUrl}/courses/${id}/objectives/${requirementId}/delete/`, {
        headers: {
          Authorization: `Token ${user.auth_token}`,
        },
      });
      console.log('response.data:',response.data);
      if (response.data.success) {
        console.log(`Requirement with ID ${requirementId} deleted successfully.`);
        fetchRequirements();
      } else {
        console.error('Failed to delete requirement:', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred during requirement deletion:', error);
    }
  };

  const handleEditingData = (requirementId,title) =>{
    setEditingRequirement(requirementId);
    setNewTitle(title);
  }

  const handleEdit = async (requirementId) => {
    try {
      const formData = new FormData();
      formData.append('title', newTitle);

      const response = await axios.put(`${apiUrl}/courses/${id}/objectives/${requirementId}/edit/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${user.auth_token}`,
        },
      });

      if (response.data.success) {
        console.log(`Requirement with ID ${requirementId} edited successfully.`);
        fetchRequirements();
        setEditingRequirement(null); // Reset editing state after successful edit
      } else {
        console.error('Failed to edit requirement:', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred during requirement editing:', error);
    }
  };

  useEffect(() => {
    if (user=== null ) {
      // Redirect to the login page
      navigate('/instructor-login/');
      return; // Stop further execution of useEffect
  }
  if ( user?.isInstructor === false ) {
      // Redirect to the login page
      navigate('/access-denied/');
      return; // Stop further execution of useEffect
  }
    checkCourseOwner();
    fetchRequirements();
  }, []);

  return (
    <div className="page-wrapper">
        <Header/>
      <div className="wrapper">
        <form id="form-container-requirement" className="form-container" onSubmit={handleSubmit}>
          <div className="section-wrapper">
            <h2>Add course Objectives</h2>
            <input
              type="text"
              placeholder="Add course objectives. i.e what students will learn"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" className="add-section-btn">
              Add Section
            </button>
          </div>
        </form>

        <div className="requirements-list">
          <h2>Course Objectives</h2>
          <ul>
            {requirements.map((requirement) => (
              <li key={requirement.id}>
                {editingRequirement === requirement.id ? (
                  <>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <button className='save-btn' onClick={() => handleEdit(requirement.id)}>Save</button>
                  </>
                ) : (
                  <>
                    {requirement.title}
                    <button className='edit-btn' onClick={() => handleEditingData(requirement.id,requirement.title)}><i className="fa-solid fa-pen-to-square"></i></button>
                    <button className = 'delete-btn' onClick={() => handleDelete(requirement.id)}><i className="fa-solid fa-trash"></i></button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleSnackbarClose}
                severity={snackbar.severity}
                >
                {snackbar.message}
                </MuiAlert>
            </Snackbar>
    </div>
  );
};

export default Objectives;