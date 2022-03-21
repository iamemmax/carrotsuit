import React, { Component } from 'react';
import { FaEye, FaEdit } from 'react-icons/fa';
import { connect } from 'react-redux';
import { getStaff, getOneStaff, deleteStaff } from '../../actions/staffActions';
import './styles.css';
import Modal from '../common/modal/Modal';
import StaffForm from './StaffForm';
import StaffDetails from './StaffDetails';
import Pagination from '../common/pagination/Pagination';
import Swal from 'sweetalert2';
import { Table, Input, Button } from 'reactstrap';
import MessageForm from '../visitors/MessageForm';

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      showDetailsModal: false,
      markedStaff: [],
      allMarked: false,
      list: [],
      showMessageModal: false
    };
    this.getSingleStaff = this.getSingleStaff.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.deleteOneStaff = this.deleteOneStaff.bind(this);
    this.closeDetailsModal = this.closeDetailsModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    this.props.getStaff();

    console.log('staffffflistttt')
  }
  closeEditModal() {
    this.setState({
      showEditModal: false
    });
  }
  closeDetailsModal() {
    this.setState({
      showDetailsModal: false
    });
  }
  openMessageModal = () => {
    const { markedStaff, allMarked } = this.state;
    const { staffs } = this.props.staff;
    const id = staffs.map(staff => staff.id);

    const list = allMarked ? id : markedStaff;
    this.setState({
      list,
      showMessageModal: true
    });
  };
  closeMessageModal = () => {
    this.setState({
      showMessageModal: false
    });
  };
  handleMarked = (e, id) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      this.setState({
        markedStaff: this.state.markedStaff.concat(id),
        allMarked: false
      });
    } else {
      this.setState({
        markedStaff: this.state.markedStaff.filter(vid => vid !== id),
        allMarked: false
      });
    }
  };
  isMarked = id => {
    const { markedStaff } = this.state;
    return markedStaff.includes(id);
  };
  getSingleStaff(id, action) {
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
  deleteOneStaff(id) {
    Swal.fire({
      title: 'Are you sure you want to delete staff?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.value) {
        this.props.deleteStaff(id);
        Swal.fire('Deleted!', 'Staff successfully deleted.', 'success');
      }
    });
  }
  handlePageChange(page) {
    this.props.getStaff(page);
  }
  render() {
    const { staffs, staff, count } = this.props.staff;
    const { markedStaff, allMarked } = this.state;
    const limit = 10;
    const pages = Math.ceil(count / limit);
    if (staffs.length){
    console.log(staffs, 'ssssssssss')
      return (
        <div className="staff-list">
          <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '1.3rem', fontSize: '1.5rem'}}>

          {/* {staffs? <div>{count} Staffs</div> : <div>0 :Staffs</div>} */}

          {staffs && <div> 
          {count>1? <div>{count} Staffs</div>: <div>{count} Staff</div>}
        </div> }


          </div>
         
          <div>
            {allMarked || markedStaff.length ? (
              <div>
                <Button color="danger" size="sm" onClick={this.openMessageModal}>
                  Send message
                </Button>
              </div>
            ) : null}
            <br />
            <Table responsive>
              <thead>
                <tr>
                  <th />
                  <th className="master-mark">
                    <input
                      type="checkbox"
                      onChange={e => this.setState({ allMarked: e.target.checked })}
                    />
                  </th>
                  <th>Namme</th>
                  <th>Email</th>
                  <th>ID</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Company Location</th>
                  <th>Edit</th>
                  <th>Details</th>
                  <th>Delete</th>

                </tr>
              </thead>
              <tbody>
                {staffs.map(staf => (
                  <tr key={staf.id}>
                    <td></td>
                    <td className="single-mark">
                      <input
                        type="checkbox"
                        checked={allMarked ? allMarked : this.isMarked(staf.id)}
                        onChange={e => this.handleMarked(e, staf.id)}
                      />
                    </td>
                    <td>
                      {staf.first_name} {staf.last_name}
                    </td>
                    <td>{staf.email}</td>
                    <td>{staf.staff_ID}</td>
                    <td>{staf.staff_position}</td>
                    <td>{staf.department}</td>
                    <td>{staf.company_location}</td>
                    <td>
                      <button
                        className="btn btn-outline-light"
                        onClick={() => {
                          this.getSingleStaff(staf.id, 'edit');
                        }}
                      >
                        <FaEdit size={12} color="blue" />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-light"
                        data-toggle="details"
                        onClick={() => {
                          this.getSingleStaff(staf.id, 'details');
                        }}
                      >
                        <FaEye size={12} color="blue" />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-ouline-light"
                        data-toggle="edit"
                        onClick={() => this.deleteOneStaff(staf.id)}
                      >
                        x
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <Pagination pages={pages} changePage={this.handlePageChange} />
          {this.state.showEditModal && staff && (
            <Modal
              show={this.state.showEditModal}
              close={this.closeEditModal}
              header="Edit Staff"
              className="modal"
            >
              <StaffForm
                id={staff.id}
                first_name={staff.first_name}
                last_name={staff.last_name}
                email={staff.email}
                assistant={staff.assistant}
                phone_number={staff.phone_number}
                phone_number2={staff.phone_number2}
                appointment_only={staff.appointment_only}
                staff_position={staff.staff_position}
                closeModal={this.closeEditModal}
                history={this.props.history}
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
              <StaffDetails staff={staff} />
            </Modal>
          )}
           <Modal
          show={this.state.showMessageModal}
          close={this.closeMessageModal}
          header="Send message"
        >
          <MessageForm list={this.state.list} type="staff" close={this.closeMessageModal} />
        </Modal>
        </div>
      );
      }if (!staffs){
      return (
        <div style={{ textAlign: 'center' }}>
          <div className="spinner-border text-primary " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
  
  }else if(!staffs.length){
    return (
      <div style={{ textAlign: 'center', background: '#ffffff' }} className="jumbotron">
        No Records Added
      </div>
    );

  }

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
)(StaffList);
