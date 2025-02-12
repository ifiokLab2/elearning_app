
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/create-course.css';

import React, { useState, useEffect } from 'react';


const AccessDenied = ()=>{
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