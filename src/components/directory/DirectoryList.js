import React, { Component } from 'react';
import { FaEdit } from 'react-icons/fa';
import { connect } from 'react-redux';
import { getOneDirRecord, deleteOneDirRecord, getDirectory } from '../../actions/visitorActions';
import Modal from '../common/modal/Modal';
import Pagination from '../common/pagination/Pagination';
import Swal from 'sweetalert2';
import { Table } from 'reactstrap';
import DirectoryForm from './DirectoryForm';
import './styles/dirList.css'

class DirectoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      showDetailsModal: false,
      markedDirec: [],
      allMarked: false,
    };
    
  }
  
  closeEditModal = () => {
    this.setState({
      showEditModal: false
    });
  }
  getSingleRecord = (id) => {
    this.props.getOneDirRecord(id).then(data => {
      if (data) {
          this.setState({
            showEditModal: true
          });
        }
    });
  }
  deleteRecord (id) {
    Swal.fire({
      title: 'Are you sure you want to delete record?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.value) {
        this.props.deleteOneDirRecord(id);
        Swal.fire('Deleted!', 'record successfully deleted.', 'success');
      }
    });
  }

  handleMarked = (e, id) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      this.setState({
        markedDirec: this.state.markedDirec.concat(id),
        allMarked: false
      });
    } else {
      this.setState({
        markedDirec: this.state.markedDirec.filter(vid => vid !== id),
        allMarked: false
      });
    }
  };

  isMarked = id => {
    const { markedDirec } = this.state;
    return markedDirec.includes(id);
  };


  handlePageChange = (page) => {
    this.props.getDirectory(page);
  }
  render() {
    const { directory, dirRecord, count } = this.props.directories;
    const limit = 10;
    const pages = Math.ceil(count / limit);
    
    const { markedDirec, allMarked } = this.state;


    if (directory)
      return (
        <div className="dir-list">
          <div>
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>phone</th>
                  <th>type</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <td></td>
                {directory.map(dir => (
                  <tr key={dir.id}>
                      <td></td>
                    <td className="single-mark">
                      <input
                        type="checkbox"
                        checked={allMarked ? allMarked : this.isMarked(dir.id)}
                        onChange={e => this.handleMarked(e, dir.id)}
                      />
                    </td>
                    
                    <td>
                      {dir.name}
                    </td>
                    <td>{dir.email}</td>
                    <td>{dir.phone}</td>
                    <td>{dir.type}</td>
                    <td>
                      <button
                        className="btn btn-outline-light"
                        onClick={() => {
                          this.getSingleRecord(dir.id);
                        }}
                      >
                        <FaEdit size={12} color="blue" />
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-ouline-light"
                        data-toggle="delete"
                        onClick={() => this.deleteRecord(dir.id)}
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
          {this.state.showEditModal && dirRecord && (
            <Modal
              show={this.state.showEditModal}
              close={this.closeEditModal}
              header="Edit Record"
              className="modal"
            >
              <DirectoryForm
                id={dirRecord.id}
                name={dirRecord.name}
                email={dirRecord.email}
                phone={dirRecord.phone}
                type= {dirRecord.type}
                closeEditModal={this.closeEditModal}
                history={this.props.history}
              />
            </Modal>
          )}
        </div>
      );
    if (!directory)
      return (
        <div style={{ textAlign: 'center' }}>
          <div className="spinner-border text-primary " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    if (!directory.length)
      return (
        <div style={{ textAlign: 'center', background: '#ffffff' }} className="jumbotron">
          No Records Added
        </div>
      );
  }
}
const mapStateToProps = state => ({
  directories: state.directories
});
export default connect(
  mapStateToProps,
  {
    getDirectory,
    getOneDirRecord,
    deleteOneDirRecord
  }
)(DirectoryList);
