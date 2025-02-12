import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import 'swiper/swiper-bundle.css';
import '../styles/checkout.css';




const PaymentSuccess = ()=>{
    const user = useSelector((state) => state.user.user);

    const fetchPaymentStatus = async () => {
        try {
            

          const response = await axios.get(`http://localhost:8000/api/payment/${user?.stripeId}/success/`,{
                headers: {
                    Authorization: `Token ${user?.auth_token}`,
                },
            });
           
          
         
          console.log('cart..:',response.data);
        } catch (error) {
          console.error('Error fetching cart courses:', error);
        }
    };
    useEffect(() => {

        fetchPaymentStatus();
    }, []);
    return(
        <div className ='page-wrapper'>
            <div className='wrapper'>
                <h2>Payment success</h2>
            </div>
        </div>
    );
};

export default PaymentSuccess;