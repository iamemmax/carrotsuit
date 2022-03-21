import React, { Component } from 'react';
import Modal from '../../common/modal/Modal';
import { Button, Nav, Navbar, NavItem } from 'reactstrap';
import { FaUserPlus } from 'react-icons/fa';
import SearchInput from '../../includes/SearchInput';
import Can from '../../common/Can';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import bn from '../../../utils/bemnames';


import classnames from 'classnames';
// import { createEvent, editEvent, getEvents } from '../../actions/eventsActions';
import { Switch } from '@material-ui/core';
import { getBranchCode, setBranchCode } from '../../../actions/settingsActions';

const bem = bn.create('header');



class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
    location_code:'',
    errors: {},
    errorMessage: '',
    event_cost: '',
    free: false,
    checked: '',
    retrieved_branch_code: ''

     
    };
      this.hanldeChange = this.hanldeChange.bind(this);
      this.renderSpinner = this.renderSpinner.bind(this);
      this.renderName = this.renderName.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.getBranchCode = this.getBranchCode.bind(this);
  }

  componentDidMount(){

    this.getBranchCode()
  }


  async getBranchCode(){


    await getBranchCode().then(data=>{
      console.log(data)
      if(data){
        this.setState({
          retrieved_branch_code: data.branch_code
        })
      }
    })


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




//   switchHandler = (event) => {

//     var label = 'label'
//     console.log(event.target, 'ioppppppp')
//     console.log(event.props, 'ioppppppp')

//     this.setState({
//         checked: !this.state.checked,
//         free: !this.state.checked,
//         event_cost: 'null'
//     })
//     // setChecked(event.target.checked);
//   };


    async handleSubmit(e) {
      e.preventDefault();

      // console.log(this.state.event_name, 'kkkkkiiiiikkkkkkkk')

      const data = {
       
        location_code: this.state.location_code

      };
      setBranchCode(data).then(async(data)=>{
        console.log(data, 'kkkkkkiikkkkkk')

        if(data){
          await getBranchCode().then(data=>{
            console.log(data)
            if(data){
              this.setState({
                retrieved_branch_code: data.branch_code
              })
            }
          })
        }
        
       
      })


     

     
      

    //   if (this.props.id) {

        
    //     this.props.editEvent(this.props.id, data).then(data => {
    //       if (data) {
    //         this.props.closeModal();
    //         this.props.getEvents();
    //         console.log('dododkdkdkeiee')
    //       }
    //     });
    //   } else
      
    //   await this.props.createEvent(data).then(data=> {
    //       if (data) {
    //         // this.props.closeAddStaffModal();
    //         this.props.closeModal()
    //         this.props.getEvents();
            
    //       }
    //     });
    
  

      
  }


    
  render() {

    


    // const { user } = this.props.auth;
    const { errors, checked, retrieved_branch_code } = this.state;
    const { isLoading, user } = this.props.auth;
    console.log(this.state.event_name, 'jjc')

    return <div>


      <div> <b>Branch Code:</b> {retrieved_branch_code}</div>

      <div>
        <form onSubmit={this.handleSubmit} autoComplete="off">
        <div className="row">
           
              <div className="form-group">
                <label htmlFor="event_name">
                  Branch code <span></span>
                </label>
                <span className="text-danger">{errors.location_code || ''}</span>
               
                <input
                  type="text"
                  name="location_code"
                  value={this.state.location_code}
                  onChange={this.hanldeChange}
                  className={classnames('form-control', {
                    invalid: errors.location_code
                  })}
                  required
                />
              </div>
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
      getBranchCode
    //   createEvent,
    //   editEvent,
    //   getEvents
      // searchStaff,
      // getStaffsByDepartment,
      // getAllDepartments,
      // getStaffsByLocation,
      // getStaff
    }
  )(EventForm)
);
    