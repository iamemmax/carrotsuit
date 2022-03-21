import React, { Component } from 'react';
import { getCompanyUsers } from '../../../actions/adminActions';
import CompanyUserList from './CompanyUserList';

class CompanyUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      count: 0
    };
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    const data = await getCompanyUsers(id);
    if (data) {
      this.setState({
        users: data.rows,
        count: data.count
      });
    }
  }
  render() {
    return (
      <div>
        <CompanyUserList users={this.state.users} />
      </div>
    );
  }
}

export default CompanyUsers;
