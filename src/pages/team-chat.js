
import React, { useState, useEffect ,useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/organization-dashboard.css';
import '../styles/repository.css';
import '../styles/team-chat.css';
import logo from '../styles/logo.svg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate,useParams } from 'react-router-dom';
import OrganizationHeader from '../components/organization-header';
import OrganizationSidebar from '../components/organization-sidebar';

const TeamChat = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef(null);
  const user = useSelector((state) => state.user.user);
  const { Id } = useParams();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const connectWebSocket = () => {
    const socketUrl = `ws://localhost:8000/ws/teams/${Id}/chat/`;
    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket connected.");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      fetchMessages();
      //setMessages((prevMessages) => [...prevMessages, data]);
    };

    socketRef.current.onclose = (event) => {
      console.log("WebSocket disconnected, attempting to reconnect...");
      setTimeout(connectWebSocket, 3000); // Reconnect after 3 seconds
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      socketRef.current.close();
    };
  };
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/teams/${Id}/chat/messages/`);
      //setCourse(response.data);
      setMessages(response.data);
      
    } catch (error) {
      console.error('Error fetching course details:', error);
      setMessages([]);
      //setLoading(false);
    }
};

  useEffect(() => {
    connectWebSocket();
    fetchMessages();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [Id]);

  const sendMessage = async () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      if (newMessage.trim()) {
        socketRef.current.send(
          JSON.stringify({
            message: newMessage,
            user_id: user.id,
          })
        );
        setNewMessage("");
        await fetchMessages();
      }
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  return (
    <div className="home-wrapper">
      <div className="dashboard-body">
        <div className="sidebar-container-wrapper">
          <OrganizationSidebar
            className={sidebarOpen ? "visible" : ""}
            toggleSidebar={toggleSidebar}
          />
        </div>
        <OrganizationHeader toggleSidebar={toggleSidebar} />
        <div className="job-list-wrapper" id="organization-job-list">
          <div className="repo-form-wrapper">
          <div className="chat-container">
              <div className="chat-header">
                <h2>Team Chat</h2>
              </div>
              <div className="chat-messages">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`chat-bubble ${
                      msg.user.id === user.id ? "sent" : "received"
                    }`}
                  >
                    <span className="chat-timestamp">~{msg.user.username}</span>
                    <p className="chat-message">{msg.message}</p>
                    <span className="chat-timestamp">{msg.timestamp}</span>
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <textarea
                  className="message-input"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="send-button" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamChat;