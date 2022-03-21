import React, { Component } from 'react';
import { Table, Jumbotron } from 'reactstrap';
import { getBillings } from '../../../actions/adminActions';
import PageSpinner from '../../common/PageSpinner';

class CompanyBillings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      billings: null
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const data = await getBillings(id);
    if (data) {
      // console.log(data, 'bilijjkds,jss')
      this.setState({
        billings: data
      });
    }
  }
  /**
   * format currency amount
   * @param {in} amount amount to be formatted
   * @returns formatted amount
   */
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
              {billings.map(billing => (
                <tr key={billing.id}>
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

export default CompanyBillings;
