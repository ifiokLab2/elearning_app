

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';

import '../styles/jobs-create.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const CreateJobs = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);
    const user = useSelector((state) => state.user.user);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [location,setLocation] = useState('');
    const [company,setCompany] = useState('');
    const [salary,setSalary] = useState('');
    const [job_type,setJobType] = useState('');
    const [company_industry,setCompanyIndustry] = useState('');
    const [hire,setHire] = useState('');
    const [city,setCity] = useState('');
    const [country,setCountry] = useState('');
    



    useEffect(() => {



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
        const checkCompanyProfile = async () => {
            console.log('company exist1....',user.auth_token);
            try {
              const response = await axios.get(`${apiUrl}/api/company-profile/check/`, {
                headers: {
                    Authorization: `Token ${user.auth_token}`,
                },
              });
              //console.log('company exist1....',user.user.auth_token);
              console.log(response.data);
              if (response.data.exists) {
                console.log('company exist2..');
              } else {
                console.log('company exist3..');
                navigate('/organization/profile/create/'); 
              }
            } catch (err) {
                navigate('/organization/profile/create/'); 
                console.log('Error fetching company profile.');
              
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
        checkCompanyProfile();
    }, [country]);

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
   

    const handleSubmit = async (e) => {
        try {
           
            e.preventDefault();
            setIsLoading(!isLoading);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('number_of_people_to_hire', hire);
            formData.append('location ', location );
            formData.append('preferred_employee_city', city);
            formData.append('preferred_employee_country', country);
            formData.append('salary', salary);
            formData.append('job_type',job_type);
            formData.append('company_industry',company_industry);
           
            const response = await axios.post(`${apiUrl}/jobs/create/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user?.auth_token}`, // Include the user ID in the Authorization header
                },
            });
            
            if(response.data.success){
                setTimeout(() => {
                    setIsLoading(isLoading);
                    navigate('/organization/job/list/');
                   
                }, 2000); 
            }

        }
        catch (error) {
            console.error('error occurred:', error);
            
        }
    };

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
    };
    const renderStep = () => {
        switch(currentStep) {
            case 1:
                return (
                    <>
                        <div className = "input-tab-box">
                            <label htmlFor="title">Job tile*</label>
                            <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            required
                        />
                        </div>
                        <div className='input-tab-box'>
                            <label htmlFor="description">Job description*</label>
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className='input-tab-box'>
                            <label htmlFor="location">Which option best describes this job's location?*</label>
                            <select
                                name="location"
                                value={location}
                                onChange={(e)=>setLocation(e.target.value)}
                                required
                            >
                                <option value="">Select Location</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Onsite">Onsite</option>
                            </select>
                        </div>
                        <div className='input-tab-box'>
                            <label htmlFor='salary'></label>
                            <select
                                name="salary"
                                value={salary}
                                onChange={(e)=>setSalary(e.target.value)}
                                required
                            >
                                <option value="">Select Salary Range</option>
                                <option value="0-20000">£0 - £20,000</option>
                                <option value="20001-40000">£20,001 - £40,000</option>
                                <option value="40001-60000">£40,001 - £60,000</option>
                                <option value="60001-80000">£60,001 - £80,000</option>
                                <option value="80001-100000">£80,001 - £100,000</option>
                                <option value="100001-120000">£100,001 - £120,000</option>
                                <option value="120001-140000">£120,001 - £140,000</option>
                                <option value="140001-160000">£140,001 - £160,000</option>
                                <option value="160001-180000">£160,001 - £180,000</option>
                                <option value="180001-200000">£180,001 - £200,000</option>
                                <option value="200001+">£200,001 and above</option>
                            </select>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        
                        <div className='input-tab-box'>
                            <label htmlFor='job-type'>What is the job type?*</label>
                            <select
                                name="job-type"
                                value={job_type}
                                onChange={(e)=>setJobType(e.target.value)}
                                required
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Temporary">Temporary</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div className='input-tab-box'>
                            <label htmlFor='preferred-employee-country'>Preferred Employee Country*</label>
                            <select
                                name="preferred_employee_city"
                                value={country}
                                onChange={(e)=>setCountry(e.target.value)}
                            >
                            <option value="">Select Preferred Employee Country</option>
                            {countries.map(country => (
                                <option key={country.id} value={country.id}>{country.name}</option>
                            ))}
                            </select>
                       
                        </div>
                        <div className='input-tab-box'>
                            <label htmlFor='preferred-employee-country'>Preferred Employee City*</label>
                            <select
                                name="preferred_employee_city"
                                value={city}
                                onChange={(e)=>setCity(e.target.value)}
                            >
                                <option value="">Select Preferred Employee City</option>
                                {cities.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                       
                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                    <div className='input-tab-box'>
                        <label htmlFor='company-industry'>Your Company Industry*</label>
                        <select
                            name="company-industry"
                            value={company_industry}
                            onChange={(e)=>setCompanyIndustry(e.target.value)}
                            required
                        >
                            <option value="">Select Industry</option>
                            <option value="Technology">Technology</option>
                            <option value="Finance">Finance</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Education">Education</option>
                            <option value="Retail">Retail</option>
                        </select>
                    </div>
                    <div className='input-tab-box'>
                        <label htmlFor='number-hire'>How many people do you want to hire for this openings?*</label>
                        <select
                            name="number-hire"
                            value={hire}
                            onChange={(e)=>setHire(e.target.value)}
                            required
                        >
                            <option value="">Select Number of Openings</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                       
                        
                    </>
                );
            default:
                return null;
        }
    };

    const renderProgressBar = () => {
        const steps = 4;
        const progress = (currentStep / steps) * 100;
        return (
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
        );
    };

    
    return(
       <div class = 'home-wrapper'>
        <div className='dashboard-body'>
            
            <div className='sidebar-container-wrapper'>
                <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar}/>
            </div>
            <OrganizationHeader toggleSidebar={toggleSidebar} />
           <div className='dashboard-container' >
                <div className='form-wrapper'>
                
                <form onSubmit={handleSubmit}>
                    <h2>Create a Job</h2>
                    {renderProgressBar()}
                    {renderStep()}
                    {currentStep > 1 && <button type="button" onClick={prevStep} className = "prev-btn" >Previous</button>}
                    {currentStep < 4 && <button type="button" onClick={nextStep} className = "next-btn" >Next</button>}
                    {currentStep === 4 && <button type="submit" className = "next-btn">
                        Submit
                        {isLoading ? <div className="loader"></div> : '' }
                    </button>}
                </form>
                </div>
           </div>
           
            
        </div>
        
       </div>
    )
};

export default CreateJobs;