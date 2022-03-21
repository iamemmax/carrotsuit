import React from 'react'
import classnames from 'classnames';
import './styles/flowStep.css';

const FlowStep = ({ currentStep, setCurrentStep }) => {
  return (
    <div className="step-container">
      <div className="step-wrapper">
        <span
          onClick={ () => setCurrentStep(1) }
          className={classnames('step-num', {
            'current-step': currentStep === 1
          })}
        >
          1
        </span>
        <span className="step-name">Fields</span>
      </div>
      <div className='hr'></div>
      <div className="step-wrapper">
        <span
          onClick={ () => setCurrentStep(2) }
          className={classnames('step-num', {
            'current-step': currentStep === 2
          })}
        >
          2
        </span>
        <span className="step-name">Welcome screen</span>
      </div>
      <div className='hr'></div>
      <div className="step-wrapper">
        <span
          onClick={ () => setCurrentStep(3)}
          className={classnames('step-num', {
            'current-step': currentStep === 3
          })}
        >
          3
        </span>
        <span className="step-name">Others</span>
      </div>
    </div>
  );
};

export default FlowStep;