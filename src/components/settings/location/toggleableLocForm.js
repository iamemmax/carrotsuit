import React, { Component } from 'react';
import LocationForm from './locationForm';
import { Button } from "reactstrap";

class ToggleableLocForm extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
    };
    this.hideForm = this.hideForm.bind(this);
    this.showForm = this.showForm.bind(this);
  }
  hideForm() {
    this.setState({
      showForm: false
    });
  }
  showForm() {
    this.setState({
      showForm: true
    });
  }
  render() {
    if (this.state.showForm) {
      return (
        <LocationForm 
          addLocation={this.props.addLocation}
          hideForm= {this.hideForm}
          location=''
        />
      );
    }
    return (
      <Button color="danger" onClick={this.showForm}>
        Add more
      </Button>
    );
  }
}

export default ToggleableLocForm;
