import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Button } from 'reactstrap';
import { getScheduleFormData, sendSchedule, getPurposes } from '../../actions/appointmentActions';
import './styles/clientSchedule.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Navbar from '../layout/Navbar'

class ClientSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      purposes: [],
      data: {},
      phone_number: '',
      visit_type: null,
      errMessage: '',
      showVisitorForm: false
    };
  }
  componentDidMount() {
    const token = this.getToken();
    if (token) {
      getPurposes(token).then(data => {
        console.log(data, 'kkkkkkkkkkpppkkkkkkkkkkkkk')
        if (data) {
          this.setState({
            purposes: data
          });
        }
      });
    }
  }
  getToken() {
    const query = queryString.parse(this.props.location.search);
    return query.token;
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      data: { ...this.state.data, [name]: value }
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const token = this.getToken();
    const { data, visit_type, phone_number } = this.state;

    sendSchedule(token, { ...data, purpose: visit_type, phone_number })
      .then(() => {
        console.log('succes');
      })
      .catch(err => {
        console.log('jjdjde', err);
        this.setState({
          errMessage: err
        });
      });
  };

  getFields = e => {
    e.preventDefault();
    const token = this.getToken();
    const { visit_type } = this.state;

    this.props.getScheduleFormData(token, visit_type);
  };
  renderSpinner = () => {
    return (
      <div className="spinner-border text-primary spinner-border-sm" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  render() {
    const { errMessage, purposes } = this.state;
    const { formData } = this.props.visitor;
    const { isLoading } = this.props.auth;
    return (
      <div className="client-schedule">
        <Navbar />
        <div className="client-schedule-form">
          <h4>Schedule a visit</h4>

          {!formData.length ? (
            <form onSubmit={this.getFields}>
              <p>Select purpose</p>
              <select
                name="visit_type"
                onChange={e => this.setState({ visit_type: e.target.value })}
                className="form-control"
              >
                <option defaultValue>select purpose</option>
                {purposes && purposes.length &&
                  purposes.map(purpose => (
                    <option key={purpose.id} value={purpose.purpose}>
                      {purpose.purpose}
                    </option>
                  ))}
              </select>
              <br />
              <Button color="danger">Send</Button>
            </form>
          ) : (
            <form onSubmit={this.handleSubmit} autoComplete="false">
              {errMessage && <div className="alert">{errMessage}</div>}
              <div className="row">
                {formData &&
                  formData.map(field => {
                    if (field.field_type === 'text') {
                      return (
                        <div className="col-sm-6" key={field.id}>
                          <div className="form-group">
                            <label htmlFor={field.field_name} style={{textTransform: 'capitalize'}}>
                              {field.field_name} {field.is_required && <span>*</span>}
                            </label>
                            {field.field_name === 'phone_number' ? (
                              <PhoneInput
                                country="us"
                                value={this.state.phone_number}
                                onChange={phone_number => {
                                  this.setState({
                                    phone_number
                                  });
                                }}
                              />
                            ) : (
                              <input
                                name={field.field_name}
                                type="text"
                                required={field.is_required}
                                onChange={this.handleChange}
                                className="form-control"
                                style={{ border: 'none', borderBottom: '1px solid #ccc' }}
                              />
                            )}
                          </div>
                        </div>
                      );
                    }
                    if (field.field_type === 'select' && field.field_name !== 'purpose')
                      return (
                        <div className="col-sm-6" key={field.id}>
                          <div className="form-group">
                            <label htmlFor={field.field_name} style={{textTransform: 'capitalize'}}>
                              {field.field_name} {field.is_required && <span>*</span>}
                            </label>
                            <select
                              name={field.field_name}
                              required={field.is_required}
                              onChange={this.handleChange}
                              className="form-control"
                              style={{ border: 'none', borderBottom: '1px solid #ccc' }}
                            >
                              <option>{`Select ${field.field_name}`}</option>
                              {field.options &&
                                field.options.map(option => (
                                  <option key={option.id} value={option.option_name}>
                                    {option.option_name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      );
                  })}
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="day">
                      Invite date <span>*</span>
                    </label>
                    <input
                      type="date"
                      name="day"
                      onChange={this.handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="day">
                      Invite time <span>*</span>
                    </label>
                    <input
                      type="time"
                      name="time"
                      onChange={this.handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              </div>
              <Button color="danger">{isLoading ? this.renderSpinner() : 'Submit'}</Button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  visitor: state.visitor,
  auth: state.auth,
  errors: state.errors,
  visitor: state.visitor
});
export default connect(
  mapStateToProps,
  {
    getScheduleFormData
  }
)(ClientSchedule);
