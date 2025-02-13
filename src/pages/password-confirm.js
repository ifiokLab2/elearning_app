
import { Navigate, Link, useNavigate,useParams, useLocation } from 'react-router-dom'; // Import useLocation
import React, { useState} from 'react';
import axios from 'axios';
import Header from '../components/header';
import '../styles/signup.css';

import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from '../actions/user-action'; // Import setUser and setLoading actions
import apiUrl from '../components/api-url';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";



const PasswordConfirm = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { uuid,token } = useParams();
   
    const navigate = useNavigate();
    
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
    
    
   
    const handleSnackbarClose = () => {
        setSnackbar({ open: false, message: "", severity: "" });
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(!isLoading);
        //setShowSnackbar(false);
        if (password !== ConfirmPassword ) {
            // Redirect to the login page
            setIsLoading(isLoading);
            setErrorMessage(`Password mismatch.`);
           
            return; // Stop further execution of useEffect
        }
        try {
            await axios.post(`${apiUrl}/password/reset/confirm/${uuid}/${token}/`, {password});
            setSnackbar({
                open: true,
                message: "success!",
                severity: "success",
            });
            setTimeout(() => {
                setIsLoading(isLoading);
                navigate('/')
               
            }, 2000); 
            //setErrorMessage('Password reset sucessfull.');
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Something went wrong!",
                severity: "error",
            });
            
            setErrorMessage('An error occurred. Please try again later.');
        }
        setIsLoading(isLoading);
    };

    
    return(
        <div className='page-wrapper'>
            <Header/>
            <div className='wrapper'>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className='form-header'>
                        <i class="fa-solid fa-user"></i>
                        <span>Change Password</span>
                        
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    
                    <div className={`form-group ${password ? 'active' : ''}`}>
                                <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange = {handlePasswordChange} required />
                                <label htmlFor="password">Password</label>
                                <div className='eye-icon' onClick={togglePasswordVisibility}>
                                    <i class={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye' }`}></i>
                                </div>
                            </div>
                            <div className={`form-group ${ConfirmPassword ? 'active' : ''}`}>
                                <input  type={showConfirmPassword ? 'text' : 'password'} id="confirm-password" value={ConfirmPassword} onChange = {handleConfirmPasswordChange} required />
                                <label htmlFor="password">Confirm Password</label>
                                <div className='eye-icon' onClick={toggleConfirmPasswordVisibility}>
                                    <i class={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye' }`}></i>
                                </div>
                            </div>
                      

                    <div className='btn-wrapper'>
                        <button type="submit">
                            Submit
                            {isLoading ? <div className="loader"></div> : '' }
                            
                        </button>
                    </div>
                    
                </form>
            </div>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert
                elevation={6}
                variant="filled"
                onClose={handleSnackbarClose}
                severity={snackbar.severity}
                >
                {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default PasswordConfirm ;