import React, { Component } from 'react';
import LocationForm from './locationForm';
import { Button } from 'reactstrap';

class EdtitableLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLocForm: false
    };
    this.hideForm = this.hideForm.bind(this);
    this.showForm = this.showForm.bind(this);
  }
  hideForm() {
    this.setState({
      showLocForm: false
    });
  }
  showForm() {
    this.setState({
      showLocForm: true
    });
  }
  render() {
    const { location, editLocation } = this.props;
    if (this.state.showLocForm) {
      return (
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <LocationForm
            location={location}
            hideForm={this.hideForm}
            editLocation={editLocation}
          />
        </li>
      );
    } else {
      return (
        <li 
          className="list-group-item d-flex justify-content-between align-items-center"
          style={{boxShadow:"1px 1px 1px 1px #ccc", marginBottom:"10px"}}
        >
          <div>
            <span><strong>{location.name}</strong>, </span>{' '}
            <span>{location.address}</span>
          </div>
          <span>
          <Button size="sm" outline color="danger" onClick={this.showForm}>
              edit
            </Button>
          </span>
        </li>
      );
    }
  }
}
export default EdtitableLocation;
