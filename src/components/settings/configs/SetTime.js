import React, { Component } from 'react';
import { Button } from "reactstrap";
import './styles/startTime.css';
import { saveSignOutTime, getSignOutTime } from "../../../actions/settingsActions";

class SetTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    getSignOutTime()
    .then( data => {
      if(data)
      this.setState({time: data.run_at})
    })
  }
  handleChange(e){
    const { name, value } = e.target;
    this.setState({
        [name]: value
    })
   }
   handleSubmit(e){
       e.preventDefault();
       saveSignOutTime(this.state.time);
   }
  render() {
    return (
      <div className="start-time-wrapper">
        <span>Current time <small>{this.state.time}</small></span>
        <form onSubmit={this.handleSubmit}>
            <input type="time" name="time" className="form-control" onChange={this.handleChange} />
            <br />
            <Button color = "danger" active>Save</Button>
        </form>
      </div>
    );
  }
}
export default SetTime;