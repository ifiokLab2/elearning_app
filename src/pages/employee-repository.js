
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
import { useNavigate } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const EmployeeRepository = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [teams,setTeams] = useState([]);
    const [loading,setLoading] = useState(false);
    const user = useSelector((state) => state.user.user);
    const [openModalIndex, setOpenModalIndex] = useState(null);
    const [organizations,setOrganizations] = useState([]);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarStatus, setsnackbarStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [teamId,setTeamId] = useState('');
    const [email,setEmail] = useState('');
    const [memberModal,setMemberModal] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    const toggleMemberModal = (event,id)=>{
        event.preventDefault();
        setTeamId(id);
        console.log(id);
        setMemberModal(!memberModal);
    };
    const handleEllipsisClick = (event,index) => {
        event.preventDefault();
        setOpenModalIndex(openModalIndex === index ? null : index);
    };

    const handleDelete = async (event,Id) => {
        event.preventDefault();
        try {
          const response = await axios.delete(`${apiUrl}/repository/team/${Id}/delete/`, {
            headers: {
              Authorization: `Token ${user.auth_token}`,
            },
          });
          console.log('response.data:',response.data);
          if (response.data.success) {
            console.log(`Team with ID ${Id} deleted successfully.`);
            fetchTeams();
          } else {
            console.error('Failed to delete teams:', response.data.message);
          }
        } catch (error) {
          console.error('An error occurred during requirement deletion:', error);
        }
    };

    const handleInviteSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        setShowSnackbar(false);
        
        try {
            const formData = new FormData();
            formData.append('email', email);
            //formData.append('organization', organizationId);
            //formData.append('department', department);
            //formData.append('hourly_rate', hourly_rate);
            //console.log('formData :',apiUrl,formData );
    
            // Check if thumbnail is a file (not a base64 string)
           
    
            const response = await axios.post(`${apiUrl}/invites/${teamId}/send/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    setEmail('');
                    setTeamId('');
                    //setDepartment('');
                    //setOrganizationId('')
                    setMemberModal(!memberModal);
                   
                }, 2000);
                console.log('org created successfully:', response.data.course);
                setsnackbarStatus('success');
                setShowSnackbar(true);
                // Redirect to the home page or do any other actions
            } else {
                setsnackbarStatus('fail');
                setShowSnackbar(true);
                setErrorMessage(response.data.message);

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

    const fetchTeams = async () => {
        try {
         
            
            setLoading(true);
            const response = await axios.get(`${apiUrl}/repository/team/list`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
                },
            });
            //console.log(response.data.all_courses)
            setLoading(false);
            //console.log('response.data.all_teams');
            setTeams(response.data.all_teams);
            
        } catch (error) {
            console.error('Error fetching user courses:', error);
            setLoading(false);
            setTeams([]);
        }
    };
    useEffect(() => {
       if( user === null || user.is_employee === false){
            //navigate('/login');
            return ;
       }

        fetchTeams();
    }, [navigate,user]);
    
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
                                Repository
                            </div>
                           <Link to ='' ></Link>
                </div>
                <>
                    {loading ? (
                            <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                    ) : (
                        <>
                            {teams.length > 0 ? (
                            <div className='apps-container'>
                            {teams.map((data, index) => (
                                <Link to={`/repository/team/${data.id}/dashboard/`} className='cards organization-card' key={index}>
                                <div className='icon hrms-icon'>
                                    <img src={`${apiUrl}${data.logo}`} alt={data.name} />
                                </div>
                                <div className='text-wrapper'>
                                    <div className='title-header'>{data.name}</div>
                                    <p>{data.overview}</p>
                                    <div className='employee-count'>
                                        <i class="fa-solid fa-users"></i>
                                        <span>({data.employees})</span>
                                
                                    </div>
                                    
                                    
                                </div>
                                <div className='chevron-card' onClick={(event) => handleEllipsisClick(event,index)}>
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                </div>
                                {openModalIndex === index && (
                                    <div className='option-modal'>
                                    {/* Users should be able to click on edit tab to edit the specific organization */}
                                    <Link to={`/organization/repository/${data.id}/edit/`} className='option-card' >Edit</Link>
                                    <div onClick={(event)=>handleDelete(event,data.id)}  className='option-card' >Delete</div>
                                    <div className='option-card' onClick={(event)=>toggleMemberModal(event,data.id)}>invite employee</div>
                                
                                    </div>
                                )}
                                </Link>
                            ))}
                            </div>
                        ) : (
                            <h4>No repository..</h4>
                        )}
                        </>
                    )}
                </>
                
               
            </div>
            <form className={`organization-form ${memberModal ? 'show-member' : ''}`} onSubmit ={handleInviteSubmit}>
                <div className='form-wrapper'>
                    <div className='form-header'>
                        <div className='title'>Invite employee</div>
                        <div className='icon' onClick={toggleMemberModal}>
                            <i class="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className='form-body'>
                        <div className={`form-group ${email ? 'active' : ''}`}>
                            <input type="email" id="email" value={email} onChange = {(e)=>setEmail(e.target.value)} required />
                            <label htmlFor="email">Email</label>
                        </div>
                       
                        
                        

                        <div className='btn-wrapper'>
                            <button type="submit">
                                send invite
                                {isLoading ? <div className="loader"></div> : '' }
                                    
                            </button>
                        </div>
                    </div>
                </div>
            </form>
           
            
        </div>
        
       </div>
    )
};

export default EmployeeRepository;