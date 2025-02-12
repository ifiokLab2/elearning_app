
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , useParams} from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/organization-dashboard.css';
import '../styles/applicants.css';
import '../styles/signup.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const EmployeeList = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user.user);
    const [employees, setEmployees] = useState([]);
   const navigate = useNavigate();
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

   

    useEffect(() => {
        if(user === null){
            navigate('/login/');
            return;
        };
        if(user.is_company === false){
            navigate('/access-denied/');
            return;
        };
        const fetchemployees = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/company/employees/list/`, {
                    headers: {
                        'Authorization': `Token ${user?.auth_token}`, 
                    },
                });
                setErrorMessage("");
                setLoading(false);
                setEmployees(response.data.employees);
            } catch (error) {
                setEmployees([]);
                console.error('Error fetching applicants:', error);
                setErrorMessage('Failed to fetch applicants. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchemployees();
    }, [user]);

    

    return (
        <div className="home-wrapper">
            <div className="dashboard-body">
                <div className="sidebar-container-wrapper">
                    <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar} />
                </div>
                <OrganizationHeader toggleSidebar={toggleSidebar} />
                <div className="job-list-wrapper" id="organization-job-list">
                    {loading ? (
                        <div>Loading Employees...</div>
                    ) : employees.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                   
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((data) => (
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>{data.first_name}</td>
                                        <td>{data.last_name}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>No data found.</div>
                    )}
                </div>
            </div>
           
        </div>
    );
};

export default EmployeeList;