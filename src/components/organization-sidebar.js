import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import 'swiper/swiper-bundle.css';

import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user-action'; // Import actions
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/organization-sidebar.css';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import apiUrl from '../components/api-url';

const OrganizationSidebar = ({ className,toggleSidebar })=>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen,setsidebarOpen] = useState(false);
   
    
    const [subCategory,setsubCategory] = useState('');
    const navigate = useNavigate()
    
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
        <div  className={`organization-sidebar ${className}`}>
            <div className = "box-a">
                <div className='header-tab'>
                    <div className='text'>
                    logo
                        
                    </div>
                    <div className='icon' onClick ={toggleSidebar}>
                        <i class="fa-solid fa-xmark"></i>
                        {user.is_employee}
                    </div>
                </div>
               { user.is_company ? (
                    <>
                    <Link to = "/organization/dashboard/" className = "tabs" >
                        <div className='icon'>
                           
                        </div>
                        <div className='text'>Organization</div>
                    </Link>
                     <Link to = "/organization/jobs/create/" className = "tabs" >
                        <div className='icon'>
                            <i class="fa-solid fa-plus"></i>
                        </div>
                        <div className='text'>Create jobs</div>
                    </Link>
                <Link to = "/organization/job/list/" className = "tabs" >
                    <div className='icon'>
                        <i class="fa-solid fa-briefcase"></i>
                    </div>
                    <div className='text'>Jobs</div>
                </Link>
                <Link to = "/organization/employee/list/" className = "tabs" >
                    <div className='icon'>
                        <i class="fa-solid fa-user-group"></i>
                    </div>
                    <div className='text'>Employees</div>
                </Link>
               {/* <Link to = "" className = "tabs" >
                    <div className='icon'>
                        <i class="fa-solid fa-graduation-cap"></i>
                    </div>
                    <div className='text'>Courses</div>
                </Link>
                */}
                <Link to = "/organization/repository/" className = "tabs" >
                    <div className='icon'>
                        <i class="fa-solid fa-graduation-cap"></i>
                    </div>
                    <div className='text'>Repository</div>
                </Link>
                    </>
               ):(
                <>
                    
                    <Link to = "/user/jobs/list/" className = "tabs" >
                        <div className='icon'>
                            <i class="fa-solid fa-briefcase"></i>
                        </div>
                        <div className='text'>Jobs</div>
                    </Link>
                   {/* <Link to = "" className = "tabs" >
                        <div className='icon'>
                            <i class="fa-solid fa-user-group"></i>
                        </div>
                        <div className='text'>Organization</div>
                    </Link> */}
                    
                    <Link to = "/organization/employee/repository/" className = "tabs" >
                        <div className='icon'>
                            <i class="fa-solid fa-graduation-cap"></i>
                        </div>
                        <div className='text'>Repository</div>
                    </Link>
                </>
               )}
            </div>
            <div className='box-b'>
                <div onClick={()=>handleLogout()} className = "tabs" >
                    <div className='icon'>
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </div>
                    <div className='text'>Logouts</div>
                </div>
            </div>

        </div>
    );
};

export default OrganizationSidebar;