import React, { Component } from 'react';
import moment from 'moment';
import { getPlans, subscribeCompany, getCompanyLocations } from '../../../actions/adminActions';
import PageSpinner from '../../common/PageSpinner';
import { Input, Label, Button } from 'reactstrap';
//import './styles/subscribeCompany.css';

class SubcribeCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: null,
      period: 'month',
      plans: [],
      locations: 1
    };
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    const data = await getPlans();
    if (data)
      this.setState({
        plans: data
      });
    const locations = await getCompanyLocations(id);
    if(locations)
    this.setState({
      locations
    });
  }
  handleSwitch = e => {
    const { value } = e.currentTarget;
    this.setState({
      period: value
    });
  };
  getBilling = () => {
    const { period, plan, locations } = this.state;
    switch (period) {
      case 'month': {
        return plan.monthly_billing * locations
      }
      case 'year': {
        return plan.yearly_billing * locations
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
    console.log(amount);
    const formatter = new Intl.NumberFormat('NGN', {
      style: 'currency',
      currency: 'NGN'
    });

    return formatter.format(Number(amount));
  }
  handleSubsription = async () => {
    const { period, plan } = this.state;
    const { id } = this.props.match.params;
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
    await subscribeCompany(id, data);
  };
  handlePlanSelect = async e => {
    const id = e.target.value
      const {plans} = this.state;
        const plan = plans.find(plan => plan.id == id)
    
    this.setState({
      plan
    });

  };
  render() {
    const { plan, period, plans, locations } = this.state;
    return (
      <main style={{ background: '#ffffff', padding: '3%' }}>
        <h4>Manually subscribe company</h4>
        <h6>Plan</h6>
        <Input type="select" onChange={this.handlePlanSelect}>
          <option>Select plan</option>
          {plans.map(plan => (
            <option value={plan.id} key={plan.id}>
              {plan.plan_name}{' '}
            </option>
          ))}
        </Input>
        {plan && (
          <div>
            <h6>Select billing period</h6>
            <ul>
              <li>
                <Label check>
                  <Input
                    type="radio"
                    name="billing_period"
                    onChange={this.handleSwitch}
                    value="month"
                    checked={period == 'month' ? true : false}
                    disabled={!plan}
                  />
                  {''} Pay monthly {this.formatAmount(plan.monthly_billing)}/<small>Month</small> x {locations} locations
                </Label>
              </li>
              <li>
                <Label check>
                  <Input
                    type="radio"
                    name="billing_period"
                    onChange={this.handleSwitch}
                    value="year"
                    checked={period == 'year' ? true : false}
                    disabled={!plan}
                  />
                  {''} pay yearly {this.formatAmount(plan.yearly_billing)}/<small>Year</small> x {locations} locations
                </Label>
              </li>
            </ul>

            <h6>Billing Summary</h6>
            <div>
              {' '}
              <strong>Total Price:</strong> {plan && this.formatAmount(this.getBilling())}{' '}
            </div>
            <div>
              {' '}
              <strong>Duration:</strong> 1 {period}
            </div>
            <p>
              This subcription will need renewal on{' '}
              <strong>{plan && this.getRenewalPeriod()}</strong>
            </p>

            <Button color="danger" onClick={this.handleSubsription}>
              Submit
            </Button>
          </div>
        )}
      </main>
    );
  }
}

export default SubcribeCompany;
