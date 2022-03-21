import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addEstateHouse, editHouse } from '../../actions/staffActions';
import classnames from 'classnames';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button } from 'reactstrap';
import HasAccess from '../common/HasAccess'

class HouseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: this.props.first_name || '',
      last_name: this.props.last_name || '',
      block_no: this.props.block_no || '',
      email: this.props.email || '',
      phone_number: this.props.phone_number || '',
      features: this.props.features || '',
      appointment_only: this.props.appointment_only || false,
      errors: {},
      errorMessage: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        errorMessage: nextProps.errors.message
      });
    }
  }
  hanldeChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone_number: this.state.phone_number,
      block_no: this.state.block_no,
      features: this.state.features,
      status: this.state.status,
      appointment_only: this.state.appointment_only
    };
    this.props
      .addEstateHouse(data)
      .then(data => {
        if (data) {
          this.props.closeModal();
        }
      })
      .catch(err => {
        this.setState({
          errorMessage: err.response.data
        });
      });
  };

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
  handleUpgradeClick = e => {
    e.preventDefault();
    this.props.history.push('/dashboard/billing/1/plans');
  };
  render() {
    const { errors } = this.state;
    const { isLoading, user } = this.props.auth;
    const { company } = this.props.settings;
    return (
      <div className="staff-form">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          {this.state.errorMessage && (
            <div className="alert alert-danger">{this.state.errorMessage}</div>
          )}
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="first_name">
                  House Numbering <span>*</span>
                </label>
                <span className="text-danger">{errors.first_name || ''}</span>
                <input
                  type="text"
                  name="block_no"
                  value={this.state.block_no}
                  onChange={this.hanldeChange}
                  className={classnames('form-control', {
                    invalid: errors.block_no
                  })}
                  required
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="first_name">
                  Occupant Firstname <span>*</span>
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
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="last_name">
                  Occupant Lastname <span>*</span>
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
            </div>
            <div className="col">
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
            </div>
          </div>
          <div className="row">
            <div className="col">
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
            </div>
            <div className="col">
              <div className="form-group">
                <label>Appointment only mode</label> {' '}
                <HasAccess
                plan={user.plan}
                perform="appointment-only:enable"
                yes={() => 
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
                }
                no={() => 
                  <button className="btn btn-sm btn-link text-primary" onClick={this.handleUpgradeClick}>Upgrade to Basic</button>
                }
                 />
                
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="staff_position">Any description?</label>
                <span className="text-danger">{errors.company_name || ''}</span>
                <textarea
                  name="features"
                  value={this.state.features}
                  onChange={this.hanldeChange}
                  className={classnames('form-control', {
                    invalid: errors.features
                  })}
                />
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button color="danger" disabled={isLoading}>
              {isLoading ? this.renderSpinner() : this.renderName()}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth,
  settings: state.settings
});
export default connect(
  mapStateToProps,
  {
    addEstateHouse,
    editHouse
  }
)(HouseForm);
