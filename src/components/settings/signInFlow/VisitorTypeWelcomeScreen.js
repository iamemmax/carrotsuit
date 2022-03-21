import React, { Component } from 'react';
import { Input } from 'reactstrap';
import WelcomeImage from '../welcomeScreen/WelcomeImage';
import VisitorWelcomeMessage from './VisitorWelcomeMessage';
import { getVisitTypeConfigs } from '../../../actions/settingsActions';

class VisitorTypeWelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 2,
      message_type: '',
      showWelcomeGraphicBody: false
    };
  }
  componentDidMount() {
    const {type} = this.props;
    getVisitTypeConfigs(type).then(data => {
      if (data) {
        this.setState({
          message_type: data.welcome_message
        });
      }
    });
  }
  showWelcomeGraphicBody = () => {
    this.setState({
      showWelcomeGraphicBody: true
    });
  }
  renderMessageType = () => {
    const { message_type } = this.state;
    const { type } = this.props;
    if (message_type === 'image') {
      return (
        <WelcomeImage
          type={type}
          showBody={this.state.showWelcomeGraphicBody}
          toggleShowBody={this.showWelcomeGraphicBody}
        />
      );
    } else if (message_type === 'text') {
      return <VisitorWelcomeMessage type={type} />;
    } else return null;
  };
  render() {
    const { type } = this.props;
    const { currentStep } = this.props;
    const { step } = this.state;
    if (currentStep !== step) return null;
    return (
      <div>
        <h4>
          {' '}
          <strong>{type} welcome screen</strong>
        </h4>
        <p>Select an image or text to show to {type} visitors when they finsih signing in </p>
        <h6>Message type</h6>
        <Input
          type="select"
          name="message_type"
          value={this.state.message_type}
          onChange={e => this.setState({ message_type: e.target.value })}
        >
          <option defaultValue>select</option>
          <option value="image">Image</option>
          <option value="text">Text</option>
        </Input>
        {this.renderMessageType()}
      </div>
    );
  }
}

export default VisitorTypeWelcomeScreen;
