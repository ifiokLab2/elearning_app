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

const MessageDetail = ()=>{
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [teams,setTeams] = useState([]);
    const [announcements,setAnnouncements] = useState([]);
    const [loading,setLoading] = useState(false);
    const [repliesVisible, setRepliesVisible] = useState({});

    const [announcement, setAnnouncement] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [newReply, setNewReply] = useState({});
    const user = useSelector((state) => state.user.user);
    const { Id,announcementId} = useParams();
    const navigate = useNavigate();
   

    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    };
    const toggleReplyTextarea = (commentId) => {
      setRepliesVisible((prev) => ({
        ...prev,
        [commentId]: !prev[commentId],
      }));
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        const formData = new FormData();
        formData.append('text', newComment);
       
    
        try {
         
          const response = await axios.post(`${apiUrl}/announcements/${announcementId}/comments/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
            },
        });
          //setComments([...comments, response.data]);
          fetchAnnouncementDetails();
          setNewComment("");
        } catch (error) {
          console.error("Error adding comment:", error);
        }
      };
    
      const handleAddReply = async (commentId) => {
        if (!newReply[commentId]?.trim()) return;

        const formData = new FormData();
        formData.append('text', newReply[commentId]);
        try {
         
          const response = await axios.post(`${apiUrl}/comments/${commentId}/replies/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${user.auth_token}`, // Include the user ID in the Authorization header
            },
        });
        fetchAnnouncementDetails();
        setNewReply('');
        
          /*setComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === commentId
                ? {
                    ...comment,
                    replies: [...(comment.replies || []), response.data],
                  }
                : comment
            )
          );
          setNewReply((prev) => ({ ...prev, [commentId]: "" })); */
        } catch (error) {
          console.error("Error adding reply:", error);
        }
      };

      const fetchAnnouncementDetails = async () => {
        try {
          const [announcementResponse, commentsResponse] = await Promise.all([
            axios.get(`${apiUrl}/announcements/${announcementId}/`, {
              headers: {
                'Authorization': `Token ${user.auth_token}`
              },
            }),
            axios.get(`${apiUrl}/announcements/${announcementId}/comments/`, {
              headers: {
                'Authorization': `Token ${user.auth_token}`
              },
            }),
          ]);
          console.log('announcementResponse.data',announcementResponse.data)
          setAnnouncement(announcementResponse.data);
          setComments(commentsResponse.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching announcement details:", error);
          setLoading(false);
        }
      };
    
    
    
    useEffect(() => {
      if(user === null){
          navigate('/login/');
          return;
      };
      if(user.is_company === false || user.is_employee === false){
          navigate('/access-denied/');
          return;
      }
        
        const fetchTeam = async () => {
            try {
              const response = await axios.get(`${apiUrl}/repository/team/${Id}/detail/`);
              //setCourse(response.data);
              console.log('response.data:',response.data);
              //setName(response.data.team_data.name);
              //setOverview(response.data.team_data.overview);
              //setPreviousThumbnail(response.data.team_data.logo);
              
             
              //setLoading(false);
            } catch (error) {
              console.error('Error fetching course details:', error);
              //setLoading(false);
            }
        };


        fetchTeam();
        
        fetchAnnouncementDetails();
        
    }, [Id,announcementId]);
    
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
                           <Link to ={`/team/${Id}/announcement/create/`} className = "create-btn">Post</Link>
            </div>
            <div className='apps-container' id='apps-container-message-list' >
                <div style={styles.container}>
                    <h1 style={styles.heading}>Announcement Details</h1>
                    {announcement && (
                        <div style={styles.announcement}>
                       <div className='annouce-tab'>
                          <span>{announcement.userInitials}</span>
                          <h2 style={styles.title}>{announcement.title}</h2>
                       </div>
                        <p style={styles.date}> {announcement.user} - {announcement.date}</p>
                        <ReactQuill
                            value={announcement.content}
                            readOnly={true}
                            theme={"bubble"}
                        />
                        </div>
                    )}
                    <h3 style={styles.commentsHeading}>Comments</h3>
                    <div>
                        {comments.map((comment) => (
                        <div key={comment.id} style={styles.comment}>
                            <p style={styles.commentText}>{comment.text}</p>
                            <p style={styles.commentDate}>
                            {comment.user} on {new Date(comment.date).toLocaleString()}
                            </p>
                            <button  style={styles.button} onClick={() => toggleReplyTextarea(comment.id)}>Reply</button>
                            <div style={styles.replies}>
                            {comment.replies?.map((reply) => (
                                <div key={reply.id} style={styles.reply}>
                                <p style={styles.replyText}>{reply.text}</p>
                                <p style={styles.replyDate}>
                                    Replied by {reply.user} on {new Date(reply.date).toLocaleString()}
                                </p>
                                </div>
                            ))}
                            {repliesVisible[comment.id] && (
                              <>
                                <textarea
                                  style={styles.textarea}
                                  placeholder="Write a reply..."
                                  value={newReply[comment.id] || ""}
                                  onChange={(e) =>
                                  setNewReply((prev) => ({
                                      ...prev,
                                      [comment.id]: e.target.value,
                                  }))
                                  }
                              ></textarea>
                              <button
                                  style={styles.button}
                                  onClick={() => handleAddReply(comment.id)}
                              >
                                  Reply
                              </button>
                              </>
                            )}
                           
                            </div>
                        </div>
                        ))}
                    </div>
                    <textarea
                        style={styles.textarea}
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button style={styles.button} onClick={handleAddComment}>
                        Add Comment
                    </button>
                </div>
                
            </div>
                
               
            </div>
           
            
        </div>
        
       </div>
    )
};

const styles = {
    container: {
      width: "80%",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif",
    },
    loading: {
      textAlign: "center",
      marginTop: "50px",
      fontSize: "18px",
    },
    heading: {
      fontSize: "28px",
      color: "#333",
      marginBottom: "20px",
    },
    announcement: {
      border: "1px solid #ccc",
      padding: "15px",
      borderRadius: "5px",
      marginBottom: "20px",
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    date: {
      fontSize: "14px",
      color: "#555",
    },
    commentsHeading: {
      fontSize: "24px",
      marginTop: "20px",
      marginBottom: "10px",
    },
    comment: {
      borderBottom: "1px solid #ccc",
      paddingBottom: "10px",
      marginBottom: "10px",
    },
    commentText: {
      fontSize: "16px",
      marginBottom: "5px",
    },
    commentDate: {
      fontSize: "14px",
      color: "#555",
    },
    replies: {
      marginLeft: "20px",
      marginTop: "10px",
    },
    reply: {
      marginBottom: "10px",
    },
    replyText: {
      fontSize: "14px",
      marginBottom: "5px",
    },
    replyDate: {
      fontSize: "12px",
      color: "#777",
    },
    textarea: {
      width: "100%",
      height: "60px",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      marginBottom: "10px",
      fontSize: "14px",
    },
    button: {
      backgroundColor: "#282828",
      color: "#fff",
      padding: "10px 15px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };
export default MessageDetail;