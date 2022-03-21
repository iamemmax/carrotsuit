import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from "reactstrap";
import './accountConfigs.css';
import ToggleSwitch from '../../common/toggleSwitch/ToggleSwitch';
import { getCofigurations, editCofigurations, interviewRole } from '../../../actions/settingsActions';
import { FaClock, FaEdit, FaUserTie } from 'react-icons/fa'
import StaffNotif from './StaffNotif';
import SetTime from './SetTime';
import InviteNotif from './InviteNotif';
import DefaultHost from './DefaultHost';
import DefaultHostNotif from './DefaultHostNotif';
import IpadAdmin from "./IpadAdmin";
import WelcomeMessage from './WelomeMessage';
import HasAccess from '../../common/HasAccess';
import { ToggleButton } from './customizeFormFields/ToggleButton';
import DefaultHostCc from './DefaultHostCc';


class AccountConfigs extends Component {
  constructor(props) {
    super(props);
    // this.state = {selected: false};    

    this.state = {
      selected: true,
      selectedName: true,
      selectedLName: true,
      selectedRole: true,
        configs: {
        self_signout: false,
        auto_signout_all: false,
        host_notif: true,
        visitor_notif: true,
        require_pre_reg: false,
        signin_verification: false,
        frontdesk_notif: false,
        isPhoto_required: false,
        name: 'name',
        last_name: 'lastName',
        role: 'role',

        // selected: false,
      },
     
      showStaffCustomMsgPane: false,
      showSetTimePane: false,
      showInviteCustomMsgPane: false,
      showWelcomeCustomMsgPane: false,
      showDefaultHost: false,
      showDefaultHostCc: false,
      showDefaultHostNotif: false,
      showIpadAdmin: false
    };

    this.handleSwitch = this.handleSwitch.bind(this);
    this.saveConfigs = this.saveConfigs.bind(this);
    this.toggleStaffCustomMsgPane = this.toggleStaffCustomMsgPane.bind(this);
    this.toggleInviteCustomMsgPane = this.toggleInviteCustomMsgPane.bind(this);
    this.toggleSetTimePane = this.toggleSetTimePane.bind(this);
    this.toggleShowDefaultHost = this.toggleShowDefaultHost.bind(this);
    this.toggleShowDefaultHostCc = this.toggleShowDefaultHostCc.bind(this);
    this.toggleDefaultHostNotif = this.toggleDefaultHostNotif.bind(this);
    this.toggleShowIpadAdmin = this.toggleShowIpadAdmin.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.settings) {
      this.setState({
        configs: nextProps.settings.configs
      });
    }
  }
  componentDidMount() {
    this.props.getCofigurations();
    // this.state.name
    
  }
  toggleStaffCustomMsgPane() {
    this.setState({
      showStaffCustomMsgPane: !this.state.showStaffCustomMsgPane
    });
  }
  toggleInviteCustomMsgPane() {
    this.setState({
      showInviteCustomMsgPane: !this.state.showInviteCustomMsgPane
    });
  }
  toggleSetTimePane() {
    this.setState({
      showSetTimePane: !this.state.showSetTimePane
    });
  }
  toggleShowDefaultHost() {
    this.setState({
      showDefaultHost: !this.state.showDefaultHost
    });
  }
  toggleShowDefaultHostCc() {
    this.setState({
      showDefaultHostCc: !this.state.showDefaultHostCc
    });
  }
  toggleShowWelcomeCustomMsgPane = () => {
    this.setState({
      showWelcomeCustomMsgPane: !this.state.showWelcomeCustomMsgPane
    })
  }
  
  toggleShowIpadAdmin() {
    this.setState({
      showIpadAdmin: !this.state.showIpadAdmin
    });
  }
  toggleDefaultHostNotif() {
    this.setState({
      showDefaultHostNotif: !this.state.showDefaultHostNotif
    });
  }
  handleSwitch(type, value) {
    let configs = {
      ...this.state.configs,
      [type]: value
    };
    this.setState({
      configs
    });
  }
  saveConfigs() {
    this.props.editCofigurations(this.state.configs);
  }
  render() {
    const { settings, auth } = this.props;
    const { configs } = settings;
    const {user} = auth;
    return (
      <div className="configs-wrapper">
        <h3>Account Configurations</h3>
        <h6>Sign out</h6>
        <div className="sign-out wrapper">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Allow visitors to self sign out
              <ToggleSwitch
                handleSwitch={this.handleSwitch}
                type="self_signout"
                isChecked={configs.self_signout || false}
              />
            </li>
          </ul>
          <div className="card notifs wrapper">
            <div className="card-header">
              <div>
                <span>Automatically sign every one out</span>
                <button
                  className="btn btn-link text-primary btn-sm"
                  onClick={this.toggleSetTimePane}
                >
                  <FaClock size={12} /> Select time
                </button>
              </div>
              <ToggleSwitch
                handleSwitch={this.handleSwitch}
                type="auto_signout_all"
                isChecked={configs.auto_signout_all || false}
              />
            </div>
            {this.state.showSetTimePane && (
              <div className="card-body">
                <SetTime />
              </div>
            )}
          </div>
        </div>
        <h6>Notifications</h6>
        <div className="card notifs wrapper">
          <div className="card-header">
            <div>
              <span>Automatically notify employees when their visitors arrive</span>
              <button
                className="btn btn-link text-primary btn-sm"
                onClick={this.toggleStaffCustomMsgPane}
              >
                <FaEdit size={12} /> Customise message
              </button>
            </div>
            <ToggleSwitch
              handleSwitch={this.handleSwitch}
              type="host_notif"
              isChecked={configs.host_notif || true}
            />
          </div>
          {this.state.showStaffCustomMsgPane && (
            <div className="card-body">
              <StaffNotif hide={this.toggleStaffCustomMsgPane} />
            </div>
          )}
          <div className="card-header">
            <div>
              <span>Visitor invitation message</span>
              <button
                className="btn btn-link text-primary btn-sm"
                onClick={this.toggleInviteCustomMsgPane}
              >
                <FaEdit size={12} /> Customise the message
              </button>
            </div>
          </div>
          {this.state.showInviteCustomMsgPane && (
            <div className="card-body">
              <InviteNotif hide={this.toggleInviteCustomMsgPane} />
            </div>
          )}
          <div className="card-header">
              <div>
                <span>Automatically send visitors welcome message</span>
              <button
                className="btn btn-link text-primary btn-sm"
                onClick={this.toggleShowWelcomeCustomMsgPane}
              >
                <FaEdit size={12} /> Customise message
              </button>
              </div>
              
              <ToggleSwitch
                handleSwitch={this.handleSwitch}
                type="visitor_notif"
                isChecked={configs.visitor_notif || true}
              />
          </div>
          {this.state.showWelcomeCustomMsgPane && (
            <div className="card-body">
              <WelcomeMessage hide={this.toggleShowWelcomeCustomMsgPane} />
            </div>
          )}

          <div className="card-header">
            <div>
              <span>Select staff to be notified when iPad goes off</span>
              <button
                className="btn btn-link text-primary btn-sm"
                onClick={this.toggleShowIpadAdmin}
              >
                <FaUserTie size={12} /> Select staff
              </button>
            </div>
          </div>
          {this.state.showIpadAdmin && (
            <div className="card-body">
              <IpadAdmin />
            </div>
          )}

          {user.option === 'workspace' && !user.workspace_company ? null : ( 
          <div className="card-header">
            <div>
              <span>Default host notification from an unscheduled visitor</span>
              <button
                className="btn btn-link text-primary btn-sm"
                onClick={this.toggleShowDefaultHost}
              >
                <FaUserTie size={12} /> Select default host
              </button>
            </div>
          </div>)}
          {this.state.showDefaultHost && (
            <div className="card-body">
              <DefaultHost />
            </div>
          )}

          {user.option === 'workspace' && !user.workspace_company ? null : ( 
          <div className="card-header">
            <div>
              <span>Default host Vcc for visitors</span>
              <button
                className="btn btn-link text-primary btn-sm"
                onClick={this.toggleShowDefaultHostCc}
              >
                <FaUserTie size={12} /> Select default host
              </button>
            </div>
          </div>)}
          {this.state.showDefaultHostCc && (
            <div className="card-body">
              {/* <DefaultHost /> */}
              <DefaultHostCc/>
            </div>
          )}

          {user.option === 'workspace' && !user.workspace_company ? null : ( 
          <div className="card-header">
            <div>
              <span>Default host notification message</span>
              <button className="btn btn-link text-primary" onClick={this.toggleDefaultHostNotif}>
              <FaEdit size={12} /> Customise the message
              </button>
            </div>
          </div>)}
          {this.state.showDefaultHostNotif && (
            <div className="card-body">
              <DefaultHostNotif hide={this.toggleDefaultHostNotif} />
            </div>
          )}
        </div>
        <h6>Registration</h6>
        <div className="pre-registration wrapper">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Require visitors photo
              <ToggleSwitch
                handleSwitch={this.handleSwitch}
                type="isPhoto_required"
                isChecked={configs.isPhoto_required || false}
              />
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Enable appointment only mode
              <HasAccess
              plan={user.plan}
              perform="appointment-only:enable"
              yes={ () => 
                <ToggleSwitch
                handleSwitch={this.handleSwitch}
                type="require_pre_reg"
                isChecked={configs.require_pre_reg || false}
              />
              }
              no={() => <Button size="sm" color="danger" onClick={() => this.props.history.push('/dashboard/billing/1/plans')}>Upgrade to Premium</Button>}
               />
              
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Require admin approval when a visitor that is not pre-registered signs in.
              <ToggleSwitch
                handleSwitch={this.handleSwitch}
                type="signin_verification"
                isChecked={configs.signin_verification || false}
              />
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Email the Front Desk Admin every time a visitor is invited.
              <ToggleSwitch
                handleSwitch={this.handleSwitch}
                type="frontdesk_notif"
                isChecked={configs.frontdesk_notif || false}
              />
            </li>
          </ul>
        </div>
        <Button color="danger" onClick={this.saveConfigs}>
        Save changes
      </Button>
    
    
  {/* //////////////////////////////////////////////////////////// */}
   
      <h4>Customize Form Fields</h4>
      <h5>InterView</h5>
      <div className="card notifs wrapper">
          <div className="card-header">
            <div>
              <span>Role</span>
            </div>

            <ToggleButton
            selected={this.state.selectedRole}
            toggleSelected={() => {
              // setSelected(!selected);this.setState({name: 'name'});
              
            this.state.selectedRole? this.setState({role: 'role'}) : this.setState({role: ''})
              
            this.setState({selectedRole: !this.state.selectedRole});

              const formData = [{
                field:this.state.role

                }
              ]

              this.state.selectedRole? interviewRole(formData) : interviewRole(formData)
             console.log(this.state.role)
             
            }}
            />
          
          </div>

      </div>

      <h5>Consultant</h5>
      <div className="card notifs wrapper">
          <div className="card-header">
            <div>
              <span>Last Name</span>
            </div>

            <ToggleButton
            selected={this.state.selectedName}
            toggleSelected={() => {
              // setSelected(!selected);this.setState({name: 'name'});
              
            this.state.selectedName? this.setState({name: 'name'}) : this.setState({name: ''})
              this.setState({selectedName: !this.state.selectedName});
             console.log(this.state.name)
             
            }}
            />
          
          </div>

      </div>
      
        <div className="card notifs wrapper">
          <div className="card-header">
            <div>
              <span>Name</span>
            </div>

            <ToggleButton
            selected={this.state.selectedName}
            toggleSelected={() => {
              // setSelected(!selected);this.setState({name: 'name'});
            
            this.state.selectedName? this.setState({name: 'name'}) : this.setState({name: ''})
              this.setState({selectedName: !this.state.selectedName});
            
             console.log(this.state.name)
             
            }}
            />
          
          </div>
        
          <div className="card-header">
              <div>
                  <span>Last Name</span>
              
                </div>

                <ToggleButton
                selected={this.state.selectedLName}
                toggleSelected={() => {
                  // setSelected(!selected);this.setState({name: 'name'});
                  
                this.state.selectedLName? this.setState({last_name: 'lastname'}) : this.setState({last_name: ''})
                  this.setState({selectedLName: !this.state.selectedLName});
                console.log(this.state.last_name)
                
                }}
                />
          </div>
         
          <div className="card-header">
          <div>
                  <span>Name</span>
              
                </div>

                <ToggleButton
                selected={this.state.selected}
                toggleSelected={() => {
                  // setSelected(!selected);this.setState({name: 'name'});
                  
                this.state.selected? this.setState({name: 'name'}) : this.setState({name: ''})
                  this.setState({selected: !this.state.selected});
                console.log(this.state.name)
                
                }}
                />
          </div>
          {/* <div className="card-header">
          <div>
                  <span>Last Name</span>
              
                </div>

                <ToggleButton
                selected={this.state.selected}
                toggleSelected={() => {
                  // setSelected(!selected);this.setState({name: 'name'});
                  
                this.state.selected? this.setState({lastName: 'lastName'}) : this.setState({name: ''})
                  this.setState({selected: !this.state.selected});
                console.log(this.state.name)
                
                }}
                />
          </div>
          <div className="card-header">
          <div>
                  <span></span>
              
                </div>

                <ToggleButton
                selected={this.state.selected}
                toggleSelected={() => {
                  // setSelected(!selected);this.setState({name: 'name'});
                  
                this.state.selected? this.setState({name: 'name'}) : this.setState({name: ''})
                  this.setState({selected: !this.state.selected});
                console.log(this.state.name)
                
                }}
                />
          </div>
          
           */}

      

      
         
       
        </div>
      
     
      </div>
      
    );
  }
}
const mapStateToProps = state => ({
  settings: state.settings,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {
    getCofigurations,
    editCofigurations
  }
)(AccountConfigs);
