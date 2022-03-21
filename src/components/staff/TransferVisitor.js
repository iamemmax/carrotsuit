import React, { Component } from 'react';
import { transferVisitor } from '../../actions/visitorActions';
import { getStaffAssistant } from '../../actions/staffActions';
import './styles/transferVisitor.css';
import { Button } from 'reactstrap';

class TransferVisitor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assistant: null,
      isLoading: false
    };
    this.handleTransfer = this.handleTransfer.bind(this);
    this.toggleIsLoading = this.toggleIsLoading.bind(this);
  }
  componentDidMount() {
    const { staff, token } = this.props;
    getStaffAssistant(staff.id, token).then(data => {
      if (data) {
        this.setState({
          assistant: data
        });
      }
    });
  }
  toggleIsLoading(){
    this.setState({
      isLoading: !this.state.isLoading
    })
  }
  handleTransfer() {
    const { visitorId, staff, token } = this.props;

    this.toggleIsLoading();
    transferVisitor(visitorId, staff, token)
      .then(data => {
        if (data) {
          this.toggleIsLoading();
          this.props.closeModal();
        }
      })
      .catch(err => {
        this.toggleIsLoading();
      });
  }
  render() {
    const { assistant } = this.state;
    if (!assistant) return <div className="jumbotron">Details not found</div>;
    return (
      <div className="assistant-wrapper">
        <h5>Your visitor will be transfered to your assistant</h5>
        <div className="staff-assistant">
          <div className="assistant">
            <img src={assistant.avatar || '/images/defaultAvatar.png'} alt="assistant avatar" />
            <div className="assistant-details">
              <span>
                {assistant.first_name} {assistant.last_name}
              </span>
              <span>{assistant.email}</span>
            </div>
          </div>
        </div>
        <div style= {{textAlign: 'center'}}>
          <Button color="danger" onClick={this.handleTransfer}>
            {this.state.isLoading ? 'Processing...' : 'Proceed'}
          </Button>
          <Button outline color="danger" onClick={this.props.closeModal}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default TransferVisitor;
