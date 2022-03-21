import React, { Component } from 'react';
import { getCurrentPlan } from '../../actions/staffActions';
import { Jumbotron, Button, Table } from 'reactstrap';
import moment from 'moment';

class FutureBilling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPlan: null
    };
  }
  async componentDidMount() {
    const data = await getCurrentPlan();
    console.log(data, 'kingggg')
    if (data) {
      this.setState({
        currentPlan: data
      });
    }
    console.log(this.state.currentPlan, 'kingggg')
  }
  getAmount(currentPlan) {
    if (currentPlan.period === 'month') return currentPlan.planInfo.monthly_billing;
    return currentPlan.planInfo.yearly_billing;
  }
  formatAmount(amount) {
    const formatter = new Intl.NumberFormat('NGN', {
      style: 'currency',
      currency: 'NGN'
    });

    return formatter.format(amount);
  }
  render() {
    const { currentPlan } = this.state;
    console.log(currentPlan, 'kingggg')

    return (
      <main style={{background: "#ffffff", padding:'3%'}}>
        <h4>Future Billing</h4>

        {currentPlan ? (
          <Table borderless>
              <tbody>
                  <tr>
                      <td>Plan name</td>
                      <td>{currentPlan.planInfo.plan_name}</td>
                  </tr>
                  <tr>
                      <td>Billing period</td>
                      <td>{currentPlan.period}</td>
                  </tr>
                  <tr>
                      <td>Renewal date</td>
                      <td>{moment(currentPlan.expiring_date).format('LL')}</td>
                  </tr>
                  <tr>
                      <td>Billing amount</td>
                      <td>{this.formatAmount(this.getAmount(currentPlan))}</td>
                  </tr>
              </tbody>
          </Table>
            
        ) : (
          <Jumbotron>
            <p>You have have no active plan</p>
            <Button
              color="danger"
              onClick={() => this.props.history.push('/dashboard/billing/1/plans')}
            >
              Subscribe now
            </Button>
          </Jumbotron>
        )}
      </main>
    );
  }
}

export default FutureBilling;
