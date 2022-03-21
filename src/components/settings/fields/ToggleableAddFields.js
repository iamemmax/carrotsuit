import React, { Component } from 'react';
import AddTextField from './AddTextField';
import AddOptionsField from './AddOptionsField';

class ToggleableAddFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelect: true,
      showAddTextInput: false,
      showAddOptionsInput: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleSelect(e) {
    const { value } = e.target;
    switch (value) {
      case 'text':
        this.setState({
          showSelect: false,
          showAddTextInput: true
        });
        break;
      case 'option':
        this.setState({
          showSelect: false,
          showAddOptionsInput: true
        });
      default:
        return;
    }
  }
  handleClose() {
    this.setState({
      showSelect: true,
      showAddTextInput: false,
      showAddOptionsInput: false
    });
  }
  render() {
    const { showSelect, showAddOptionsInput, showAddTextInput } = this.state;
    const { type } = this.props;
    if (showSelect)
      return (
        <select name="fields" className="form-control" onChange={this.handleSelect}>
          <option defaultValue>Add new field</option>
          <option value="text">Text field</option>
          <option value="option">Options field</option>
        </select>
      );
    if (showAddTextInput) return <AddTextField history={this.props.history} close={this.handleClose} type={type} />;
    if (showAddOptionsInput) return <AddOptionsField history={this.props.history} close={this.handleClose} type={type} />;
  }
}

export default ToggleableAddFields;
