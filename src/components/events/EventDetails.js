import React, { Component } from 'react';
// import './styles.css'
import { Redirect } from "react-router-dom";
import { Button } from "reactstrap";

class EventsDetails extends Component {
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
    const { event } = this.props;
    const { redirect } = this.state;
    if(redirect)
    return <Redirect to={`/dashboard/event/attendance/${event.id}`} />
    
    return (
      <div className="event-details">
        {/* <figure>
            <img src={event.avatar || '/images/defaultAvatar.png'} alt="event avatar" />
          </figure> */}
        <table className="table table-striped">
          <tbody>
            <tr>
              <td> <strong>Event Name</strong></td>
              <td>{event.event_name} </td>
            </tr>
            <tr>
              <td><strong>Start</strong></td>
              <td>{event.start}</td>
            </tr>
            <tr>
              <td><strong> End</strong></td>
              <td>{event.end}</td>
            </tr>
            <tr>
              <td><strong>event ID</strong></td>
              <td>{event.event_id}</td>
            </tr>
           
            <tr>
              <td><strong>Capacity</strong></td>
              <td>{event.capacity}</td>
            </tr>
            {/* <tr>
              <td><strong>Assistant</strong></td>
              <td>{event.assistant}</td>
            </tr> */}
            {/* <tr>
              <td><strong>Notification Option</strong></td>
              <td>{event.notification === 0 ? "Email" : "SMS"}</td>
            </tr> */}
          </tbody>
        </table>
        <br />
          {/* <div style={{ textAlign: 'center' }}>
            <Button color="danger" onClick={this.handleAttendance}>
              View Attendance
            </Button>
          </div> */}
      </div>
    );
  }
}

export default EventsDetails;