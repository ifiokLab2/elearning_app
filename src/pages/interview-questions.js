
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/organization-dashboard.css';
import '../styles/applicants.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const InterviewQuestions = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { Id } = useParams();
    const user = useSelector((state) => state.user.user);
    const [questions, setQuestions] = useState('');
    const [newQuestions, setNewQuestions] = useState('');
    const [questionsList, setQuestionsList] = useState([]);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const navigate = useNavigate();


    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
        const formData = new FormData();
        formData.append('question', questions);

        const response = await axios.post(`${apiUrl}/interview-questions/${Id}/create/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Token ${user.auth_token}`,
            },
        });

        if (response.data.success) {
            console.log('Requirement created successfully:', response.data);
            setQuestions('');
            fetchQuestions();
        } else {
            console.error('Failed to create:', response.data.message);
        }
        } catch (error) {
        console.error('An error occurred during  creation:', error);
        }
    };

     const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${apiUrl}/interview-questions/${Id}/create/`);
            setQuestionsList(response.data);
        } catch (error) {
            console.error('Error fetching requirements:', error);
        }
    };

    const handleEditingData = (questionId,question) =>{
        setEditingQuestion(questionId);
        setNewQuestions(question);
    };

    const handleEdit = async (questionId) => {
        try {
          const formData = new FormData();
          formData.append('question', newQuestions);
    
          const response = await axios.put(`${apiUrl}/interview-questions/${questionId}/edit/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Token ${user.auth_token}`,
            },
          });
    
          if (response.data.success) {
           // console.log(`Requirement with ID ${requirementId} edited successfully.`);
            fetchQuestions();
            setEditingQuestion(null); // Reset editing state after successful edit
          } else {
            console.error('Failed to edit requirement:', response.data.message);
          }
        } catch (error) {
          console.error('An error occurred during requirement editing:', error);
        }
    };

    const handleDelete = async (questionId) => {
        try {
          const response = await axios.delete(`${apiUrl}/interview-questions/${questionId}/delete/`, {
            headers: {
              Authorization: `Token ${user.auth_token}`,
            },
          });
          console.log('response.data:',response.data);
          if (response.data.success) {
            
            fetchQuestions();
          } else {
            console.error('Failed to delete requirement:', response.data.message);
          }
        } catch (error) {
          console.error('An error occurred during requirement deletion:', error);
        }
    };

    useEffect(() => {
        if(user === null){
            navigate('/login/');
            return;
        };
        if(user.is_company === false ){
            navigate('/access-denied/');
            return;
        }
        fetchQuestions();
    }, [user,navigate]);
    
    

   
    
    return(
       <div class = 'home-wrapper'>
        <div className='dashboard-body'>
            
            <div className='sidebar-container-wrapper'>
                <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar}/>
            </div>
            <OrganizationHeader toggleSidebar={toggleSidebar} />
            <div className='job-list-wrapper' id='organization-job-list' >
                <form id="form-container-requirement" className="form-container" onSubmit={handleSubmit}>
                    <div className="section-wrapper">
                        <h2>Add Interview Questions</h2>
                        <input
                        type="text"
                        placeholder="e.g students should have basic IT knowledge"
                        value={questions}
                        onChange={(e) => setQuestions(e.target.value)}
                        />
                        <button type="submit" className="add-section-btn">
                            Add Question
                        </button>
                    </div>
                </form>

                <div className="requirements-list">
                    <h2>Interview Questions</h2>
                    <ul>
                        {questionsList.map((data) => (
                        <li key={data.id}>
                            {editingQuestion === data.id ? (
                            <>
                                <input
                                type="text"
                                value={newQuestions}
                                onChange={(e) => setNewQuestions(e.target.value)}
                                />
                                <button className='save-btn' onClick={() => handleEdit(data.id)}>Save</button>
                            </>
                            ) : (
                            <>
                                {data.question} 
                                <button className='edit-btn' onClick={() => handleEditingData(data.id,data.question)}><i className="fa-solid fa-pen-to-square"></i></button>
                                <button className = 'delete-btn' onClick={() => handleDelete(data.id)}><i className="fa-solid fa-trash"></i></button>
                            </>
                            )}
                        </li>
                        ))}
                    </ul>
                    </div>
                </div>
           
            
        </div>
        
        
       </div>
    )
};

export default InterviewQuestions;