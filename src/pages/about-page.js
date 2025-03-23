import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Header from '../components/header';
import SkillshareSection from '../components/Skill-section';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import logo from '../styles/about-page.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';


const AboutPage = () => {
    const [countryCode, setCountryCode] = useState("+62");
    return (

        <>
            <div class = 'home-wrapper'>
                <Header />
                <div className='about-wrapper'>
                    
                    <div className="hero-container">
                    {/* Background Image */}
                        <div className="hero-background">
                            <div className="hero-overlay"></div>

                            <div className="hero-content">
                            <h1 className="hero-title">
                            Inspiring discovery through creativity.
                            </h1>
                        </div>
                        </div>

                    {/* Hero Content */}
                        

                    {/* Bottom Text */}
                        <div className="hero-bottom">
                            <p>
                            At Elearn-Jobs, we’ve seen again and again how the seemingly simple act of creating can be a force for growth, change, and discovery in people’s lives. We want to inspire and multiply the kind of creative exploration that furthers expression, learning and application.
                            </p>
                        </div>
                    </div>
                    <SkillshareSection />

                    <div className="hero-section">
                    {/* Top and Bottom Borders */}
                    <div className="hero-border top"></div>
                    <div className="hero-border bottom"></div>

                    {/* Hero Background Image */}
                    <div className="hero-background-story">
                        

                        {/* Content Overlay */}
                        <div className="hero-overlay">
                        <div className="hero-content">
                            <h1>
                            "The thing I thought couldn't be possible a year or two ago, is
                            actually happening."
                            </h1>
                            <p>— Mimi Chao, artist, student & Elearn-Jobs teacher</p>
                            <button className="hero-button">Watch Mimi's Story</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                


                <Footer />
            </div>
       </>
        
    );
  };
  
  export default AboutPage;