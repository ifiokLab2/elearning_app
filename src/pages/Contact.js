import { Link,useParams  } from 'react-router-dom';
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/create-course.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../components/api-url';

const Contact = () => {
    return(
      <div className='page-wrapper'>
            <Header/>
            <div className='wrapper'>
                <h3>Blog</h3>
            </div>
      </div>
    );
};
  
  export default Contact;