import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStaff, getWorkspaceCompanies, getEstateHouses } from '../../actions/staffActions';
import { registerVisitor,  getVisitors } from '../../actions/visitorActions';
import SwalToaste from '../common/SwalToaste';
import 'react-phone-input-2/lib/style.css';
import { Button } from 'reactstrap';

class VisitorReturnForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 3,
      data: {},
      staff: null,
      query: '',
      showStaffList: false,
      showCustomPurpose: false,
      company: null,
      estate_house: null,
      companies: [],
      showCompanyList: false,
      selectedCompany: { name: '' },
      house_query: '',
      company_query: '',
      showHouseList: false,
      selectedHouse: { block_no: '' }
    };
    this.renderStaffSelect = this.renderStaffSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleStaffSelect = this.handleStaffSelect.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      data: { ...this.state.data, [name]: value }
    });
  }
  async componentDidMount() {
    await this.props.getStaff();
    await this.props.getWorkspaceCompanies(1, 300);
    await this.props.getEstateHouses(1, 500);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.visitor) {
      const data = {};

      this.props.visitor.formData.map(field => {
        data[field.field_name] = field.field_value;
      });
      this.setState({
        data
      });
    }
  }
  handleStaffSelect(staff) {
    this.setState({
      staff: staff.id,
      query: `${staff.first_name} ${staff.last_name}`,
      showStaffList: false
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { data, staff, company, estate_house } = this.state;
    const visitorData = {
      ...data,
      staff,
      phone_number: this.props.data.phone_number,
      purpose: this.props.data.purpose,
      name: this.props.data.visitorName,
      jor: 'hjdjd',
      company,
      estate_house
    };

    this.props
      .registerVisitor(visitorData)
      .then(data => {
        if (data) {
          this.props.closeModal();
          SwalToaste.fire({
            icon: 'success',
            title: 'Visitor signed in'
          });
          this.props.getVisitors(1, 10);
        }
      })
      .catch(err => {
        SwalToaste.fire({
          icon: 'error',
          title: err.response.data
        });
      });
  }
  renderStaffSelect() {
    const { staffs } = this.props.staff;
    const { query, showStaffList } = this.state;
    return (
      <div className="form-group">
        <label htmlFor="satff"> Host</label>
        <input
          type="search"
          name="query"
          value={query}
          autoComplete="off"
          onChange={e => this.setState({ query: e.target.value })}
          placeholder="search"
          className="form-control"
          onFocus={e => this.setState({ showStaffList: true })}
        />
        {showStaffList && (
          <ul className="staff-list">
            {staffs
              .filter(staff => staff.first_name.toLowerCase().includes(query.toLowerCase()))
              .map(staff => (
                <li key={staff.id} onClick={() => this.handleStaffSelect(staff)}>
                  {staff.first_name} {staff.last_name}
                </li>
              ))}
          </ul>
        )}
      </div>
    );
  }
  renderSpinner = () => {
    return (
      <div className="spinner-border text-light spinner-border-sm" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  // go back to prev form
  handleBackClick(e) {
    e.preventDefault();
    this.props.setCurrent(this.state.step - 2);
  }
  renderCompanySelect() {
    const { companies } = this.props.workspace;
    const { company_query, showCompanyList } = this.state;
    const { user } = this.props.auth;
    if (user.option === 'workspace')
      return (
        <div className="col">
          <div className="form-group">
            <label htmlFor="satff">
              {' '}
              company <span>*</span>{' '}
            </label>
            <input
              type="search"
              name="query"
              value={company_query}
              required
              autoComplete="off"
              onChange={e => this.setState({ company_query: e.target.value })}
              placeholder="search"
              className="form-control"
              onFocus={e => this.setState({ showCompanyList: true })}
            />
            {showCompanyList && (
              <ul className="company-list">
                {companies
                  .filter(company => company.name.toLowerCase().includes(company_query.toLowerCase()))
                  .map(company => (
                    <li key={company.id} onClick={() => this.handleCompanySelect(company)}>
                      {company.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      );
    return null;
  }
  // render house selection for estate use case
  renderHouseSelect = () => {
    const { houses } = this.props.estate;
    const { house_query, showHouseList } = this.state;
    const { user } = this.props.auth;
    if (user.option === 'estate')
      return (
        <div className="col">
          <div className="form-group">
            <label htmlFor="satff">
              {' '}
              house number <span>*</span>{' '}
            </label>
            <input
              type="search"
              name="house_query"
              value={house_query}
              required
              autoComplete="off"
              onChange={e => this.setState({ house_query: e.target.value })}
              placeholder="search"
              className="form-control"
              onFocus={e => this.setState({ showHouseList: true })}
            />
            {showHouseList && (
              <ul className="company-list">
                {houses
                  .filter(house => house.block_no.toLowerCase().includes(house_query.toLowerCase()))
                  .map(house => (
                    <li key={house.id} onClick={() => this.handleHouseSelect(house)}>
                      {house.block_no}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      );
    return null;
  };
  // handles company selection
  handleCompanySelect(company) {
    this.setState({
      company: company.id,
      company_query: company.name,
      showCompanyList: false
    });
  }
  // handles estate house selection
  handleHouseSelect = house => {
    this.setState({
      estate_house: house.id,
      house_query: house.block_no,
      showHouseList: false
    });
  };
  render() {
    const { formData } = this.props.visitor;
    const { isLoading, user } = this.props.auth;
    if (this.state.step === this.props.currentStep)
      return (
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="row">
            {formData &&
              formData.map(field => {
                if (field.field_type === 'text' && field.field_name !== 'phone_number') {
                  return (
                    <div className="col-sm-6" key={field.id}>
                      <div className="form-group">
                        <label htmlFor={field.field_name}>
                          {field.field_name} {field.is_required && <span>*</span>}
                        </label>
                        <input
                          name={field.field_name}
                          type="text"
                          defaultValue={field.field_value}
                          required={field.is_required}
                          onChange={this.handleChange}
                          className="form-control"
                          style={{ border: 'none', borderBottom: '1px solid #ccc' }}
                        />
                      </div>
                    </div>
                  );
                }
                if (field.field_type === 'select')
                  return (
                    <div className="col-sm-6" key={field.id}>
                      <div className="form-group">
                        <label htmlFor={field.field_name}>
                          {field.field_name} {field.is_required && <span>*</span>}
                        </label>
                        <select
                          name={field.field_name}
                          required={field.is_required}
                          value={field.field_value}
                          onChange={this.handleChange}
                          className="form-control"
                          style={{ border: 'none', borderBottom: '1px solid #ccc' }}
                        >
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
          {user.option === 'estate' && this.renderHouseSelect()}
          {user.option === 'workspace' && this.renderCompanySelect()}
          {this.renderStaffSelect()}
          <div className="form-group">
            <label>Private note</label>
            <textarea name="private_note" className="form-control" onChange={this.handleChange} />
          </div>
          <div style={{textAlign:"center"}}>
            <Button outline color="danger" onClick={this.handleBackClick}>
              Back
            </Button>
            {" "}
            <Button color="danger">
              {isLoading ? this.renderSpinner() : 'Next'}
            </Button>
          </div>
        </form>
      );
    return null;
  }
}
const mapStateToProps = state => ({
  visitor: state.visitor,
  staff: state.staff,
  auth: state.auth,
  errors: state.errors,
  workspace: state.workspace,
  estate: state.estate
});
export default connect(
  mapStateToProps,
  {
    getStaff,
    registerVisitor,
    getVisitors,
    getWorkspaceCompanies,
    getEstateHouses
  }
)(VisitorReturnForm);
