import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getVisitors,
  getSignedInVisitors,
  getVisitor,
  signVisitorOut,
  deleteVisitor,
  blacklistVisitors
} from '../../actions/visitorActions';
import { FaEye, FaSignOutAlt, FaCalendarTimes } from 'react-icons/fa';
import Modal from '../common/modal/Modal';
import VisitorDetails from './VisitorDetails';
import RecurringVisit from './RecurringVisit';
import './styles.css';
import { Button, Table, Input } from 'reactstrap';
import Swal from 'sweetalert2';
import MessageForm from './MessageForm';

class VisitorsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisitorModal: false,
      showMessageModal: false,
      showRecurringVisitModal: false,
      short_id: null,
      markedVisitors: [],
      allMarked: false,
      list: [],
      host: [],
      phone_number: ''
    };
    this.handleGetVisitor = this.handleGetVisitor.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    this.props.getSignedInVisitors();
  }
  openModal() {
    this.setState({
      showVisitorModal: true
    });
  }
  closeModal() {
    this.setState({
      showVisitorModal: false
    });
  }
  openMessageModal =  () => {
    const { markedVisitors, allMarked } = this.state;
    const { visitors } = this.props.visitor;
    const visitorsId = visitors.map(visitor => visitor.id);

    const list = allMarked ? visitorsId : markedVisitors;
    this.setState({
      list,
      showMessageModal: true
    });
  }
  closeMessageModal = () => {
    this.setState({
      showMessageModal: false
    });
  }
  handleMarked = (e, id) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      this.setState({
        markedVisitors: this.state.markedVisitors.concat(id),
        allMarked: false
      });
    } else {
      this.setState({
        markedVisitors: this.state.markedVisitors.filter(vid => vid !== id),
        allMarked: false
      });
    }
  };
  isMarked = id => {
    const { markedVisitors } = this.state;
    return markedVisitors.includes(id);
  };
  blacklistVisitors = () => {
    const { markedVisitors, allMarked } = this.state;
    const { visitors } = this.props.visitor;
    const visitorsId = visitors.map(visitor => visitor.id);

    const blacklist = allMarked ? visitorsId : markedVisitors;

    Swal.fire({
      title: `Blacklist ${blacklist.length} visitors`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continue'
    }).then(result => {
      if (result.value) {
        blacklistVisitors({ blacklist });
      }
    });
   
  };
  setCloseRecurringModal = () => {
    this.setState({
      showRecurringVisitModal: false
    });
  };
  handlePageChange(page) {
    this.props.getVisitors(page);
  }
  handleGetVisitor(id) {
    this.props.getVisitor(id).then(data => {
      

      if (data) {

        
        this.setState({host: [data.soughtStaff]})
        console.log(data.soughtStaff, 'ddddddddiiiiiiiiiiiiiiiiiiiiiipddddddd')
        console.log(data, 'lllppppppppppaaaaa')
        console.log(this.state.host, 'ddddkkkkkkkdddddd')
        this.setState({
          showVisitorModal: true
        });
      }
    });
  }
  setRecurringVisitor = short_id => {
    this.setState({
      short_id,
      showRecurringVisitModal: true
    });
  };

 
  getFieldValue(fields, theField) {
    const filtered = fields.filter(
      field => field.field_name.toLowerCase() === theField.toLowerCase()
    );
    // this.setState({
    //   phone_number: filtered
    // })
    return filtered.length ? filtered[0].field_value : '';
  }


  // filterOutNo(fields, theField) {
  //   const filtered = fields.filter(
  //     field => field.field_name.toLowerCase() === theField.toLowerCase()
  //   );
  //   return filtered.length ? filtered[0].field_value : '';
  // }

  deleteVisitor(id) {
    Swal.fire({
      title: 'Are you sure you want to delete visitor?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.value) {
        this.props.deleteVisitor(id);
        Swal.fire('Deleted!', 'Visitor successfully deleted.', 'success');
      }
    });
  }
  render() {
    const { visitors, currentVisitor, count } = this.props.visitor;
    const { markedVisitors, allMarked } = this.state;

    console.log(visitors.fields, 'kinnnnnnnnnnnnggggggggggg')

    if (!visitors)
      return (
        <div style={{ textAlign: 'center' }}>
          <div className="spinner-border text-primary " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    if (!visitors.length)
      return (
        <div style={{ textAlign: 'center', background: '#ffffff' }} className="jumbotron">
          No available visitors
        </div>
      );
    return (
      <div className="visitor-list">
        {allMarked || markedVisitors.length ? (
          <div>
            <Button color="danger" size="sm" onClick={this.blacklistVisitors}>
              Blacklist
            </Button>
            {' '}
            <Button color="danger" size="sm" onClick={this.openMessageModal}>
              Send message
            </Button>
          </div>
        ) : null}
        <Table size="md" responsive>
          <thead>
            <tr>
              <th></th>
              <th className="master-mark">
                <input
                  type="checkbox"
                  onChange={e => this.setState({ allMarked: e.target.checked })}
                />
              </th>
              <th></th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Purpose</th>
              <th>Signed in</th>
              <th>Signed out</th>
              <th>Details</th>
              <th>Repeat visit</th>
              <th>Sign out</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {console.log(visitors)}
            {visitors.map(visitor => (
              <tr key={visitor.id}>
                <td></td>
                <td className="single-mark">
                  <input
                    type="checkbox"
                    checked={allMarked ? allMarked : this.isMarked(visitor.id)}
                    onChange={e => this.handleMarked(e, visitor.id)}
                  />
                </td>
                <td>
                  {' '}
                  <span className={visitor.leaving_date ? 'visitor-out' : 'visitor-in'}>.</span>
                  <img
                    src={visitor.avatar || '/images/defaultAvatar.png'}
                    alt="visititor picture"
                    className="visitor-pix"
                  />
                </td>
                {/* <td>{visitor.name}</td> */}
                <td>{visitor.fields? this.getFieldValue(visitor.fields, 'name') || '': visitor.name}</td>
                <td>{visitor.fields? this.getFieldValue(visitor.fields, 'phone_number') : ''  }</td>
                <td>{visitor.fields? this.getFieldValue(visitor.fields, 'purpose') : visitor.purpose }</td>

                {/* <td>{visitor.fields? visitor.phone || '' || this.getFieldValue(visitor.fields, 'phone_number') }</td>
                <td>{visitor.purpose || '' || this.getFieldValue(visitor.fields, 'purpose') }</td> */}
                <td>{new Date(visitor.visiting_date).toLocaleString()}</td>
                <td>
                  {' '}
                  {visitor.leaving_date ? new Date(visitor.leaving_date).toLocaleString() : '-'}
                </td>
                <td>
                  <Button
                    color="light"
                    size="sm"
                    onClick={() => {
                      this.handleGetVisitor(visitor.id);
                    }}
                  >
                    <FaEye size={12} color="blue" />
                  </Button>
                </td>
                <td>
                  <Button
                    color="light"
                    size="sm"
                    onClick={() => {
                      this.setRecurringVisitor(visitor.short_id);
                    }}
                  >
                    <FaCalendarTimes size={12} color="blue" />
                  </Button>
                </td>
                <td>
                  <Button
                    disabled={visitor.leaving_date}
                    color="light"
                    size="sm"
                    onClick={() => {
                      this.props.signVisitorOut(visitor.id);
                    }}
                  >
                    <FaSignOutAlt size={12} color="blue" />
                  </Button>
                </td>
                <td>
                  <button
                    className="btn btn-light"
                    data-toggle="delete"
                    onClick={() => this.deleteVisitor(visitor.id)}
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {currentVisitor && (
          <Modal
            show={this.state.showVisitorModal}
            close={this.closeModal}
            header="Visitor Details"
          >
            <VisitorDetails visitor={currentVisitor} host={this.state.host}/>
          </Modal>
        )}
        <Modal
          show={this.state.showRecurringVisitModal}
          close={this.setCloseRecurringModal}
          header="Repeat visit"
        >
          <RecurringVisit short_id={this.state.short_id} />
        </Modal>
        <Modal
          show={this.state.showMessageModal}
          close={this.closeMessageModal}
          header="Send message"
        >
          <MessageForm list={this.state.list} type="visitor" close={this.closeMessageModal} />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  visitor: state.visitor
});
export default connect(
  mapStateToProps,
  {
    getVisitors,
    getVisitor,
    signVisitorOut,
    getSignedInVisitors,
    deleteVisitor
  }
)(VisitorsList);