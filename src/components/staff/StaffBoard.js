import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaUserPlus, FaFileImport, FaFileExport } from 'react-icons/fa';
import { Nav, Button, NavItem, Navbar } from 'reactstrap';
import StaffList from './StaffList';
import './styles.css';
import Modal from '../common/modal/Modal';
import StaffForm from './StaffForm';
import { searchStaff, bulkExportStaff, getStaffsByDepartment, getAllDepartments, getAllLocations, getStaffsByLocation , getStaff } from '../../actions/staffActions';
import Paginate from '../common/pagination/Pagination';
import { withRouter } from 'react-router-dom';
import StaffCsv from './StaffCsv';
import SearchInput from '../includes/SearchInput';
import bn from '../../utils/bemnames';
import Can from '../common/Can';

const bem = bn.create('header');

class StaffBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showCsvModal: false,
      departments: [],
      company_locations: []
    };
    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.openModalHandler = this.openModalHandler.bind(this);
    this.handleStaffSearch = this.handleStaffSearch.bind(this);
    this.openCsvModal = this.openCsvModal.bind(this);
    this.closeCsvModal = this.closeCsvModal.bind(this);
    this.bulkExport = this.bulkExport.bind(this);
    this.handleFilterByDepartment = this.handleFilterByDepartment.bind(this);
    this.handleFilterByLocations = this.handleFilterByLocations.bind(this);

    
  }


  async componentDidMount(){

    this.props.getStaff();
    console.log('staffffffffboard')
    
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
  openCsvModal() {
    this.setState({
      showCsvModal: true
    });
  }
  bulkExport(currentUser) {
    bulkExportStaff(currentUser);
  }
  handleStaffSearch(search) {
    this.props.searchStaff(search);
  }

  handleFilterByDepartment(e) {
    const { value } = e.target;

    // this.setState({
    //   currentCase: 'purpose'
    // });
  
    this.props.getStaffsByDepartment(value);
  }

  handleFilterByLocations(e){
    const { value } = e.target;

    this.props.getStaffsByLocation(value);


  }


  
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div className="mb-3">
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
                    <Can
                      role={user.role}
                      perform="staff-directory:write"
                      yes={() => {
                        return user.option === 'workspace' && !user.workspace_company ? null : (
                          <Button size="sm" color="danger" onClick={this.openCsvModal}>
                            <FaFileImport color="#ffffff" size={12} /> Import
                          </Button>
                        );
                      }}
                    />{' '}
                    <Button size="sm" color="danger" onClick={() => this.bulkExport(user.id)}>
                      <FaFileExport color="#ffffff" size={12} /> Export
                    </Button>{' '}
                    <Can
                      role={user.role}
                      perform="staff-directory:write"
                      yes={() => {
                        return user.option === 'workspace' && !user.workspace_company ? null : (
                          <Button size="sm" color="danger" onClick={this.openModalHandler}>
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
          <br />
          <StaffList history={this.props.history} />
        </div>
        <Paginate />
        <Modal
          header="New Staff"
          className="modal"
          show={this.state.showModal}
          close={this.closeModalHandler}
        >
          <StaffForm closeAddStaffModal={this.closeModalHandler} history={this.props.history} />
        </Modal>
        <Modal
          header="Import staff"
          className="modal"
          show={this.state.showCsvModal}
          close={this.closeCsvModal}
        >
          <StaffCsv closeModal={this.closeCsvModal} />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default withRouter(
  connect(
    mapStateToProps,
    {
      searchStaff,
      getStaffsByDepartment,
      getAllDepartments,
      getStaffsByLocation,
      getStaff
    }
  )(StaffBoard)
);
