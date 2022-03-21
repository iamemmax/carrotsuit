import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Button, Input, Form, ListGroup, ListGroupItem } from 'reactstrap';
import { getPurposeField } from '../../../actions/visitorActions';
import { addVisitType, deleteFieldOption } from '../../../actions/settingsActions';
import './styles/signInFlow.css';
import HasAccess from '../../common/HasAccess';
import Swal from 'sweetalert2';
import CustomizePurpose from './CustomizePurpose';
import { getPurpose } from '../../../actions/settingsActions';

class SignInFlow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visitTypes: [],
      visit_type: '',
      color: '#f85032',
      showAddForm: false
    };
    this.showAddForm = this.showAddForm.bind(this);
  }

  async componentDidMount() {
    const purposeField = await this.getVisitTypes();
    if (purposeField) {
      this.setState({
        visitTypes: purposeField.options
      });
    }
  }
  getVisitTypes = async () => {
    return await getPurposeField();
  };
  addType = async e => {
    e.preventDefault();
    const { visit_type, color } = this.state;
    if (!visit_type) return;
    const type = await addVisitType({ visit_type, color });
    if (type) {
      this.setState({
        visitTypes: {...this.state.visitTypes, type} ,
        visit_type: ''
      });
    }
  };
  showAddForm() {
    this.setState({
      showAddForm: true
    });
  }
  handleTypeClick = type => {
    this.props.history.push(`/dashboard/settings/6/sign-in-flow/${type}`);
  };
  handleOptionRemove = (e, optionId) => {
    e.stopPropagation();
    Swal.fire({
      title: 'Are you sure you want to delete this visit purpose?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.value) {
        deleteFieldOption(optionId).then(data => {
          if (data) {
            const filtered = this.state.visitTypes.filter(type => type.id !== optionId);
            this.setState({
              visitTypes: filtered
            });
          }
        });
      }
    });
  };
  handlePlanUpgrade = e => {
    e.preventDefault();

    
    this.props.history.push('/dashboard/billing/1/plans');
  };
  
  componentDidMount (){
    // this.interviewFormField()

  }
  render() {
    const { visitTypes } = this.state;
    const { user } = this.props.auth;
    // const { purpose } = this.props.settings;
    // let counter = this.props.counter;

    return (
      <main className="sign-in-flow">
        <h4>Sign in flow</h4>
        <p>Customise the sign in flow for the following visit purpose</p>
        {visitTypes.length ? (
          <ListGroup>
            {visitTypes.map(type => (
              <ListGroupItem key={type.id} onClick={() => this.handleTypeClick(type.option_name)}>
                {type.option_name}
                <Button
                  style={{ float: 'right' }}
                  color="danger"
                  outline
                  size="sm"
                  onClick={e => this.handleOptionRemove(e, type.id)}
                >
                  x
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        ) : (
          <Jumbotron>No visit purpose</Jumbotron>
        )}
        <br />
        {this.state.showAddForm ? (
          <Form onSubmit={this.addType}>
            <h5>Add a new visit purpose</h5>
            <Input
              type="text"
              name="visit_type"
              value={this.state.visit_type}
              onChange={e => this.setState({ visit_type: e.target.value })}
              placeholder="Enter name"
            />{' '}
            <br />
            <p>Choose a color to show on the pie chat </p>
            <Input
            type="color"
            name="color"
            required
            value={this.state.color}
            onChange={e => this.setState({ color: e.target.value })}
             />
             <br />
            <HasAccess
              plan={user.plan}
              perform="visit-type:add"
              no={() => (
                <Button color="danger" disabled={!this.state.visit_type}>
                  Add
                </Button>
              )}
              yes={() => (
                <Button color="danger" size="sm" onClick={this.handlePlanUpgrade}>
                  Upgrade to Premium
                </Button>
              )}
            />
          </Form>
        ) : (
          <Button color="danger" onClick={this.showAddForm}>
            Add new
          </Button>
        )}
        <div style={{marginTop: '2rem'}}> <CustomizePurpose/></div>
        
      </main>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(SignInFlow);

// export default connect(mapStateToProps, {
//   getPurpose
 
// })(withNavigation(SignInFlow));