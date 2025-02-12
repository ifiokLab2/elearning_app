
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
const Applicants = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [inviteModal, setInviteModal] = useState(false);
    const navigate = useNavigate();
    const { jobId} = useParams();
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user.user);
    const [applicants, setApplicants] = useState([]);
    const [applicantId, setApplicantId] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [mode, setMode] = useState("Zoom");
    const [link, setLink] = useState("");
    const [notes, setNotes] = useState("");
    const INTERVIEW_MODES = ["Zoom", "Google Meet", "Microsoft Teams", "In-person"];


    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const selectApplicant = (id)=>{
        toggleInviteModal();
        setApplicantId(id);
    };

    const toggleInviteModal = () => {
        setInviteModal(!inviteModal);
        setApplicantId("");
    };

    useEffect(() => {
        if(user === null){
            navigate('/login/');
            return;
        };
        if(user.is_company === false){
            navigate('/access-denied/');
            return;
        }
        const fetchApplicants = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/jobs/${jobId}/applicants/`, {
                    headers: {
                        'Authorization': `Token ${user?.auth_token}`, 
                    },
                });
                setErrorMessage("");
                setApplicants(response.data.applicants);
            } catch (error) {
                console.error('Error fetching applicants:', error);
                setErrorMessage('Failed to fetch applicants. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [jobId,user,navigate]);

    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('application_id', applicantId);
            formData.append('date', date);
            formData.append('time', time);
            formData.append('mode', mode);
      
            formData.append('link', link);
            formData.append('notes', notes);
            const response = await axios.post(`${apiUrl}/api/schedule-interview/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${user?.auth_token}`, // Replace `user.token` with your actual auth method
                },
            });
            // Add your email sending logic here (e.g., API call)
            setDate('');
            setTime('');
            setMode('');
            setLink('');
            setNotes('');
            setApplicantId('');
            setIsLoading(false);
            setInviteModal(false);
        } catch (error) {
            console.error('Error sending email:', error);
            setErrorMessage('Failed to send email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="home-wrapper">
            <div className="dashboard-body">
                <div className="sidebar-container-wrapper">
                    <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar} />
                </div>
                <OrganizationHeader toggleSidebar={toggleSidebar} />
                <div className="job-list-wrapper" id="organization-job-list">
                    {loading ? (
                        <div>Loading applicants...</div>
                    ) : applicants.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Application detail</th>
                                    <th>Resume</th>
                                    <th>Interested?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applicants.map((applicant) => (
                                    <tr key={applicant.id}>
                                        <td>{applicant.id}</td>
                                        <td>{applicant.user.username}</td>
                                        <td>{applicant.user.email}</td>
                                        <td>
                                            <Link to={`/organization/job/application/${applicant.id}/detail/`}>detail</Link>
                                        </td>
                                        <td>
                                            <a href={applicant.resume} target="_blank" rel="noopener noreferrer">
                                                View Resume
                                            </a>
                                        </td>
                                        <td>
                                            <div onClick={()=>selectApplicant(applicant.id)}>Message</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>No applicants found.</div>
                    )}
                </div>
            </div>
            <form className={`organization-form ${inviteModal ? 'show' : ''}`} onSubmit={handleSendEmail}>
                <div className="form-wrapper">
                    <div className="form-header-x">
                        <div className="title">Schedule Interview</div>
                        <div className="icon" onClick={toggleInviteModal}>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className="form-body">
                        
                        <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                        </div>

                        <div className="form-group">
                        <label htmlFor="time">Time</label>
                        <input
                            type="time"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                        </div>

                        <div className="form-group">
                        <div >Mode</div>
                        <select
                            id="mode"
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            required
                        >
                            {INTERVIEW_MODES.map((modeOption) => (
                            <option key={modeOption} value={modeOption}>
                                {modeOption}
                            </option>
                            ))}
                        </select>
                        </div>

                        <div className={`form-group ${link ? 'active' : ''}`}>
                        <div >Meeting Link</div>
                        <input
                            type="url"
                            id="link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Optional"
                        />
                        </div>

                        <div className={`form-group ${notes ? 'active' : ''}`}>
                        <div >Notes</div>
                        <textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Optional"
                        ></textarea>
                        </div>
                        
                        <div className="btn-wrapper">
                            <button type="submit">
                                Send Email
                                {isLoading && <div className="loader"></div>}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Applicants;