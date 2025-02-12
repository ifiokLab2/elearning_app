
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/user-jobs.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import JobHeader from '../components/job-header';

const UserJobs = ()=>{ 
    const [openSlideSections, setOpenSlideSections] = useState(0);

    const toggleSlider = (index) => {
        setOpenSlideSections((prevOpenSection) => (prevOpenSection === index ? null : index));
    };
    return(
       <div class = 'home-wrapper'>
        <JobHeader />
        <div className='jobs-body'>
          <div className = "tabs-header-wrapper">
            <div className = "title" >
              My jobs
            </div>
            <div className = "accordion-header-tab" >
              <div className={`tab ${openSlideSections === 0 ? 'show' :''}`} onClick={() => toggleSlider(0)}>
                Saved(0)
              </div>
              <div className={`tab ${openSlideSections === 1 ? 'show' :''}`} onClick={() => toggleSlider(1)}>
                Applied(0)
              </div>
            </div>
            <div className='job-accordion-section'>
              <div className='filter-box'>
                Last 14 days
              </div>
              {openSlideSections === 0 && (
                <div className='job-section-wrapper'>
                  <div className='job-card'>
                    <div className='box-a'>
                      <img src={logo} alt='logo' />
                    </div>
                    <div className='box-b'>
                      <div className='title' >
                          AI-Augmented Full-Stack Principal Engineer, gt.school (Remote) - $100,000/year USD
                      </div>
                      <div className='company-name'>Crossover</div>
                      <div className='date'>2 weeks ago</div>
                    </div>
                  </div>
                  <div className='job-card'>
                    <div className='box-a'>
                      <img src={logo} alt='logo' />
                    </div>
                    <div className='box-b'>
                      <div className='title' >
                          AI-Augmented Full-Stack Principal Engineer, gt.school (Remote) - $100,000/year USD
                      </div>
                      <div className='company-name'>Crossover</div>
                      <div className='date'>2 weeks ago</div>
                    </div>
                  </div>
                </div>
              )}
               {openSlideSections === 1 && (
                <div className='job-section-wrapper'>
                  2
                </div>
              )}
              
            </div>
          </div>
        </div>
        
       </div>
    )
};

export default  UserJobs;