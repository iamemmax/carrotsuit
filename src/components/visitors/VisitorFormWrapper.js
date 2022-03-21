import React, { Component } from 'react';
import VisitorPhoneForm from './VisitorPhoneForm';
import VisitorForm from './VisitorsForm';
import VisitorReturnForm from './VisitorReturnForm';

class VisitorFormWrapper extends Component {
    constructor() {
      super();
      this.state = {
        currentStep: 1,
        data:''
      };
      this._setCurrent = this._setCurrent.bind(this);
      this.setData = this.setData.bind(this)
    }
    
    _setCurrent(current) {
      this.setState({
        currentStep: current
      });
    }
    
    setData(data){
      this.setState({
        data
      })
    }
    render() {
     

      return (
        <div className="dashboard-wrapper" style={{ padding: '2%' }}>
          <VisitorPhoneForm
            currentStep={this.state.currentStep}
            setCurrent={this._setCurrent}
            setData={this.setData}
          />
          <VisitorForm
            currentStep={this.state.currentStep}
            setCurrent={this._setCurrent}
            closeModal={this.props.closeModal}
            data={this.state.data}
            />
          <VisitorReturnForm
            currentStep={this.state.currentStep}
            setCurrent={this._setCurrent}
            closeModal={this.props.closeModal}
            data={this.state.data}
          />
          </div>
      );
    }
  }
  
  export default VisitorFormWrapper;
  