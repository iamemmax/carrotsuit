import React, { Component } from 'react';
import { connect } from 'react-redux';
import { attendAppointment } from '../../actions/appointmentActions';
import Toaste from '../common/SwalToaste';
import './styles/appointmentForm.css';
import { Button } from 'reactstrap';

class UidForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handeleCheck = this.handeleCheck.bind(this);
  }
  handleChange(e) {
    this.setState({
      uid: e.target.value
    });
  }
  handeleCheck(e) {
    e.preventDefault();
    if (!this.state.uid) {
      Toaste.fire({
        icon: 'info',
        title: 'Enter an invitation id'
      });
      return;
    }
    this.props.attendAppointment(this.state.uid).then(data => {
      if (data) {
        Toaste.fire({
          icon: 'success',
          title: 'Appointment verified'
        });
        this.props.closeModal();
      }
    });
  }

  render() {
    const style = { border: 'none', borderBottom: '1px solid #ccc' };

    return (
      <form onSubmit={this.handeleCheck} className="uid-form">
        <input
          className="form-control"
          placeholder="Enter invite code"
          name="uid"
          onChange={this.handleChange}
          value={this.state.uid}
          style={style}
        />
        <br />
        <div style={{ textAlign: 'center' }}>
          <Button color="danger">Verify</Button>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  {
    attendAppointment
  }
)(UidForm);
