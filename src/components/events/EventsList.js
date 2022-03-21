import React, { Component } from 'react';
import Modal from '../common/modal/Modal';
import { Button, Card, Nav, Navbar, NavItem, Pagination, Table } from 'reactstrap';
import { FaEdit, FaEye, FaUserPlus } from 'react-icons/fa';
import SearchInput from '../includes/SearchInput';
import Can from '../common/Can';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import bn from '../../utils/bemnames';
import classnames from 'classnames';
// import { createEvent } from '../../actions/eventfActions';
import { getEvents , getOneEvent} from '../../actions/eventsActions';
import EventForm from './EventForm';
import EventsDetails from './EventDetails';



const bem = bn.create('header');


class EventsList extends Component {
  constructor(props) {
    super(props);

    this.state = {

          event_name: 'kkkk',
    event_capacity: '',
    event_start: '',
    event_end: '',
    errors: {},
    errorMessage: '',
    markedEvent: [],
    allMarked: false,
    showEditModal: false,
     
    };
      this.getSingleEvent = this.getSingleEvent.bind(this);
      this.closeEditModal = this.closeEditModal.bind(this);
      this.closeDetailsModal = this.closeDetailsModal.bind(this);
      // this.deleteOneEvent = this.deleteOneEvent.bind(this);


      


    


    
    
  }


  componentDidMount() {
    this.props.getEvents(1, 500);

    console.log('eventfffflistttt')
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


  handleMarked = (e, id) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      this.setState({
        markedEvent: this.state.markedEvent.concat(id),
        allMarked: false
      });
    } else {
      this.setState({
        markedEvent: this.state.markedEvent.filter(vid => vid !== id),
        allMarked: false
      });
    }
  };
  isMarked = id => {
    const { markedEvent } = this.state;
    return markedEvent.includes(id);
  };


  getSingleEvent(id, action) {
      console.log('hhsjsyudw')
    this.props.getOneEvent(id).then(data => {
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


 

    
  render() {

    


    // const { user } = this.props.auth;

    // const { errors } = this.state;
    // const { isLoading, user } = this.props.auth;


    console.log(this.props.events, 'lllll')
    const {  events, count, event } = this.props.events;

   
    const { markedEvent, allMarked } = this.state;
    const limit = 10;
    const pages = Math.ceil(count / limit);


    console.log(events, 'jjc')
if (events){
        console.log(events, 'ssssssssss')
          return ( <Card className="staff-list">

      <div>

      <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '1.3rem', fontSize: '1.5rem'}}>

{/* {events? <div>{count} events</div> : <div>0 :events</div>

} */}

{events && <div> 
  {count>1? <div>{count} events</div>: <div>{count} events</div>}
</div> }


</div>

<div>
  {allMarked || markedEvent.length ? (
    <div>
      <Button color="danger" size="sm" onClick={this.openMessageModal}>
        Send message
      </Button>
    </div>
  ) : null}
  <br />
  <Table  size="md" responsive>
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
        <th>Event ID</th>
        <th>Start</th>
        <th>End</th>
        <th>URL</th>
        <th>Capacity</th>
        <th>Edit</th>
        <th>Published</th>
        <th>Publish</th>
        <th>Details</th>
        <th>Delete</th>

      </tr>
    </thead>
    <tbody>
      {events.map(event => (
        <tr key={event.id}>
          <td></td>
          <td className="single-mark">
            <input
              type="checkbox"
              checked={allMarked ? allMarked : this.isMarked(event.id)}
              onChange={e => this.handleMarked(e, event.id)}
            />
          </td>
          <td>
            {event.event_name} {event.last_name}
          </td>
          <td>{event.event_id}</td>
          <td>{event.start}</td>
          <td>{event.end}</td>
          <td>{event.url}
          
            {/* <Link  to={{
              pathname: `${event.url}`,
             
            }}/>  */}
          </td>
          <td>{event.capacity}</td>
          <td>
            <button
              className="btn btn-outline-light"
              onClick={() => {
                this.getSingleEvent(event.id, 'edit');
              }}
            >
              <FaEdit size={12} color="blue" />
            </button>
          </td>
          <td>{event.published ? "true": "false"}</td>
          <td>
            <button
              className="btn btn-outline-light"
              onClick={() => {

                this.props.history.push({pathname: '/dashboard/create-event-ticket', state: {event_id:  event.event_id}})
                // this.getSingleEvent(event.id, 'edit');
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
                this.getSingleEvent(event.id, 'details');
              }}
            >
              <FaEye size={12} color="blue" />
            </button>
          </td>
          <td>
            <button
              className="btn btn-ouline-light"
              data-toggle="edit"
              // onClick={() => this.deleteOneEvent(event.id)}
            >
              x
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
</div>
       
      </div>;


      <Pagination pages={pages} changePage={this.handlePageChange} />
          {this.state.showEditModal && event && (
            <Modal
              show={this.state.showEditModal}
              close={this.closeEditModal}
              header="Edit event"
              className="modal"
            >

{/* event_capacity: '',
    event_start: '',
    event_end: '', */}
              <EventForm
                id={event.id}
                event_name={event.event_name}
                event_end={event.end}
                event_start={event.start}
                event_capacity={event.capacity}
                // phone_number={event.phone_number}
                // phone_number2={event.phone_number2}
                // appointment_only={event.appointment_only}
                // event_position={event.event_position}
                closeModal={this.closeEditModal}
                history={this.props.history}
              />
            </Modal>
          )}
          {this.state.showDetailsModal && event && (
            <Modal
              show={this.state.showDetailsModal}
              close={this.closeDetailsModal}
              header="event Details"
              className="modal"
            >
              <EventsDetails event={event} />
            </Modal>
          )}
         
    </Card>)
    
  }else if (events.length === 0){


  return(
      <Card>

    
          <div >
          <div >
          <span className="sr-only">No event</span>
          </div>
          </div>
      </Card>
      );
    
    }else{

      return(
        <div style={{ textAlign: 'center' }}>
        <div className="spinner-border text-primary " role="status">
        <span className="sr-only">Loading...</span>
        </div>
        </div>
    );
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
      getOneEvent
      // searcheventf,
      // geteventsByDepartment,
      // getAllDepartments,
      // geteventsByLocation,
      // geteventf
    }
  )(EventsList)
);
    