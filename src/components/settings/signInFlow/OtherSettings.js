import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToggleSwitch from '../../common/toggleSwitch/ToggleSwitch';
import { saveVisitTypeConfigs, getVisitTypeConfigs } from '../../../actions/settingsActions';
import HasAccess from '../../common/HasAccess';
import { Button } from 'reactstrap';

class OtherSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configs: {
        isPhoto_required: false
      },
      step: 3
    };
  }
  componentDidMount() {
    const { type } = this.props;
    getVisitTypeConfigs(type).then(data => {
      if (data) {
        this.setState({
          configs: data
        });
      }
    });
  }
  handleSwitch = (type, value) => {
    const visit_type = this.props.type;
    const data = { [type]: value };
    saveVisitTypeConfigs(visit_type, data);
  };
  render() {
    const { configs, step } = this.state;
    const { currentStep, auth } = this.props;
    const { user } = auth;
    const { type } = this.props;
    if (currentStep !== step) return null;
    return (
      <div>
        <h4>Other {type} sign in settings</h4>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Require visitors photo
            <HasAccess
              plan={user.plan}
              perform="visitor-photo:require"
              yes={() => (
                <ToggleSwitch
                  handleSwitch={this.handleSwitch}
                  type="isPhoto_required"
                  isChecked={configs.isPhoto_required || false}
                />
              )}
              no={() => (
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => this.props.history.push('/dashboard/billing/1/plans')}
                >
                  Upgrade to Premium
                </Button>
              )}
            />
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Enquire about items carried
            <HasAccess
              plan={user.plan}
              perform="visitor-items:require"
              yes={() => (
                <ToggleSwitch
                  handleSwitch={this.handleSwitch}
                  type="visitor_items"
                  isChecked={configs.visitor_items || false}
                />
              )}
              no={() => (
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => this.props.history.push('/dashboard/billing/1/plans')}
                >
                  Upgrade to Premium
                </Button>
              )}
            />
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Enquire if visitors came with a car
            <HasAccess
              plan={user.plan}
              perform="visitor-car:require"
              yes={() => (
                <ToggleSwitch
                  handleSwitch={this.handleSwitch}
                  type="visitor_car"
                  isChecked={configs.visitor_car || false}
                />
              )}
              no={() => (
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => this.props.history.push('/dashboard/billing/1/plans')}
                >
                  Upgrade to Premium
                </Button>
              )}
            />
          </li>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(OtherSettings);
