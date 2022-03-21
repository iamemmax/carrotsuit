import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getWeekAgoAppointment } from '../../actions/appointmentActions';
import { Table } from 'reactstrap';

class AppointmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisitorModal: false
    };
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  componentDidMount() {
    this.props.getWeekAgoAppointment();
  }
  openModal() {
    this.setState({
      showVisitorModal: true
    });
  }
  closeModal() {
    this.setState({
      showVisitorModal: false
    });
  }
  render() {
    const { appointments } = this.props.appointment;

    if (!appointments)
      return (
        <div style={{ textAlign: 'center' }}>
          <div className="spinner-border text-primary " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    if (!appointments.length)
      return (
        <div style={{ textAlign: 'center', background: '#ffffff' }} className="jumbotron">
          No invites for this date
        </div>
      );

    return (
      <div style={{background: '#FDFEFE', padding: '2%'}}>
        <div>
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>purpose</th>
                <th>Host</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Sent at</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.apointee_name}</td>
                  <td>{appointment.phone_number}</td>
                  <td>{appointment.purpose || ''}</td>
                  <td>
                    {appointment.hostInfo && appointment.hostInfo.first_name}{' '}
                    {appointment.hostInfo && appointment.hostInfo.last_name}
                  </td>
                  <td>{new Date(appointment.day_of_appoint).toLocaleDateString()}</td>
                  <td>{appointment.time_of_appoint}</td>
                  <td>{appointment.attended ? 'Attended' : 'Pending'}</td>
                  <td>{new Date(appointment.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  appointment: state.appointment
});
export default connect(
  mapStateToProps,
  {
    getWeekAgoAppointment
  }
)(AppointmentList);
