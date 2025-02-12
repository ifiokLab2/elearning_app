
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/organization-dashboard.css';
import '../styles/repository.css';
import '../styles/user-job-list.css';
import logo from '../styles/logo.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


const UserJobList = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const user = useSelector((state) => state.user.user);
    const [openModalIndex, setOpenModalIndex] = useState(null);
    const [activeTab, setActiveTab] = useState('saved'); // Default to 'saved' tab
    const [savedJobs, setSavedJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [interviews, setInterviews] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

    const handleSnackbarClose = () => {
      setSnackbar({ open: false, message: "", severity: "" });
    };
    
    const navigate = useNavigate();

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
   
   

    const fetchJobsAndInterviews = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/jobs/user/`, {
                headers: {
                    'Authorization': `Token ${user.auth_token}`,
                },
            });
           
            /*const interviewResponse = await axios.get(`${apiUrl}/jobs/interviews/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }); */
            console.log('response.data.saved_jobs:',response.data.saved_jobs);
            setSavedJobs(response.data.saved_jobs);
            setAppliedJobs(response.data.applied_jobs);
            setInterviews(response.data.interviews)
            //setInterviews(interviewResponse.data);
        } catch (error) {
            console.error('Error fetching jobs or interviews:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchJobsAndInterviews();
    }, [navigate,user]);
    
    return(
       <div class = 'home-wrapper'>
        <div className='dashboard-body'>
            
            <div className='sidebar-container-wrapper'>
                <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar}/>
            </div>
            <OrganizationHeader toggleSidebar={toggleSidebar} />
            <div className='job-list-wrapper' id='organization-job-list' >
                <div className='employer-organizations'>
                            <div class = 'org'>
                                Jobs
                            </div>
                           <Link to ='/organization/repository/create/' className = "crate-btn"></Link>
                </div>
               <>
                    <div className="tabs-header">
                        <button
                            className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
                            onClick={() => setActiveTab('saved')}
                        >
                            Saved Jobs
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'applied' ? 'active' : ''}`}
                            onClick={() => setActiveTab('applied')}
                        >
                            Applied Jobs
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'interviews' ? 'active' : ''}`}
                            onClick={() => setActiveTab('interviews')}
                        >
                            Interviews
                        </button>
                    </div>

                    <div className="tabs-content">
                        {loading ? (
                            <div>Loading...</div>
                        ) : activeTab === 'saved' ? (
                            savedJobs.length > 0 ? (
                                savedJobs.map((job) => (
                                    <div key={job.id} className="accordion-item">
                                        <div className="accordion-title">
                                            <h3>{job.job.title}</h3>
                                            <span>{job.company}</span>
                                        </div>
                                        <div className="accordion-details">
                                            <p>{job.job.description}</p>
                                            <p><strong>Location:</strong> {job.job.location}</p>
                                            <p><strong>Type:</strong> {job.job.job_type}</p>
                                            <p><strong>Salary:</strong> ${job.job.salary}</p>
                                            
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No saved jobs found.</div>
                            )
                        ) : activeTab === 'applied' ? (
                            appliedJobs.length > 0 ? (
                                appliedJobs.map((job) => (
                                    <div key={job.id} className="accordion-item">
                                        <div className="accordion-title">
                                            <h3>{job.job.title}</h3>
                                            <span>{job.company}</span>
                                        </div>
                                        <div className="accordion-details">
                                            <p>{job.job.description}</p>
                                            <p><strong>Location:</strong> {job.job.location}</p>
                                            <p><strong>Type:</strong> {job.job.job_type}</p>
                                            <p><strong>Salary:</strong> ${job.job.salary}</p>
                                            
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No applied jobs found.</div>
                            )
                        ) : interviews.length > 0 ? (
                            interviews.map((interview) => (
                                <div key={interview.id} className="accordion-item">
                                    <div className="accordion-title">
                                        <h3>{interview.job_title}</h3>
                                        <span>{interview.company}</span>
                                    </div>
                                    <div className="accordion-details">
                                        <p><strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}</p>
                                        <p><strong>Time:</strong> {new Date(interview.date).toLocaleTimeString()}</p>
                                        <p><strong>Location:</strong> {interview.location || 'Virtual'}</p>
                                        <p><strong>Notes:</strong> {interview.notes || 'No additional details'}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No interviews scheduled.</div>
                        )}
                    </div>
               </>
                
               
            </div>
           
           
            
        </div>
        
       </div>
    )
};

export default UserJobList;