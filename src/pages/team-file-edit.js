
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

const TeamFileEdit = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [previousFile,setPreviousFile] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const user = useSelector((state) => state.user.user);
    const { Id,fileId } = useParams();
    const navigate = useNavigate();
   

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        const reader = new FileReader();
        //reader.readAsDataURL(file);
        setFile(file);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        //setShowSnackbar(false);
        
        try {
            const formData = new FormData();
            if(file != null){
                formData.append('file', file);
            }
            formData.append('description', description);
            formData.append('id', fileId);
            formData.append('team', Id);

           
    
            const response = await axios.put(`${apiUrl}/team/file/edit/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    setFile(null);
                    setDescription('');
                    //setShowSnackbar(!showSnackbar);
                    navigate(`/team/${Id}/file/list/`);
                   
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
        if(user.is_company === false || user.is_employee === false){
            navigate('/access-denied/');
            return;
        };
        const fetchFile = async () => {
            try {
              const response = await axios.get(`${apiUrl}/team/file/${fileId}/detail/`);
              //setCourse(response.data);
              console.log('response.data:',response.data);
              setDescription(response.data.description);
              //setOverview(response.data.team_data.overview);
              setPreviousFile(response.data.file);
              
             
              //setLoading(false);
            } catch (error) {
              console.error('Error fetching course details:', error);
              //setLoading(false);
            }
        };


        fetchFile();

        
    }, [Id,fileId]);
    
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
                        <span>Edit File</span>
                    </div>
                    <div className={`form-group ${description ? 'active' : ''}`}>
                        <input type="text" id="description " value={description } onChange = {(e)=>setDescription(e.target.value)} required />
                        <label htmlFor="description ">Title</label>
                    </div>
                    <div className = 'thumbnail-wrapper' >
                        <label htmlFor="thumbnail" className='thumb-label'>file</label>
                        <div className='previous'>previous:{previousFile}</div>
                        <input
                        type="file"
                        id="thumbnail"
                        name="thumbnail"
                        onChange={handleFileChange}
                       
                        />
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

export default TeamFileEdit;