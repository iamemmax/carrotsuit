import React from 'react';
import { MdErrorOutline } from 'react-icons/md';
import './styles/success.css';

const SubscriptionFailed = () => {
  return (
    <div className="success-payment">
      <div>
        <h3>PAYMENT FAILED</h3>
        <div className="check">
          <MdErrorOutline color="red" size={150} />
        </div>
        <div className="success-text">
          <h4>Your Payment Failed</h4>
          <p>Please try again </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionFailed;
