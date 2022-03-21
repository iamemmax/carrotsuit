import React, { Component } from 'react';
import { Table, Jumbotron } from 'reactstrap';
import { getBillings } from '../../actions/staffActions';
import PageSpinner from '../common/PageSpinner';

class BillingHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billings: null
    };
  }

  async componentDidMount() {
    const data = await getBillings();
    console.log(data);
    if (data) {
      this.setState({
        billings: data
      });
    }
  }
  formatAmount(amount) {
    const formatter = new Intl.NumberFormat('NGN', {
      style: 'currency',
      currency: 'NGN'
    });

    return formatter.format(amount);
  }
  render() {
    const { billings } = this.state;
    if (!billings) return <PageSpinner />;
    return (
      <div style={{ padding: '3%', background: '#ffffff' }}>
        <h3>Billing History</h3>
        {billings.length ? (
          <Table responsive>
            <thead>
              <tr>
                <th>Plan</th>
                <th>Amount</th>
                <th>Period</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {console.log(billings)}
              {billings.map(billing => (
                
                <tr key={billing.id}>
                    {console.log(billing.billingPlan)}

                   {/* {console.log([billing["billingPlan"]][0]['plan_name'])} */}
                  <td> {billing.billingPlan.plan_name}</td>
                  <td> {this.formatAmount(billing.amount)}</td>
                  <td> {billing.period}ly</td>
                  <td> {billing.payment_status}</td>
                  <td> {new Date(billing.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Jumbotron style={{ background: '#ffffff' }}>No Billing History</Jumbotron>
        )}
      </div>
    );
  }
}

export default BillingHistory;
