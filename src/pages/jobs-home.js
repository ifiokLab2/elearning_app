
import React, { useState,useCallback , useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/jobs-home.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import JobHeader from '../components/job-header';




const JobsHome = () => {
    const [openModalId, setOpenModalId] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [savingJobId, setSavingJobId] = useState(null);
    const [savedJobs, setSavedJobs] = useState(new Set()); // Track saved jobs
    const [searchQuery, setSearchQuery] = useState("");
    const [locationQuery, setLocationQuery] = useState("");

    const user = useSelector((state) => state.user.user);
    const location = useLocation();

    const handleEllipsisClick = (event, jobId) => {
        event.preventDefault();
        setOpenModalId(openModalId === jobId ? null : jobId);
    };

    const fetchSavedJobs = async () => {
        if (!user) return;
        try {
            const response = await axios.get(`${apiUrl}/jobs/saved/`, {
                headers: {
                    Authorization: `Token ${user.auth_token}`,
                },
            });
            setSavedJobs(new Set(response.data.saved_job_ids)); // Store saved job IDs
        } catch (error) {
            console.error("Error fetching saved jobs:", error);
        }
    };

    const toggleSaveJob = async (jobId) => {
        setSavingJobId(jobId);
        const isSaved = savedJobs.has(jobId);

        try {
            if (isSaved) {
                await axios.delete(`${apiUrl}/jobs/${jobId}/unsave/`, {
                    headers: { Authorization: `Token ${user?.auth_token}` },
                });
                setSavedJobs((prev) => {
                    const updated = new Set(prev);
                    updated.delete(jobId);
                    return updated;
                });
            } else {
                await axios.post(`${apiUrl}/jobs/${jobId}/save/`, null, {
                    headers: { Authorization: `Token ${user?.auth_token}` },
                });
                setSavedJobs((prev) => new Set(prev).add(jobId));
            }
            setOpenModalId(null);
        } catch (error) {
            console.error("Error toggling job save:", error);
        } finally {
            setSavingJobId(null);
        }
    };

    const fetchJobs = useCallback(async (search = "", location = "") => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/job/list/`, {
                params: { search, location },
            });
            setJobs(response.data.all_jobs);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setJobs([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSavedJobs();
        const params = new URLSearchParams(location.search);
        fetchJobs(params.get("search") || "", params.get("location") || "");
    }, [location.search, fetchJobs]);

    return (
        <div className="home-wrapper">
            <JobHeader />
            <div className="jobs-body">
                <div className="job-list-wrapper">
                    {loading ? (
                        <p>Loading jobs...</p>
                    ) : (
                        jobs.map((data) => {
                            const isSaved = savedJobs.has(data.id);
                            return (
                                <div key={data.id} className="job-container">
                                    <Link to={`/job/detail/${data.id}/${data.title}/`} className="link-wrapper">
                                        <div className="title">{data.title}</div>
                                        <div className="company-name">{data.company}</div>
                                        <div className="location">{data.country}</div>
                                        <div className="job-type">{data.job_type}</div>
                                        <div className="job-overview">{data.description}</div>
                                        <div
                                            className="elipsis-card"
                                            onClick={(event) => handleEllipsisClick(event, data.id)}
                                        >
                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                        </div>
                                    </Link>
                                    {openModalId === data.id && (
                                        <div className="elipsis-container">
                                            <div className="tabs" onClick={() => toggleSaveJob(data.id)}>
                                                <i className="fa-solid fa-bookmark"></i>
                                                <div className="text">
                                                    {savingJobId === data.id ? "Saving..." : isSaved ? "Unsave Job" : "Save Job"}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobsHome;