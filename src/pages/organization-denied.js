
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/create-course.css';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const OrganizationDenied = ()=>{
    const user = useSelector((state) => state.user.user);
    return(
        <div className='page-wrapper'>
            <Header/>
            <div className='wrapper'>
                {user ? (
                    <>
                    {user.isInstructor &&(
                        <h3>Hi {user.first_name}, You are logged in as an "Instructor". Please <Link to="/organization/signup/">Create</Link>  an organization account to explore repository.</h3>
                    )}
                    {user.is_student &&(
                        <h3>Hi {user.first_name}, You are logged in as a "Student". Please <Link to="/organization/signup/">Create</Link>  an organization account to explore repository.</h3>
                    )}
                    
                    </>
                ):(
                    <h3>Please <Link to="/login/">Login</Link> or <Link to="/organization/signup/">Create</Link>  an organization account to explore repository.</h3>
                )}
                
            </div>
        </div>
    );
};

export default  OrganizationDenied ;