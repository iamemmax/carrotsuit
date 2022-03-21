import React, { Component } from 'react';
import { getPlans, disablePlan, enablePlan } from '../../../actions/adminActions';
import { Table, Button, Jumbotron } from 'reactstrap';
import Modal from '../../common/modal/Modal';
import PlanForm from './PlanForm';

class PlansDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: [],
      showAddModal: false,
      showEditModal: false,
      plan: null
    };
  }
  async componentDidMount() {
    const data = await getPlans();
    if (data) {
      this.setState({
        plans: data
      });
    }
  }
  ToggleShowAddModal = () => {
    this.setState({
      showAddModal: !this.state.showAddModal
    });
  };
  ToggleShowEditModal = () => {
    this.setState({
      showEditModal: !this.state.showEditModal
    });
  };
  handleEditClick = async plan => {
    await this.setState({
      plan
    });
    this.ToggleShowEditModal();
  };
  handleAdd = plan => {
    this.setState({
      plans: this.state.plans.concat(plan)
    });
  };
  handleEdit = plan => {
    this.setState({
      plans: this.state.plans.map(p => (p.id === plan.id ? Object.assign({}, p, plan) : p))
    });
  };
  updateStatus = async (is_active, id) => {
    switch (is_active) {
      case 0:
        this.setState({
          plans: this.state.plans.map(plan =>
            plan.id === id ? Object.assign({}, plan, { is_active: 1 }) : plan
          )
        });
        await enablePlan(id);

        break;
      case 1:
        this.setState({
          plans: this.state.plans.map(plan =>
            plan.id === id ? Object.assign({}, plan, { is_active: 0 }) : plan
          )
        });
        await disablePlan(id);

        break;
      default:
        return;
    }
  };
  render() {
    const { plans, plan } = this.state;
    return (
      <div style={{background: '#ffffff', padding:'2%'}}>
          <h4>Plans List</h4>
        <Button style={{margin: '10px'}} color="danger" onClick={this.ToggleShowAddModal}>
          Add New
        </Button>
        {plans.length ? (
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Monthly Billing($)</th>
                <th>Yearly Billing($)</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Disable/Enable</th>
              </tr>
            </thead>
            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.plan_name} </td>
                  <td>{plan.monthly_billing} </td>
                  <td>{plan.yearly_billing} </td>
                  <td>{plan.is_active ? 'active' : 'disabled'}</td>
                  <td>
                    <Button
                      color="danger"
                      size="sm"
                      outline
                      onClick={() => this.handleEditClick(plan)}
                    >
                      edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="danger"
                      outline
                      size="sm"
                      onClick={e => this.updateStatus(plan.is_active, plan.id)}
                    >
                      {plan.is_active ? 'Disable' : 'Enable'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Jumbotron>No added plans</Jumbotron>
        )}
        <Modal show={this.state.showAddModal} close={this.ToggleShowAddModal} header="Add new plan">
          <PlanForm closeAddModal={this.ToggleShowAddModal} handleAdd={this.handleAdd} />
        </Modal>
        {plan && (
          <Modal show={this.state.showEditModal} close={this.ToggleShowEditModal} header="Edit plan">
            <PlanForm
              id={plan.id}
              plan_name={plan.plan_name}
              monthly_billing={plan.monthly_billing}
              yearly_billing={plan.yearly_billing}
              duration={plan.duration}
              closeEditModal={this.ToggleShowEditModal}
              handleEdit={this.handleEdit}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default PlansDashboard;
