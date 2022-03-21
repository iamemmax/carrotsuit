import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchStaff2, sendAdminInvite } from '../../actions/staffActions';
import { getLocations } from '../../actions/settingsActions';
import './styles/adminForm.css';
import { Button } from 'reactstrap';

class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staff: [],
      selectedStaff: null,
      role: '',
      location: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeStaff = this.removeStaff.bind(this);
    this.sendInvite = this.sendInvite.bind(this);
  }
  componentDidMount(){
    this.props.getLocations();
  }
  handleSearch(e) {
    let search = e.target.value || '';
    this.props.searchStaff2(search).then(data => {

      if (data) {
        this.setState({
          staff: data.rows
        });
      }else{
        this.setState({
          staff: {id: 1}
        });

      }
    });
  }
  handleSelect(staff) {
    this.setState({
      selectedStaff: staff
    });
  }
  handleChange(e) {
    const {name, value} = e.target;

    this.setState({
      [name]: value
    });
  }
  removeStaff() {
    this.setState({
      selectedStaff: null
    });
  }
  sendInvite(e) {
    e.preventDefault();
    const { selectedStaff, role, location } = this.state;
    console.log(selectedStaff)
    sendAdminInvite(selectedStaff.id, { role, location }).then(data => {
      if (data) {
        this.props.closeModal();
      }
    });
  }
  render() {
    const { staff, selectedStaff, role, location } = this.state;
    const { locations } = this.props.settings;
    return (
      <div className="admin-form">
        {selectedStaff && (
          <div className="selected-staff">
            <div className="staff">
              <img src={selectedStaff.avatar || '/images/defaultAvatar.png'} alt="staff avatar" />
              <div className="staff-details">
                <span>
                  {selectedStaff.first_name} {selectedStaff.last_name}
                </span>
                <span>{selectedStaff.email}</span>
              </div>
            </div>
            <span className="remove-staff" onClick={this.removeStaff}>
              x
            </span>
          </div>
        )}
        <form onSubmit={this.sendInvite}>
          {!selectedStaff && (
            <div className="form-group">
              <label>
                Select <span>*</span>
              </label>
              <input placeholder="Search" className="form-control" onChange={this.handleSearch} />
              <ul className="staff">
                {staff.map(staf => (
                  <li key={staf.id} onClick={() => this.handleSelect(staf)}>
                    <span>
                      {staf.first_name} {staf.last_name}{' '}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="role">
              Role <span>*</span>
            </label>
            <select className="form-control" name="role" onChange={this.handleChange}>
              <option defaultValue>Select role</option>
              <option value="FRONT_DESK_ADMIN">Frontdesk admin</option>
              <option value="SECURITY_ADMIN">Security admin</option>
              <option value="DELIVERY_ADMIN">Delivery admin</option>
              <option value="BILLING_ADMIN">Billing admin</option>
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
            <Button color="danger" disabled={!role && !location && !selectedStaff}>
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
export default connect(
  mapStateToProps,
  {
    searchStaff2,
    getLocations
  }
)(AdminForm);
