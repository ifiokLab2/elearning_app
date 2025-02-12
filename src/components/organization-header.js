import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import 'swiper/swiper-bundle.css';

import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user-action'; // Import actions
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/organization-header.css';

const OrganizationHeader = ({ toggleSidebar })=>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
   
    const navigate = useNavigate();


    
    
    
    return(
        <div className='organization-header'>
            <div className='box-a-wrapper'>
                <div className='menu-btn' onClick={toggleSidebar} >
                    <i class="fa-solid fa-bars"></i>
                </div>
                <div className='logo'>Logo</div>
            </div>
            <div className='box-b-wrapper'>
               <Link to="" className='card-box'>
                    <div className='icon'>
                        <i class="fa-solid fa-circle-question"></i>
                    </div>
                    <div className='text'>Help</div>
               </Link>
               <Link to="" className='card-box'>
                    <div className='icon'>
                        <i class="fa-solid fa-bell"></i>
                    </div>
                    <div className='text'>Notification</div>
               </Link>
               <Link to="/organization/profile/" className='card-box'>
                    <div className='icon'>
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div className='text'></div>
               </Link>
            </div>
        </div>
    );
};

export default OrganizationHeader;