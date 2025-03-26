
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/create-course.css';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const InstructorDenied = ()=>{
    const user = useSelector((state) => state.user.user);
    return(
        <div className='page-wrapper'>
            <Header/>
            <div className='wrapper'>
                {user ? (
                    <>
                    {user.is_employee &&(
                        <h3>Hi {user.first_name}, You are logged in as an "Employee". Please <Link to="/instructor-signup/">Signup</Link> as an Instructor to create courses..</h3>
                    )}
                    {user.is_student &&(
                       <h3>Hi {user.first_name}, You are logged in as a "Student". Please <Link to="/instructor-signup/">Signup</Link> as an Instructor to create courses..</h3>
                    )}
                     {user.is_company &&(
                        <h3>Hi {user.first_name}, You are logged in as an "Organization". Please <Link to="/instructor-signup/">Signup</Link> as an Instructor to create courses..</h3>
                    )}
                    
                    </>
                ):(
                    <h3>Please <Link to="/login/">Login</Link> or <Link to="/instructor-signup/">Signup</Link> as an Instructor to create courses.</h3>
                )}
                
            </div>
        </div>
    );
};

export default InstructorDenied ;