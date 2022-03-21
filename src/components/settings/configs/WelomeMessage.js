import React, { Component } from 'react';
import { Button } from 'reactstrap'
import './styles/staffNotif.css';
import { saveWelcomeNotif, getWelcomeNotif } from "../../../actions/settingsActions";

class WelcomeMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Hello [VisitorName], welcome to [CompanyName], have a pleasant visit.'
    };
    this.handleChange =  this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSave =  this.handleSave.bind(this);
    this.setDefault = this.setDefault.bind(this);
    this.hidePane = this.hidePane.bind(this);
  }
  componentDidMount(){
    getWelcomeNotif()
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
    saveWelcomeNotif(this.state.message);
  }
  setDefault(){
    const defaultMessage =  'Hello [VisitorName], welcome to [CompanyName], have a pleasant visit.'
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
        <small>Configure the message your visitors will recieve when they arrive</small>
        <form onSubmit={this.handleSave}>
          <div className="row">
            <div className="col">
            <select className="form-control" onChange={this.handleSelect}>
            <option defaultValue>Add Keyword</option>
            <option value="[VisitorName]">VisitorName</option>
            <option value="[CompanyName]">CompanyName</option>
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

export default WelcomeMessage;
