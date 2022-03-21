import React, { Component } from 'react';
import EventForm from './EventForm'
import Modal from '../common/modal/Modal';
import { Button, Card, Nav, Navbar, NavItem } from 'reactstrap';
import { FaUserPlus } from 'react-icons/fa';
import SearchInput from '../includes/SearchInput';
import Can from '../common/Can';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import bn from '../../utils/bemnames';
import EventsList from './EventsList';
import { getAllAttendees, getEvents } from '../../actions/eventsActions';
import { event } from 'react-ga';
import Attendees from './Attendees';

const bem = bn.create('header');




class AllEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEventFormModal: false,
     
    };

    this.closeCreateEventModal = this.closeCreateEventModal.bind(this);
    this.openEventFormHandler = this.openEventFormHandler.bind(this);


    // this.openModalHandler = this.openModalHandler.bind(this);
    // this.handleStaffSearch = this.handleStaffSearch.bind(this);
    // this.openCsvModal = this.openCsvModal.bind(this);
   
    // this.bulkExport = this.bulkExport.bind(this);
    // this.handleFilterByDepartment = this.handleFilterByDepartment.bind(this);
    // this.handleFilterByLocations = this.handleFilterByLocations.bind(this);

    
  }


  componentDidMount() {
    this.props.getAllAttendees(1, 500);
    
    // this.props.getStaff();

    console.log('pppppppppp')
  }



  openEventFormHandler() {
    this.setState({
      showEventFormModal: true
    });
  }

  closeCreateEventModal() {
    this.setState({
      showEventFormModal: false
    });
  }



  

  
  render() {


    const { user } = this.props.auth;
    const { attendees } = this.props.events;

    console.log(attendees, 'kiloooooooooooooo')

    if(attendees){


       return <div>

    <div className="nav-wrapper">
            <Navbar light expand className={bem.b('bg-white')}>
              <Nav navbar className="mr-2">
                <Nav navbar>
                  <SearchInput onSearch={this.handleStaffSearch} />
                </Nav>
                <Nav navbar>

                <select
                  style={{ border: 'none', borderBottom: '1px solid #ccc', marginLeft: '10px' }}
                  onChange={this.handleFilterByDepartment}
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


                <select
                  style={{ border: 'none', borderBottom: '1px solid #ccc', marginLeft: '10px' }}
                  onChange={this.handleFilterByLocations}
                  name="location"
                  className="form-control date-select"
                > 
                  <option defaultValue>Location</option>
                  {/* {var data = Array.from(this.props.purposes)} */}
                  {/* {console.log(this.props.settings.defaultVisitPurposes, "visillllltorcom")} */}
                  {this.state.company_locations && this.state.company_locations.map(location => (
                    <option key={location.id} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </select>


                  {/* <SearchInput placeholder={'filter by deparment'} onSearch={this.handleDepartmentSearch} /> */}
                </Nav>
              </Nav>
              <Nav navbar className={bem.e('nav-right')}>
                <NavItem>
                  <div className="btns">
                    {/* <Can
                      role={user.role}
                      perform="staff-directory:write"
                      yes={() => {
                        return user.option === 'workspace' && !user.workspace_company ? null : (
                          <Button size="sm" color="danger" onClick={this.openCsvModal}>
                            <FaFileImport color="#ffffff" size={12} /> Import
                          </Button>
                        );
                      }}
                    />{' '} */}
                    {/* <Button size="sm" color="danger" onClick={() => this.bulkExport(user.id)}>
                      <FaFileExport color="#ffffff" size={12} /> Export
                    </Button>{' '} */}


                    <Can
                      role={user.role}
                      perform="staff-directory:write"
                      yes={() => {
                        return user.option === 'workspace' && !user.workspace_company ? null : (
                          <Button size="sm" color="danger" onClick={this.openEventFormHandler}>
                            <FaUserPlus color="#ffffff" size={12} /> Add new
                          </Button>
                        );
                      }}
                    />
                  </div>
                </NavItem>
              </Nav>
            </Navbar>
          </div>

          <EventsList history={this.props.history} />

      <Modal
          header="Creat Event"
          className="modal"
          show={this.state.showEventFormModal}
          close={this.closeCreateEventModal}
        >
          <EventForm closeModal={this.closeCreateEventModal} />
        </Modal>


    </div>;



    }else if (!attendees){


      return(
          <Card>
            <div style={{ textAlign: 'center' }}>
              <div >
              <span >No Attendees</span>
              </div>
              </div>
          </Card>
      )
    }else{

      return(

        <div style={{ textAlign: 'center' }}>
         <div className="spinner-border text-primary " role="status">
         <span className="sr-only">Loading...</span>
         </div>
         </div>
   )



    }
   
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  events: state.events
});
export default withRouter(
  connect(
    mapStateToProps,
    {
      getEvents,
      getAllAttendees,
      // getStaffsByDepartment,
      // getAllDepartments,
      // getStaffsByLocation,
      // getStaff
    }
  )(AllEvents)
);
