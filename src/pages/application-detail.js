
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useParams} from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/organization-dashboard.css';
import '../styles/applicants.css';
import '../styles/application-detail.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';
const ApplicationDetail = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [inviteModal, setInviteModal] = useState(false);
    const user = useSelector((state) => state.user.user);
    const { applicationId } = useParams(); // Get the application ID from the URL
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

   
    const fetchApplicationDetails = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/applications/${applicationId}/`, {
                headers: {
                    'Authorization': `Token ${user?.auth_token}`, // Add your token
                }
            });
            setApplication(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching application details:", err);
            setError("Failed to load application details. Please try again later.");
            setLoading(false);
        }
    };
    


    useEffect(() => {
        if(user === null){
            navigate('/login/');
            return;
        };
        if(user.is_company === false){
            navigate('/access-denied/');
            return;
        }
        fetchApplicationDetails();
    }, [applicationId,user,navigate]);

    if (loading) return <div className="loader">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="home-wrapper">
            <div className="dashboard-body">
                <div className="sidebar-container-wrapper">
                    <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar} />
                </div>
                <OrganizationHeader toggleSidebar={toggleSidebar} />
                <div className="job-list-wrapper" id="organization-job-list">
                    <div className="application-details">
                        <h1>Application Details</h1>

                        {application && (
                            <div className="application-container">
                                <h2>Job Information</h2>
                                <p><strong>Title:</strong> {application.job.title}</p>
                                <p><strong>Job ID:</strong> {application.job.id}</p>

                                <h2>User Information</h2>
                                <p><strong>Username:</strong> {application.user.username}</p>
                                <p><strong>Email:</strong> {application.user.email}</p>

                                <h2>Application Details</h2>
                                <p><strong>Status:</strong> {application.status}</p>
                                <p><strong>Applied At:</strong> {new Date(application.applied_at).toLocaleString()}</p>
                                {application.cover_letter && (
                                    <>
                                        <p><strong>Cover Letter:</strong></p>
                                        <p className="cover-letter">{application.cover_letter}</p>
                                    </>
                                )}
                                {application.resume && (
                                    <p>
                                        <strong>Resume:</strong>{" "}
                                        <a href={application.resume} target="_blank" rel="noopener noreferrer">
                                            View Resume
                                        </a>
                                    </p>
                                )}

                                <h2>Interview Answers</h2>
                                {application.answers.length > 0 ? (
                                    <ul>
                                        {application.answers.map((answer, index) => (
                                            <li key={index}>
                                                <p><strong>Question:</strong> {answer.question}</p>
                                                <p><strong>Answer:</strong> {answer.answer}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No answers provided for the interview questions.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
           
        </div>
    );
};

export default ApplicationDetail;