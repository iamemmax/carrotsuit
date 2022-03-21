import React from 'react';
import { Table, Jumbotron } from 'reactstrap';

const CompanyUserList = ({ users=[] }) => {
  return (
    <div style={{ background: '#ffffff' }}>
        <h4>Company users</h4>
      <Table responsive hover>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>phone</th>
            <th>Date Registered</th>
            <th>Last Login</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          {users.length ? (
            users.map(user => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>
                  <span>{user.first_name} {user.last_name}</span>
                </td>
                <td>{user.email}</td>
                <td>{user.phone && user.phone.phone_number}</td>
                <td>{new Date(user.date).toLocaleString()}</td>
                <td>{new Date(user.last_seen).toLocaleString()}</td>
                <td>{user.role}</td>
        
              </tr>
            ))
          ) : (
            <Jumbotron>No  Company users</Jumbotron>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CompanyUserList;
