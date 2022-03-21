import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormData, getPurposeField } from '../../actions/visitorActions';
import './styles.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Button } from 'reactstrap';

class VisitorPhoneForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone_number: '',
      purposeField: [{option_name: "Visit"}],
      purpose: '',
      visitorName: '',
      step: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handeleCheck = this.handeleCheck.bind(this);
  }
  componentDidMount(){
    const purpose = getPurposeField();

    if(purpose.data){

      this.setState({
            purposeField: [purpose.options]
          });

    }


       this.setState({
        purposeField: [...this.props.settings.defaultVisitPurposes, ...this.props.settings.visitPurposes]
      });

    console.log(this.props.settings.defaultVisitPurposes, 'catch............')
    // getPurposeField().then(data => {
    //   this.setState({
    //     purposeField: [data.options]
    //   });
    // });
  }
  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      phone_number: e.target.value,
      
      step: 1
    });
  }
  handeleCheck(e) {
    e.preventDefault();
    const {phone_number, purpose, visitorName} = this.state;
    this.props
      .getFormData(phone_number, purpose, visitorName)
      .then(isNewVisitor => {
        this.props.setData({phone_number, purpose, visitorName});
        if (isNewVisitor) {
          this.props.setCurrent(2);
        } else {
          this.props.setCurrent(3);
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const {phone_number, purpose} = this.state
    const {company} = this.props.settings;

    const { currentStep } = this.props;
    if (currentStep !== this.state.step) {
      return null;
    }
    return (
      <form onSubmit={this.handeleCheck} className="phone-form">
        <div>

        Enter Name <span>*</span>
          <input className='form-control'
          onChange={(e) => {this.setState({ visitorName : e.target.value })}}
          required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">
            Enter phone <span>*</span>
          </label>
          <br />
          <PhoneInput
            country={company.country.toLowerCase()}
            value={this.state.phone_number}
            onChange={phone_number => {this.setState({ phone_number })}}
          />
          <div className="form-group">
              <label htmlFor="purpose">Visit type</label>
              <select name="purpose" onChange={e => {this.setState({
                purpose: e.target.value
              })}} required className="form-control">
                <option defaultValue>Select</option>

               {/* {console.log( this.state.purposeField['id'], "na me")} */}

                {this.state.purposeField &&
                  this.state.purposeField.map(option => (
                    <option key={option.id} value={option.purpose}>
                      {option.purpose}
                    </option>
                  ))}
              </select>
            </div>
        </div>
        <div style= {{textAlign: 'center'}}>
        <Button color="danger" disabled={!phone_number && !purpose}>Next</Button>
        </div>
        
      </form>
    );
  }
}
const mapStateToprops = state => ({
  settings: state.settings
})
export default connect(
  mapStateToprops,
  {
    getFormData,
    getPurposeField
  }
)(VisitorPhoneForm);
