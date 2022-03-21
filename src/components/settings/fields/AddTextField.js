import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToggleSwitch from '../../common/toggleSwitch/ToggleSwitch';
import { addCustomField } from '../../../actions/settingsActions';
import { Button } from 'reactstrap';
import HasAccess from '../../common/HasAccess';

class AddTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      is_required: true,
      is_enabled: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleAddField = this.handleAddField.bind(this);
  }
  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }
  handleSwitch(type, value) {
    this.setState({
      [type]: value
    });
  }
  handleAddField() {
    const { name, is_enabled, is_required } = this.state;
    const { type } = this.props;
    const data = { name, is_enabled, is_required };
    this.props.addCustomField(type, data);
  }

  render() {
    const {user} = this.props.auth
    const { name, is_enabled, is_required } = this.state;
    return (
      <div>
        <div className="field-container">
          <div className="field-input">
            <label htmlFor="name">Give the field a name</label>
            <input value={name} name="name" onChange={this.handleChange} className="form-control" />
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
const mapStateProps = state => ({
  auth: state.auth
})
export default connect(
  mapStateProps,
  {
    addCustomField
  }
)(AddTextField);
