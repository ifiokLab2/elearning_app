
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/home.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import hero2 from '../styles/hero-2.jpg';
import hero3 from '../styles/hero-3.jpg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';

const Home = ()=>{
    const [courses, setCourses] = useState([]);
    const user = useSelector((state) => state.user.user);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [locationQuery, setLocationQuery] = useState(""); 
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

  
    const handleInputChange = (e) => {
      setSearchQuery(e.target.value);
     
    };
    const handleAddToCart = async (e,courseId) => {
        e.preventDefault();
        console.log('user.auth_token:',user?.auth_token);
        try {
          // Make a POST request to add the course to the cart
          const formData = new FormData();
          const response = await axios.post(`${apiUrl}/add-to-cart/${courseId}/`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${user?.auth_token}`, // Include the user ID in the Authorization header
            },
          });
           if (response.data.success) {
                // Update the list of cart courses
                 fetchCartCourses();
                 console.error('added to cart:',response.data);
            } else {
                console.error('removed from cart:',response.data);
            }
     
        } catch (error) {
            navigate('/login'); 
            console.error('Error adding course to cart:', error);
        }
    };
    const fetchCartCourses = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/shopping-cart/`,{
            headers: {
                Authorization: `Token ${user?.auth_token}`,
            },
          });
           
          
          setCart(response.data.courses);
          console.log('cart:',cart);
        } catch (error) {
          console.error('Error fetching cart courses:', error);
        }
    };
    
      // Function to check if a course is in the cart
    const isInCart = (courseId) => {
        return cart.some((course) => course.id === courseId);
    };
    useEffect(() => {
        const fetchCourses = async () => {
            //console.log('user.auth_token:',user);
            setLoading(true);
          try {
            const response = await axios.get(`${apiUrl}/api/courses/`,{
                headers: {
                    Authorization: `Token ${user?.auth_token}`,
                },
            });
            
            setCourses(response.data.all_courses);
            setLoading(false);
          } catch (error) {
            setLoading(true);
            console.error('Error fetching courses:', error);
          }
        };

      
        fetchCourses();
        fetchCartCourses();
    }, []);
    
    
        // Handle Enter Key Press
    const handleSearch = () => {
        navigate(`/jobs?search=${searchQuery}&location=${locationQuery}`);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform search-related actions here based on the searchQuery state
        
        navigate(`/search?query=${searchQuery}`);
    };
    const slides = [

       hero2,
       hero3,
       
        // Add more image URLs as needed
    ];
    return(
       <>
            <div class = 'home-wrapper'>
        <Header />
        <div className='hero-container'>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2800 }}
                    modules={[Autoplay, Pagination, Navigation]}
                    >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <img src={slide} alt={`Slide ${index + 1}`} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className = 'dream-container'>
                    <div className='wrapper'>
                        <h2>Dream Up</h2>
                        <p>Ambition accepted. Learn the latest skills to reach your professional goals.</p>
                        <form className='search-box' onSubmit={handleSubmit}>
                             
                            <input 
                           
                                placeholder='What do you want to learn?'
                                value={searchQuery}
                                onChange={handleInputChange}
                            />
                            <div className='icon'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='mobile-dream'>
            <div className = 'dream-container'>
                    <div className='wrapper'>
                        <h2>Dream Up</h2>
                        <p>Ambition accepted. Learn the latest skills to reach your professional goals.</p>
                        <form className='search-box' onSubmit={handleSubmit}>
                            <input 
                                placeholder='What do you want to learn?'
                                value={searchQuery}
                                onChange={handleInputChange}
                            />
                            <div className='icon'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='course-wrapper'>
                <div className = 'find-job-wrapper'>
                    <h3>Browse Popular Jobs</h3>
                <div className='job-search-outer'>
                <div className='job-wrapper'>
                    <div className='box-wrapper-a'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        
                        <input
                            placeholder="Job title, Keywords"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <div className='box-wrapper-b'>
                        <i class="fa-solid fa-location-dot"></i>
                        
                        <input
                            placeholder="Country, city, state, or remote"
                            value={locationQuery}
                            onChange={(e) => setLocationQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <div className='box-wrapper-c'>
                        <button className='find-btn' onClick={handleSearch}>
                            <span>Find Jobs</span>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>
            </div>
                </div>
                <div className='popular'>
                    <h2>Popular Courses</h2>
                </div>
               
                    <div className='course-container'>
                        {loading ? (
                            <Skeleton count={5} height={30} style={{ marginBottom: '10px' }} />
                        ):(
                            <>
                                {courses.map((course) => (
                                    <Link key={course.id} to={`/course-detail/${course.id}/${course.title}/`} className='card'>
                                        <img src ={course.thumbnail} alt='' />

                                        {course.is_enrolled ? (
                                            <div className = 'heart-button enrolled'>enrolled</div>
                                            )
                                            :
                                            (
                                                <div className={`heart-button ${isInCart(course.id) ? 'red-heart' : ''}`}> 
                                                    {/* provide DRFview to check if the user is already enrolled in the course*/}
                                                    <i className={`${isInCart(course.id) ? 'fa-solid' : 'fa-regular' } fa-heart` } onClick={(e) => handleAddToCart(e,course.id)}></i>
                                                </div>
                                            )
                                        }
                                        
                                        
                                        <div className='card-details'>
                                            <h2>{course.title}</h2>
                                            <div className='author-name'>{course.instructor}</div>
                                            <div className='ratings-card'>
                                                <span className='num box'>4.5</span>
                                                <span className='stars box'>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star"></i>
                                                    <i class="fa-solid fa-star-half"></i>
                                                </span>
                                                <span className='students box'>
                                                    {/*(218,087) */}
                                                </span>
                                            </div>
                                            <div className='price-card'>
                                            <span className='price'>${course.discountPrice}</span>
                                            <span className='discount'>${course.price}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        )}
                        
                        
                    </div>
                  
            </div>

            <div className = 'category-wrapper'>
                <div className = 'container'>
                    <div className='title'>Top Categories</div>
                    <div className='container-wrapper'>
                        <Link className='card' to='/search?query=Web Development'>
                            <span className='icon'>
                                <i class="fa-solid fa-laptop-code"></i>
                            </span>
                            <span className='text'>Web Development</span>
                        </Link>
                        <Link className='card' to='/search?query=Mobile App Development'>
                            <span className='icon'>
                            <i class="fa-solid fa-mobile"></i>
                            </span>
                            <span className='text'>Mobile App Development</span>
                        </Link>
                        <Link className='card' to='/search?query=Programming Languages'>
                            <span className='icon'>
                                <i class="fa-solid fa-code"></i>
                            </span>
                            <span className='text'>Programming Languages</span>
                        </Link>
                        <Link className='card' to='/search?query=Cyber Security'>
                            <span className='icon'>
                                <i class="fa-solid fa-shield-halved"></i>
                            </span>
                            <span className='text'>Cyber Security</span>
                        </Link>
                        <Link className='card' to='/search?query=Ethical hacking'>
                            <span className='icon'>
                                <i class="fa-solid fa-user-secret"></i>
                            </span>
                            <span className='text'>Ethical hacking</span>
                        </Link>
                        <Link className='card' to='/search?query=Database Management system'>
                            <span className='icon'>
                                 <i class="fa-solid fa-database"></i>
                            </span>
                            <span className='text'>Database Management system</span>
                        </Link>
                        <Link className='card' to='/search?query=Data Science'>
                            <span className='icon'>
                                <i class="fa-solid fa-chart-simple"></i>
                            </span>
                            <span className='text'>Data Science</span>
                        </Link>
                        <Link className='card' to='/search?query=Artificial Intelligence' >
                            <span className='icon'>
                                <i class="fa-brands fa-connectdevelop"></i>
                            </span>
                            <span className='text'>Artificial Intelligence</span>
                        </Link>
                        <Link className='card' to='/search?query=Game Development'>
                            <span className='icon'>
                                <i class="fa-solid fa-gamepad"></i>
                            </span>
                            <span className='text'>Game Development</span>
                        </Link>
                        <Link className='card' to='/search?query=Operating Systems & Servers'> 
                            <span className='icon'>
                                <i class="fa-solid fa-server"></i>
                            </span>
                            <span className='text'>Operating Systems & Servers</span>
                        </Link>
                        <Link className='card' to='/search?query=Graphic Design & illustration'>
                            <span className='icon'>
                                <i class="fa-solid fa-compass-drafting"></i>
                            </span>
                            <span className='text'>Graphic Design & illustration</span>
                        </Link>
                        
                    </div>
                </div>
            </div>
       </div>
       <Footer />
       </>
    )
};

export default Home;