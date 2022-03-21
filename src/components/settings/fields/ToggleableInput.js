import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../common/Input';
import ToggleSwitch from '../../common/toggleSwitch/ToggleSwitch';
import {
  addCustomField,
  addCustomPurpose,
  editCustomField,
  editCustomPurpose
} from '../../../actions/settingsActions';
import { Button } from 'reactstrap';

class ToggleableInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: this.props.showForm || false,
      custom_field: this.props.text || '',
      isActive: this.props.isActive || false,
      id: this.props.id || ''
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleField = this.handleField.bind(this);
    this.handlePurpose = this.handlePurpose.bind(this);
  }

  toggleForm() {
    this.setState({
      showForm: !this.state.showForm
    });
  }
  handleChange(e) {
    const { value } = e.target;
    this.setState({
      custom_field: value
    });
  }
  handleSwitch(undefined, value) {
    this.setState({
      isActive: value
    });
  }
  handleSubmit() {
      if (this.state.custom_field.length < 4){
          alert('name must be min of 4 characters')
      }
    if (this.props.type === 'field') {
      this.handleField();
    } else {
      this.handlePurpose();
    }
  }
  handlePurpose() {
    const { id, isActive, custom_field } = this.state;
    if (this.state.id) {
      // edit custom purpose
      this.props.editCustomPurpose(id, { custom_purpose: custom_field, is_active: isActive });
    } else {
      //add p
      this.props.addCustomPurpose({ custom_purpose: custom_field, is_active: isActive });
    }
  }
  handleField() {
    const { id, isActive, custom_field } = this.state;
    if (this.state.id) {
      // edit custom field
      this.props.editCustomField(id, { custom_field_name: custom_field, is_active: isActive });
    } else {
      // add custom field
      this.props.addCustomField({ custom_field_name: custom_field, is_active: isActive });
    }
  }
  render() {
    const style = { border: 'none', borderBottom: '1px solid #ccc' };
    if (this.state.showForm)
      return (
        <div className="field-container">
          <div className="field-wrapper">
            <Input
              type="text"
              name=''
              value={this.custom_field}
              style={style}
              text={this.props.text}
              handleChange={this.handleChange}
            />{' '}
            <span>Enabled</span> {' '}
            <ToggleSwitch isChecked={this.props.isActive} handleSwitch={this.handleSwitch} />
          </div>
          <Button size="sm" color="danger" onClick={this.handleSubmit}>
            {this.props.id+1 ? 'save changes' : 'Add'}
          </Button>
        </div>
      );
    return (
      <Button color="danger" onClick={this.toggleForm}>
        Add New
      </Button>
    );
  }
}

export default connect(
  null,
  { addCustomField, addCustomPurpose, editCustomField, editCustomPurpose }
)(ToggleableInput);
