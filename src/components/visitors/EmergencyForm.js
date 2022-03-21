import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { sendEmergencyAlert } from '../../actions/visitorActions';

const actions = [
  {
    id: 1,
    message: 'There is an emergency, exit the companies building immediately'
  },
  {
    id: 2,
    message: 'Exit building, fire outbreak'
  },
  {
    id: 3,
    message: 'Emergency!!, remain inside the building!'
  }
];
class EmergencyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customAction: ''
    };
  }
  handleActionSend = (e, action = '') => {
    e.preventDefault();

    let theAction = action || this.state.customAction;
    if (theAction) {
      sendEmergencyAlert(theAction)
    }
    this.props.closeModal()
  };
  render() {
    return (
      <div>
        <p>
          Send an emergency message to all visitors within the building premises in case of
          any emergency
        </p>
        <ul className="list-group">
          <li className="list-group-item bg-light text-dark ">Select a quick message</li>
          {actions.map(action => (
            <li
              key={action.id}
              className="list-group-item msg"
              onClick={() => {
                this.handleActionSend({ preventDefault: () => {} }, action.message);
              }}
            >
              {action.message}
            </li>
          ))}
        </ul>
        <br />
        <form>
          <textarea
            className="form-control"
            type="text"
            placeholder="...or enter message"
            onChange={e => this.setState({ customAction: e.target.value })}
          />
          <br />
          <Button color="danger" onClick={this.handleActionSend}>
            Send
          </Button>
        </form>
      </div>
    );
  }
}

export default EmergencyForm;
