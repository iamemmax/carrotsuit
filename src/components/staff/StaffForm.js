import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerStaff, editStaff, getStaff, getAllDepartments, getAllLocations } from '../../actions/staffActions';
import { getLocations } from '../../actions/settingsActions';
import classnames from 'classnames';
import './styles.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button } from 'reactstrap';
import HasAccess from '../common/HasAccess';
class StaffForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: this.props.first_name || '',
      last_name: this.props.last_name || '',
      name: this.props.name || '',
      email: this.props.email || '',
      phone_number: this.props.phone_number || '',
      appointment_only: this.props.appointment_only || false,
      staff_ID:  this.props.staff_ID || '',
      staff_position: this.props.staff_position || '',
      assistant: this.props.assistant || null,
      errors: {},
      errorMessage: '',
      query: this.props.assistant || '',
      showStaffList: false,
      departments: this.props.departments || '', 
      company_locations:  this.props.company_locations || '',  
      department: this.props.department || '', 
      company_location:  this.props.company_location || '',
      office_location:  this.props.office_location || '', 
      logo: this.props.logo ||  '',
      avatar: [],
    };
    this.hanldeChange = this.hanldeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.renderName = this.renderName.bind(this);
    this.renderStaffSelect = this.renderStaffSelect.bind(this);
    this.handleStaffSelect = this.handleStaffSelect.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    // this.hanldeAvartarChange = this.hanldeAvartarChange.bind(this);


    


    
    
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        errorMessage: nextProps.errors.message
      });
    }
  }
  async componentDidMount() {
    this.props.getStaff();
    this.props.getStaff(1, 500);


    await getAllDepartments().then(data=>{
      console.log(data, 'issiddddd')
      if(data){
          this.setState({
            departments: data
          })

      }
    })



    await getAllLocations().then(data=>{
      console.log(data, 'issiddddd')
      if(data){
          this.setState({
            company_locations: data
          })

      }
    })
  }
  hanldeChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });

    console.log(this.state.name, 'dkdk')
  }

  // hanldeAvartarChange(e){
  //   // const { name, value } = e.target;

  //   console.log(e.target, 'jjksjks')

  //   // this.setState({
  //   //   [name]: value.files[0]
  //   // });

  // }



  handleFileChange(e) {

    console.log(e.target.files[0],'iiiikkkiiiiiiiiiii')
    this.setState({
      logo: e.target.files[0]
    });

    console.log(this.state.logo,'iiiiiiiiiiiiiii')
  }


  handleSubmit(e) {
    e.preventDefault();

    // console.log(this.state.avatar, 'kkkkkiiiiikkkkkkkk')
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      staff_position: this.state.staff_position,
      staff_ID: this.state.staff_ID,
      phone_number: this.state.phone_number,
      assistant: this.state.assistant,
      appointment_only: this.state.appointment_only,
      department: this.state.department,
      company_location: this.state.company_location,
      office_location: this.state.office_location,
      logo: this.state.logo,
      avatar: this.state.avatar
    };


    if (this.props.id) {
      this.props.editStaff(this.props.id, data).then(data => {
        if (data) {
          this.props.closeModal();
          this.props.getStaff();
          console.log('dododkdkdkeiee')
        }
      });
    } else
      this.props.registerStaff(data).then(data => {
        if (data) {
          this.props.closeAddStaffModal();
          this.props.getStaff();
        }
      });
  }
  handleStaffSelect(staff) {
    this.setState({
      assistant: staff.id,
      query: `${staff.first_name} ${staff.last_name}`,
      showStaffList: false
    });
  }
  renderSpinner = () => {
    return (
      <div className="spinner-border text-light spinner-border-sm" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  renderName() {
    return this.props.id ? 'Save' : 'Add';
  }
  
  renderStaffSelect() {
    const { staffs } = this.props.staff;
    const { query, showStaffList } = this.state;
    const {user} = this.props.auth;
    return (
      <div className="form-group">
        <label htmlFor="satff"> Add Assistant</label> {' '}
        <HasAccess
          plan={user.plan}
          perform="assistant:add"
          yes={() => (
            <div>
              <input
                type="search"
                name="query"
                value={query}
                autoComplete="off"
                onChange={e => this.setState({ query: e.target.value })}
                placeholder="search"
                className="form-control"
                onFocus={e => this.setState({ showStaffList: true })}
              />
              {showStaffList && (
                <ul className="staff-list">
                  {staffs
                    .filter(staff => staff.first_name.toLowerCase().includes(query.toLowerCase()))
                    .map(staff => (
                      <li key={staff.id} onClick={() => this.handleStaffSelect(staff)}>
                        {staff.first_name} {staff.last_name}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          )}
          no={() => (
            <button className="btn btn-link btn-sm text-primary" onClick={this.handleUpgradeClick}>
              Upgrade to Premium
            </button>
          )}
        />
      </div>
    );
  }
  handleUpgradeClick = e => {
    e.preventDefault();
    this.props.history.push('/dashboard/billing/1/plans');
  };

 



  // hanldeAvartarChange(e){
  //   const { name, value } = e.target;

  //   console.log(e.target.files[0], 'jjksjks')

  //   this.setState({
  //     avatar: [JSON.stringify(e.target.files[0])]
  //   });

  //   console.log(this.state.avatar, 'jkeeuirroeww')

  // }

  render() {
    const { errors } = this.state;
    const { isLoading, user } = this.props.auth;
    const { company } = this.props.settings;
    return (
      <div className="staff-form">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          {this.state.errorMessage && (
            <div className="alert alert-danger">{this.state.errorMessage}</div>
          )}
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="first_name">
                  First name <span>*</span>
                </label>
                <span className="text-danger">{errors.first_name || ''}</span>
                <input
                  type="text"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.hanldeChange}
                  className={classnames('form-control', {
                    invalid: errors.first_name
                  })}
                  required
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="last_name">
                  Last name <span>*</span>
                </label>
                <span className="text-danger">{errors.last_name || ''}</span>
                <input
                  type="text"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.hanldeChange}
                  className={classnames('form-control', {
                    invalid: errors.last_name
                  })}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
            <select
                  style={{ border: 'none', borderBottom: '1px solid #ccc', marginLeft: '10px' }}
                  onChange={this.hanldeChange}
                  name="department"
                  className="form-control date-select"
                > 
                  <option defaultValue>Department</option>
                  {/* {var data = Array.from(this.props.purposes)} */}
                  {/* {console.log(this.props.settings.defaultVisitPurposes, "visillllltorcom")} */}
                  {this.state.departments && this.state.departments.map(department => (
                    <option key={department.id} value={department.department}>
                      {department.department}
                    </option>
                  ))}
                </select>
              {/* <div className="form-group">
                <label htmlFor="department">
                  Department <span>*</span>
                </label>
                <span className="text-danger">{errors.department || ''}</span>
                <input
                  type="text"
                  name="department"
                  value={this.state.department}
                  onChange={this.hanldeChange}
                  className={classnames('form-control', {
                    invalid: errors.department
                  })}
                  required
                />
              </div> */}
            </div>
            <div className="col">

            
            
            <select
                  style={{ border: 'none', borderBottom: '1px solid #ccc', marginLeft: '10px' }}
                  onChange={this.hanldeChange}
                  name="company_location"
                  className="form-control date-select"
                >  
                
                  <option defaultValue>Location *</option>
                  {/* {var data = Array.from(this.props.purposes)} */}
                  {/* {console.log(this.props.settings.defaultVisitPurposes, "visillllltorcom")} */}
                  {this.state.company_locations && this.state.company_locations.map(location => (
                    <option key={location.id} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </select>
              {/* <div className="form-group">
                <label htmlFor="location">
                  Location <span>*</span>
                </label>
                <span className="text-danger">{errors.location || ''}</span>
                <input
                  type="text"
                  name="location"
                  value={this.state.location}
                  onChange={this.hanldeChange}
                  className={classnames('form-control', {
                    invalid: errors.location
                  })}
                  required
                />
              </div> */}
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="office_location">
                  Office Location 
                </label>
                <span className="text-danger">{errors.office_location || ''}</span>
                <input
                  type="text"
                  name="office_location"
                  value={this.state.office_location}
                  onChange={this.hanldeChange}
                  className={classnames('form-control', {
                    invalid: errors.office_location
                  })}
                
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="phone_number">
                  Phone number <span>*</span>
                </label>
                <span className="text-danger">{errors.phone_number || ''}</span>
                <br />
                <PhoneInput
                  country={company.country ? company.country.toLowerCase() : 'us'}
                  value={this.state.phone_number}
                  onChange={phone_number => this.setState({ phone_number })}
                />
              </div>
            </div>
            
            <div className="col">
            <div className="form-group">
              <div className="file-select">
              <label htmlFor="logo">
                  Logo <span></span>
                </label>
                <input type="file" name='logo' onChange={(e)=>this.handleFileChange(e)} className="form-control" />
              </div>
              </div>
            </div>

            <div className="col">
              <div className="form-group">
                <label htmlFor="email">
                  Email <span>*</span>
                </label>
                <span className="text-danger">{errors.email || ''}</span>
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.hanldeChange}
                  className={classnames('form-control', {
                    invalid: errors.email
                  })}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="staff_position">
                  Staff position <span>*</span>
                </label>
                <span className="text-danger">{errors.staff_position || ''}</span>
                <input
                  type="text"
                  name="staff_position"
                  value={this.state.staff_position}
                  onChange={this.hanldeChange}
                  className={classnames('form-control', {
                    invalid: errors.staff_position
                  })}
                  required
                />
              </div>
            </div>
            <div className="col">{this.renderStaffSelect()}</div>
          </div>

        <div className="row">
        <div className="col">
          <div className="form-group">
            <label>Appointment only mode</label>
            <HasAccess
              plan={user.plan}
              perform="appointment-only:enable"
              yes={() => (
                <input
                  type="checkbox"
                  name="appointment_only"
                  checked={this.state.appointment_only}
                  onChange={e =>
                    this.setState({
                      appointment_only: e.target.checked
                    })
                  }
                />
              )}
              no={() => (
                <button
                  className="btn btn-link btn-sm text-primary"
                  onClick={this.handleUpgradeClick}
                >
                  Upgrade to Basic
                </button>
              )}
            />
          </div>
          </div>

          <div className="col">
              <div className="form-group">
                <label htmlFor="staff_ID">
                  Staff ID 
                </label>
                <span className="text-danger">{errors.staff_ID || ''}</span>
                <input
                  type="number"
                  name="staff_ID"
                  value={this.state.staff_ID}
                  onChange={this.hanldeChange}
                  className={classnames('form-control', {
                    invalid: errors.staff_ID
                  })}
              
                />
              </div>
            </div>

            {/* <div className="col">
              <div className="form-group">
                <label htmlFor="staff_ID">
                  Staff ID 
                </label>
                <span className="text-danger">{errors.avatar || ''}</span>
                <input
                  type="file"
                  name="avatar"
                  // value={this.state.staff_ID}
                  onChange={this.hanldeAvartarChange}
                  className={classnames('form-control', {
                    invalid: errors.avatar
                  })}
              
                /> */}
                {/* <input type="file" onChange = {this.hanldeAvartarChange}/> */}
              {/* </div>
            </div> */}



          </div>

          

          <div style={{ textAlign: 'center' }}>
            <Button color="danger" disabled={isLoading}>
              {isLoading ? this.renderSpinner() : this.renderName()}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  settings: state.settings,
  staff: state.staff
});
export default connect(
  mapStateToProps,
  {
    registerStaff,
    getLocations,
    editStaff,
    getStaff
  }
)(StaffForm);
