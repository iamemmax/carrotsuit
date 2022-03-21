import React, { Component } from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import WelcomeImage from './WelcomeImage';
import SliderPictures from './SliderPictures';

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSliderBody: false,
      showWelcomeGraphicBody: false
    };
    this.showWelcomeGraphicBody = this.showWelcomeGraphicBody.bind(this);
    this.showSliderBody = this.showSliderBody.bind(this);
  }
  showWelcomeGraphicBody() {
    this.setState({
      showWelcomeGraphicBody: true
    });
  }
  showSliderBody() {
    this.setState({
      showSliderBody: true
    });
  }
  render() {
    return (
      <div className="welcome-screen">
        <Card>
          <CardBody>
            <h4>Welcome screen</h4>
            <WelcomeImage
              showBody={this.state.showWelcomeGraphicBody}
              toggleShowBody={this.showWelcomeGraphicBody}
            />
            <br />
            <SliderPictures
              showBody={this.state.showSliderBody}
              toggleShowSliderBody={this.showSliderBody}
            />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default WelcomeScreen;
