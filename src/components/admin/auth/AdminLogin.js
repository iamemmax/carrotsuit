import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Col, Row, Button, Input, FormGroup, Label, Form } from 'reactstrap';
import { loginAdmin } from '../../../actions/authActions';
import {Link} from 'react-router-dom'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errMesg: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/admin/dashboard');
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = async e => {
    try {
      e.preventDefault();
      const { from } = this.props.location.state || { from: { pathName: '/admin/dashboard' } };
      const { history } = this.props;

      const userData = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.loginAdmin(userData, history, from);
    } catch (err) {
        console.log(err)
      this.setState({
        errMesg: err.response.data
      });
    }
  };
  handleSignupClick = e => {
    e.preventDefault();
    this.props.history.push('/register');
  };
  renderSpinner = () => {
    return (
      <div className="spinner-border text-light spinner-border-sm" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  render() {
    const { errMesg } = this.state;
    const { isLoading } = this.props.auth;

    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Col md={6} lg={4}>
          <Card body>
            <div className="login-wrapper">
              <Form onSubmit={this.onSubmit}>
                <div className="text-center pb-4">
                  <img
                    src={'/images/logo_200.png'}
                    className="rounded"
                    style={{ width: 60, height: 60, cursor: 'pointer' }}
                    alt="logo"
                  />
                </div>
                {errMesg && <div className="alert">{errMesg}</div>}
                <FormGroup>
                  <Label for="email">Email</Label>

                  <Input
                    onChange={this.onChange}
                    value={this.state.email}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    autoComplete="off"
                    className="form-control"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    onChange={this.onChange}
                    value={this.state.password}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    className="form-control"
                  />
                </FormGroup>
                <FormGroup check>
                    <Link to="/admin/forgot-password">Forgot password?</Link>
                </FormGroup>
                <hr />
                <Button
                  size="lg"
                  className="bg-gradient-theme-left border-0"
                  block
                  onClick={this.handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? this.renderSpinner() : 'Login'}
                </Button>
              </Form>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

Login.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginAdmin }
)(Login);
