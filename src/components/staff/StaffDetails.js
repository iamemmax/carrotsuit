import React, { Component } from 'react';
import './styles.css'
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";

class StaffDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }
  handleAttendance = () =>{
    this.setState({
      redirect: true
    })
  }
  render() {
    const { staff } = this.props;
    const { redirect } = this.state;
    if(redirect)
    return <Redirect to={`/dashboard/staff/attendance/${staff.id}`} />
    
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
              <td><strong>Staff ID</strong></td>
              <td>{staff.staff_ID}</td>
            </tr>
            <tr>
              <td><strong>Primary Phone</strong></td>
              <td>{staff.phone_number}</td>
            </tr>
            <tr>
              <td><strong>Position</strong></td>
              <td>{staff.staff_position}</td>
            </tr>
            <tr>
              <td><strong>Assistant</strong></td>
              <td>{staff.assistant}</td>
            </tr>
            <tr>
              <td><strong>Notification Option</strong></td>
              <td>{staff.notification === 0 ? "Email" : "SMS"}</td>
            </tr>
          </tbody>
        </table>
        <br />
          <div style={{ textAlign: 'center' }}>
            <Button color="danger" onClick={this.handleAttendance}>
              View Attendance
            </Button>
          </div>
      </div>
    );
  }
}

export default StaffDetails;