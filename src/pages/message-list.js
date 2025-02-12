import ReactQuill from 'react-quill';
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

const MessageList = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [teams,setTeams] = useState([]);
    const [announcements,setAnnouncements] = useState([]);
    const [loading,setLoading] = useState(false);
    const user = useSelector((state) => state.user.user);
    const { Id } = useParams();
   const navigate = useNavigate();

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    
    useEffect(() => {
        if(user === null){
            navigate('/login/');
            return;
        };
        if(user.is_company === false || user.is_employee === false){
            navigate('/access-denied/');
            return;
        };
        const fetchAnnouncements = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/announcements/team/${Id}/list/`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                         // Include the user ID in the Authorization header
                    },
                });
                //console.log(response.data.all_courses)
                setAnnouncements(response.data.all_announcements);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user courses:', error);
                setLoading(false);
                setAnnouncements([]);
            }
            };

        
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
        fetchAnnouncements();
        
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
                            <Link to ={`/team/${Id}/announcement/create/`} className = "create-btn">Post</Link>
                        </div>
                        <div className='apps-container' id='apps-container-message-list' >
                            {loading ? (
                                <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                            ):(
                                <>
                                    {announcements.length > 0 ? (
                                        <>
                                            {announcements.map((data)=>(
                                                <Link key={data.id} to={`/repository/team/${Id}/${data.id}/message-detail/`} className='cards organization-card' >
                                                    <div className='icon hrms-icon'>
                                                        <span className='initials'>{data.userInitials}</span>
                                                    </div>
                                                    <div className='text-wrapper'>
                                                        <div className='title-header'>{data.title}</div>
                                                        <ReactQuill
                                                            value={data.content}
                                                            readOnly={true}
                                                            theme={"bubble"}
                                                        />
                                                        <div className='employee-count'>
                                                            <i class="fa-solid fa-users"></i>
                                                            <span>{data.user} - {data.date}</span>
                                                    
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                
                                                </Link>
                                            ))}
                                        </>
                                    ):(
                                        <h3>No data found.</h3>
                                    )}
                                </>
                            )}
                            
                            
                        </div>
                
               
            </div>
           
            
        </div>
        
       </div>
    )
};

export default MessageList;