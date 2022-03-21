import React, { Component } from 'react';
import PropTypes from "prop-types";
import './toggleSwitch.css'

class ToggleSwitch extends Component {
    constructor(props){
      super(props);
      this.state = {
        isChecked: this.props.isChecked || false,
        disabled: this.props.disabled || false
      }
       this.handleChange = this.handleChange.bind(this);
    }
  handleChange(e){ 
    const { type, id='' }= this.props;
    const value = e.target.checked
    this.setState({
      isChecked: value
    })
    this.props.handleSwitch(type, value, id );
  }
  render(){
    return (
      <label className="switch">
        <input
          type="checkbox"
          onChange={this.handleChange}
          checked={this.state.isChecked}
          disabled = {this.state.disabled}
        />
        <span className="slider round" />
      </label>
    );
  }
};

export default ToggleSwitch;
