import ReactQuill from 'react-quill';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/organization-dashboard.css';
import '../styles/repository.css';
import logo from '../styles/logo.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useNavigate,useParams } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const TeamFileList = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const [loading,setLoading] = useState(false);
    const [openModalIndex, setOpenModalIndex] = useState(null);
    const user = useSelector((state) => state.user.user);
    const { Id } = useParams();
   

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    const handleEllipsisClick = (event,index) => {
      event.preventDefault();
      setOpenModalIndex(openModalIndex === index ? null : index);
  };

  const handleDelete = async (event,Id) => {
      event.preventDefault();
      try {
        const response = await axios.delete(`${apiUrl}/team/file/${Id}/delete/`, {
          headers: {
            Authorization: `Token ${user.auth_token}`,
          },
        });
        console.log('response.data:',response.data);
        if (response.data.success) {
          console.log(`Team with ID ${Id} deleted successfully.`);
          fetchFiles();
        } else {
          console.error('Failed to delete teams:', response.data.message);
        }
      } catch (error) {
        console.error('An error occurred during requirement deletion:', error);
      }
  };
    const getFileIcon = (fileName) => {
        const fileExtension = fileName.split(".").pop().toLowerCase();
        switch (fileExtension) {
          case "pdf":
            return "📄"; // PDF icon
          case "doc":
          case "docx":
            return "📝"; // Word document icon
          case "xls":
          case "xlsx":
            return "📊"; // Excel file icon
          case "mp3":
          case "wav":
            return "🎵"; // Audio file icon
          case "mp4":
          case "avi":
            return "🎥"; // Video file icon
          case "jpg":
          case "jpeg":
          case "png":
            return "🖼️"; // Image icon
          case "zip":
          case "rar":
            return "📦"; // Archive file icon
          default:
            return "📁"; // Default file icon
        }
      };
      const fetchFiles = async () => {
        try {
            const response = await axios.get(`${apiUrl}/teams/${Id}/files/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                     // Include the user ID in the Authorization header
                },
            });
            //console.log(response.data.all_courses)
            setFiles(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user courses:', error);
            setLoading(false);
            setFiles([]);
        }
        };
    useEffect(() => {
       

        
        
        fetchFiles();
        
    }, [Id]);
    const handleDownload = (fileUrl) => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", true); // Browser interprets as a download
        document.body.appendChild(link);
        link.click();
        link.remove();
      };
    
    return(
       <div class = 'home-wrapper'>
        <div className='dashboard-body'>
            
            <div className='sidebar-container-wrapper'>
                <OrganizationSidebar className={sidebarOpen ? 'visible' : ''} toggleSidebar={toggleSidebar}/>
            </div>
            <OrganizationHeader toggleSidebar={toggleSidebar} />
            <div className='job-list-wrapper' id='organization-job-list' >
            <div className='employer-organizations'>
                            <div class = 'org'>
                                
                            </div>
                            <Link to ={`/team/${Id}/file/create/`} className = "create-btn">Post</Link>
                        </div>
                        <div className='apps-container' id='apps-container-message-list' >
                            {files.map((data,index)=>(
                                <div key={data.id} to={`/repository/team/${Id}/${data.id}/message-detail/`} className='cards organization-card' >
                                    <div className='icon hrms-icon'>
                                        <span className='initials'>{getFileIcon(data.file)}</span>
                                    </div>
                                    <div className='text-wrapper'>
                                        <div className='title-header'>{data.description || "No description provided."}</div>
                                        <button
                                         
                                            onClick={() => handleDownload(data.file)}
                                        >
                                            Download
                                        </button>
                                        <div className='employee-count'>
                                            <i class="fa-solid fa-users"></i>
                                            <span>{data.user} - {data.date}</span>
                                    
                                        </div>
                                        
                                        
                                    </div>
                                    <div className='chevron-card' onClick={(event) => handleEllipsisClick(event,index)}>
                                            <i className="fa-solid fa-ellipsis-vertical"></i>
                                        </div>
                                        {openModalIndex === index && (
                                            <div className='option-modal'>
                                            {/* Users should be able to click on edit tab to edit the specific organization */}
                                            <Link to={`/team/${Id}/file/${data.id}/edit/`} className='option-card' >Edit</Link>
                                            <div onClick={(event)=>handleDelete(event,data.id)}  className='option-card' >Delete</div>
  
                                        
                                            </div>
                                        )}
                                
                                </div>
                            ))}
                            
                        </div>
                
               
            </div>
           
            
        </div>
        
       </div>
    )
};

export default TeamFileList;