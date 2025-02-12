import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.css'; // Import the styles
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/course-sections.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import apiUrl from '../components/api-url';


const CourseSections = () => {
  // Get the course ID from the route parameters
  const { id } = useParams();
  const User = useSelector(state => state.user.user);

  // State variables for managing sections and new section input
  const [sections, setSections] = useState([]);
  const [sectionsTitle, setSectionTitle] = useState([]);
  const [sectionDescription, setSectionDescription] = useState('');
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionDescription, setNewSectionDescription] = useState('');
  const [newContentTitle, setNewContentTitle] = useState('');
  const [newContentType, setNewContentType] = useState('');
  const [newContentFile, setNewContentFile] = useState(null);
  const [showAddContent, setShowAddContent] = useState({});
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingContentId, setEditingContentId] = useState(null);
  const [contentDescription, setContentDescription] = useState('');
  const [loading,setLoading] = useState(false);
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
                Authorization: `Token ${User?.auth_token}`,
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

  // useEffect to fetch existing sections when the component mounts
  useEffect(() => {

    const fetchSections = async () => {
      try {
        const response = await axios.get(`${apiUrl}/courses/${id}/sections/`);
        
        // Assuming your API response structure includes a 'contents' field in each section
        const sectionsWithContents = response.data.map(section => ({
          ...section,
          contents: section.contents || [], // Set to an empty array if 'contents' is undefined
        }));
  
        setSections(sectionsWithContents);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

      if (User=== null ) {
        // Redirect to the login page
        navigate('/instructor-login/');
        return; // Stop further execution of useEffect
    }
    if ( User?.isInstructor === false ) {
        // Redirect to the login page
        navigate('/access-denied/');
        return; // Stop further execution of useEffect
    }

    checkCourseOwner();
    fetchSections();
  }, [id])
  // Function to add a new section
  const addSection = async () => {
    try {
      setLoading(true);
      // Make a POST request to the API endpoint to add a new section
      const response = await axios.post(
        `${apiUrl}/courses/${id}/add-section/`,
        {
          title: sectionsTitle,
          description: sectionDescription,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${User.auth_token}`, // Uncomment and replace 'user.token' if needed
          },
        }
      );

      // Check if the request was successful (status code 201)
      if (response.status === 201) {
        setLoading(false);
        // Section added successfully, update local state
        setSections([...sections, response.data]);
        setSectionTitle('');
        setSectionDescription('');
        setSnackbar({
          open: true,
          message: "success!",
          severity: "success",
      });
      } else {
        console.error('Failed to add section:', response.data);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "an error occurred",
        severity: "error",
    });
      console.error('An error occurred while adding a section:', error);
    }
  };

  const addContentToSection = async (sectionId) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', newContentTitle);
      formData.append('content_type', newContentType);
      //formData.append('content_file', newContentFile);
      if (newContentType === 'assignment') {
        formData.append('content', contentDescription);
      } else {
        formData.append('content_file', newContentFile);
      }
  
      const response = await axios.post(`${apiUrl}/sections/${sectionId}/contents/`, formData);
  
      // Update the sections array with the new content and section contents
      const updatedSections = sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            contents: response.data.section_contents,
          };
        }
        return section;
      });
  
      setSections(updatedSections);
      setNewContentTitle('');
      setNewContentType('');
      setNewContentFile(null);
      setContentDescription('');
      setLoading(false);
      setSnackbar({
        open: true,
        message: "success!",
        severity: "success",
    });
    } catch (error) {
      setLoading(false);
      setSnackbar({
        open: true,
        message: "an error occurred",
        severity: "error",
    });
      console.error('Error adding content:', error);
    }
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setNewContentFile(file);
  };

  const toggleAddContent = (sectionId) => {
    setShowAddContent((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId], // Toggle visibility for the specific section
    }));
  };
  const editSection = (sectionId) => {
    const sectionToEdit = sections.find((section) => section.id === sectionId);
    setNewSectionTitle(sectionToEdit.title);
    setNewSectionDescription(sectionToEdit.description);
    setEditingSectionId(sectionId);
  };

  const updateSection = async () => {
    try {
      setLoading(true);
      const updatedSection = {
        title: newSectionTitle,
        description: newSectionDescription,
      };
  
      // Make a PUT request to the update view with the updated section data
      await axios.put(`${apiUrl}/api/sections/${editingSectionId}/update/`, updatedSection);
  
      // Update the sections array after updating a section
      const updatedSections = sections.map((section) =>
        section.id === editingSectionId ? { ...section, ...updatedSection } : section
      );
      setSections(updatedSections);
  
      // Clear input fields and reset editing state after updating a section
      setNewSectionTitle('');
      setLoading(false);
      setNewSectionDescription('');
      setEditingSectionId(null);
      setSnackbar({
        open: true,
        message: "success!",
        severity: "success",
    });
    } catch (error) {
      setLoading(false);
      setSnackbar({
        open: true,
        message: "an error occurred",
        severity: "error",
    });
      console.error('Error updating section:', error);
    }
  };
  const deleteSection = async (sectionId) => {
    try {
      // Make a DELETE request to the delete view
      await axios.delete(`${apiUrl}/api/sections/${sectionId}/delete/`);
  
      // Update the sections array after deleting a section
      const updatedSections = sections.filter((section) => section.id !== sectionId);
      setSections(updatedSections);
      setSnackbar({
        open: true,
        message: "success!",
        severity: "success",
    });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "an error occurred",
        severity: "error",
    });
      console.error('Error deleting section:', error);
    }
  };
  const editContent = (sectionId, contentId) => {
    const contentToEdit = sections.find((section) => section.id === sectionId)?.contents.find((content) => content.id === contentId);
    setNewContentTitle(contentToEdit.title);
    setNewContentType(contentToEdit.content_type);
    setEditingContentId(contentId);
    if (contentToEdit.content_type === 'assignment') {
      setContentDescription(contentToEdit.content || '');
    }
  };

  const updateContent = async (sectionId, contentId) => {
    try {
      setLoading(true);
      const updatedContent = {
        title: newContentTitle,
        content_type: newContentType,
      };
      if (newContentType === 'assignment') {
        updatedContent.content = contentDescription;
      }

      await axios.put(`${apiUrl}/api/sections/${sectionId}/contents/${contentId}/update/`, updatedContent);

      const updatedSections = sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            contents: section.contents.map((content) =>
              content.id === contentId ? { ...content, ...updatedContent } : content
            ),
          };
        }
        return section;
      });
      setSections(updatedSections);

      setNewContentTitle('');
      setNewContentType('');
      setEditingContentId(null);
      setContentDescription('');
      setLoading(false);
      setSnackbar({
        open: true,
        message: "success!",
        severity: "success",
    });
    } catch (error) {
      setLoading(false);
      setSnackbar({
        open: true,
        message: "an error occurred",
        severity: "error",
    });
      console.error('Error updating content:', error);
    }
  };

  const deleteContent = async (sectionId, contentId) => {
    try {
      setLoading(true);
      await axios.delete(`${apiUrl}/api/sections/${sectionId}/contents/${contentId}/delete/`);

      const updatedSections = sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            contents: section.contents.filter((content) => content.id !== contentId),
          };
        }
        return section;
      });
      setSections(updatedSections);
      setLoading(false);
      setSnackbar({
        open: true,
        message: "success!",
        severity: "success",
    });
    } catch (error) {
      setLoading(false);
      setSnackbar({
        open: true,
        message: "an error occurred",
        severity: "error",
    });
      console.error('Error deleting content:', error);
    }
  };
  
  return (
   <div className = 'page-wrapper'>
      <Header/>
      <div className='wrapper'>
      <div>
      <h1>Course Sections</h1>
  
      <div className = 'section-wrapper' >
        <h2>Add Section</h2>
        <input
          type="text"
          placeholder="Enter section title"
          value={sectionsTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter section description"
          value={sectionDescription}
          onChange={(e) => setSectionDescription(e.target.value)}
        />
       
        <button className='add-section-btn' onClick={addSection}>Add Section</button>
      </div>
  
      <div className='section-wrapper'>
        <h2>Course Sections</h2>
        {sections.map((section) => (
          <div className='section-wrapper' key={section.id}>
           <div className='section-header'>
              <h3>{section.title}</h3>
              <button className='edit-btn' onClick={() => editSection(section.id)}><i className="fa-solid fa-pen-to-square"></i></button>
              <button className='delete-btn' onClick={() => deleteSection(section.id)}><i className="fa-solid fa-trash"></i></button>
              <button className='add-content' onClick={() => toggleAddContent(section.id)}>
                  {showAddContent[section.id] ? 'Hide' : 'Add'} Content
              </button>
           </div>
            <p>{section.description}</p>
  
            <div>
             
              {/* Conditionally render the editing fields only for the section being edited */}
              
              {editingSectionId === section.id && (
                <>
                  <div  className='section-wrapper'>
                    <input
                      type="text"
                      placeholder="Enter section title"
                      value={newSectionTitle}
                      onChange={(e) => setNewSectionTitle(e.target.value)}
                    />
                    <textarea
                      placeholder="Enter section description"
                      value={newSectionDescription}
                      onChange={(e) => setNewSectionDescription(e.target.value)}
                    />
                    <button className='add-section-btn' onClick={updateSection}>
                      Update Section
                      {loading ? <div className="loader"></div> : '' }
                    </button>
                  </div>
                  
                </>
              )}
            </div>
            <div>
            
              {showAddContent[section.id] && (
                <div className='section-wrapper'>
                  {/* Add Content fields */}
                  <input
                    type="text"
                    placeholder="Enter content title"
                    value={newContentTitle}
                    onChange={(e) => setNewContentTitle(e.target.value)}
                  />
                  <select
                    value={newContentType}
                    onChange={(e) => setNewContentType(e.target.value)}
                  >
                    <option value="">Select Content Type</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                    <option value="document">Document</option>
                    <option value="assignment">Assignment</option>
                    <option value="codingExercise">Coding Exercise</option>
                    {/* Add more options for other content types as needed */}
                  </select>
                 
                  {newContentType === 'assignment' ? (
                    <ReactQuill
                      value={contentDescription}
                      onChange={(value) => setContentDescription(value)}
                      placeholder="Enter assignment content"
                    />
                  ) : (
                    <input
                    type="file"
                    accept="video/*, audio/*, application/pdf"
                    onChange={(e) => setNewContentFile(e.target.files[0])}
                  />
                  )}
                  <button className='add-section-btn' onClick={() => addContentToSection(section.id)}>
                    Add Content
                    {loading ? <div className="loader"></div> : '' }
                  </button>
                </div>
              )}
  
              {section.contents &&
                section.contents.map((content) => (
                  <div className='content-wrapper' key={content.id}>
                   <div>
                      <p>{content.title}</p>
                     
                   </div>
                  
                    {/* Toggle edit content input fields when user clicks this button */}
                    {editingContentId === content.id ? (
                      <>
                        <input
                          type="text"
                          placeholder="Enter content title"
                          value={newContentTitle}
                          onChange={(e) => setNewContentTitle(e.target.value)}
                        />
                        <select
                          value={newContentType}
                          onChange={(e) => setNewContentType(e.target.value)}
                        >
                          <option value="">Select Content Type</option>
                          <option value="video">Video</option>
                          <option value="audio">Audio</option>
                          <option value="document">Document</option>
                          <option value="assignment">Assignment</option>
                           <option value="codingExercise">Coding Exercise</option>
                          {/* Add more options for other content types as needed */}
                        </select>
                        
                         {newContentType === 'assignment' ? (
                          <ReactQuill
                            value={contentDescription}
                            onChange={(value) => setContentDescription(value)}
                            placeholder="Enter assignment content"
                            className='editor-box'
                          />
                        ) : (
                          <input
                          type="file"
                          accept="video/*, audio/*, application/pdf"
                          onChange={(e) => setNewContentFile(e.target.files[0])}
                        />
                        )}
                        <button className='add-section-btn' onClick={() => updateContent(section.id, content.id)}>
                          Update Content
                          {loading ? <div className="loader"></div> : '' }
                        </button>
                      </>
                    ) : (
                      <>
                        <button className='edit-btn' onClick={() => editContent(section.id, content.id)}>
                           <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button className='delete-btn' onClick={() => deleteContent(section.id, content.id)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </>
                    )}
                  </div>
              ))}
            </div>
          </div>
        ))}
      </div>
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
   

export default CourseSections;