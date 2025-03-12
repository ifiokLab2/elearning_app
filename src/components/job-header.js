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

import apiUrl from './api-url';

const JobHeader = ()=>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [profile,setprofile] = useState(false);
    const navigate = useNavigate();
    const [subCategory,setsubCategory] = useState('');
    const toggleProfile = ()=>{
        setprofile(!profile);
    }
    const toggleSubcategory = (tab)=>{
        setsubCategory(tab);
        console.log(subCategory);
    }
    const closeSubcategory = ()=>{
        console.log(subCategory);
        setsubCategory('');
    }
    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    }
    const handleLogout = async () => {
        try {
          // Make a POST request to the logout endpoint
          const response = await axios.post(`${apiUrl}/logout/`);
    
          if (response.data.success) {
            // Clear the user data in Redux store
            dispatch(setUser(null));
            navigate('/logout');
    
            // Optionally, you may want to redirect the user to the login page
            // history.push('/login');
          } else {
            console.error('Logout failed:', response.data.message);
            // Handle failed logout, e.g., show an error message to the user
          }
        } catch (error) {
          console.error('An error occurred during logout:', error);
          // Handle unexpected errors
        }
    };
   

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
                            {/*{user.email} */}
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
                {user? (
                    <Link to='/logout/' className='login-link'>
                    Logout
                </Link>
                ):(
                    <Link to='/login/' className='login-link'>
                        Login{user?.first_name}
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
                       {user? (
                         <div onClick={handleLogout} className='auth-wrapper'>
                         Logout
                        </div>
                       ):(
                        <>
                         <div className='auth-wrapper'>
                                <Link to='/login/'>Login</Link>
                        </div>
                        <div className='auth-wrapper'>
                                <Link to='/signup/'>signup</Link>
                        </div>
                            </>
                       
                       
                       )}
                        <div className='auth-wrapper'>
                            <Link to='/create-course/'>Create Course</Link>
                        </div>
                        <div className='auth-wrapper'>
                            <Link to='/jobs/'>Jobs</Link>
                        </div>
                        {user.is_employee ? (
                            <div className='auth-wrapper'>
                                    <Link to='/organization/employee/repository'>Repository</Link>
                                </div>
                            ):(
                                <div className='auth-wrapper'>
                                    <Link to='/organization/repository/'>Repository</Link>
                                </div>
                         )}
                       
                    </div>
                    <div className='side-body'>
                        <div className='title'>Most Popular</div>
                        <div className='link-btn'>
                            <Link to='' onClick={()=>toggleSubcategory('tab1')}>
                                <div className='text'>Development</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            <div className={`mobile-sub-category ${subCategory === 'tab1' ? 'show' : ''}`}>
                                <div className='menu-tab' onClick={closeSubcategory}>
                                    <div className='icon'>
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </div>
                                    <div className='text'>Menu</div>
                                </div>
                                <div className='links-box'>
                                    <Link to='/search?query=Web Development' >Web Development</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to='/search?query=Mobile App Development' >Mobile App Development</Link>
                                </div>
                                <div className='links-box'>
                                <Link to='/search?query=Data Science' >Data Science</Link>
                                </div>
                                <div className='links-box'>
                                <Link to='/search?query=Programming Languages' >Programming Languagese</Link>
                                </div>
                                <div className='links-box'>
                                <Link to='/search?query=Cyber Security' >Cyber Security</Link>
                                </div>
                                <div className='links-box'>
                                <Link to='/search?query=Ethical hacking' >Ethical hacking</Link>
                                </div>
                                <div className='links-box'>
                                <Link to='/search?query=Database Management System' >Database Management System</Link>
                                </div>
                                <div className='links-box'>
                                <Link to='/search?query=Artificial Intelligence' >Artificial Intelligence</Link>
                                </div>
                                <div className='links-box'>
                                <Link to='/search?query=Game Development' >Game Development</Link>
                                </div>
                                <div className='links-box'>
                                <Link to='/search?query=Operating Systems & Servers' >Operating Systems & Servers</Link>
                                </div>
                            </div>
                        </div>
                        <div className='link-btn'>
                            <Link to='' className='section' onClick={()=>toggleSubcategory('tab2')}>
                                <div className='text'>Finance & Accounting</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            <div className={`mobile-sub-category ${subCategory === 'tab2' ? 'show' : ''}`}>
                                <div className='menu-tab' onClick={closeSubcategory}>
                                    <div className='icon'>
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </div>
                                    <div className='text'>Menu</div>
                                </div>
                                <div className='links-box'>
                                    <Link to ='/search?query=Finance'>Finance</Link>
                                </div>
                              
                               
                                
                            </div>
                        </div>
                        <div className='link-btn'>
                            <Link to='' onClick={()=>toggleSubcategory('tab3')}>
                                <div className='text'>IT Certification</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            <div className={`mobile-sub-category ${subCategory === 'tab3' ? 'show' : ''}`}>
                                <div className='menu-tab' onClick={closeSubcategory}>
                                    <div className='icon'>
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </div>
                                    <div className='text'>Menu</div>
                                </div>
                                <div className='links-box'>
                                    <Link to ='/search?query=Network & Security'>Network & Security</Link>
                                </div>
                                
                                
                            </div>
                        </div>
                        <div className='link-btn'>
                            <Link to='' onClick={()=>toggleSubcategory('tab4')}>
                                <div className='text'>Business</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            <div className={`mobile-sub-category ${subCategory === 'tab4' ? 'show' : ''}`}>
                                <div className='menu-tab' onClick={closeSubcategory}>
                                    <div className='icon'>
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </div>
                                    <div className='text'>Menu</div>
                                </div>
                                <div className='links-box'>
                                    <Link to ='/search?query=Business Fundamentals'>Business Fundamentals</Link>
                                </div>
                               
                               
                                
                            </div>
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