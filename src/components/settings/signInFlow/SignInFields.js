import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getFields,
  deleteFieldOption,
  deleteCustomField,
  editCustomField,
  toggleField
} from '../../../actions/settingsActions';
import '../fields/styles.css';
import ToggleSwitch from '../../common/toggleSwitch/ToggleSwitch';
import ToggleableOptionInput from '../fields/toggleableOptionInput';
import ToggleableAddFields from '../fields/ToggleableAddFields';

class SignInFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      field: {
        name: '',
        is_enabled: false,
        is_required: false
      }
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  componentDidMount() {
    const type = this.props.type;
    this.props.getFields(type);
  }
  handleSwitch(type, value, id) {
    this.props.toggleField(id, { type, value });
  }
  handleOptionRemove(fieldId, optionId) {
    this.props.deleteFieldOption(fieldId, optionId);
  }
  handleFieldChange(e) {
    const { value } = e.target;
    this.setState({
      field: {
        ...this.state.field,
        name: value
      }
    });
  }
  handleSaveChanges() {
    console.log(this.state.field);
  }
  handleDelete(id) {
    this.props.deleteCustomField(id);
  }
  render() {
    const { currentStep, type } = this.props;
    const { step } = this.state;
    const { fields } = this.props.settings;
    if (currentStep !== step) return null;
    return (
      <div className="settings-wrapper">
        <h3>
          {' '}
          <strong>{type}</strong> sign in fields
        </h3>
        {fields.map(field => {
          if (field.field_type === 'text') {
            return (
              <div className="field-container" key={field.id}>
                <div className="field-input">
                  <label>Field name</label>
                  <div className="field-name">{field.field_name}</div>
                  {!field.is_default && (
                    <div className="btns">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => this.handleDelete(field.id)}
                        disabled={field.is_default}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <div className="field-switch">
                  <div className="switch-container">
                    <span>required</span>
                    <ToggleSwitch
                      isChecked={field.is_required}
                      type="is_required"
                      id={field.id}
                      disabled={field.is_default}
                      handleSwitch={this.handleSwitch}
                    />
                  </div>
                  <div className="switch-container">
                    <span>enabled</span>
                    <ToggleSwitch
                      isChecked={field.is_enabled}
                      type="is_enabled"
                      id={field.id}
                      disabled={field.is_default}
                      handleSwitch={this.handleSwitch}
                    />
                  </div>
                </div>
              </div>
            );
          } else
            return (
              <div className="field-container" key={field.id}>
                <div className="field-input">
                  <label>Field name</label>
                  <div className="field-name">{field.field_name}</div>
                  <ol className="field-options">
                    {field.options.map(option => (
                      <li key={option.id}>
                        <div className="option-input-wrapper">
                          {option.option_name}
                          <span
                            className="remove-span"
                            onClick={() => {
                              this.handleOptionRemove(field.id, option.id);
                            }}
                          >
                            x
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div style={{ float: 'left' }}>
                    <ToggleableOptionInput id={field.id} />
                  </div>
                  {!field.is_default && (
                    <div className="btns">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => this.handleDelete(field.id)}
                        disabled={field.is_default}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <div className="field-switch">
                  <div className="switch-container">
                    <span>required</span>
                    <ToggleSwitch
                      isChecked={field.is_required}
                      type="is_required"
                      id={field.id}
                      handleSwitch={this.handleSwitch}
                    />
                  </div>
                  <div className="switch-container">
                    <span>enabled</span>
                    <ToggleSwitch
                      isChecked={field.is_enabled}
                      type="is_enabled"
                      id={field.id}
                      handleSwitch={this.handleSwitch}
                    />
                  </div>
                </div>
              </div>
            );
        })}
        <div className="add-field">
          <ToggleableAddFields type={type} history={this.props.history} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  settings: state.settings
});
export default connect(
  mapStateToProps,
  {
    getFields,
    deleteFieldOption,
    deleteCustomField,
    editCustomField,
    toggleField
  }
)(SignInFields);
