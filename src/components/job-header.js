import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import 'swiper/swiper-bundle.css';
import '../styles/job-header.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user-action'; // Import actions
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const JobHeader = ()=>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [profile,setprofile] = useState(false);

    const toggleProfile = ()=>{
        setprofile(!profile);
    }

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    }
   

    return(
        <>
            <div className='header-job'>
           <div className='header-box-a'>
                <div className='menu-btn' onClick={toggleSidebar}>
                    <i class="fa-solid fa-bars"></i>
                </div>
                <Link to='' className='logo'>
                    Logo
                </Link>
                <Link to='/jobs/' className='job-link'>
                    Jobs
                </Link>
                <Link to='/user-courses/' className='courses-link'>
                    Courses
                </Link>
           </div>
           <div className='header-box-b'>
               
                <div className='profile-tab' onClick={toggleProfile}>
                    <i className="fa-solid fa-user"></i>
                    <div className={`profile-container ${profile ? 'show' : ''}`}>
                        <div className='user-email'>
                            {user.email}
                        </div>
                        <Link  to = '/organization/profile/' className='profile-tabs'>
                            <i class="fa-solid fa-address-card"></i>
                            <span>Profile</span>
                        </Link>
                        <Link  to = '/user/jobs/' className='profile-tabs'>
                             <i class="fa-solid fa-bookmark"></i>
                            <span>My Jobs</span>
                        </Link>
                        <Link  to = '' className='profile-tabs'>
                            <i class="fa-solid fa-gear"></i>
                            <span>Settings</span>
                        </Link>
                        <Link  to = '' className='profile-tabs'>
                            <i class="fa-solid fa-circle-question"></i>
                            <span>Help center</span>
                        </Link>
                    </div>
                </div>
                {user.isLoggedIn ? (
                    <Link to='/logout/' className='login-link'>
                    Logout
                </Link>
                ):(
                    <Link to='/login/' className='login-link'>
                        Login{user.first_name}
                    </Link>
                )}
                <Link to = '/organization/jobs/create/' className='job-link'>
                    Post Job
                </Link>
           </div>
           
             </div>
            <div className={`sideBar ${sidebarOpen ? 'show':''}`}>
            <div className='sidebar-wrapper'>
                <div className = 'auth-tab' >
                <div className='auth-wrapper'>
                        <Link to=''>Login</Link>
                </div>
                <div className='auth-wrapper'>
                        <Link to=''>signup</Link>
                </div>
                </div>
                <div className='side-body'>
                    <div className='title'>Most Popular</div>
                    <div className='link-btn'>
                        <Link to='' >
                            <div className='text'>Jobs</div>
                            <div className='icon'>
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    <div className='link-btn'>
                        <Link to='/user-courses/' >
                            <div className='text'>Courses</div>
                            <div className='icon'>
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    <div className='link-btn'>
                        <Link to='' >
                            <div className='text'>Post Jobs</div>
                            <div className='icon'>
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    <div className='link-btn'>
                        <Link to='' >
                            <div className='text'>Help Center</div>
                            <div className='icon'>
                                <i class="fa-solid fa-chevron-right"></i>
                            </div>
                        </Link>  
                    </div>
                    
                </div>
            </div>
            <div className='close-btn' onClick={toggleSidebar}>
                <i class="fa-solid fa-x"></i>
            </div>
            </div>
            
        </>
    );
};

export default JobHeader;