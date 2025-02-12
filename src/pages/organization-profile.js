
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/organization-profile.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const OrganizationProfile = ()=>{
    const [name, setName] = useState('');
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [employee_count, setEmployeeCount] = useState('');
    const [company_industry, setCompanyIndustry] = useState('');
    const user = useSelector(state => state.user.user);
    const [website, setWebsite] = useState('');
    const [logo, setLogo] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    
    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };

    const fetchProfileData = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/fetch-company-profile/`,{
            headers: {
                Authorization: `Token ${user?.auth_token}`,
            },
          });
            if (response.data.success) {
                setCompanyIndustry(response.data.data.company_industry);
                setName(response.data.data.company_name);
                setWebsite(response.data.data.website);
                setPhone(response.data.data.phone);
                setEmployeeCount(response.data.data.employee_count);
              
                
                //setPreviousPicture Redirect to the home page
               
            } else {
                setTimeout(() => {
                    navigate('/profile/create/'); // Change '/' to the actual path of your home page
                }, 2000); // 2000 milliseconds (2 seconds) delay
            
            // Handle failed signup, e.g., show error messages to the user
            }
          
        } catch (error) {
            setTimeout(() => {
                navigate('/login'); // Change '/' to the actual path of your home page
            }, 2000); // 2000 milliseconds (2 seconds) delay
          console.error('Error fetching cart courses:', error);
        }
    };

    useEffect(() => {
        // Check if the user is authenticated  !User && User.isInstructor === true 
       
        if(user === null){
            navigate('/login/');
            return;
        };
        if(user.is_company === false){
            navigate('/access-denied/');
            return;
        }
    
        // Fetch categories and default subcategories
        

        fetchProfileData();
       
        
    }, [user, navigate]);
    
    return(
       <div class = 'home-wrapper'>
        <div className='dashboard-body'>
            
            <div className='sidebar-container-wrapper'>
                <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar}/>
            </div>
            <OrganizationHeader toggleSidebar={toggleSidebar} />
            <div className='dashboard-container' >
                <div className='profile-wrapper'>
                    <div className = "profile-container">
                        <div className='profile-header'>
                            <i class="fa-solid fa-user"></i>
                            <span>Profile</span>
                        </div>
                        <div className='profile-tab'>
                            <div className='title'>Name</div>
                            <div className='text'>{name}</div>
                        </div>
                        <div className='profile-tab'>
                            <div className='title'>Email</div>
                            <div className='text'>{user.email}</div>
                        </div>
                        <div className='profile-tab'>
                            <div className='title'>Website</div>
                            <div className='text'>{website}</div>
                        </div>
                    </div>
                </div>
            </div>
           
            
        </div>
        
       </div>
    )
};

export default OrganizationProfile;