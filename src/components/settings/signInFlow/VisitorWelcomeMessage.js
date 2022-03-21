import React, { Component } from 'react';
import { Input, Button, Form } from 'reactstrap';
import {addWelcomeMessage, getVisitTypeWelcomeMessage} from '../../../actions/settingsActions'

class VisitorWelcomeMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }
  componentDidMount(){
    const {type} = this.props;
    getVisitTypeWelcomeMessage(type)
    .then(result => {
      if(result){
        this.setState({
          message: result.message
        })
      }
    })
  }
  handleSubmit = async (e) => {
    e.preventDefault();
      const {message} = this.state;
      const {type} = this.props;
      if(message){
        addWelcomeMessage(type, {message});
      }
  }
  render() {
    return (
      <div>
        <p>Enter message</p>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="textarea"
            name="message"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
          />
          <br />
          <Button color="danger" disabled={!this.state.message}>Save</Button>
        </Form>
      </div>
    );
  }
}

export default VisitorWelcomeMessage;
