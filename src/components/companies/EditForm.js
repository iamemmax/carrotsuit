import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { editCompany } from '../../actions/staffActions';

class EditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name || '',
      email: this.props.email || ''
    };
  }
  handleSave = e => {
    e.preventDefault();
    const { name, email } = this.state;
    const id = this.props.id;

    this.props.editCompany(id, { name, companyemail: email }).then(data => {
      if (data) {
        this.props.closeModal();
      }
    });
  };
  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSave}>
          <Input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
            placeholder="Company name"
          />
          <br />
          <Input
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
            placeholder="Company email"
          />
          <br />
          <Button color="danger">Save</Button>
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  { editCompany }
)(EditForm);
