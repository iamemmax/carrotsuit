import React, { Component } from 'react';
import { Form, Row, FormGroup, Label, Button, Alert, Col, Input } from 'reactstrap';
import { addPlan, editPlan } from '../../../actions/adminActions';

class PlanForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan_name: this.props.plan_name || '',
      monthly_billing: this.props.monthly_billing || '',
      yearly_billing: props.yearly_billing || '',
      duration: props.duration || '',
      errMsg: '',
      isLoading: false
    };
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSubmit = async e => {
    const { plan_name, monthly_billing, yearly_billing } = this.state;
    const data = {
      plan_name,
      monthly_billing,
      yearly_billing
    };
    e.preventDefault();
    this.setState({
      errMsg: ''
    });
    try {
      if (this.props.id) {
        this.props.handleEdit({ id: this.props.id, ...data });
        await editPlan(this.props.id, data);
        this.props.closeEditModal();
      } else {
        const plan = await addPlan(data);
        this.props.handleAdd(plan);
        this.props.closeAddModal();
      }
    } catch (err) {
      this.setState({
        errMsg: err.response.data
      });
    }
  };
  render() {
    const { plan_name, monthly_billing, yearly_billing, duration, errMsg } = this.state;
    const requiredStyle = { color: 'red' };
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          {errMsg && <Alert color="danger">{errMsg}</Alert>}
          <Row>
            <Col>
              <FormGroup>
                <Label for="plan_name">
                  Name <span style={requiredStyle}>*</span>
                </Label>
                <Input name="plan_name" value={plan_name} onChange={this.handleChange} required />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="plan_name">
                  Monthly Billing(N) <span style={requiredStyle}>*</span>
                </Label>
                <Input
                  name="monthly_billing"
                  type="number"
                  value={monthly_billing}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="yearly_billing">
                  Yearly Billing(N) <span style={requiredStyle}>*</span>
                </Label>
                <Input
                  name="yearly_billing"
                  type="number"
                  value={yearly_billing}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <br />
          <Button color="danger">{this.props.id ? 'Save' : 'Add'}</Button>
        </Form>
      </div>
    );
  }
}

export default PlanForm;
