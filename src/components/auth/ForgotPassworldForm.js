import React, { Component } from 'react';
import { Form, Input, Button, FormGroup, Label, Alert, Spinner, Row, Card, Col } from 'reactstrap';
import PropTypes from 'prop-types';

class ForgotPasswordForm extends Component {
  state = { email: '', errMesg: '', isLoading: false };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = async e => {
    e.preventDefault();

    this.setState({
      isLoading: true
    });

    try {
      const { email } = this.state;

      await this.props.forgotPassword(email);
      this.setState({
        isLoading: false
      });
    } catch (err) {
      this.setState({
        errMesg: err.response.data,
        isLoading: false
      });
    }
  };
  render() {
    const { errMesg, isLoading, email } = this.state;
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
              {errMesg && <Alert>{errMesg}</Alert>}
              <p>Enter your email address to request for a new password</p>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  onChange={this.handleInputChange}
                  value={email}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
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
ForgotPasswordForm.propTypes = {
  forgotPassword: PropTypes.func.isRequired
};
export default ForgotPasswordForm;
