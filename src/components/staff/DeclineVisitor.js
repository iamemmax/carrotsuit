import React, { Component } from 'react';
import { declineVisitor } from '../../actions/visitorActions';
import './styles/declineVisitor.css';
import { Button } from 'reactstrap';
class DeclineVisitor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reason: ''
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { id, token } = this.props;
    const { reason } = this.state;

    declineVisitor(id, token, reason).then(data => {
      if (data) {
        this.props.closeModal();
      }
    });
  }
  handleCancel() {
    this.props.closeModal();
  }
  render() {
    return (
      <div className="decline-visitor">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Any reasons...</label>
            <textarea
              name="reason"
              onChange={e => this.setState({ reason: e.target.value })}
              className="form-control"
            />
          </div>
          <div style= {{textAlign: 'center'}}>
            <Button color="danger">Proceed</Button>
            <Button outline color="danger" onClick={this.handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default DeclineVisitor;
