import React, { Component } from 'react';
import { getCompanyPlan, disableCompanyPlan } from '../../../actions/adminActions';
import { Jumbotron, Button, Table } from 'reactstrap';
import moment from 'moment';

class CompanyPlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPlan: null
    };
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    const data = await getCompanyPlan(id);

    if (data) {
      this.setState({
        currentPlan: data
      });
    }
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
  /**
   *
   * downgrade a company plan
   * @param  {int} id  company id
   */
  async downgradePlan(id) {
    await disableCompanyPlan(id);
  }
  render() {
    const { currentPlan } = this.state;
    const { id } = this.props.match.params;

    return (
      <main style={{ background: '#ffffff', padding: '3%' }}>
        <h4>Active/Future Billing</h4>

        {currentPlan ? (
          <div>
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
            <Button
              color="danger"
              onClick={() => {
                this.props.history.push(`/admin/dashboard/companies/${currentPlan.company}/billings`);
              }}
            >
              Billing history
            </Button>{' '}
            <Button
              color="danger"
              onClick={() =>
                this.props.history.push(
                  `/admin/dashboard/companies/${currentPlan.company}/subscribe`
                )
              }
            >
              Subscribe company
            </Button>{' '}
            {currentPlan.planInfo.plan_name !== 'Free' && (
              <Button
                color="danger"
                onClick={() => {
                  this.downgradePlan(currentPlan.company);
                }}
              >
                Downgrade to Free
              </Button>
            )}
          </div>
        ) : (
          <Jumbotron>
            <p>This company has no active subscription</p>
            <Button
              color="danger"
              onClick={() =>
                this.props.history.push(
                  `/admin/dashboard/companies/${id}/subscribe`
                )
              }
            >
              Subscribe now
            </Button>
          </Jumbotron>
        )}
      </main>
    );
  }
}

export default CompanyPlan;
