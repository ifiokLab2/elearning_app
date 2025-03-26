
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/create-course.css';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';


const AccessDenied = ()=>{
    const user = useSelector((state) => state.user.user);
    return(
        <div className='page-wrapper'>
            <Header/>
            <div className='wrapper'>
                
                <h3>AccessDenied</h3>
            </div>
        </div>
    );
};

export default AccessDenied;