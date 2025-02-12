
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
import '../styles/user-jobs.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const OrganizationTab = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [company,setCompany] = useState({});
    const [loading,setLoading] = useState(false);
    const [modal,setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
    const user = useSelector((state) => state.user.user);

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    const toggleModal = (e)=>{
        e.preventDefault();
        setModal(!modal);
    };
    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('email', email);
            const response = await axios.post(`${apiUrl}/invite/employee/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user?.auth_token}`, // Replace `user.token` with your actual auth method
                },
            });
            // Add your email sending logic here (e.g., API call)
            setEmail('');
            setIsLoading(false);
            setModal(false);
        } catch (error) {
            console.error('Error sending email:', error);
            setErrorMessage('Failed to send email. Please try again.');
        } finally {
            setIsLoading(false);
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


        const fetchUserJobs = async () => {
        try {
            const response = await axios.get(`${apiUrl}/organization/profile/create/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
            //console.log(response.data.all_courses)
            setCompany(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user courses:', error);
            setLoading(false);
            setCompany({});
        }
        };

        fetchUserJobs();
    }, [user]);
    
    return(
       <div class = 'home-wrapper'>
        <div className='dashboard-body'>
            
            <div className='sidebar-container-wrapper'>
                <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar}/>
            </div>
            <OrganizationHeader toggleSidebar={toggleSidebar} />
            <div className='job-list-wrapper' id='organization-job-list' >
            <div className='jobs-body'>
                <div className = "tabs-header-wrapper">
                    
                    <div className='job-accordion-section'>
                        <h3>Organization</h3>
                    <div className='job-section-wrapper'>
                        <Link to="/organization/sections/" className='job-card'>
                            <div className='box-a'>
                            <img src={`${apiUrl}${company.logo}`} alt='logo' />
                            </div>
                            <div className='box-b'>
                            <div className='title' >
                               {company.company_name}
                            </div>
                            <div className='company-name'>{company.company_industry}</div>
                            <div className='date'>{company.website}</div>
                            </div>
                            <div className='elipsis-card' onClick={toggleModal}>
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </div>
                        </Link>
                        
                    </div>
                    
                    </div>
                </div>
            </div>
            </div>    
        </div>

        <form className={`organization-form ${modal ? 'show' : ''}`} onSubmit={handleSendEmail}>
                <div className="form-wrapper">
                    <div className="form-header-x">
                        <div className="title">Add Employee</div>
                        <div className="icon" onClick={toggleModal}>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="form-body">
                        <div className={`form-group ${email ? 'active' : ''}`}>
                            <input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        
                        <div className="btn-wrapper">
                            <button type="submit">
                                Send Email
                                {isLoading && <div className="loader"></div>}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
       </div>
    )
};

export default OrganizationTab;