import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getFields,
  deleteFieldOption,
  deleteCustomField,
  editCustomField,
  toggleField,
  getCofigurations,
  editCofigurations
} from '../../../actions/settingsActions';
import '../fields/styles.css';
import ToggleSwitch from '../../common/toggleSwitch/ToggleSwitch';
import ToggleableOptionInput from '../fields/toggleableOptionInput';
import ToggleableAddFields from '../fields/ToggleableAddFields';
import HasAccess from '../../common/HasAccess';
import { Button } from 'reactstrap';

class ExhibitionMode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      configs: { exhibition_mode: false },
      showSettings: false
    };
  }
  async componentWillMount() {
    await this.props.getFields('exhibition');
    await this.props.getCofigurations();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.settings) {
      this.setState({
        configs: nextProps.settings.configs
      });
    }
  }
  handleSwitch = async (type, value, id) => {
    if (type === 'exhibition_mode') {
      console.log(type, value);
      await this.setState({
        configs: { ...this.state.configs, [type]: value }
      });
      this.props.editCofigurations(this.state.configs);
    } else {
      this.props.toggleField(id, { type, value });
    }
  };

  handleOptionRemove(optionId) {
    this.props.deleteFieldOption(optionId);
  }

  handleSaveChanges() {
    console.log(this.state.field);
  }
  handleDelete(id) {
    this.props.deleteCustomField(id);
  }
  render() {
    const { fields, configs } = this.props.settings;
    const { user } = this.props.auth;
    return (
      <div style={{ background: '#ffffff', padding: '2%' }}>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Enable exhibition mode
            <HasAccess
              plan={user.plan}
              perform="exhibition-mode:enable"
              no={() => (
                <ToggleSwitch
                  handleSwitch={this.handleSwitch}
                  type="exhibition_mode"
                  isChecked={configs.exhibition_mode || false}
                />
              )}
              yes={() => (
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => this.props.history.push('/dashboard/billing/1/plans')}
                >
                  Upgrade to Basic
                </Button>
              )}
            />
          </li>
        </ul>
        <br />
        {this.state.configs.exhibition_mode && (
          <div>
            <h4>Customize the sign in fields for visitors on exhibition</h4>
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
                        {fields.map(option => (
                          <li key={option.id}>
                            <div className="option-input-wrapper">
                              {option.option_name}
                              <span
                                className="remove-span"
                                onClick={() => {
                                  this.handleOptionRemove(option.id);
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
              <ToggleableAddFields type={'exhibition'} history={this.props.history} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {
    getFields,
    deleteFieldOption,
    deleteCustomField,
    editCustomField,
    toggleField,
    getCofigurations,
    editCofigurations
  }
)(ExhibitionMode);
