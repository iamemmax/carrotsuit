import React, { Component } from 'react';
import SignInFields from './SignInFields';
import VisitorTypeWelcomeScreen from './VisitorTypeWelcomeScreen';
import FlowStep from './FlowSteps';
import { Button } from 'reactstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './styles/visitType.css';
import OtherSettings from './OtherSettings';

class VisitType extends Component {
  constructor() {
    super();
    this.state = {
      currentStep: 1
    };
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
    this._setCurrent = this._setCurrent.bind(this);
  }
  // Test current step with ternary
  // _next and _previous functions will be called on button click
  _next() {
    let currentStep = this.state.currentStep;
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
  }

  _prev() {
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  }
  _setCurrent(current) {
    this.setState({
      currentStep: current
    });
  }
  get previousButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <Button color="danger" outline onClick={this._prev}>
          <FaArrowLeft color="firebrick" size={16} /> {' '}
          Previous
        </Button>
      );
    }
    // ...else return nothing
    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if (currentStep < 3) {
      return (
        <Button color="danger" className="float-right" onClick={this._next}>
          Next <FaArrowRight color="#ffffff" size={16} />
        </Button>
      );
    }
    // ...else render nothing
    return null;
  }

  render() {
    const { type } = this.props.match.params;
    return (
      <main className="visit-type">
        <FlowStep currentStep={this.state.currentStep} setCurrentStep={this._setCurrent} />
        <SignInFields currentStep={this.state.currentStep} type={type} history={this.props.history} />
        <VisitorTypeWelcomeScreen currentStep={this.state.currentStep} type={type} history={this.props.history} />
        <OtherSettings currentStep={this.state.currentStep} type={type} history={this.props.history}  />
        <br />
        {this.previousButton}
        {this.nextButton}
      </main>
    );
  }
}

export default VisitType;
