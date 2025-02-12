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

const TeamTodoList = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [todos, setTodos] = useState([]);
    const [loading,setLoading] = useState(true);
    const [openModalIndex, setOpenModalIndex] = useState(null);
    const user = useSelector((state) => state.user.user);
    const { Id } = useParams();
   

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    const handleEllipsisClick = (event,index) => {
      event.preventDefault();
      setOpenModalIndex(openModalIndex === index ? null : index);
  };

  const handleDelete = async (event,Id) => {
      event.preventDefault();
      try {
        const response = await axios.delete(`${apiUrl}/todos/${Id}/`, {
          headers: {
            Authorization: `Token ${user.auth_token}`,
          },
        });
        console.log('response.data:',response.data);
        if (response.data.success) {
            fetchTodos();
        } else {
          console.error('Failed to delete teams:', response.data.message);
        }
      } catch (error) {
        console.error('An error occurred during requirement deletion:', error);
      }
  };
    
    const fetchTodos = async () => {
        try {
           
            const response = await axios.get(`${apiUrl}/teams/${Id}/todos/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                     // Include the user ID in the Authorization header
                },
            });
            //console.log(response.data.all_courses)
            setTodos(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user courses:', error);
            setLoading(false);
            setTodos([]);
        }
    };
    useEffect(() => {
       

        
        
        fetchTodos();
        
    }, [Id]);
   
    
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
                            <Link to ={`/team/${Id}/todo/create/`} className = "create-btn">Post</Link>
                        </div>
                        <div className='apps-container' id='apps-container-message-list' >
                            {loading ? (
                                 <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                            ):(
                                <>
                                    {todos.length > 0 ? (
                                        <>
                                            {todos.map((data,index)=>(
                                                <div key={data.id} to={`/repository/team/${Id}/${data.id}/message-detail/`} className='cards organization-card' >
                                                    <div className='icon hrms-icon'>
                                                        <span className='initials'>{data.userInitials}</span>
                                                    </div>
                                                    <div className='text-wrapper'>
                                                        <div className='title-header'>{data.title}</div>
                                                        <p>{data.description}</p>
                                                        <div className='employee-count'>
                                                            <i class="fa-solid fa-users"></i>
                                                            <span> Assigned To - {data.assigned_to}</span>
                                                    
                                                        </div>
                                                        
                                                        
                                                    </div>
                                                    <div className='chevron-card' onClick={(event) => handleEllipsisClick(event,index)}>
                                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                                        </div>
                                                        {openModalIndex === index && (
                                                            <div className='option-modal'>
                                                            {/* Users should be able to click on edit tab to edit the specific organization */}
                                                            <Link to={`/team/${Id}/todo/${data.id}/edit/`} className='option-card' >Edit</Link>
                                                            <div onClick={(event)=>handleDelete(event,data.id)}  className='option-card' >Delete</div>
                
                                                        
                                                            </div>
                                                        )}
                                                
                                                </div>
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

export default TeamTodoList;