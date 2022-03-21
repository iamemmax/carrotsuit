import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getOneStaff,
  editStaff,
  editProfilePix,
  updateNotifOption
} from '../../actions/staffActions';
import { enableSms, enableEmail } from '../../actions/settingsActions';
import classnames from 'classnames';
import ShortLinkForm from './ShortLinkForm';
import Modal from '../common/modal/Modal';
import './styles/staffProfile.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import HasAccess from '../common/HasAccess';

class StaffProfile extends Component {
  constructor(props) {
    super(props);
    this.fileRef = React.createRef();
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      appointment_only: false,
      msg_opt: 0,
      errors: {},
      errorMessage: '',
      notif_option: 0,
      showInviteLinkModal: false
    };
    this.hanldeChange = this.hanldeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.openFile = this.openFile.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
    this.openInviteLinkModal = this.openInviteLinkModal.bind(this);
    this.closeInviteLinkModal = this.closeInviteLinkModal.bind(this);
    this.updateNotifOptions = this.updateNotifOptions.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        errorMessage: nextProps.errors.message
      });
    }
  }
  componentDidMount() {
    const { user } = this.props.auth;
    this.props.getOneStaff(user.id).then(staff => {
      if (staff) {
        this.setState({
          first_name: staff.first_name,
          last_name: staff.last_name,
          email: staff.email,
          phone_number: staff.phone_number,
          msg_opt: staff.notification,
          notif_option: staff.notif_option,
          appointment_only: staff.appointment_only
        });
      }
    });
  }
  hanldeChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }
  handleSwitch(e) {
    const { value } = e.currentTarget;
    this.setState({
      msg_opt: value
    });

    if (value == 0) {
      enableEmail();
    } else if (value == 1) {
      enableSms();
    }
  }
  updateNotifOptions(e) {
    const { value } = e.currentTarget;
    this.setState({
      notif_option: value
    });
    updateNotifOption(value);
  }
  uploadAvatar(e) {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('profilePicture', file);
    this.props.editProfilePix(formData);
  }
  handleSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    this.props.editStaff(user.id, {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone_number: this.state.phone_number,
      staff_position: this.state.staff_position,
      appointment_only: this.state.appointment_only
    });
  }
  openInviteLinkModal() {
    this.setState({
      showInviteLinkModal: true
    });
  }
  closeInviteLinkModal() {
    this.setState({
      showInviteLinkModal: false
    });
  }
  openFile() {
    this.fileRef.current.click();
  }
  renderSpinner = () => {
    return (
      <div className="spinner-border text-light spinner-border-sm" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  handleUpgradeClick = e => {
    e.preventDefault();
    this.props.history.push('/dashboard/billing/1/plans');
  };
  render() {
    const { errors, notif_option, msg_opt } = this.state;
    const { isLoading, user } = this.props.auth;
    const { company } = this.props.settings;
    return (
      <div className="staff-profile">
        <div className="profile">
          <div className="profile-wrapper">
            <div className="image_wrapper">
              <img src={user.avatar || '/images/defaultAvatar.png'} alt="profile pix" />
            </div>
          </div>
          <div className="staff-intro">
            <div className="staff-name">
              <div className="name">
                {' '}
                {user.first_name} {user.last_name}{' '}
              </div>
              <button className="btn btn-link" onClick={this.openFile}>
                Change avatar
              </button>
              <input
                type="file"
                onChange={this.uploadAvatar}
                accept="image/*"
                ref={this.fileRef}
                hidden
              />
            </div>
            <div>
              <Button outline size="sm" color="danger" onClick={this.openInviteLinkModal}>
                Send invite
              </Button>
            </div>
          </div>
        </div>
        <div className="main">
          <Card style={{ width: '100%', height: '100%' }}>
            <CardBody style={{ width: '100%', height: '100%' }}>
              <form onSubmit={this.handleSubmit}>
                <h5>Edit Profile</h5>
                {this.state.errorMessage && (
                  <div className="alert alert-danger">{this.state.errorMessage}</div>
                )}
                <div className="form-group">
                  <label htmlFor="first_name">
                    First name <span>*</span>
                  </label>
                  <span className="text-danger">{errors.first_name || ''}</span>
                  <input
                    type="text"
                    name="first_name"
                    value={this.state.first_name}
                    onChange={this.hanldeChange}
                    className={classnames('form-control', {
                      invalid: errors.first_name
                    })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">
                    Last name <span>*</span>
                  </label>
                  <span className="text-danger">{errors.last_name || ''}</span>
                  <input
                    type="text"
                    name="last_name"
                    value={this.state.last_name}
                    onChange={this.hanldeChange}
                    className={classnames('form-control', {
                      invalid: errors.last_name
                    })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone_number">
                    Phone number <span>*</span>
                  </label>
                  <span className="text-danger">{errors.phone_number || ''}</span>
                  <br />
                  <PhoneInput
                    country={company.country ? company.country.toLowerCase() : 'us'}
                    value={this.state.phone_number}
                    onChange={phone_number => this.setState({ phone_number })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    Email <span>*</span>
                  </label>
                  <span className="text-danger">{errors.email || ''}</span>
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.hanldeChange}
                    className={classnames('form-control', {
                      invalid: errors.email
                    })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Enable appointment only mode</label>{' '}
                  <HasAccess
                    plan={user.plan}
                    perform="appointment-only:enable"
                    yes={() => (
                      <input
                        type="checkbox"
                        name="appointment_only"
                        checked={this.state.appointment_only}
                        onChange={e =>
                          this.setState({
                            appointment_only: e.target.checked
                          })
                        }
                      />
                    )}
                    no={() => (
                      <button
                        className="btn btn-link text-primary"
                        onClick={this.handleUpgradeClick}
                      >
                        Upgrade to Basic
                      </button>
                    )}
                  />
                </div>
                <Button color="danger" disabled={isLoading}>
                  {isLoading ? this.renderSpinner() : 'Save changes'}
                </Button>
              </form>
              <div className="staff-notif">
                <h5>Notification settings</h5>
                <p>How would you like to be notified when your visitors arrive?</p>
                <Form>
                  <FormGroup tag="fieldset">
                    <ul>
                      <li>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="radio"
                              name="msg_option"
                              onChange={this.handleSwitch}
                              checked={msg_opt == 0 ? true : false}
                              value={0}
                            />{' '}
                            Enable notification through email
                          </Label>
                        </FormGroup>
                        <br />
                      </li>
                      <li>
                        <FormGroup check>
                          <Label check>
                            <HasAccess
                              plan={user.plan}
                              perform="sms-notif"
                              yes={() => (
                                <Input
                                  type="radio"
                                  name="msg_option"
                                  onChange={this.handleSwitch}
                                  value={1}
                                  checked={msg_opt == 1 ? true : false}
                                />
                              )}
                              no={() => (
                                <button
                                  className="btn btn-link text-primary"
                                  onClick={this.handleUpgradeClick}
                                >
                                  Premiun
                                </button>
                              )}
                            />
                            {''}Enable notification through SMS
                          </Label>
                        </FormGroup>
                        <br />
                      </li>
                    </ul>
                  </FormGroup>
                </Form>
                <p>Who should be notified when your visitors arrive?</p>
                <Form>
                  <FormGroup tag="fieldset">
                    <ul>
                      <li>
                        <FormGroup check>
                          <Label check>
                            <Input
                              type="radio"
                              name="notif_option"
                              onChange={this.updateNotifOptions}
                              checked={notif_option == 0 ? true : false}
                              value={0}
                            />{' '}
                            Me only
                          </Label>
                        </FormGroup>
                        <br />
                      </li>
                      <li>
                        <FormGroup check>
                          <Label check>
                            <HasAccess
                              plan={user.plan}
                              perform="assistant_notif"
                              yes={() => (
                                <Input
                                  type="radio"
                                  name="notif_option"
                                  onChange={this.updateNotifOptions}
                                  value={1}
                                  checked={notif_option == 1 ? true : false}
                                />
                              )}
                              no={() => (
                                <button
                                  className="btn btn-sm btn-link text-primary"
                                  onClick={this.handleUpgradeClick}
                                >
                                  Premium
                                </button>
                              )}
                            />{' '}
                            My assistant only
                            
                          </Label>
                        </FormGroup>
                        <br />
                      </li>
                      <li>
                        <FormGroup check>
                          <Label check>
                            <HasAccess
                              plan={user.plan}
                              perform="assistant_notif"
                              yes={() => (
                                <Input
                                  type="radio"
                                  name="notif_option"
                                  onChange={this.updateNotifOptions}
                                  value={2}
                                  checked={notif_option == 2 ? true : false}
                                />
                              )}
                              no={() => (
                                <button
                                  className="btn btn-sm btn-link text-primary"
                                  onClick={this.handleUpgradeClick}
                                >
                                  Premium
                                </button>
                              )}
                            />{' '}
                            Me and my assistant
                          </Label>
                        </FormGroup>
                      </li>
                    </ul>
                  </FormGroup>
                </Form>
              </div>
            </CardBody>
          </Card>
        </div>
        <Modal
          header="Send invite link"
          show={this.state.showInviteLinkModal}
          close={this.closeInviteLinkModal}
        >
          <ShortLinkForm closeModal={this.closeInviteLinkModal} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  settings: state.settings
});

export default connect(
  mapStateToProps,
  {
    editStaff,
    getOneStaff,
    editProfilePix
  }
)(StaffProfile);
