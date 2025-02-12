
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/jobs-home.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import JobHeader from '../components/job-header';

const JobsHome = ()=>{
    const [openModalId, setOpenModalId] = useState(null);
    const [jobs,setJobs] = useState([]);
    const [loading,setLoading] = useState(false);
    const [savingJobId, setSavingJobId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [locationQuery, setLocationQuery] = useState(""); 
    const user = useSelector((state) => state.user.user);


    const handleEllipsisClick = (event,jobId) => {
        event.preventDefault();
        if (openModalId === jobId) {
        setOpenModalId(null);  // Close the modal if it's already open
        } else {
        setOpenModalId(jobId); // Open the modal for the clicked job
        }
    };

    const saveJob = async (jobId) => {
        setSavingJobId(jobId); // Set the job being saved
        try {
            await axios.post(`${apiUrl}/jobs/${jobId}/save/`, null, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user?.auth_token}`, // Include the user ID in the Authorization header
                },
            });
           
            setOpenModalId(null);
        } catch (error) {
            console.error('Error saving job:', error);
           // alert('Failed to save job. Please try again.');
        } finally {
            setSavingJobId(null); // Reset saving state
        }
    };
    const fetchJobs = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${apiUrl}/job/list/`, {
            params: {
              search: searchQuery,
              location: locationQuery,
            },
          });
          setJobs(response.data.all_jobs);
        } catch (error) {
          console.error("Error fetching jobs:", error);
          setJobs([]);
        } finally {
          setLoading(false);
        }
      };
    const handleSearch = () => {
    fetchJobs();
    };

    // Handle Enter Key Press
    const handleKeyPress = (e) => {
    if (e.key === "Enter") {
        fetchJobs();
    }
    };
    useEffect(() => {

    


        

        fetchJobs();
    }, []);
    
    return(
       <div class = 'home-wrapper'>
        <JobHeader />
        <div className='jobs-body'>
            <div className='job-search-outer'>
                <div className='job-wrapper'>
                    <div className='box-wrapper-a'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        
                        <input
                            placeholder="Job title, Keywords"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <div className='box-wrapper-b'>
                        <i class="fa-solid fa-location-dot"></i>
                        
                        <input
                            placeholder="Country, city, state, or remote"
                            value={locationQuery}
                            onChange={(e) => setLocationQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <div className='box-wrapper-c'>
                        <button className='find-btn'>Find Jobs</button>
                    </div>
                </div>
            </div>

            <div className = 'job-list-wrapper' >
               
                {jobs.map((data)=>(
                    <div key = {data.id} className = 'job-container'>
                        <Link to = {`/job/detail/${data.id}/${data.title}/`} className='link-wrapper'>
                            <div className='title'>
                               {data.title}
                            </div>
                            <div className='company-name'>{data.company}</div>
                            <div className='location'>{data.country}</div>
                            <div className='job-type'>{data.job_type}</div>
                            <div className='job-overview'>
                               {data.description}
                            </div>
                            <div className='elipsis-card' onClick={(event) => handleEllipsisClick(event,data.id)}>
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                            </div>
                        </Link>
                        {openModalId === data.id && (
                            <div className={`elipsis-container`} >
                                <div className='tabs'  onClick={() => saveJob(data.id)}>
                                    <i class="fa-solid fa-bookmark"></i>
                                    <div className='text'> {savingJobId === data.id ? 'Saving...' : 'Save Job'}</div>
                                </div>
                                {/*
                                <div className='tabs'>
                                    <i class="fa-solid fa-flag"></i>
                                    <div className='text'>Report Job</div>
                                </div>
                                */}
                            </div>
                        )}
                    </div>
                ))}
               
                
            </div>
        </div>
        
       </div>
    )
};

export default JobsHome;