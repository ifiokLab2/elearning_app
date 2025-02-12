
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
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

const TeamTodoCreate = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [assignedTo, setAssignedTo] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const user = useSelector((state) => state.user.user);
    const [employees, setEmployees] = useState([]);
    const { Id } = useParams();
    const navigate = useNavigate();
   

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        //setShowSnackbar(false);
        
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('assigned_to', assignedTo);
            formData.append('due_date', dueDate);

           
    
            const response = await axios.post(`${apiUrl}/teams/${Id}/todos/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    setTitle("");
                    setDescription("");
                    setAssignedTo("");
                    setDueDate("");
                    //setShowSnackbar(!showSnackbar);
                    navigate(`/team/${Id}/todo/list/`);
                   
                }, 5000);
                //setsnackbarStatus('success');
                //setShowSnackbar(true);
               
                console.log('org created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                //setsnackbarStatus('fail');
                //setShowSnackbar(true);
                //setErrorMessage('response.data.message');
                //console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
                //setErrorMessage('response.data.message');
               
            }, 2000);
            // Handle unexpected errors
        }
    };
    
    useEffect(() => {
        if(user === null){
            navigate('/login/');
            return;
        };
        if(user.is_company === false ){
            navigate('/access-denied/');
            return;
        }
        const fetchTeam = async () => {
            try {
              const response = await axios.get(`${apiUrl}/api/teams/${Id}/employees/`);
              //setCourse(response.data);
              setEmployees(response.data);
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

        
    }, [Id]);
    
    return(
       <div class = 'home-wrapper'>
        <div className='dashboard-body'>
            
            <div className='sidebar-container-wrapper'>
                <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar}/>
            </div>
            <OrganizationHeader toggleSidebar={toggleSidebar} />
            <div className='job-list-wrapper' id='organization-job-list' >
               <div className='repo-form-wrapper'>
                
               <form className="form-container" onSubmit={handleSubmit}  >
                    <div className='form-header'>
                        
                        <i class="fa-solid fa-chalkboard-user"></i>
                        <span>upload File</span>
                    </div>
                    <div className={`form-group ${title ? 'active' : ''}`}>
                        <input type="text" id="title " value={title } onChange = {(e)=>setTitle(e.target.value)} required />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className={`form-group ${description ? 'active' : ''}`}>
                        <textarea  id="description " value={description } onChange = {(e)=>setDescription(e.target.value)} required></textarea>
                        
                        <label htmlFor="description">description</label>
                    </div>
                    <div className="form-group">
                        <div>Due Date</div>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <div>Assign To</div>
                        <select
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            required
                        >
                            <option value="">Select an employee</option>
                            {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                            ))}
                        </select>
                    </div>
                    

                    <div className='btn-wrapper'>
                        <button type="submit">
                            Submit
                            {isLoading ? <div className="loader"></div> : '' }
                                
                        </button>
                    </div>
                </form>
               </div>
            </div>
           
            
        </div>
        
       </div>
    )
};

export default TeamTodoCreate;