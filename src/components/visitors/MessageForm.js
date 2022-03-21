import React, { Component } from 'react';
import { Input, Button, Form } from 'reactstrap';
import { sendMessage } from '../../actions/visitorActions';
import { sendStaffMessage, sendCompanyMessage } from '../../actions/staffActions';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      message: ''
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSave = async e => {
    e.preventDefault();
    const { subject, message } = this.state;
    const { list, type, close } = this.props;

    if (type === 'visitor') await sendMessage({ list, subject, message });

    if (type === 'staff') await sendStaffMessage({ list, subject, message });

    if (type === 'company') await sendCompanyMessage({ list, subject, message });

    // close modal
    close();
  };

  render() {
    return (
      <div>
        <p>Enter message subject and body</p>

        <Form onSubmit={this.handleSave}>
          <Input
            type="text"
            name="subject"
            onChange={this.handleChange}
            placeholder="enter Subject"
            required
          />
          <br />
          <Input
            type="textarea"
            name="message"
            onChange={this.handleChange}
            placeholder="Message"
            required
          />
          <br />
          <Button color="danger">Send</Button>
        </Form>
      </div>
    );
  }
}
export default MessageForm;
