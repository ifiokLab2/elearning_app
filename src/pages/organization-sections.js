
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
import logo from '../styles/logo.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const OrganizationSections = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    const user = useSelector((state) => state.user.user);
    const [openModalIndex, setOpenModalIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
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
                                
                            </div>
                           <div></div>
                </div>
                <div className='apps-container'>
                    <Link to="/organization/job/list/" className='cards organization-card' >
                        <div className='icon hrms-icon'>
                         <i class="fa-solid fa-users"></i>
                        </div>
                        <div className='text-wrapper'>
                            <div className='title-header'>Jobs</div>
                            <p>fetch all jobs</p>
                            <div className='employee-count'>
                               
                                <span></span>
                        
                            </div>
                            
                            
                        </div>
                        
                                
                    </Link>
                    <Link to={`/organization/employee/list/`} className='cards organization-card' >
                        <div className='icon hrms-icon'>
                        <i class="fa-solid fa-users"></i>
                        </div>
                        <div className='text-wrapper'>
                            <div className='title-header'>Employee</div>
                            <p>employee list</p>
                            <div className='employee-count'>
                                
                                <span></span>
                        
                            </div>
                            
                            
                        </div>
                        
                                
                    </Link>
                </div>
                
               
            </div>
           
           
            
        </div>
        
       </div>
    )
};

export default OrganizationSections;