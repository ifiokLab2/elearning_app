import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import 'swiper/swiper-bundle.css';
import '../styles/header.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user-action'; // Import actions
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiUrl from './api-url';

const Header = ()=>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [searchbarOpen,setsearchbarOpen] = useState(false);
    
    const [subCategory,setsubCategory] = useState('');
    const navigate = useNavigate()
    
    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    }
    const toggleSearchbar = ()=>{
        setsearchbarOpen(!searchbarOpen);
    }
    const toggleSubcategory = (tab)=>{
        setsubCategory(tab);
        console.log(subCategory);
    }
    const closeSubcategory = ()=>{
        console.log(subCategory);
        setsubCategory('');
    }
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
       
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setsearchbarOpen(!searchbarOpen);
        navigate(`/search?query=${searchQuery}`);
    };
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
    const slides = [
       logo,
       hero1,
        // Add more image URLs as needed
    ];

    return(
        <div className='header-wrapper'>
            <header className='header'>
                <Link to='/' className='logo'>
                    Elearning  
                </Link>
                <div className='category-tab'>
                    <div className='title'>Categories</div>
                    <div className='category-menu'>
                        <div className='category-section'>
                            <Link to='/search?query=Development' className='link-tab'>
                                <div className='text'>Development</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            
                            </Link>
                            <div className='sub-category' >
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Web Development' className='link-tab'>
                                        <div className='text'>Web Development</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Mobile App Development' className='link-tab'>
                                        <div className='text'>Mobile App Development</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Data Science' className='link-tab'>
                                        <div className='text'>Data Science</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Web Development' className='link-tab'>
                                        <div className='text'>Web Development</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Programming Languages' className='link-tab'>
                                        <div className='text'>Programming Languages</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Database design & Game Development' className='link-tab'>
                                        <div className='text'>Database design & Game Development</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Software Testing' className='link-tab'>
                                        <div className='text'>Software Testing</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Software Engineering' className='link-tab'>
                                        <div className='text'>Software Engineering</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Programming Languages' className='link-tab'>
                                        <div className='text'>Programming Languages</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Software Development Tools' className='link-tab'>
                                        <div className='text'>Software Development Tools</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=No-Code Development' className='link-tab'>
                                        <div className='text'>No-Code Development</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='category-section'>
                            <Link to='/search?query=Finance & Accounting' className='link-tab'>
                                <div className='text'>Finance & Accounting</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            
                            </Link>
                            <div className='sub-category' >
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Finance' className='link-tab'>
                                        <div className='text'>Finance</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                               
                            
                                
                            </div>
                        </div>
                        <div className='category-section'>
                            <Link to='' className='link-tab'>
                                <div className='text'>IT Certification</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            
                            </Link>
                            <div className='sub-category' >
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Network & Security' className='link-tab'>
                                        <div className='text'>Network & Security</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                              
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Operating systems & Servers' className='link-tab'>
                                        <div className='text'>Operating systems & Servers</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                
                                
                                
                            </div>
                        </div>
                        <div className='category-section'>
                            <Link to='/search?query=Business' className='link-tab'>
                                <div className='text'>Business</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            
                            </Link>
                            <div className='sub-category' >
                          
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Business' className='link-tab'>
                                        <div className='text'>Business analytics and intelligence</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='category-section'>
                            <Link to='/search?query=Office Productivity' className='link-tab'>
                                <div className='text'>Office Productivity</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            
                            </Link>
                            <div className='sub-category' >
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Office Productivity' className='link-tab'>
                                        <div className='text'>Excel</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                               
                                
                                
                            </div>
                        </div>

                    </div>
                </div>
                <form className='search-container' onSubmit={handleSubmit}>
                    <input 
                        type='text'
                        placeholder = 'Search for anything' 
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                     <i className="fa-solid fa-magnifying-glass"></i>
                </form>
                <div className='nav-section'>
                    <div className='teach'>
                        <Link className='title' to='/teach'>Teach</Link>
                        <div className='teach-tab'>
                            <div className='turn'>
                                Turn what you know into an opportunity and reach millions around the world.
                            </div>
                            <div className='link-wrapper'>
                                <Link to=''>Learn More</Link>
                            </div>
                        </div>
                    </div>
                    <div className='cart'>
                    <Link to='/cart/'>
                            <i className="fas fa-shopping-cart"></i>
                    </Link>
                    <div className='cart-tab'>
                            <div className='turn'>
                            Your cart is empty
                            </div>
                            <div className='link-wrapper'>
                                <Link to='/jobs/'>Jobs</Link>
                            </div>
                        </div>
                    </div>
                    {user.user? ( 
                            <>
                                <button onClick={handleLogout} className='login'>
                                    Logout 
                                </button>
                                <div className='user-icon-container'>
                                    <div className='initial'>{user.user.first_name[0].toUpperCase()} {user.user.last_name[0].toUpperCase()}</div>
                                    <i className="fa-solid fa-circle dot"></i>
                                    <div className = 'profile-card-container'>
                                        <Link to='/profile/' className='profile-link'>Profile</Link>
                                        <Link to='/profile/edit/' className='profile-link'>Edit profile</Link>
                                        {user.user.is_company ? (
                                             <Link to='/organization/dashboard/' className='profile-link'>Your organization</Link>
                                        ):(
                                            ""
                                        )}
                                        {user.user.is_employee ? (
                                             <Link to='/organization/employee/repository/' className='profile-link'>Repository</Link>
                                        ):(
                                            ""
                                        )}
                                        <div onClick={handleLogout} className='profile-link logout'>
                                            <i class="fa-solid fa-right-from-bracket"></i>
                                            Logout
                                        </div>
                                    </div>
                                </div>
                            </>
                         )
                        :
                        (
                           <>
                                <Link to='/login' className='offline-login'>
                                    Login
                                </Link>
                                <Link to='/signup' className='offline-signup'>
                                    signup
                                </Link>
                           </>
                        )
                    }
                  
                    
                </div>
            </header>
            <header className='mobile-navigation'>
                <div className='menu-btn' onClick={toggleSidebar}>
                    <i class="fa-solid fa-bars"></i>
                </div>
                <div className='mobile-logo'>
                    <div className='title'>Elearning</div>
                </div>
                <div className='mobile-extra'>
                    <Link to='/cart/' className='cart'>
                        <i class="fa-solid fa-cart-shopping"></i>
                    </Link>
                    <div className='search' onClick={toggleSearchbar }>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>

            </header>
            <div className={`sideBar ${sidebarOpen ? 'show':''}`}>
                <div className='sidebar-wrapper'>
                    <div className = 'auth-tab' >
                       {user.user? (
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
                    </div>
                    <div className='side-body'>
                        <div className='title'>Most Popular</div>
                        <div className='link-btn'>
                            <Link to='/search?query=Web Development' >
                                <div className='text'>Web Development</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            
                        </div>
                        <div className='link-btn'>
                            <Link to='/search?query=Game Development' className='section' >
                                <div className='text'>Game Development</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            
                        </div>
                        <div className='link-btn'>
                            <Link to='/search?query=Mobile Development'>
                                <div className='text'>Mobile Development</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                           
                        </div>
                        <div className='link-btn'>
                            <Link to='/search?query=Game Development' >
                                <div className='text'>Enterpreneurship</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            
                        </div>
                        <div className='link-btn'>
                            <Link to='/search?query=Business analytics & intelligence'>
                                <div className='text'>Business analytics & intelligence</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            
                        </div>
                        <div className='link-btn'>
                            <Link to='/search?query=Finance' >
                                <div className='text'>Finance</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                           
                        </div>
                        <div className='link-btn'>
                            <Link to='/search?query=IT Certifications' >
                                <div className='text'>IT Certifications</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                           
                        </div>
                        <div className='link-btn'>
                            <Link to='/search?query=Graphic design & illustration'>
                                <div className='text'>Graphic design & illustration</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                           
                        </div>
                        <div className='link-btn'>
                            <Link to='/search?query=Digital Marketing'>
                                <div className='text'>Digital Marketing</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            
                        </div>
                    </div>
                </div>
                <div className='close-btn' onClick={toggleSidebar}>
                    <i className="fa-solid fa-x"></i>
                </div>
            </div>
            <div className = {`search-mobile-wrapper ${searchbarOpen ? 'show' : ''}`}>
                <div className='search-mobile-container'>
                    <form className='box-1' onSubmit={handleSubmit}> 
                    <input 
                        type='text'
                        placeholder = 'Search for anything' 
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                     <i className="fa-solid fa-magnifying-glass"></i>
                    </form>
                    <div className='box-2' onClick={toggleSearchbar }>
                        <i className="fa-solid fa-x"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;