
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/create-course.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiUrl from '../components/api-url';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


const EditOrganizationProfile = ()=>{
    const [name, setName] = useState('');
    const [previousLogo, setPreviousLogo] = useState('');
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [employee_count, setEmployeeCount] = useState('');
    const [company_industry, setCompanyIndustry] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [website, setWebsite] = useState('');
    const [logo, setLogo] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const User = useSelector(state => state.user.user);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
    
    
   
    const handleSnackbarClose = () => {
        setSnackbar({ open: false, message: "", severity: "" });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        
        try {
            const formData = new FormData();
            formData.append('company_name', name);
            formData.append('country', country);
            formData.append('city', city);
            formData.append('website', website);
            if(logo !=""){
                formData.append('logo', logo);
            }
            //formData.append('logo', logo);
            formData.append('employee_count', employee_count);
            formData.append('phone', phone);
            formData.append('company_industry', company_industry);
    
            // Check if thumbnail is a file (not a base64 string)
           
    
            const response = await axios.put(`${apiUrl}/company/profile/edit/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${User.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setSnackbar({
                    open: true,
                    message: "success!",
                    severity: "success",
                });
                setTimeout(() => {
                    setIsLoading(isLoading);
                     navigate('/organization/dashboard/');
                   
                }, 2000);
                
                // Redirect to the home page or do any other actions
            } else {
                console.error('failed:');
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setSnackbar({ open: true, message: "error occurred", severity: "error" });
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
            setLogo(file);
        } else {
            console.error('Invalid file type or no file selected.');
        }
    };
    
    const handleTitleChange = (event) => {
        setName(event.target.value);
    };
    
    const handleWebsiteChange = (event) => {
        setWebsite(event.target.value);
    };
    
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

   
    const fetchProfileData = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/fetch-company-profile/`,{
            headers: {
                Authorization: `Token ${User?.auth_token}`,
            },
          });
            if (response.data.success) {
                setCompanyIndustry(response.data.data.company_industry);
                setName(response.data.data.company_name);
                setWebsite(response.data.data.website);
                setPhone(response.data.data.phone);
                setEmployeeCount(response.data.data.employee_count);
                setPreviousLogo(response.data.data.logo);
                
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
       
        if(User === null){
            navigate('/login/');
            return;
        };
        if(User.is_company === false ){
            navigate('/access-denied/');
            return;
        }
    
        // Fetch categories and default subcategories
        const fetchCountry = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/countries/`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setCountries(response.data);
                console.log('response.data:',response.data);
               
            } catch (error) {
                console.error('Error fetching data:', error);
                
            }
        };
        const fetchCities = async () => {
            if (country) {
                try {
                    const response = await axios.get(`${apiUrl}/api/cities/?country=${country}`, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                           
                        },
                    });
                    
                    setCities(response.data);
                   
                } catch (error) {
                    console.error('Error fetching data:', error);
                    
                }
            }else {
                setCities([]);
            }
            
        };

        fetchCountry();
        fetchCities();
        fetchProfileData();
       
        
    }, [User, navigate]);
    
  

    return(
        <div className='page-wrapper'>
            <Header />
            <div className='wrapper'>
            <form className="form-container" onSubmit={handleSubmit}  >
                <div className='form-header'>
                    <i class="fa-solid fa-building"></i>
                    <span>Create Company Profile</span>
                   
                </div>
                <div className={`form-group ${name ? 'active' : ''}`}>
                    <input type="text" id="title" value={name} onChange = {handleTitleChange} required />
                    <label htmlFor="title">Company name</label>
                </div>
                <div className={`form-group ${country ? 'active' : ''}`}>
                   
                    <select
                        name="preferred_employee_city"
                        value={country}
                        onChange={(e)=>setCountry(e.target.value)}
                    >
                    <option value="">Country</option>
                    {countries.map(country => (
                        <option key={country.id} value={country.id}>{country.name}</option>
                    ))}
                    </select>
                    
                </div>
                <div className={`form-group ${city ? 'active' : ''}`}>
                  
                    <select
                        name="preferred_employee_city"
                        value={city}
                        onChange={(e)=>setCity(e.target.value)}
                    >
                        <option value="">City</option>
                        {cities.map(city => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                    </select>
                    
                </div>
                <div className={`form-group ${employee_count ? 'active' : ''}`}>
                    <select
                    name="employee_count"
                    value={employee_count}
                    onChange={(e)=>setEmployeeCount(e.target.value)}
                    required
                >
                    <option value="">Employee Count</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1000">501-1000</option>
                    <option value="1001-5000">1001-5000</option>
                    <option value="5001-10000">5001-10000</option>
                    <option value="10001+">10001+</option>
                </select>
                    
                </div>
                <div className={`form-group ${company_industry ? 'active' : ''}`}>
                    
                    <select
                    name="company_industry"
                    value={company_industry}
                    onChange={(e)=>setCompanyIndustry(e.target.value)}
                >
                    <option value="">Select Industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Retail">Retail</option>
                </select>
                    
                </div>
                <div className={`form-group ${website ? 'active' : ''}`}>
                    <input type="text" id="website" value={website} onChange = {handleWebsiteChange} placeholder ='optional' />
                    <label htmlFor="website">Website</label>
                </div>
                <div className={`form-group ${phone ? 'active' : ''}`}>
                    <input type="text" id="phone" value={phone} onChange = {handlePhoneChange} z />
                    <label htmlFor="title">phone</label>
                </div>
              
                <div className = 'thumbnail-wrapper' >
                     <label htmlFor="profilePicture" className='thumb-label'> Company Logo</label>
                     <div>previous:{previousLogo}</div>
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
    );
};

export default  EditOrganizationProfile;