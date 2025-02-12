
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/job-detail.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import JobHeader from '../components/job-header';

const Jobdetail = ()=>{
    const [job,setJob] = useState('');
    const [loading,setLoading] = useState(false);
    const user = useSelector((state) => state.user.user);
    const { Id,title } = useParams();
    
    useEffect(() => {

    


        const fetchJob = async () => {
            try {
                const response = await axios.get(`${apiUrl}/job/${Id}/detail/`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                         // Include the user ID in the Authorization header
                    },
                });
                //console.log(response.data.all_courses)
                setJob(response.data.job_data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user courses:', error);
                setLoading(false);
                setJob([]);
            }
        };

        fetchJob();
    }, []);

    return(
       <div class = 'home-wrapper'>
        <JobHeader />
        <div className='jobs-body'>
           <div className='job-detail-container' >
                <h1 className='job-title'>
                    {job.title}
                </h1>
                <div className='company-card'>
                    <div className='title'>{job.company}</div>
                    <div className='location'>{job.country}</div>
                </div>
                <div className='job-type'>
                    <i class="fa-solid fa-money-bill"></i>
                    <span>{job.salary}</span>
                </div>
                <div className='job-type'>
                     <i class="fa-solid fa-briefcase"></i>
                     <span>{job.job_type}</span>
                </div>
                <div className='apply-wrapper'>
                   {job.applied ? (
                     <Link disable to="#" className='apply'>Already applied</Link>
                   ):(
                    <Link to={`/job/application/${Id}/${title}/`} className='apply'>Apply now</Link>
                   )}
                    <div className='saved'>
                        <i class="fa-solid fa-bookmark"></i>
                    </div>
                    <div className='report'>
                        <i class="fa-solid fa-flag"></i>
                    </div>
                    
                </div>
                <h4>Full job description</h4>
                <p>{job.description}</p>
           </div>
           
        </div>
        
       </div>
    )
};

export default  Jobdetail;