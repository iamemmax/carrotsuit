import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './styles/success.css'

const SubscriptionSuccess = () => {
  return (
    <div
      className="success-payment"
    >
      <div>
          <h3>PAYMENT SUCCESSFUL</h3>
        <div className="check" >
          <FaCheckCircle color="green" size={150} />
        </div>
        <div className='success-text'>
          <h4>Your Payment Was Successfull</h4>
          <p>Thank you for your payment, reciept of your payment has been sent to your mail. </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
