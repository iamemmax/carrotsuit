import React, { Component } from 'react';
import './styles.css'

class TenantDetails extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const { staff } = this.props;
    
    return (
      <div className="staff-details">
        <figure>
            <img src={staff.avatar || '/images/defaultAvatar.png'} alt="staff avatar" />
          </figure>
        <table className="table table-striped">
          <tbody>
            <tr>
              <td> <strong>Name</strong></td>
              <td>{staff.first_name} {staff.last_name}</td>
            </tr>
            <tr>
              <td><strong>Email Address</strong></td>
              <td>{staff.email}</td>
            </tr>
            <tr>
              <td><strong>Primary Phone</strong></td>
              <td>{staff.phone_number}</td>
            </tr>
            <tr>
              <td><strong>House number</strong></td>
              <td>{staff.house_block}</td>
            </tr>
            <tr>
              <td><strong>Notification Option</strong></td>
              <td>{staff.notification === 0 ? "Email" : "SMS"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TenantDetails;