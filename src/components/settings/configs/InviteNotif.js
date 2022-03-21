import React, { Component } from 'react';
import { Button } from "reactstrap";
import './styles/staffNotif.css';
import { saveInviteNotif, getInviteNotif } from '../../../actions/settingsActions';

class InviteNotif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:
        'Hello [VisitorName], You have been invited to [CompanyName] on [Date]. Click the link below for more details.'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.setDefault = this.setDefault.bind(this);
    this.hidePane = this.hidePane.bind(this);
  }
  componentDidMount() {
    getInviteNotif().then(data => {
      if (data) this.setState({ message: data.content });
    });
  }
  handleSelect(e) {
    this.setState({
      message: this.state.message.concat(e.target.value)
    });
  }
  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }
  handleSave(e) {
    e.preventDefault();
    saveInviteNotif(this.state.message);
  }
  setDefault() {
    const defaultMessage = 'Hello [VisitorName], you have been invited to [CompanyName] on [Date]. Click the link below for more details';
    this.setState({
      message: defaultMessage
    });
  }
  hidePane(e) {
    e.preventDefault();
    this.props.hide();
  }
  render() {
    return (
      <div className="staff-notif-wrapper">
        <small>Configure the message your Visitors will recieve when they get an invite</small>
        <form onSubmit={this.handleSave}>
          <div className="row">
            <div className="col">
              <select className="form-control" onChange={this.handleSelect}>
                <option defaultValue>Add Keyword</option>
                <option value="[VisitorName]">VisitorName</option>
                <option value="[CompanyName]">CompanyName</option>
                <option value="[Date]">Date</option>
              </select>
            </div>
            <div className="col">
              {' '}
              <button className="btn btn-link text-dark" onClick={this.setDefault}>
                Use default
              </button>
            </div>
          </div>
          <textarea
          rows="5"
            className="form-control"
            name="message"
            onChange={this.handleChange}
            value={this.state.message}
          />
          <br />
          <Button color = "danger" active>Save changes</Button>
          <button className="btn btn-link text-primary" onClick={this.hidePane}>
            Hide
          </button>
        </form>
      </div>
    );
  }
}

export default InviteNotif;
