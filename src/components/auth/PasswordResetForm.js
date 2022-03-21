import React, { Component } from 'react';
import { Form, Input, Button, FormGroup, Label, Spinner, Row, Col, Card, Alert } from 'reactstrap';
import PropTypes from 'prop-types';

class PasswordResetForm extends Component {
  state = { password: '', errMesg: '', isLoading: false };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
        isLoading: true,
        errMesg: ''
      });
    try {
     const {token, resetPassword, history} = this.props;
     const {password} = this.state

     await resetPassword({password, token}, history)

     this.setState({
         isLoading: false
     })
    } catch (err) {
      this.setState({
        errMesg: err.response.data,
        isLoading: false
      });
    }
  };
  render() {
    const { errMesg, isLoading, password } = this.state;
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
            <Form onSubmit={this.handleSubmit}>
              <div className="text-center pb-4">
                <img
                  src={'/images/logo_200.png'}
                  className="rounded"
                  style={{ width: 150, height: 150, cursor: 'pointer' }}
                  alt="logo"
                />
              </div>
              {errMesg && <Alert color="danger">{errMesg}</Alert>}
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  onChange={this.handleInputChange}
                  value={password}
                  id="email"
                  name="password"
                  type="password"
                  placeholder="Enter your new password"
                  required
                  autoComplete="off"
                />
              </FormGroup>

              <hr />
              <Button
                size="lg"
                className="bg-gradient-theme-left border-0"
                block
                onClick={this.handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? <Spinner color="danger" size="sm" /> : 'Submit'}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}
PasswordResetForm.propTypes = {
    resetPassword: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
  };
export default PasswordResetForm;
