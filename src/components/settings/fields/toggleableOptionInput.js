import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from "reactstrap";
import { addFieldOption } from '../../../actions/settingsActions';
import './styles.css';

class ToggleableOptionInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      option: ''
    };
    this.toggleInput = this.toggleInput.bind(this);
    this.handleOptionAdd = this.handleOptionAdd.bind(this);
    this.closeInput = this.closeInput.bind(this);
  }
  toggleInput() {
    this.setState({
      showInput: !this.showInput
    });
  }
  handleOptionAdd(e) {
    e.preventDefault();
    const { id } = this.props;
    const { option } = this.state;
    this.props.addFieldOption(id, { option });
  }
  closeInput() {
    this.setState({
      showInput: false
    });
  }
  render() {
    const { showInput, option } = this.state;
    if (showInput)
      return (
        <form onSubmit={this.handleOptionAdd}>
          <div className="option-input-wrapper">
            <input
              placeholder="Give the option a name"
              onChange={e => this.setState({ option: e.target.value })}
              className="form-control"
            />
            <span className="remove-span" onClick={this.closeInput}>
              x
            </span>
          </div>
          <Button size="sm" color="danger" disabled={!option}>
            Add
          </Button>
        </form>
      );
    return (
      <Button color="danger" onClick={this.toggleInput}>
        Add more
      </Button>
    );
  }
}

export default connect(
  null,
  { addFieldOption }
)(ToggleableOptionInput);
