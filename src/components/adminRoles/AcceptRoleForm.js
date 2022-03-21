import React, { Component } from 'react';
import { getAdminInvite, updateRole } from '../../actions/staffActions';
import queryString from 'query-string';
import './styles/acceptRoleForm.css';
import { Button } from 'reactstrap';
import Navbar from '../layout/Navbar';

class AcceptRoleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      role: '',
      password: '',
      location: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    if (query.id) {
      getAdminInvite(query.id).then(data => {
        if (data) {
          this.setState({
            email: data.email,
            role: data.role,
            location: data.location
          });
        }
      });
    }
  }
  handleSubmit(e) {
    e.preventDefault();

    updateRole(this.state).then(data => {
      if (data) this.props.history.push('/login');
    });
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  render() {
    const { email, role, password } = this.state;
    return (
      <div className="role-wrapper">
        <Navbar />
        <div className="container">
          <h4>Accept role invitation</h4>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">
                Email <span>*</span>
              </label>
              <input
                name="email"
                type="email"
                value={email}
                className="form-control"
                onChange={this.handleChange}
                required
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="role">
                Role <span>*</span>
              </label>
              <input
                name="role"
                type="text"
                value={role}
                required
                className="form-control"
                onChange={this.handleChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password <span>*</span>
              </label>
              <input
                name="password"
                type="password"
                value={password}
                required
                placeholder="Create your password"
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <br />
            <Button color="danger">Accept</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default AcceptRoleForm;
