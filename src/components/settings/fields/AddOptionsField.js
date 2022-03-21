import React, { Component } from 'react';
import ToggleSwitch from '../../common/toggleSwitch/ToggleSwitch';
import { connect } from 'react-redux';
import { addCustomOptionField } from '../../../actions/settingsActions';
import './styles.css';
import { Button } from 'reactstrap';
import HasAccess from '../../common/HasAccess';

class AddOptionsField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      is_required: true,
      is_enabled: true,
      option: '',
      options: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleOptionAdd = this.handleOptionAdd.bind(this);
    this.handleAddField = this.handleAddField.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSwitch(type, value) {
    this.setState({
      [type]: value
    });
  }
  handleOptionAdd(e) {
    e.preventDefault();
    const option = this.state.option;
    const options = this.state.options.concat(option);
    this.setState({
      options,
      option: ''
    });
  }
  handleAddField() {
    const { name, options, is_enabled, is_required } = this.state;
    const data = { name, options, is_enabled, is_required };
    const {type} = this.props;
    this.props.addCustomOptionField(type, data);
  }
  handleOptionRemove(index) {
    let filteredOptions = this.state.options.filter((option, i) => i !== index);
    this.setState({
      options: filteredOptions
    });
  }
  render() {
    const { name, is_enabled, is_required, options, option } = this.state;
    const {user} = this.props.auth
    return (
      <div>
        <div className="field-container">
          <div className="field-input">
            <label htmlFor="name">Give the options field a name</label>
            <input value={name} name="name" onChange={this.handleChange} className="form-control" />
            {options.length && (
              <ol className="field-options">
                {options.map((option, index) => (
                  <li key={index}>
                    <div className="option-input-wrapper">
                      <span>{option}</span>
                      <span onClick={() => this.handleOptionRemove(index)}>x</span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
            {name && (
              <form onSubmit={this.handleOptionAdd} className="form-inline">
                <input
                  placeholder="Give this option a name"
                  onChange={this.handleChange}
                  name="option"
                  value={option}
                  className="form-control"
                />
                <button className="btn btn-outline-primary btn-add-option" disabled={!option}>Add option</button>
              </form>
            )}
          </div>
          <div className="field-switch">
            <div className="switch-container">
              <span>required</span>
              <ToggleSwitch
                isChecked={is_required}
                type="is_required"
                handleSwitch={this.handleSwitch}
              />
            </div>
            <div className="switch-container">
              <span>enabled</span>
              <ToggleSwitch
                isChecked={is_enabled}
                type="is_enabled"
                handleSwitch={this.handleSwitch}
              />
            </div>
          </div>
        </div>
        <HasAccess
          plan={user.plan}
          perform="custom-field:add"
          no={() => (
            <div>
              <Button size="sm" color="danger" onClick={this.handleAddField}>
                Add field
              </Button>{' '}
              <Button outline color="danger" size="sm" onClick={this.props.close}>
                Cancel
              </Button>
            </div>
          )}
          yes={() => <Button color="danger" size="sm" onClick={() => this.props.history.push('/dashboard/billing/1/plans')}>Upgrade to Premium</Button>}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(
  mapStateToProps,
  {
    addCustomOptionField
  }
)(AddOptionsField);
