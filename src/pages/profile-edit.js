
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/create-course.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import apiUrl from '../components/api-url';
//import 'react-quill/dist/quill.snow.css'; // Import the styles


const EditProfile = ()=>{
    const [title, setTitle] = useState('');
    const [previousPicture, setPreviousPicture] = useState('');
    const [biography, setBiography] = useState('');
    const [website, setWebsite] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const User = useSelector(state => state.user.user);

    
    
   
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('biography', biography);
            formData.append('website', website);
            
            if(profilePicture != ""){
                formData.append('picture', profilePicture);
            }
            formData.append('phone', phone);
    
            // Check if thumbnail is a file (not a base64 string)
           
    
            const response = await axios.put(`${apiUrl}/profile/edit/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${User.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    navigate('/profile/');
                   
                }, 2000);
                console.log('profile created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                console.error('profile creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during profile creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
               
            }, 2000);
            // Handle unexpected errors
        }
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            //reader.readAsDataURL(file);
            setProfilePicture(file);
        } else {
            console.error('Invalid file type or no file selected.');
        }
    };
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleBiographyChange = (event) => {
        setBiography(event.target.value);
    };
    const handleWebsiteChange = (event) => {
        setWebsite(event.target.value);
    };
    
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const fetchProfileData = async () => {
        try {
          const response = await axios.get(`${apiUrl}/profile/fetch/`,{
            headers: {
                Authorization: `Token ${User?.auth_token}`,
            },
          });
            if (response.data.success) {
                setBiography(response.data.data.biography);
                setTitle(response.data.data.title);
                setWebsite(response.data.data.website);
                setPhone(response.data.data.phone);
                setPreviousPicture(response.data.data.picture_name)
                //setPreviousPicture Redirect to the home page
               
            } else {
                setTimeout(() => {
                    navigate('/profile/create/'); // Change '/' to the actual path of your home page
                }, 2000); // 2000 milliseconds (2 seconds) delay
            
            // Handle failed signup, e.g., show error messages to the user
            }
          
        } catch (error) {
            setTimeout(() => {
                navigate('/login'); // Change '/' to the actual path of your home page
            }, 2000); // 2000 milliseconds (2 seconds) delay
          console.error('Error fetching cart courses:', error);
        }
    };
    

    useEffect(() => {
        // Check if the user is authenticated  !User && User.isInstructor === true 
       
        
    
        // Fetch categories and default subcategories
       
        fetchProfileData();
    }, [User, navigate]);
    
  

    return(
        <div className='page-wrapper'>
            <Header />
            <div className='wrapper'>
            <form className="form-container" onSubmit={handleSubmit}  >
                <div className='form-header'>
                <i class="fa-solid fa-chalkboard-user"></i>
                    <span>Edit Profile</span>
                   
                </div>
                <div className={`form-group ${title ? 'active' : ''}`}>
                    <input type="text" id="title" value={title} onChange = {handleTitleChange} required />
                    <label htmlFor="title">Title</label>
                </div>
                <div className={`form-group ${biography ? 'active' : ''}`}>
                  
                    <ReactQuill
                     id='biography'
                      value={biography}
                      
                      onChange={(value) => setBiography(value)}
                      placeholder="Biography"
                      required
                    />
                    
                </div>
                <div className={`form-group ${website ? 'active' : ''}`}>
                    <input type="text" id="website" value={website} onChange = {handleWebsiteChange} placeholder ='optional' />
                    <label htmlFor="website">Website</label>
                </div>
                <div className={`form-group ${phone ? 'active' : ''}`}>
                    <input type="text" id="phone" value={phone} onChange = {handlePhoneChange} required />
                    <label htmlFor="title">phone</label>
                </div>
              
                <div className = 'thumbnail-wrapper' >
                     <label htmlFor="profilePicture" className='thumb-label'>Profile picture</label>
                     <div className='previous'>previous:{previousPicture}</div>
                    <input
                    
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    onChange={handleFileChange}
                    
                    />
                </div>
               

                <div className='btn-wrapper'>
                    <button type="Create Profile">
                        Submit
                        {isLoading ? <div className="loader"></div> : '' }
                            
                    </button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default  EditProfile ;