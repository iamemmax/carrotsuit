import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getPlan } from '../../actions/authActions';
import { subscribe } from '../../actions/staffActions';
import { getLocations } from '../../actions/settingsActions';
import PageSpinner from '../common/PageSpinner';
import { Input, Label, Button } from 'reactstrap';
import './styles/confirmOrder.css';
import mathTrunc from 'math-trunc';
import { Modal, ButtonStrap } from "react-bootstrap";
import { withRouter } from 'react-router-dom';
// import {HOSTNAME} from './environment';

class OrderConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: null,
      period: 'month',
      planType: false,
      show: false,
      link: 'http://localhost:3000',
      amount: '',
    };
  }
  async componentDidMount() {
    const {planType} = this.props.location.state

    console.log(planType, 'djhh')

    this.setState({
      planType: planType
    })
    // setPhoneNumber(props.location.state.phone_number || {})

    const { plan } = this.props.match.params;
    console.log(plan)
    if (plan) {
      const data = await getPlan(plan);
      console.log(data)
      if (data)
      console.log(data)
        this.setState({
          plan: data
        });
    }
    console.log(this.props.getLocations())
    await this.props.getLocations();
  }
  handleSwitch = e => {
    const { value } = e.currentTarget;
    this.setState({
      period: value
    });
  };
  getBilling = locations => {
    const { period, plan } = this.state;
    switch (period) {
      case 'month': {
        return plan.monthly_billing * locations.length;
      }
      case 'year': {
        return plan.yearly_billing * locations.length;
      }
    }
  };
  getRenewalPeriod = () => {
    const { period } = this.state;
    switch (period) {
      case 'month': {
        return moment(new Date())
          .add(1, 'M')
          .format('LL');
      }
      case 'year': {
        return moment(new Date())
          .add(1, 'year')
          .format('LL');
      }
      default:
        return '';
    }
  };
  formatAmount(amount) {
    const formatter = new Intl.NumberFormat('NGN', {
      style: 'currency',
      currency: 'NGN'
    });

    return formatter.format(Number(amount));
  }
  handlePayment = async () => {

    const { period, plan } = this.state;
    const start_date = moment(new Date());
    let expiring_date = '';

    if (period == 'month') expiring_date = moment(start_date).add(1, 'M');
    if (period == 'year') expiring_date = moment(start_date).add(1, 'year');

    const interval_remaining = expiring_date.diff(start_date, 'days');

    const data = {
      start_date: start_date.format('YYYY-MM-DD'),
      expiring_date: expiring_date.format('YYYY-MM-DD'),
      interval_remaining,
      plan: plan.id,
      period
    };

    this.props.history.push({pathname:'/dashboard/billing-payment', state: data})
    // props.history.push({pathname: `/personal-form`, state: data });

    // await subscribe(data)
    // .then(url=>{
    //   this.setState({
    //     link: url,
    //     show: true
    //   })
    //   console.log(url, 'url')
    // })
    // .catch(err=> {console.log(err, 'jjksssjs')})
    
  };
  render() {
    const { plan, period } = this.state;
    const { locations } = this.props.settings;
    const {planType} = this.state;
    const url = new URL(this.state.link)

    if (!plan) return <PageSpinner />;
    return (
      <main className="confirm-order">
        <h4>Confirm Subscription</h4>
        <h6>Plan name</h6>
        <div>{plan.plan_name}</div>
        <h6>Locations</h6>
        <div>{locations.length}</div>
        <h6>Select billing period</h6>

        {/* //This is to cater for smart and premium that has 2 locations rather than convntional 1 */}
        {plan.plan_name=== 'Smart' || plan.plan_name=== 'Premium'?
        <div>
          <ul>
          {planType === false? 
          <li>
            <Label check>
              <Input
                type="radio"
                name="billing_period"
                onChange={this.handleSwitch}
                value="month"
                checked={period == 'month' ? true : false}
              />
              {locations.length==1? 
              <div>{''} Pap monthly <strong>{this.formatAmount(plan.monthly_billing)}</strong>/
              <small>Monh</small> x {locations.length} location{' '}
              </div> 
              :
              <div>  {''} Pap monthly <strong>{this.formatAmount(plan.monthly_billing)* (mathTrunc(locations.length/2))*2}</strong>/
              <small>Month</small> x {(mathTrunc(locations.length/2))*2} and additional of {(locations.length % 2)* 17500} for {(locations.length % 2)} locations {' '}
              </div> 
            }
              
            </Label>
            <br />
          </li>

          :
          <li>
            <Label check>
              <Input
                type="radio"
                name="billing_period"
                onChange={this.handleSwitch}
                value="year"
                checked={period == 'year' ? true : false}
              />
              {''} pay yearly <strong>{this.formatAmount(plan.yearly_billing)}</strong>/
              <small>Year</small> x {(mathTrunc(locations.length/2))*2} and additional of {(locations.length % 2)* (this.formatAmount(plan.yearly_billing)/2)} for {(locations.length % 2)} locations {' '}
              {/* <small>Year</small> x {locations.length} location */}
            </Label>
          </li>
        }
      </ul>

      <h6>Billing Summary</h6>
        <div>
          {' '}
          <strong>Total Price:</strong> {this.formatAmount(this.getBilling(locations))*(mathTrunc(locations.length/2)) + ((this.formatAmount(plan.yearly_billing)/2) * (locations.length % 2))}{' '}
        </div>
        <div>
          {' '}
          <strong>Duration:</strong> 1 {period}
        </div>
        <p>
          Your subcription will renew on <strong>{this.getRenewalPeriod()}</strong>
        </p>
      </div>
      :
      <div>
        <ul>
        {planType === false? 
        <li>
          <Label check>
            <Input
              type="radio"
              name="billing_period"
              onChange={this.handleSwitch}
              value="month"
              checked={period == 'month' ? true : false}
            />
            {''} Pay monthly <strong>{this.formatAmount(plan.monthly_billing)}</strong>/
            <small>Month</small> x {locations.length} location{' '}
          </Label>
          <br />
        </li>
        :
        <li>
          <Label check>
            <Input
              type="radio"
              name="billing_period"
              onChange={this.handleSwitch}
              value="year"
              checked={period == 'year' ? true : false}
            />
            {''} pay yearly <strong>{this.formatAmount(plan.yearly_billing)}</strong>/
            <small>Year</small> x {locations.length} location
          </Label>
        </li>
    }
    </ul>
    <h6>Billing Summary</h6>
        <div>
          {' '}
          <strong>Total Price:</strong> {this.formatAmount(this.getBilling(locations))}{' '}
        </div>
        <div>
          {' '}
          <strong>Duration:</strong> 1 {period}
        </div>
        <p>
          Your subcription will renew on <strong>{this.getRenewalPeriod()}</strong>
        </p>
    
    </div>}
      

       

        <Button color="danger" onClick={this.handlePayment}>
          Proceed To payment
        </Button>

      {/* //paystack paymnet in  modal */}
        <Modal show={this.state.show} onHide={() => this.setState({ show: true })}>
            <Modal.Title>Payment System</Modal.Title>
          <Modal.Body><iframe src={this.state.link} style={{width:'100%',height:'400px'}}/></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ show: false })} >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </main>
    );
  }
}
const mapStateToProps = state => ({
  settings: state.settings
});
export default withRouter(connect(
  mapStateToProps,
  {
    getLocations
  }
)(OrderConfirmation));
