import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import logo from '../styles/contact-page.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';


const ContactPage = () => {
    const [countryCode, setCountryCode] = useState("+62");
    return (

        <>
            <div class = 'home-wrapper'>
                <Header />
                
                <div className="contact-container">
                    <div className="contact-info">
                        <h1>Get in Touch with Us</h1>
                        <p>
                            Whether you're looking for career opportunities, need support with our e-learning platform, 
                            or have inquiries about job listings, we're here to help. Reach out via email, phone, or the form below.
                        </p>
                        <p className="contact-detail">
                            <strong>Email:</strong> 
                            <Link to="mailto:support@yourwebsite.com" className="contact-link">
                                support@yourwebsite.com
                            </Link>
                        </p>
                        <p className="contact-detail"><strong>Phone:</strong> +123-456-7890</p>

                        <div className="contact-sections">
                            <div>
                            <h3>Job Seekers Support</h3>
                            <p>Need help applying for jobs or creating a standout resume? Contact us for assistance.</p>
                            </div>
                            <div>
                            <h3>E-Learning Assistance</h3>
                            <p>Have questions about courses, certifications, or learning materials? We're here for you.</p>
                            </div>
                            <div>
                            <h3>Employers & Partners</h3>
                            <p>Looking to hire talent or collaborate with us? Get in touch to discuss opportunities.</p>
                            </div>
                        </div>
                        </div>

                    <div className="contact-form">
                        <h2>Get in Touch</h2>
                        <p>You can reach us anytime.</p>

                        <form>
                            <div className="form-group">
                            <div>
                                <label htmlFor="first-name">First Name</label>
                                <input type="text" id="first-name" placeholder="First Name" />
                            </div>
                            <div>
                                <label htmlFor="last-name">Last Name</label>
                                <input type="text" id="last-name" placeholder="Last Name" />
                            </div>
                            </div>

                            <label htmlFor="email">Your Email</label>
                            <input type="email" id="email" placeholder="Your Email" />

                            <label htmlFor="phone">Phone Contact</label>
                            <div className="phone-group">
                            <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                                <option value="+62">+62</option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                                <option value="+61">+61</option>
                            </select>
                            <input type="tel" id="phone" placeholder="Phone Number" />
                            </div>

                            <label htmlFor="message">How can we help?</label>
                            <textarea id="message" placeholder="Write your message here..."></textarea>

                            <button type="submit">Submit</button>
                        </form>

                        <p className="terms">
                            By contacting us, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
       </>
        
    );
  };
  
  export default ContactPage;