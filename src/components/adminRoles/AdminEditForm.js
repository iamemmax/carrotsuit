import React, { Component } from 'react';
import { setRole } from '../../actions/staffActions';
import { connect } from 'react-redux';
import { getLocations } from '../../actions/settingsActions';
import './styles/adminForm.css';
import { Button } from 'reactstrap';

class AdminEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      location: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    this.props.getLocations();
  }
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { role, location } = this.state;
    const { staff } = this.props;

    setRole(staff.id, { role, location }).then(data => {
      if (data) {
        this.props.getRoles();
        this.props.closeModal();
      }
    });
  }
  render() {
    const { staff } = this.props;
    const { role, location } = this.state;
    const { locations } = this.props.settings;
    return (
      <div className="admin-form">
        {staff && (
          <div className="selected-staff">
            <div className="staff">
              <img src={staff.avatar || '/images/defaultAvatar.png'} alt="staff avatar" />
              <div className="staff-details">
                <span>
                  {staff.first_name} {staff.last_name}
                </span>
                <small>{staff.role}</small>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">
              Role <span>*</span>
            </label>
            <select className="form-control" name="role" onChange={this.handleChange}>
              <option defaultValue>Select a role</option>
              <option value="FRONT_DESK_ADMIN">Frontdesk admin</option>
              <option value="SECURITY_ADMIN">Security admin</option>
              <option value="DELIVERY_ADMIN">Delivery admin</option>
              <option value="BILLING_ADMIN">Billing admin</option>
              <option value="EMPLOYEE">Employee</option>
              <option value="LOCATION_ADMIN">Location admin</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="location">
              Location <span>*</span>
            </label>
            <select className="form-control" name="location" onChange={this.handleChange}>
              <option defaultValue>Select location</option>
              {locations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.name}{' '}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div style={{ textAlign: 'center' }}>
            <Button color="danger" disabled={!role && !location}>
              Send invite
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  settings: state.settings
});
export default connect(mapStateToProps, {
  getLocations
})(AdminEditForm);
