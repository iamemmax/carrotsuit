import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaUserCheck, FaFileImport, FaFileExport, FaPrint } from 'react-icons/fa';
import { IoIosBarcode } from 'react-icons/io';
import { Nav, Button, NavItem, Navbar } from 'reactstrap';
import VisitorsList from './VisitorsList';
import { getVisitPurposesFetch, getDefaultVisitPurposesFetch } from '../../actions/settingsActions';
import './styles.css';
import { getVisitor, getVisitorsByLocation } from '../../actions/visitorActions';
import {
  searchVisitor,
  getStaffVisitors,
  getWeekAgoVisitors,
  getDateRangeVisitors,
  getSignedInVisitors,
  getVisitors,
  getVisitorByHost,
  getVisitorByPurpose,
  getPurposeField,
  exportVisitors
} from '../../actions/visitorActions';
import { getDefaultVisitPurposes, getVisitPurposes } from '../../actions/settingsActions';

import { getAllLocations, getStaff } from '../../actions/staffActions';
import { withRouter } from 'react-router-dom';
import Modal from '../common/modal/Modal';
import VisitorFormWrapper from './VisitorFormWrapper';
import UidForm from '../appointments/UidForm';
import Can from '../common/Can';
import Pagination from '../common/pagination/Pagination';
import SearchInput from '../includes/SearchInput';
import bn from '../../utils/bemnames';
import VisitorImport from './VisitorImport';

const bem = bn.create('header');

var data ;

class VisitorsBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPhoneModal: false,
      showAppointmentModal: false,
      dateFrom: '',
      dateTo: '',
      showCustomDateSelect: false,
      currentCase: 'signed_in',
      showCsvModal: false,
      // purposes: [{id: 1, option_name: 'Visit'}, {id: 2, option_name: 'Visit'}],
      purposes: [],
      host: null,
      purpose: null,
      company_locations: ''
    };
    this.closePhoneModal = this.closePhoneModal.bind(this);
    this.openPhoneModal = this.openPhoneModal.bind(this);
    this.closeAppointmentModal = this.closeAppointmentModal.bind(this);
    this.openAppointmentModal = this.openAppointmentModal.bind(this);
    this.handleVisitorSearch = this.handleVisitorSearch.bind(this);
    this.toggleCustomDateSelect = this.toggleCustomDateSelect.bind(this);
    this.handleVisitorFilter = this.handleVisitorFilter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCustomVisitors = this.getCustomVisitors.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getPurposes = this.getPurposes.bind(this);
    this.handleFilterByLocations = this.handleFilterByLocations.bind(this);

    
  }
  async componentDidMount() {
    const date = new Date();
    let dateFrom = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    let dateTo = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;


   
    this.setState({
      dateFrom,
      dateTo
    });

    this.getPurposes()
  

    this.props.getVisitPurposes()
    this.props.getDefaultVisitPurposes()



    await getAllLocations().then(data=>{
      console.log(data, 'issiddddd')
      if(data){
          this.setState({
            company_locations: data
          })

      }
    })


   
       


    this.props.getStaff(1, 800);
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

    this.props.getVisitorsByLocation(value);
    // getVisitorsByLocation


  }


  componentWillMount(){
    this.props.getVisitPurposes()
    this.props.getDefaultVisitPurposes()
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   this.props.getVisitPurposes()
  //   this.props.getDefaultVisitPurposes()

  //   return (nextProps.settings !== this.props.settings ||
  //           nextState.purpose !== this.state.purpose
  //           );
  //  }
  

  //  componentWillReceiveProps(prevProps) {
  //   this.props.getVisitPurposes()
  //   this.props.getDefaultVisitPurposes()

  //   if (prevProps.settings !== this.props.settings) {

  //    console.log('meeeeeeeeeeeeeeeeeeeeeeeeeee')
  //     this.setState({
  //       purposes: this.props.settings.defaultVisitPurposes
  //     });
  //   }else{

  //     console.log(this.state.settings, 'kiiiiiiiiiii')
  //   }
  //   console.log(this.state.purposes, 'poppppppppppppeeeeeeurrrrrrrrrrrr')
  // }


//   componentWillReceiveProps(prevProps){
//     console.log('kkkkkkiiiiiiiiiiiiiiiiiiiippppppp')
//     // won't work
//     if (this.props.settings !== prevProps.settings  ) {
//          console.log('meeeeeeeeeeeeeeeeeeeeeeeeeee')
//       this.setState({
//         purposes: this.props.settings.defaultVisitPurposes
//       });
// }

// }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   if(nextProps.settings!==prevState.someValue){
  //     return { someState: nextProps.someValue};
  //   }
  //   else return null;
  // }

  // componentWillReceiveProps(nextProps) {

  //   if((this.props.settings.defaultVisitPurposes != nextProps.settings.defaultVisitPurposes)){
  //     this.setState({
  //       purposes: this.props.settings.defaultVisitPurposes
      
  //     });
  //   }
  //   }



  exportVisitors = () => {
    const {user} = this.props.auth;
    const {currentCase} = this.state
    exportVisitors(user.id, currentCase)
  }
  closePhoneModal() {
    this.setState({
      showPhoneModal: false
    });
  }
  async openPhoneModal() {
    await this.setState({
      showPhoneModal: true
    });
  }
  showCsvModal = () => {
    this.setState({
      showCsvModal: true
    });
  };
  closeCsvModal = () => {
    this.setState({
      showCsvModal: false
    });
  };
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  closeAppointmentModal() {
    this.setState({
      showAppointmentModal: false
    });
  }
  handlePrint = () => {
    window.print()
  }
  openAppointmentModal() {
    this.setState({
      showAppointmentModal: true
    });
  }
  handleVisitorSearch(search) {
    this.props.searchVisitor(search);
  }
  toggleCustomDateSelect() {
    this.setState({
      showCustomDateSelect: !this.state.showCustomDateSelect
    });
  }
  handleVisitorFilter(e) {
    const { value } = e.target;
    const {purpose, host} = this.state;
    this.setState({ currentCase: value });

    switch (value) {
      case 'signed_in':
        this.props.getSignedInVisitors(1);
        break;
      case 'all':
        this.props.getVisitors(1);
        break;
      case 'my':
        this.props.getStaffVisitors(1);
        break;
      case 'one_week_ago':
        this.props.getWeekAgoVisitors(1);
        break;
      case 'custom':
        this.toggleCustomDateSelect();
        break;
        case 'host':
        this.props.getVisitorByHost(host);
        break;
      case 'purpose':
        this.props.getVisitorByPurpose(purpose);
        break;
      default:
        this.props.getSignedInVisitors(1);
    }
  }
  getCustomVisitors(e) {
    e.preventDefault();
    const { dateFrom, dateTo } = this.state;
    this.props.getDateRangeVisitors(dateFrom, dateTo, 1, 10);
  }
  filterByHost = e => {
    const { value } = e.target;
    this.setState({
      currentCase: 'host'
    });
    this.props.getVisitorByHost(value);
  };
  filterByPurpose = e => {
    const { value } = e.target;
    this.setState({
      currentCase: 'purpose'
    });
    this.props.getVisitorByPurpose(value);
  };
  handlePageChange(page) {
    const { currentCase } = this.state;
    switch (currentCase) {
      case 'signed_in':
        this.props.getSignedInVisitors(page);
        break;
      case 'all':
        this.props.getVisitors(page);
        break;
      case 'my':
        this.props.getStaffVisitors(page);
        break;
      case 'one_week_ago':
        this.props.getWeekAgoVisitors(page);
        break;
      case 'custom':
        const { dateFrom, dateTo } = this.state;
        this.props.getDateRangeVisitors(dateFrom, dateTo, page, 10);
        break;
      default:
        this.props.getSignedInVisitors(page);
    }
  }
  renderVisitorFilter() {
    const { defaultVisitPurposes, getVisitPurposes } = this.props.visitor;

    


    return (
      <div>
        <h5>Filter Visitors</h5>
        <div className="visitor-filter">
          <select
            style={{ border: 'none', borderBottom: '1px solid #ccc' }}
            onChange={this.handleVisitorFilter}
            name="date"
            className="form-control date-select"
          >
            <option value="signed_in">Signed in visitors</option>
            <option value="all">All visitors</option>
            <option value="my">My visitors</option>
            <option value="one_week_ago">Last 7 days</option>
            <option value="custom">Custom date</option>
          </select>
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
          </select>
          <select
            style={{ border: 'none', borderBottom: '1px solid #ccc' }}
            onChange={this.filterByHost}
            name="host"
            className="form-control date-select"
          >
            <option defaultValue>Host</option>
            {this.props.staff.staffs.map(host => (
              <option key={host.id} value={host.id}>
                {host.first_name} {host.last_name}
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
        </div>
        <br />
        {this.state.showCustomDateSelect && this.renderCustomDateSelect()}
      </div>
    );
  }
  renderCustomDateSelect() {
    const { dateFrom, dateTo } = this.state;
    return (
      <form onSubmit={this.getCustomVisitors}>
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
    const { count } = this.props.visitor;
    const limit = 10;
    const pages = Math.ceil(count / limit);
    const { user } = this.props.auth;
    return (
      <div>
        <div>
          <div className="mb-3">
            <div className="nav-wrapper">
              {this.renderVisitorFilter()}
              <Navbar light expand className={bem.b('bg-white')}>
                <Nav navbar className="mr-2">
                  <SearchInput onSearch={this.handleVisitorSearch} />
                </Nav>
                <Nav navbar className={bem.e('nav-right')}>
                  <NavItem>
                    <Can
                      role={this.props.auth.user.role}
                      perform="visitors:create"
                      yes={() => (
                        <Button color="danger" size="sm" onClick={this.openPhoneModal}>
                          <FaUserCheck size={13} color="#ffffff" /> Register
                        </Button>
                      )}
                    />{' '}
                    <Can
                      role={this.props.auth.user.role}
                      perform="visitors:create"
                      yes={() => (
                        <Button color="danger" size="sm" onClick={this.openAppointmentModal}>
                          <IoIosBarcode size={13} color="#ffffff" /> Invite Code
                        </Button>
                      )}
                    />{' '}
                    {''}
                    <Can
                      role={this.props.auth.user.role}
                      perform="visitors:create"
                      yes={() => {
                        return user.option === 'estate' ? null : (
                          <Button color="danger" size="sm" onClick={this.showCsvModal}>
                            <FaFileImport size={13} color="#ffffff" /> Import
                          </Button>
                        );
                      }}
                    />{" "}
                    <Can
                      role={this.props.auth.user.role}
                      perform="visitors:create"
                      yes={() => {
                        return user.option === 'estate' ? null : (
                          <Button color="danger" size="sm" onClick={this.exportVisitors}>
                            <FaFileExport size={13} color="#ffffff" /> Export
                          </Button>
                        );
                      }}
                    />
                    {" "}
                    <Can
                      role={this.props.auth.user.role}
                      perform="visitors:create"
                      yes={() => {
                        return user.option === 'estate' ? null : (
                          <Button color="danger" size="sm" onClick={this.handlePrint}>
                            <FaPrint size={13} color="#ffffff" /> Print
                          </Button>
                        );
                      }}
                    />
                  </NavItem>
                </Nav>
              </Navbar>
            </div>
          </div>
          <div>
            <VisitorsList />
          </div>
        </div>
        <Pagination pages={pages} changePage={this.handlePageChange} />

        <Modal
          header="Invite verification"
          show={this.state.showAppointmentModal}
          close={this.closeAppointmentModal}
        >
          <UidForm closeModal={this.closeAppointmentModal} />
        </Modal>

        <Modal
          header="Visitor Registration"
          show={this.state.showPhoneModal}
          close={this.closePhoneModal}
        >
          <VisitorFormWrapper closeModal={this.closePhoneModal} />
        </Modal>
        
        <Modal
          header="Import Visitors"
          className="modal"
          show={this.state.showCsvModal}
          close={this.closeCsvModal}
        >
          <VisitorImport closeModal={this.closeCsvModal} />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  visitor: state.visitor,
  staff: state.staff
});
export default withRouter(
  connect(
    mapStateToProps,
    {
      searchVisitor,
      getStaffVisitors,
      getWeekAgoVisitors,
      getDateRangeVisitors,
      getSignedInVisitors,
      getVisitors,
      getStaff,
      getVisitorByPurpose,
      getVisitorByHost,
      getDefaultVisitPurposes,
      getVisitPurposes,
      getVisitor,
      getVisitorsByLocation
      // getDefaultVisitPurposesFetch
    }
  )(VisitorsBoard)
);
