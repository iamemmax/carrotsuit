import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaFileImport, FaFileExport } from 'react-icons/fa';
import { IoIosBarcode } from 'react-icons/io';
import { Nav, Button, NavItem, Navbar } from 'reactstrap';
import './styles/appointmentBoard.css';
import Modal from '../common/modal/Modal';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import {
  searchAppointments,
  getWeekAgoAppointment,
  getTodayAppointment,
  getCustomAppointment,
  exportTodayInvites,
  getAllInvites,
  getInviteesByLocation,
  getAppointmentByPurpose
} from '../../actions/appointmentActions';
// import { getVisitPurposesFetch, getDefaultVisitPurposesFetch, getVisitPurposes } from '../../actions/settingsActions';
import ImportInvites from './ImportInvites';
import Pagination from '../common/pagination/Pagination';
import Can from '../common/Can';
import SearchInput from '../includes/SearchInput';
import bn from '../../utils/bemnames';
import HasAccess from '../common/HasAccess';
import { getDefaultVisitPurposes, getDefaultVisitPurposesFetch, getVisitPurposes, getVisitPurposesFetch} from '../../actions/settingsActions';
import { getAllLocations } from '../../actions/staffActions';
import { getVisitorByPurpose } from '../../actions/visitorActions';


const bem = bn.create('header');

class AppointmentBoard extends Component {
  constructor(props) {
    super(props);
    this.calendarToRef = React.createRef();
    this.calendarFromRef = React.createRef();
    this.state = {
      dateFrom: '',
      dateTo: '',
      showCustomDateSelect: false,
      showModal: false,
      showCsvModal: false,
      currentCase: '',
      company_locations: [],
      purposes: []
    };
    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.openModalHandler = this.openModalHandler.bind(this);
    this.handleAppointmentSearch = this.handleAppointmentSearch.bind(this);
    this.openCsvModal = this.openCsvModal.bind(this);
    this.closeCsvModal = this.closeCsvModal.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleCustomDateSelect = this.toggleCustomDateSelect.bind(this);
    this.getCustomAppointment = this.getCustomAppointment.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilterByLocations = this.handleFilterByLocations.bind(this);
    this.handleFilterByPurpose = this.handleFilterByPurpose.bind(this);
    this.getPurposes = this.getPurposes.bind(this);

    
    
  }
  async componentDidMount() {
    const date = new Date();
    let dateFrom = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    let dateTo = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    // this.props.getDefaultVisitPurposes();
    // this.props.getVisitPurposes();

    this.setState({
      dateFrom,
      dateTo
    });

    await getAllLocations().then(data=>{
      console.log(data, 'issiddddd')
      if(data){
          this.setState({
            company_locations: data
          })

      }
    })


    this.props.getVisitPurposes()
    this.props.getDefaultVisitPurposes()

  
    this.getPurposes()
  



       // console.log(getWorkspaceCompanies, 'dataaaaaaaaaaaaa puposes cust')
      //  await getDefaultVisitPurposesFetch().then(data => {
      //   console.log(data, 'jjjjjjlalalalatattat')
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


  async getPurposes (){


    try{

      await getDefaultVisitPurposesFetch().then(data => {
        console.log(data, 'jjjjjjjjjjjjjjjjj')
        if (data) {
         
          this.setState({
            purposes: [...data, ...this.state.purposes]
          
          });
        }
      });


      await getVisitPurposesFetch().then(data => {
        console.log(data, 'jjjjjjjjjjjjjjjjj')
        if (data) {
         
          this.setState({
            purposes: [...data, ...this.state.purposes]
          
          });
        }
      });


    }catch(err){
      console.log(err, 'ttttttttoooooooooooeeeeeee')

    }


  }



  handleFilterByLocations(e){
    const { value } = e.target;


    console.log(value, 'kk')

    this.props.getInviteesByLocation(value);
    
    

  }

  filterByPurpose = e => {
    const { value } = e.target;
    this.setState({
      currentCase: 'purpose'
    });
    this.props.getAppointmentByPurpose(value);
    
  };


  handleFilterByPurpose(e){
    const { value } = e.target;


    console.log(value, 'kk')

    this.props.getInviteesByLocation(value);
    

  }
  closeModalHandler() {
    this.setState({
      showModal: false
    });
  }
  openModalHandler() {
    this.setState({
      showModal: true
    });
  }
  closeCsvModal() {
    this.setState({
      showCsvModal: false
    });
  }
  getCustomAppointment(e) {
    e.preventDefault();
    const { dateFrom, dateTo } = this.state;
    this.props.getCustomAppointment(dateFrom, dateTo, 1, 30);
  }
  openCsvModal() {
    this.setState({
      showCsvModal: true
    });
  }
  // export invites for today
  handleInvitesExport = currentUser => {
    exportTodayInvites(currentUser);
  };
  toggleCustomDateSelect() {
    this.setState({
      showCustomDateSelect: !this.state.showCustomDateSelect
    });
  }
  handleAppointmentSearch(search) {
    this.props.searchAppointments(search);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  handlePageChange(page) {
    const { currentCase } = this.state;
    switch (currentCase) {
      case 'Today':
        this.props.getTodayAppointment(page, 30);
        break;
        case 'All':
          this.props.getAllInvites(1, 30);
          break;
  
      case 'One_week_ago':
        this.props.getWeekAgoAppointment(page, 30);
        break;
      case 'Custom':
        const { dateFrom, dateTo } = this.state;
        this.props.getCustomAppointment(dateFrom, dateTo, page, 30);
        break;
      default:
        this.props.getWeekAgoAppointment(1, 30);
    }
  }
  handleDateSelect(e) {
    const { value } = e.target;
    this.setState({ currentCase: value });

    switch (value) {
      case 'Today':
        this.props.getTodayAppointment(1);
        break;

        case 'All':
        this.props.getAllInvites(1);
        break;

      case 'One_week_ago':
        this.props.getWeekAgoAppointment(1);
        break;
      case 'Custom':
        this.toggleCustomDateSelect();
        break;
      default:
        this.props.getWeekAgoAppointment(1);
    }
  }
  renderDateSelect() {
    return (
    <div>
      <label>Filter Invites</label>
      <div style={{display: 'flex', flexDirection: 'row'}}>
         
        <div >
         
          <select
            style={{ border: 'none', borderBottom: '1px solid #ccc' }}
            onChange={this.handleDateSelect}
            name="date"
            className="form-control date-select"
          >
            <option value="One_week_ago">Last 7 days</option>
            <option value="Today">Today invites</option>
            <option value="All">All invites</option>
            <option value="Custom">Custom</option>
          </select>
          <br />
          {this.state.showCustomDateSelect && this.renderCustomDateSelect()}
        </div>
        <div  style={{  marginLeft: '40px', marginRight: '40px' }}>
          <select
                 
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
          </div>
          <div>
          <select
            style={{ border: 'none', borderBottom: '1px solid #ccc' }}
            onChange={this.filterByPurpose}
            name="purpose"
            className="form-control date-select"
          > 
            <option defaultValue>Purpose</option>
                    {/* {var data = Array.from(this.props.purposes)} */}
                    {/* {console.log(this.props.settings.defaultVisitPurposes, "visillllltorcom")} */}
                    {this.state.purposes && this.state.purposes.map(purpose => (
                    <option key={purpose.id} value={purpose.purpose}>
                      {purpose.purpose}
                    </option>
            ))}
            </select>`
          </div>

      </div>

    </div>
    );
  }
  renderCustomDateSelect() {
    const { dateFrom, dateTo } = this.state;
    return (
      <form onSubmit={this.getCustomAppointment}>
        <div className="custom-date">
          <div className="form-group">
            <label>from</label>
            <input
              type="text"
              name="dateFrom"
              onChange={this.handleChange}
              className="form-control"
              value={dateFrom}
            />
          </div>{' '}
          <div className="form-group">
            <label>to</label>
            <input
              type="text"
              value={dateTo}
              name="dateTo"
              onChange={this.handleChange}
              className="form-control"
            />
          </div>{' '}
          <div className="btn-filter">
            <Button color="danger" size="sm">
              Search
            </Button>
          </div>{' '}
          <span onClick={this.toggleCustomDateSelect}>x</span>
        </div>
      </form>
    );
  }
  render() {
    const limit = 10;
    const { count } = this.props.appointment;
    const pages = Math.ceil(count / limit);
    const { user } = this.props.auth;
    return (
      <div className="appointment-dashboard">
        <div className="mb-3">
          <div className="nav-wrapper">
            {this.renderDateSelect()}
            <Navbar light expand className={bem.b('bg-white')}>
              <Nav navbar className="mr-2">
                <Nav navbar>
                  <SearchInput onSearch={this.handleAppointmentSearch} />
                </Nav>
              </Nav>
              <Nav navbar className={bem.e('nav-right')}>
                <NavItem>
                  <Can
                    role={this.props.auth.user.role}
                    perform="invites:create"
                    yes={() => (
                      <Button size="sm" color="danger" onClick={this.openModalHandler}>
                        <IoIosBarcode color="#ffffff" size={12} /> Send invite
                      </Button>
                    )}
                  />{' '}
                  <Can
                    role={this.props.auth.user.role}
                    perform="bulk-invites:create"
                    yes={() => {
                      return user.option === 'workspace' && !user.workspace_company ? null : (
                        <Button size="sm" color="danger" onClick={this.openCsvModal}>
                          <FaFileImport color="#ffffff" size={12} /> Bulk Import
                        </Button>
                      );
                    }}
                  />{' '}
                  <Can
                    role={this.props.auth.user.role}
                    perform="invites:export"
                    yes={() => (
                      <HasAccess
                        plan={user.plan}
                        perform="invites:export"
                        yes={() => (
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => this.handleInvitesExport(user.id)}
                          >
                            <FaFileExport color="#ffffff" size={12} /> Export today's
                          </Button>
                        )}
                      />
                    )}
                  />{' '}
                </NavItem>
              </Nav>
            </Navbar>
          </div>
          <br />
          <AppointmentList />
        </div>

        <Pagination pages={pages} changePage={this.handlePageChange} />

        <Modal
          header="Set New Appointment"
          className="modal"
          show={this.state.showModal}
          close={this.closeModalHandler}
        >
          <AppointmentForm closeModal={this.closeModalHandler} />
        </Modal>
        <Modal
          header="Import invites"
          className="modal"
          show={this.state.showCsvModal}
          close={this.closeCsvModal}
        >
          <ImportInvites closeModal={this.closeCsvModal} />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  appointment: state.appointment,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {
    searchAppointments,
    getWeekAgoAppointment,
    getTodayAppointment,
    getCustomAppointment,
    getAllInvites,
    getDefaultVisitPurposes, 
    getVisitPurposes,
    getInviteesByLocation,
    getAppointmentByPurpose
    // getDefaultVisitPurposesFetch
  }
)(AppointmentBoard);
