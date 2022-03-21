import React, { Component } from 'react';
import { FaEye, FaEdit } from 'react-icons/fa';
import { connect } from 'react-redux';
import { getStaff, getOneStaff, deleteStaff } from '../../actions/staffActions';
import './styles.css';
import Modal from '../common/modal/Modal';
import TenantForm from './TenantForm';
import TenantDetails from './TenantDetails';
import Pagination from '../common/pagination/Pagination';
import Swal from 'sweetalert2';
import { Card, Col, Row, Table } from 'reactstrap';

class TenantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      showDetailsModal: false
    };
  }
  componentDidMount() {
    this.props.getStaff();
  }
  closeEditModal = () => {
    this.setState({
      showEditModal: false
    });
  }
  closeDetailsModal = () => {
    this.setState({
      showDetailsModal: false
    });
  }
  getSingleTenant = (id, action) => {
    this.props.getOneStaff(id).then(data => {
      if (data) {
        if (action === 'edit') {
          this.setState({
            showEditModal: true
          });
        } else {
          this.setState({
            showDetailsModal: true
          });
        }
      }
    });
  }
  deleteOneTenant(id) {
    Swal.fire({
      title: 'Are you sure you want to delete occupant?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.value) {
        this.props.deleteStaff(id);
        Swal.fire('Deleted!', 'Occupant successfully deleted.', 'success');
      }
    });
  }
  handlePageChange(page) {
    this.props.getStaff(page);
  }
  render() {
    const { staffs, staff, count } = this.props.staff;
    const limit = 10;
    const pages = Math.ceil(count / limit);
    if (staffs)
      return (
        <div className="table-responsive">
          <Row>
            <Col>
              <Card body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>house</th>
                      <th>Edit</th>
                      <th>Details</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffs.map(staf => (
                      <tr key={staf.id}>
                        <td>{staf.first_name} {staf.last_name}</td>
                        <td>{staf.email}</td>
                        <td>{staf.house && staf.house.block_no}</td>
                        <td>
                          <button
                            className="btn btn-outline-light"
                            onClick={() => {
                              this.getSingleTenant(staf.id, 'edit');
                            }}
                          >
                            <FaEdit size={14} color="blue" />
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-light"
                            data-toggle="details"
                            onClick={() => {
                              this.getSingleTenant(staf.id, 'details');
                            }}
                          >
                            <FaEye size={14} color="blue" />
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-ouline-light"
                            data-toggle="edit"
                            onClick={() => this.deleteOneTenant(staf.id)}
                          >
                            x
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
          
          <Pagination pages={pages} changePage={this.handlePageChange} />
          {this.state.showEditModal && staff && (
            <Modal
              show={this.state.showEditModal}
              close={this.closeEditModal}
              header="Edit Tenant"
              className="modal"
            >
              <TenantForm
                id={staff.id}
                first_name={staff.first_name}
                last_name={staff.last_name}
                email={staff.email}
                phone_number={staff.phone_number}
                query={staff.house_block}
                appontment_only={staff.appontment_only}
                house={staff.estate_house}
                closeModal={this.closeEditModal}
                history = {this.props.history}
              />
            </Modal>
          )}
          {this.state.showDetailsModal && staff && (
            <Modal
              show={this.state.showDetailsModal}
              close={this.closeDetailsModal}
              header="Staff Details"
              className="modal"
            >
              <TenantDetails staff={staff} />
            </Modal>
          )}
        </div>
      );
    if (!staffs)
      return (
        <div style={{ textAlign: 'center' }}>
          <div className="spinner-border text-primary " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    if (!staffs.length)
      return(
        <div style={{ textAlign: 'center', background: '#ffffff' }} className="jumbotron">
          No Occupant added
        </div>
      );
  }
}
const mapStateToProps = state => ({
  staff: state.staff
});
export default connect(
  mapStateToProps,
  {
    getStaff,
    getOneStaff,
    deleteStaff
  }
)(TenantList);
