
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
import { useNavigate,useParams } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const EmployeeTeamDashboard = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [teams,setTeams] = useState([]);
    const [loading,setLoading] = useState(false);
    const user = useSelector((state) => state.user.user);
    const { Id } = useParams();
    const navigate = useNavigate();
   

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    
    useEffect(() => {
        if(user === null || user.is_employee === false){
            //navigate('/login')
            //return;
        }


        const fetchTeam = async () => {
            try {
              const response = await axios.get(`${apiUrl}/repository/team/${Id}/detail/`);
              //setCourse(response.data);
              console.log('response.data:',response.data);
              //setName(response.data.team_data.name);
              //setOverview(response.data.team_data.overview);
              //setPreviousThumbnail(response.data.team_data.logo);
              
             
              //setLoading(false);
            } catch (error) {
              console.error('Error fetching course details:', error);
              //setLoading(false);
            }
        };


        fetchTeam();

        
    }, []);
    
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
                           <Link to ='/organization/repository/create/' className = "create-btn"></Link>
                        </div>
                        <div className='apps-container'>
                            <Link to={`/repository/team/${Id}/message-board/`} className='cards organization-card' >
                            <div className='icon hrms-icon'>
                                <img src= '' alt='team' />
                            </div>
                            <div className='text-wrapper'>
                                <div className='title-header'>Message dashboard</div>
                                <p>some desc</p>
                                <div className='employee-count'>
                                    <i class="fa-solid fa-users"></i>
                                    <span>dept</span>
                            
                                </div>
                                
                                
                            </div>
                            
                            </Link>
                            <Link to={`/team/${Id}/file/list/`} className='cards organization-card' >
                            <div className='icon hrms-icon'>
                                <img src= '' alt='team' />
                            </div>
                            <div className='text-wrapper'>
                                <div className='title-header'>Upload Files</div>
                                <p>some desc</p>
                                <div className='employee-count'>
                                    <i class="fa-solid fa-users"></i>
                                    <span>dept</span>
                            
                                </div>
                                
                                
                            </div>
                            
                            </Link>
                            <Link to={`/team/${Id}/todo/list/`} className='cards organization-card' >
                            <div className='icon hrms-icon'>
                                <img src= '' alt='team' />
                            </div>
                            <div className='text-wrapper'>
                                <div className='title-header'>To Dos</div>
                                <p>some desc</p>
                                <div className='employee-count'>
                                    <i class="fa-solid fa-users"></i>
                                    <span>dept</span>
                            
                                </div>
                                
                                
                            </div>
                            
                            </Link>
                            <Link to={`/team/${Id}/chats/`} className='cards organization-card' >
                            <div className='icon hrms-icon'>
                                <img src= '' alt='team' />
                            </div>
                            <div className='text-wrapper'>
                                <div className='title-header'>Chats</div>
                                <p>some desc</p>
                                <div className='employee-count'>
                                    <i class="fa-solid fa-users"></i>
                                    <span>dept</span>
                            
                                </div>
                                
                                
                            </div>
                            
                            </Link>
                        </div>
                
               
            </div>
           
            
        </div>
        
       </div>
    )
};

export default EmployeeTeamDashboard;