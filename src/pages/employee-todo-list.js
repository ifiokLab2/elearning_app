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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


const EmployeeTeamTodoList = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [todos, setTodos] = useState([]);
    const [todoId, setTodoId] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const [loading,setLoading] = useState(false);
    const [openModalIndex, setOpenModalIndex] = useState(null);
    const [progressModal,setProgressModal] = useState(false);
    const [progress,setProgress] = useState("");
    const user = useSelector((state) => state.user.user);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

  
    const { Id } = useParams();
   
    const handleSnackbarClose = () => {
        setSnackbar({ open: false, message: "", severity: "" });
    };
    const toggleSidebar = ()=>{
        
        setsidebarOpen(!sidebarOpen);
    };
    
    const toggleProgress = (id)=>{
        setTodoId(id);
        setProgressModal(!progressModal);
    };
    const closeProgress = ()=>{
        setTodoId("");
        setProgressModal(!progressModal);
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
            const response = await axios.get(`${apiUrl}/employee/teams/${Id}/todos/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user?.auth_token}`, // Include the user ID in the Authorization header
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
    const handleSubmit = async (e) => {
        try {
           
            e.preventDefault();
            setIsLoading(!isLoading);
            const formData = new FormData();
            formData.append('status', progress);
           
           
            const response = await axios.put(`${apiUrl}/edit/todos/${todoId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user?.auth_token}`, // Include the user ID in the Authorization header
                },
            });
            
            if(response.data.success){
                setTimeout(() => {
                    setIsLoading(isLoading);
                    //navigate('/organization/dashboard/');
                    closeProgress();
                    fetchTodos();
                    setSnackbar({
                        open: true,
                        message: "success!",
                        severity: "success",
                      });
                
                   
                }, 2000); 
            }

        }
        catch (error) {
            setSnackbar({ open: true, message: "error occurred", severity: "error" });
            console.error('error occurred:', error);
            
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
                           <div></div>
                        </div>
                        <div className='apps-container' id='apps-container-message-list' >
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
                                        <div className='progress-tab'>
                                        <span onClick={(id)=>toggleProgress(data.id)}>
                                            <i className='fa-solid fa-pen-to-square'></i>
                                            </span>
                                            {data.progress}
                                            
                                        </div>
                                        
                                        
                                    </div>
                                    <div className='chevron-card' >
                                           
                                        </div>
                                        
                                
                                </div>
                            ))}
                            
                        </div>
                
               
            </div>

            <form className={`organization-form ${progressModal ? 'show-member' : ''}`} onSubmit ={handleSubmit}>
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Edit</div>
                        <div className='icon' onClick={closeProgress}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
             
                    <div className='form-body'>
                        <div className={`form-group ${progress ? 'active' : ''}`}>
                            <select
                                name="progress"
                                value={progress}
                                onChange={(e)=>setProgress(e.target.value)}
                                required
                            >
                                <option value="">Select Progress</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                       
                        
                        

                        <div className='btn-wrapper'>
                            <button type="submit">
                                Submit
                                {isLoading ? <div className="loader"></div> : '' }
                                    
                            </button>
                        </div>
                    </div>
                </div>
            </form>
           
            <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
        </div>
        
       </div>
    )
};

export default EmployeeTeamTodoList;