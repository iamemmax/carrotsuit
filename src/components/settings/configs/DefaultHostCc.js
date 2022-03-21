import React, { Component } from 'react';
import './styles/defaultHost.css';
import { searchStaff2 } from '../../../actions/staffActions';
import {
  saveDefaultHostCc,
  getDefaultHostCc,
  removeDefaultHostCc
} from '../../../actions/settingsActions';
import { connect } from 'react-redux';
class DefaultHostCc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staff: [],
      selectedStaff: null
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.removeStaff = this.removeStaff.bind(this);
  }
  componentDidMount() {
    getDefaultHostCc().then(data => {
      if (data) {
        this.setState({
          selectedStaff: {
            name: data.staff_name,
            email: data.email,
            id: data.staff_id,
            avatar: data.avatar
          }
        });
      }
    });
  }
  
  handleSelect(staff) {
    this.setState({
      selectedStaff: staff
    });
    saveDefaultHostCc(staff)
  }
  handleSearch(e) {
    let search = e.target.value || '';
    this.props.searchStaff2(search).then(data => {
      if (data) {
        this.setState({
          staff: data.rows
        });
      }
    });
  }
  removeStaff() {
    removeDefaultHostCc(this.state.selectedStaff.id);
    this.setState({
      selectedStaff: null
    });
  }
 
  render() {
    const { staff, selectedStaff } = this.state;
    return (
      <div className="host-wrapper">
          {selectedStaff && (
          <div className="selected-staff">
            <div className="staff">
              <img src={selectedStaff.avatar || '/images/defaultAvatar.png'} alt="staff avatar" />
              <div className="staff-details">
                <span>{selectedStaff.first_name} {selectedStaff.last_name} </span>
                <span>{selectedStaff.email}</span>
              </div>
            </div>
            <span className="remove-staff" onClick={this.removeStaff}>
              x
            </span>
          </div>
        )}
        <form>
          {!selectedStaff && (
            <div>
            <div className="form-group">
              <label>
                Select host <span>*</span>
              </label>
              <input
                placeholder="Search"
                className="form-control"
                onChange={this.handleSearch}
              />
              </div>
              <ul className="staff">
                {staff.map(staf => (
                  <li key={staf.id} onClick={() => this.handleSelect(staf)}>
                    <span>{staf.first_name} {staff.last_name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  {
    searchStaff2,
    saveDefaultHostCc,
    getDefaultHostCc,
    removeDefaultHostCc
  }
)(DefaultHostCc);
