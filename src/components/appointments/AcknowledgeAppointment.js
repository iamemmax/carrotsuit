import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Swal from 'sweetalert2';
import {
  getFormData,
  acknowledgeAppointment,
  getVisitorAppointment
} from '../../actions/appointmentActions';
import './styles/acknowledgeAppointment.css';
import { Button } from 'reactstrap';
import Navbar from '../layout/Navbar';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

class AcknowledgeAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staff: '',
      data: {},
      phone_number: '',
      errMessage: '',
      visitorAppointment: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errMessage: nextProps.errors.message
      });
    }
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      data: { ...this.state.data, [name]: value }
    });
  }

  getToken() {
    const query = queryString.parse(this.props.location.search);
    return query.token;
  }
  componentDidMount() {
    const token = this.getToken();
    console.log(token, 'kkkkkkkkkkkk')
    if (token) {
      this.props.getFormData(token);
      getVisitorAppointment(token).then(data => {
        if (data) {
          console.log(data, 'jjjjjjjjjj..........hhhh')
          this.setState({
            visitorAppointment: data
          });
        }
      });
    }
  }
  handleSubmit(e) {
    const token = this.getToken();
    e.preventDefault();

    const { data, phone_number, visitorAppointment } = this.state;
    const visitorData = { ...data, phone_number, purpose: visitorAppointment.purpose }
    this.props
      .acknowledgeAppointment(token, visitorData)
      .then(datum => {
        if (!datum) return;
        Swal.fire({
          title: '<strong>Invitation Acknowledged</strong>',
          icon: 'success',
          html: `Your invite has been acknowledged
            Your invitation ID is <strong>${datum.uid}</strong>.
            <em>${datum.message}</em>`,
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
          confirmButtonAriaLabel: 'Thumbs up, great!'
        });
      });
  }

  renderSpinner = () => {
    return (
      <div className="spinner-border text-light spinner-border-sm" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  render() {
    const { errMessage, visitorAppointment } = this.state;
    const { formData } = this.props.visitor;
    const { isLoading } = this.props.auth;
 
      return (
        <div className="container-wrapper">
          <Navbar />
          <div className="acknowledge-container">
            {visitorAppointment && (
              <div className="appointment-info">
                <h3> Company--
                  {visitorAppointment.companyInfo
                    ? visitorAppointment.companyInfo.name
                    : visitorAppointment[0].company}
                </h3>
                <div>
                  <h4>Purpose: {visitorAppointment[0].purpose || 'Not specified'}</h4>
                  <small>
                    Date: {new Date(visitorAppointment[0].day_of_appoint).getDate()} /{' '}
                    {new Date(visitorAppointment[0].day_of_appoint).getMonth()} /{' '}
                    {new Date(visitorAppointment[0].day_of_appoint).getFullYear()}
                  </small>
                  <small>Time:{visitorAppointment[0].time_of_appoint}hrs</small>
                  <small>
                    Host:{' '}
                    {visitorAppointment[0].hostInfo ? visitorAppointment[0].hostInfo.first_name : ''}
                  </small>
                  <br />
                </div>
              </div>
            )}
            <form onSubmit={this.handleSubmit}>
              <h5>Visit Acknowledgement</h5>
              <br />
              <p>Enter your information in the form below</p>
              {errMessage && <div className="alert alert-danger">{errMessage}</div>}

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
                    if (field.field_type === 'select')
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
              <div className="btn-group">
                <Button color="danger">{isLoading ? this.renderSpinner() : 'Acknowledge'}</Button>
              </div>
            </form>
          </div>
        </div>
      );
    // return <div>Broken linkk</div>;
  }
}
const mapStateToProps = state => ({
  visitor: state.visitor,
  staff: state.staff,
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {
    acknowledgeAppointment,
    getFormData
  }
)(AcknowledgeAppointment);
