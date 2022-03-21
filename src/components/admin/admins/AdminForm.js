import React, { Component } from 'react';
import { Form, Row, FormGroup, Label, Button, Alert, Col, Input } from 'reactstrap';
import { addAdmin } from '../../../actions/adminActions';

class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      errMsg: ''
    };
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = async e => {
    const { name, email, password } = this.state;
    const data = {
      name,
      email,
      password
    };
    e.preventDefault();
    this.setState({
      errMsg: ''
    });
    try {
      const result = await addAdmin(data);
      this.props.handleAdd(result);
    } catch (err) {
      this.setState({
        errMsg: err.response.data
      });
    }
  };
  render() {
    const { name, email, password, errMsg } = this.state;
    const requiredStyle = { color: 'red' };
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          {errMsg && <Alert color="danger">{errMsg}</Alert>}
          <Row>
            <Col>
              <FormGroup>
                <Label for="name">
                  Name <span style={requiredStyle}>*</span>
                </Label>
                <Input name="name" value={name} onChange={this.handleChange} required />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="email">
                  email <span style={requiredStyle}>*</span>
                </Label>
                <Input
                  name="email"
                  type="email"
                  value={email}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="password">
                  password <span style={requiredStyle}>*</span>
                </Label>
                <Input
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Button color="danger">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default AdminForm;
