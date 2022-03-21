import React, { Component } from 'react';
import Modal from '../common/modal/Modal';
import { Button, Nav, Navbar, NavItem } from 'reactstrap';
import { FaUserPlus } from 'react-icons/fa';
import SearchInput from '../includes/SearchInput';
import Can from '../common/Can';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import bn from '../../utils/bemnames';
import classnames from 'classnames';
import { createEvent, editEvent, getEvents } from '../../actions/eventsActions';
import { Switch } from '@material-ui/core';

const bem = bn.create('header');



class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {

    event_name: this.props.event_name || '',
    event_capacity: this.props.event_capacity || '',
    event_start: this.props.event_start || '',
    event_end: this.props.event_end || '',
    errors: {},
    errorMessage: '',
    event_cost: '',
    free: false,
    checked: ''

     
    };
      this.hanldeChange = this.hanldeChange.bind(this);
      this.renderSpinner = this.renderSpinner.bind(this);
      this.renderName = this.renderName.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);


      


    


    
    
  }


  hanldeChange(e) {
    console.log(this.state.event_name, 'snss')
    const { name, value } = e.target;


    this.setState({
      [name]: value,
      free: false,
    });
  }




  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        errorMessage: nextProps.errors.message
      });
    }
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




  switchHandler = (event) => {

    var label = 'label'
    console.log(event.target, 'ioppppppp')
    console.log(event.props, 'ioppppppp')

    this.setState({
        checked: !this.state.checked,
        free: !this.state.checked,
        event_cost: 'null'
    })
    // setChecked(event.target.checked);
  };


    async handleSubmit(e) {
      e.preventDefault();

      console.log(this.state.event_name, 'kkkkkiiiiikkkkkkkk')

      const data = {
        event_name: this.state.event_name,
        event_capacity: this.state.event_capacity,
        event_start: this.state.event_start,
        event_end: this.state.event_end,
        event_cost: this.state.event_cost,
        free: this.state.free,

      };

      if (this.props.id) {

        
        this.props.editEvent(this.props.id, data).then(data => {
          if (data) {
            this.props.closeModal();
            this.props.getEvents();
            console.log('dododkdkdkeiee')
          }
        });
      } else
      
      await this.props.createEvent(data).then(data=> {
          if (data) {
            // this.props.closeAddStaffModal();
            this.props.closeModal()
            this.props.getEvents();
            
          }
        });
    
  

      
  }


    
  render() {

    


    // const { user } = this.props.auth;
    const { errors, checked } = this.state;
    const { isLoading, user } = this.props.auth;
    console.log(this.state.event_name, 'jjc')

    return <div>

      <div>
        <form onSubmit={this.handleSubmit} autoComplete="off">
        <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="event_name">
                  Event name <span>*</span>
                </label>
                <span className="text-danger">{errors.event_name || ''}</span>
               
                <input
                  type="text"
                  name="event_name"
                  value={this.state.event_name}
                  onChange={this.hanldeChange}
                  className={classnames('form-control', {
                    invalid: errors.event_name
                  })}
                  required
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="event_capacity">
                  Event Capacity <span>*</span>
                </label>
                <span className="text-danger">{errors.event_capacity || ''}</span>
                <input
                  type="number"
                  name="event_capacity"
                  value={this.state.event_capacity}
                  onChange={this.hanldeChange}
                  className={classnames('form-control', {
                    invalid: errors.event_capacity
                  })}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="event_start">
                  Event start <span>*</span>
                </label>
                <span className="text-danger">{errors.event_start || ''}</span>
                <input
                  type="datetime-local"
                  name="event_start"
                  value={this.state.event_start}
                  onChange={this.hanldeChange}
                  className={classnames('form-control', {
                    invalid: errors.event_start
                  })}
                  required
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="event_end">
                  Event End <span>*</span>
                </label>
                <span className="text-danger">{errors.event_end || ''}</span>
                <input
                  type="datetime-local"
                  name="event_end"
                  value={this.state.event_end}
                  onChange={this.hanldeChange}
                  className={classnames('form-control', {
                    invalid: errors.event_end
                  })}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="event_cost">
                  Not Free <span>*</span>
                </label>
                <span className="text-danger">{errors.event_start || ''}</span>

                <Switch  checked={checked} onChange={this.switchHandler} />

                {this.state.checked?

                  <div>
                          <label htmlFor="event_cost">
                          Amount <span>*</span>
                        </label>
                      <input
                        type="number"
                        name="event_cost"
                        value={this.state.event_start}
                        onChange={this.hanldeChange}
                        className={classnames('form-control', {
                          invalid: errors.event_cost
                        })}
                        required
                      />

                </div>

                :

                ""
                
              
              }
               
              </div>
            </div>
            {/* <div className="col">
              <div className="form-group">
                <label htmlFor="event_end">
                  Event End <span>*</span>
                </label>
                <span className="text-danger">{errors.event_end || ''}</span>
                <input
                  type="datetime-local"
                  name="event_end"
                  value={this.state.event_end}
                  onChange={this.hanldeChange}
                  className={classnames('form-control', {
                    invalid: errors.event_end
                  })}
                  required
                />
              </div>
            </div> */}
          </div>





          <div style={{ textAlign: 'center' }}>
            <Button color="danger" disabled={isLoading}>
              {isLoading ? this.renderSpinner() : this.renderName()}
            </Button>
          </div>

      </form>

      
      </div>;
    </div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default withRouter(
  connect(
    mapStateToProps,
    {
      createEvent,
      editEvent,
      getEvents
      // searchStaff,
      // getStaffsByDepartment,
      // getAllDepartments,
      // getStaffsByLocation,
      // getStaff
    }
  )(EventForm)
);
    