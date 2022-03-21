import React, { Component } from 'react';
import { sendInviteLink } from '../../actions/staffActions';
import { Button } from 'reactstrap';

class ShortLinkForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      email: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    sendInviteLink(this.state.email).then(data => {
      if (data) {
        this.props.closeModal();
      }
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <p>Send an invite link to your visitors to book an appointment with you</p>
          <label htmlFor="email">
            Invitee email <span>*</span>
          </label>
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            className="form-control"
            style={{ border: 'none', borderBottom: '1px solid #ccc' }}
          />
        </div>
        <br />
        <div style={{ textAlign: 'center' }}>
          <Button color="danger">Send link</Button>
        </div>
      </form>
    );
  }
}
export default ShortLinkForm;
