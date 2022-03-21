import React, { Component } from 'react';
import EventForm from './EventForm'
import Modal from '../common/modal/Modal';
import { Button, Card, CardBody, Nav, Navbar, NavItem } from 'reactstrap';
import { FaUserPlus } from 'react-icons/fa';
import SearchInput from '../includes/SearchInput';
import Can from '../common/Can';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import bn from '../../utils/bemnames';
import EventsList from './EventsList';
import { getEvents, publishEvent } from '../../actions/eventsActions';
import { Switch } from '@material-ui/core';
import {
    FormControl,
    FormGroup,
    FormControlLabel,
    FormLabel,
    // Switch,
    Box,
    withStyles,
  } from '@material-ui/core';

const bem = bn.create('header');




class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEventFormModal: false,
      checked: false,
      gender: '',
      cell_phone: '',
      home_address: '',
      job_title: '',
      errors:{},
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      event_id: ''
     
    };

    this.closeCreateEventModal = this.closeCreateEventModal.bind(this);
    this.openEventFormHandler = this.openEventFormHandler.bind(this);


    this.switchHandler = this.switchHandler.bind(this);
    // this.event = this.event.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
   
    this.renderName = this.renderName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // this.handleFilterByLocations = this.handleFilterByLocations.bind(this);

    
  }


  componentDidMount() {
    this.props.getEvents(1, 500);
    // this.props.getStaff();

    console.log(this.props.location.state.event_id, 'klksksks')
    this.setState({
        event_id: this.props.location.state.event_id || ''
    })
    // setPhoneNumber(props.location.state.phone_number || {})

    console.log('eventfffflistttt')
  }


  renderSpinner = () => {
    return (
      <div className="spinner-border text-light spinner-border-sm" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  };


  renderName() {
    return 'Save';
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




  async handleSubmit(e) {
    e.preventDefault();

    // console.log(this.state.event_name, 'kkkkkiiiiikkkkkkkk')

    const data = {


        gender: this.state.gender,
        cell_phone: this.state.cell_phone,
        home_address: this.state.home_address,
        job_title: this.state.job_title,
        event_id: this.state.event_id
    //   event_cost: this.state.event_cost,
    //   free: this.state.free,

    };

    this.props.publishEvent(data).then(response=>{
        console.log(response, 'kkdkldl')

        if(response){
            this.props.history.push({pathname: '/dashboard/events-board', state: {event_id:  this.state.event_id}})
        }else{
            // var errors = errors.submission
            this.setState({
                errors : 'retry'
            })
        }
        
    })



    // if (this.props.id) {

      
    //   this.props.editEvent(this.props.id, data).then(data => {
    //     if (data) {
    //       this.props.closeModal();
    //       this.props.getEvents();
    //       console.log('dododkdkdkeiee')
    //     }
    //   });
    // } else
    
    // await this.props.createEvent(data).then(data=> {
    //     if (data) {
    //       // this.props.closeAddStaffModal();
    //       this.props.closeCreateEventModal()
    //       this.props.getEvents();
          
    //     }
    //   });
    
}


  switchHandler = (event, name) => {

    var label = 'label'
    console.log(event.target, 'ioppppppp')
    console.log(name, 'ioppppkppp')


    if(name === '0'){
        this.setState({
            checked: !this.state.checked
        })


    }else if (name === '1'){
        this.setState({
            checked1: !this.state.checked1
        })

    }else if (name === '2'){
        this.setState({
            checked2: !this.state.checked2
        })

    }else if (name === '3'){
        this.setState({
            checked3: !this.state.checked3
        })

    }
 
    // setChecked(event.target.checked);
  };



  

  
  render() {


    const { isLoading, user } = this.props.auth;
    const { checked, checked1, checked2, checked3, errors } = this.state;
    // const { errors } = this.state;
    // const { isLoading, user } = this.props.auth;

    return <div>

        <Card>

        <CardBody>

                <div>
               <b>Note: first name, last name and email are set by default</b> 
                </div>



                







                {/* <div style={{ marginTop: 100, marginLeft: 100 }}>
                        <Switch  checked={checked} onChange={this.switchHandler} />
                </div> */}


                <form onSubmit={this.handleSubmit} autoComplete="off">
                <div className="row">
                    <div className="col">
                    <div className="form-group">
                        <label htmlFor="gender">
                        Event name <span>*</span>
                        </label>
                        <span className="text-danger">{errors.gender || ''}</span>
                        <Switch  checked={checked} inputProps={{ 'aria-label': 'Switch A' }} onChange={(e)=>this.switchHandler(e, '0')} />
                        {/* <input
                        type="text"
                        name="event_name"
                        value={this.state.event_name}
                        onChange={this.hanldeChange}
                        className={classnames('form-control', {
                            invalid: errors.event_name
                        })}
                        required
                        /> */}
                    </div>
                    </div>
                    <div className="col">
                    <div className="form-group">
                        <label htmlFor="cell_phone">
                        Cell Phone <span>*</span>
                        </label>
                        <span className="text-danger">{errors.cell_phone || ''}</span>
                        <Switch  checked={checked1} inputProps={{ 'aria-label': 'Switch A' }} onChange={(e)=>this.switchHandler(e, '1')} />
                        {/* <input
                        type="number"
                        name="event_capacity"
                        value={this.state.event_capacity}
                        onChange={this.hanldeChange}
                        className={classnames('form-control', {
                            invalid: errors.event_capacity
                        })}
                        required
                        /> */}
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    <div className="form-group">
                        <label htmlFor="home_address">
                        Home Address <span></span>
                        </label>
                        <span className="text-danger">{errors.home_address || ''}</span>
                        <Switch  checked={checked2} inputProps={{ 'aria-label': 'Switch A' }} onChange={(e)=>this.switchHandler(e, '2')} />
                        {/* <input
                        type="datetime-local"
                        name="event_start"
                        value={this.state.event_start}
                        onChange={this.hanldeChange}
                        className={classnames('form-control', {
                            invalid: errors.event_start
                        })}
                        required
                        /> */}
                    </div>
                    </div>
                    <div className="col">
                    <div className="form-group">
                        <label htmlFor="job_title">
                        Job Title <span></span>
                        </label>
                        <span className="text-danger">{errors.job_title || ''}</span>
                        <Switch  checked={checked3} inputProps={{ 'aria-label': 'Switch A' }} onChange={(e)=>this.switchHandler(e, '3')} />
                        {/* <input
                        type="datetime-local"
                        name="event_end"
                        value={this.state.event_end}
                        onChange={this.hanldeChange}
                        className={classnames('form-control', {
                            invalid: errors.event_end
                        })}
                        required
                        /> */}
                    </div>
                    </div>
                </div>





                <div style={{ textAlign: 'center' }}>
                    <Button color="danger" disabled={isLoading}>
                    {isLoading ? this.renderSpinner() : this.renderName()}
                    </Button>
                </div>

            </form>

    

       </CardBody>
      </Card>
    </div>;
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
      publishEvent
      // searchStaff,
      // getStaffsByDepartment,
      // getAllDepartments,
      // getStaffsByLocation,
      // getStaff
    }
  )(OrderForm)
);
