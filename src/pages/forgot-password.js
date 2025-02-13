
import { useNavigate } from 'react-router-dom';
import React, { useState} from 'react';
import axios from 'axios';
import Header from '../components/header';
import '../styles/signup.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from '../actions/user-action'; // Import setUser and setLoading actions
import apiUrl from '../components/api-url';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";



const ForgotPassword = ()=>{
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    //const [showSnackbar, setShowSnackbar] = useState(false);
    //const [snackbarStatus, setsnackbarStatus] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
    
    
   
    const handleSnackbarClose = () => {
        setSnackbar({ open: false, message: "", severity: "" });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(!isLoading);
        //setShowSnackbar(false);
       
        try {
            await axios.post(`${apiUrl}/password/reset/`, { email });
            //setsnackbarStatus('success');
            //setShowSnackbar(true);
            setSnackbar({
                open: true,
                message: "success!",
                severity: "success",
            });
            setErrorMessage('Password reset email sent. Check your inbox.');
        } catch (error) {
            setErrorMessage('User does not exist.');
            setSnackbar({
                open: true,
                message: "User does not exist",
                severity: "error",
            });
            
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
                        <span>Password reset</span>
                        
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    
                    <div className={`form-group ${email ? 'active' : ''}`}>
                    <input type="text" id="email" value={email} onChange = {(event)=>setEmail(event.target.value)} required />
                        <label htmlFor="email">Email</label>
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

export default ForgotPassword;