import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/appointmentForm.css';
import { setAppointment } from '../../actions/appointmentActions';
import { searchStaff2, getWorkspaceCompanies, getEstateHouses } from '../../actions/staffActions';
import { getVisitPurposesFetch, getDefaultVisitPurposesFetch } from '../../actions/settingsActions';


import { getPurposeField } from '../../actions/visitorActions';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button } from 'reactstrap';

class AppointmentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: '',
      time: '',
      email: '',
      name: '',
      purpose: '',
      phone_number: '',
      workspace_company: '',
      estate_house: '',
      companies: [],
      staff: [],
      purposeField: [],
      selectedStaff: '',
      query: '',
      showCompanyList: false,
      selectedCompany: { name: '' },
      house_query: '',
      staffQuery: '',
      showStaffList: false,
      showHouseList: false,
      selectedHouse: { block_no: '' }
    };
    this.hanldeChange = this.hanldeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCompanySelect = this.handleCompanySelect.bind(this);
  }
  async componentDidMount() {

  //   await this.props.getVisitPurposes();
  //   await this.props.getDefaultVisitPurposes();


   
  //   if(visitPurposes && defaultVisitPurposes){
       
  //     this.setState({
  //      purposeField: [...visitPurposes, ...defaultVisitPurposes]
  //    });
  //  }


    
 
    await this.props.getWorkspaceCompanies(1, 300);
    await this.props.getEstateHouses(1, 500);

    this.setState({
      purposeField: [...this.props.settings.defaultVisitPurposes,]
    })
  }

  async componentWillReceiveProps (){



    // await getDefaultVisitPurposesFetch().then(data => {
    //   console.log(data, 'jjjjjjjjjjjjudatattat')
    //   if(data){

    //     console.log(data, 'jjjjjjjjjjjjudatattat')
       
    //      this.setState({
    //       purposeField: [data.purpose]
    //     });
    //   }else{
    //     this.setState({
    //       purposeField: this.state.purposeField
    //     });

    //   }
     
    // });

   


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
  renderCompanySelect() {
    const { companies } = this.props.workspace;
    const { query, showCompanyList } = this.state;
    const { user } = this.props.auth;
    if (user.option === 'workspace' && !user.workspace_company)
      return (
        <div className="col">
          <div className="form-group">
            <label htmlFor="satff">
              {' '}
              company <span>*</span>{' '}
            </label>
            <input
              type="search"
              name="query"
              value={query}
              required
              autoComplete="off"
              onChange={e => this.setState({ query: e.target.value })}
              placeholder="search"
              className="form-control"
              onFocus={e => this.setState({ showCompanyList: true })}
            />
            {showCompanyList && (
              <ul className="company-list">
                {companies
                  .filter(company => company.name.toLowerCase().includes(query.toLowerCase()))
                  .map(company => (
                    <li key={company.id} onClick={() => this.handleCompanySelect(company)}>
                      {company.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      );
    return null;
  }
  renderHouseSelect = () => {
    const { houses } = this.props.estate;
    const { house_query, showHouseList } = this.state;
    const { user } = this.props.auth;
    if (user.option === 'estate' && user.role === 'GLOBAL_ADMIN')
      return (
        <div className="col">
          <div className="form-group">
            <label htmlFor="satff">
              {' '}
              house number <span>*</span>{' '}
            </label>
            <input
              type="search"
              name="house_query"
              value={house_query}
              required
              autoComplete="off"
              onChange={e => this.setState({ house_query: e.target.value })}
              placeholder="search"
              className="form-control"
              onFocus={e => this.setState({ showHouseList: true })}
            />
            {showHouseList && (
              <ul className="company-list">
                {houses
                  .filter(house => house.block_no.toLowerCase().includes(house_query.toLowerCase()))
                  .map(house => (
                    <li key={house.id} onClick={() => this.handleHouseSelect(house)}>
                      {house.block_no}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      );
    return null;
  };
  handleSelect(staff) {
    this.setState({
      selectedStaff: staff.id,
      staffQuery: `${staff.first_name} ${staff.last_name}`,
      showStaffList: false
    });
  }
  handleCompanySelect(company) {
    this.setState({
      workspace_company: company.id,
      query: company.name,
      showCompanyList: false
    });
  }
  handleHouseSelect = house => {
    this.setState({
      estate_house: house.id,
      house_query: house.block_no,
      showHouseList: false
    });
  };
  hanldeChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const {
      day,
      time,
      email,
      phone_number,
      name,
      selectedStaff,
      purpose,
      workspace_company,
      estate_house
    } = this.state;
    const data = { day, time, email, phone_number, name, purpose, workspace_company, estate_house };
    data.staff = selectedStaff;

    this.props.setAppointment(data).then(res => {
      if (res) this.props.closeModal();
    });
  }
  renderSpinner = () => {
    return (
      <div className="spinner-border text-light spinner-border-sm" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  render() {
    const { company, visitPurposes, defaultVisitPurposes } = this.props.settings;
    const { isLoading, user } = this.props.auth;
    const { staff, selectedStaff, staffQuery, showStaffList, day, time } = this.state;

    // const { company, visitPurposes, defaultVisitPurposes } = this.props.settings;

    // console.log(visitPurposes, defaultVisitPurposes, 'rrrrrrrrooooooooooooosssssssstte')

    
     
 

    return (
      <div className="appointment-form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              Name <span>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.hanldeChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">
              Phone number <span>*</span>
            </label>
            <br />
            <PhoneInput
              country={company.country.toLowerCase()}
              value={this.state.phone_number}
              onChange={phone_number => this.setState({ phone_number })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.hanldeChange}
              className="form-control"
              required
            />
            <div className="form-group">
              <label htmlFor="purpose">Purpose <span>*</span> </label>
              {console.log(this.state.purposeField)}
              <select name="purpose" onChange={this.hanldeChange} className="form-control" required >
                <option defaultValue>Select</option>
                
                {this.state.purposeField &&
                  this.state.purposeField.map(option => (
                    <option key={option.purpose} value={option.purpose}>
                      {option.purpose}
                    </option>
                  ))}
              </select>
            </div>
            <div className="row">
              {user.option === 'estate' && this.renderHouseSelect()}
              {user.option === 'workspace' && this.renderCompanySelect()}
              <div className="col">
                <div className="form-group">
                  <label>Select host</label>
                  <input
                    placeholder="Search"
                    type="search"
                    value={staffQuery}
                    className="form-control"
                    onChange={this.handleSearch}
                    onFocus={e => this.setState({ showStaffList: true })}
                  />
                  {showStaffList && (
                    <ul className="staff">
                      {staff.map(staf => (
                        <li key={staf.id} onClick={() => this.handleSelect(staf)}>
                          <span>
                            {staf.first_name} {staf.last_name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="day">
                  Invite date <span>*</span>
                </label>
                <input
                  type="date"
                  name="day"
                  value={day}
                  onChange={this.hanldeChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="day">
                  Invite time <span>*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={time}
                  onChange={this.hanldeChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button color="danger" disabled={isLoading}>
              {isLoading ? this.renderSpinner() : 'Send'}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  settings: state.settings,
  workspace: state.workspace,
  estate: state.estate
});
export default connect(
  mapStateToProps,
  {
    setAppointment,
    searchStaff2,
    getWorkspaceCompanies,
    getEstateHouses,
    getVisitPurposesFetch,
    // getDefaultVisitPurposesFetch
  }
)(AppointmentForm);
