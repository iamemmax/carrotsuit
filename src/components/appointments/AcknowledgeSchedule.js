import React, { Component } from 'react';
import queryString from 'query-string';
import { Table, Button } from 'reactstrap';
import Navbar from '../layout/Navbar';
import {
  getClientSchedule,
  acceptClientSchedule,
  declineClientSchedule
} from '../../actions/appointmentActions';
import './styles/acknowledgeSchedule.css';

class AcknowledgeSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: null
    };
  }
  async componentDidMount() {
    const id = this.getId();
    const schedule = await getClientSchedule(id);
    if (schedule) {
      this.setState({
        schedule
      });
    }
  }

  getId() {
    const query = queryString.parse(this.props.location.search);
    return query.id;
  }
  render() {
    const { schedule } = this.state;
    let data = '';
    if (schedule) {
      data = JSON.parse(schedule.body);
    }

    return (
      <div className="acknowledge-schedule">
        <Navbar />
        {schedule ? (
          <div className="schedule-info">
            <h4>Visit schedule</h4>
            <p>A new visit has been scheduled with you</p>
            <Table size="sm">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{data.name} </td>
                </tr>
                <tr>
                  <td>Phone number</td>
                  <td>{data.phone_number} </td>
                </tr>
              </tbody>
              <tr>
                <td>Purpose</td>
                <td>{data.purpose} </td>
              </tr>
              <tr>
                <td>Date</td>
                <td>
                  {new Date(schedule.day_of_appoint).getDate()} /{' '}
                  {new Date(schedule.day_of_appoint).getMonth()} /{' '}
                  {new Date(schedule.day_of_appoint).getFullYear()}
                </td>
              </tr>
              <tr>
                <td>Time</td>
                <td>{schedule.time_of_appoint}hrs </td>
              </tr>
              <tr />
            </Table>
            <br />
            <Button color="danger" onClick={() => acceptClientSchedule(schedule.id)}>
              Accept
            </Button>{' '}
            <Button color="danger" outline onClick={() => declineClientSchedule(schedule.id)}>
              Decline
            </Button>
          </div>
        ) : (
          <div> no record</div>
        )}
      </div>
    );
  }
}
export default AcknowledgeSchedule;
