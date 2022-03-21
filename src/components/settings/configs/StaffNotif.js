import React, { Component } from 'react';
import { Button } from 'reactstrap'
import './styles/staffNotif.css';
import { saveStaffNotif, getStaffNotif } from "../../../actions/settingsActions";

class StaffNotif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Hello [HostName], [VisitorName] is here to see you for the purpose of [Purpose]'
    };
    this.handleChange =  this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSave =  this.handleSave.bind(this);
    this.setDefault = this.setDefault.bind(this);
    this.hidePane = this.hidePane.bind(this);
  }
  componentDidMount(){
    getStaffNotif()
    .then( data => {
      if(data)
      this.setState({message: data.content})
    })
  }
  handleSelect(e){
    this.setState({
      message: this.state.message.concat( e.target.value)
    })
  }
  handleChange(e){
    this.setState({
      message: e.target.value
    })
  }
  handleSave(e){
    e.preventDefault();
    saveStaffNotif(this.state.message);
  }
  setDefault(){
    const defaultMessage =  'Hello [HostName], [VisitorName] is here to see you for the purpose of [Purpose]';
    this.setState({
      message: defaultMessage
    });
  }
  hidePane(e){
    e.preventDefault();
    this.props.hide();
  }
  render() {
    return (
      <div className="staff-notif-wrapper">
        <small>Configure the message your staff will recieve when their visitor arrives</small>
        <form onSubmit={this.handleSave}>
          <div className="row">
            <div className="col">
            <select className="form-control" onChange={this.handleSelect}>
            <option defaultValue>Add Keyword</option>
            <option value="[Purpose]">Purpose</option>
            <option value="[VisitorName]">VisitorName</option>
            <option value="[HostName]">HostName</option>
          </select>
            </div>
            <div className="col"> <button className="btn btn-link text-dark" onClick={this.setDefault}>Use default</button></div>
          </div>
          <textarea className="form-control" name="message" rows="5" onChange={this.handleChange} value={this.state.message} />
          <br />
          <Button color = "danger" active>Save changes</Button>
          <button className="btn btn-link text-primary" onClick={this.hidePane}>Hide</button>
        </form>
      </div>
    );
  }
}

export default StaffNotif;
