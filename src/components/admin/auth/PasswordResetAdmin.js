import React, { Component } from 'react';
import queryString from 'query-string';
import { resetPassword } from '../../../actions/adminActions';
import PasswordResetForm from '../../auth/PasswordResetForm';
import {Jumbotron} from 'reactstrap'

class PasswordResetAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: ''
    };
  }
  componentDidMount() {
    const query = queryString.parse(this.props.location.search);

    const token = query.token;

    if (token) {
      this.setState({
        token
      });
    }
  }
  render() {
    const { token } = this.state;
    if (!token) return <Jumbotron>Broken link</Jumbotron>;
    return <PasswordResetForm token={token} resetPassword={resetPassword} />;
  }
}

export default PasswordResetAdmin;
