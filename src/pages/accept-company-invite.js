
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/organization-dashboard.css';
import '../styles/repository.css';
import logo from '../styles/logo.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate,useParams } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const AcceptCompanyInvite = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
   
    const [isLoading,setIsLoading] = useState(false);
    const user = useSelector((state) => state.user.user);
    const { name,token } = useParams();
    const navigate = useNavigate();
   

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        //setShowSnackbar(false);
        
        try {
            const formData = new FormData();
           
    
            const response = await axios.post(`${apiUrl}/company-invites/accept/${token}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    //'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                   
                    //setShowSnackbar(!showSnackbar);
                    navigate(`/`);
                   
                }, 5000);
                //setsnackbarStatus('success');
                //setShowSnackbar(true);
               
                //console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                window.location.href = `/employee-signup?token=${token}`;
                //setsnackbarStatus('fail');
                //setShowSnackbar(true);
                //setErrorMessage('response.data.message');
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
                //setErrorMessage('response.data.message');
               
            }, 2000);
            // Handle unexpected errors
        }
    };
    
    useEffect(() => {
    if(user === null){
        navigate('/login/');
        return;
    };
    if(user.is_employee == false){
        navigate('/access-denied/');
        return;
    }
        
    }, [token]);
    
    return(
       <div class = 'home-wrapper'>
        <div className='dashboard-body'>
            
            <div className='sidebar-container-wrapper'>
                <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar}/>
            </div>
            <OrganizationHeader toggleSidebar={toggleSidebar} />
            <div className='job-list-wrapper' id='organization-job-list' >
               <div className='repo-form-wrapper'>
                <h3>Hello, you've been invited to join our Company:<strong>${name}</strong></h3>
                <button onClick={handleSubmit} className='create-btn'>Accept</button>
               </div>
            </div>
           
            
        </div>
        
       </div>
    )
};

export default AcceptCompanyInvite;