import React from 'react';
import { Table, Button, Jumbotron } from 'reactstrap';

const CompanyList = ({ companies, history, handleDelete, handleStatusUpdate }) => {
  const handleUsersView = id => {
    history.push(`/admin/dashboard/companies/${id}/users`);
  };
  const handlePlanView = id => {
    history.push(`/admin/dashboard/companies/${id}/plans`);
  };
  const handleCompanyDelete = id => {
    console.log(id);
    const email = prompt('Enter email');
    const password = prompt('Enter password to proceed');
    if (password && password) {
      handleDelete(id, { email, password });
    }
  };
  const updateStatus = (is_active, id) => {
    handleStatusUpdate(id, is_active);
  };
  return (
    <div style={{ background: '#ffffff' }}>
      <h4>Registered companies</h4>
      <Table responsive hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>email</th>
            <th>Country</th>
            <th>Type</th>
            <th>Date Registered</th>
            <th>Last Login</th>
            <th>status</th>
            <th>Users</th>
            <th>Plan</th>
            <th>enable/disable</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {companies.length ? (
            companies.map(company => (
              <tr key={company.id}>
                <th scope="row">{company.id}</th>
                <td>
                  <img
                    src={company.logo || '/images/default_logo.jpeg'}
                    alt="company logo"
                    style={{ maxWidth: '20px', maxHeight: '20px' }}
                  />{' '}
                  <span>{company.name}</span>
                </td>
                <td>{company.companyemail}</td>
                <td>{company.country}</td>
                <td>{company.options}</td>
                <td>{new Date(company.date).toLocaleString()}</td>
                <td>{new Date(company.users[0].last_seen).toLocaleString()}</td>
                <td>{company.is_active ? 'active' : 'disabled'}</td>
                <td>
                  <Button
                    color="danger"
                    size="sm"
                    outline
                    onClick={() => handleUsersView(company.id)}
                  >
                    View
                  </Button>
                </td>
                <td>
                  <Button
                    color="danger"
                    size="sm"
                    outline
                    outline
                    onClick={() => handlePlanView(company.id)}
                  >
                    View
                  </Button>
                </td>
                <td>
                  <Button
                    color='danger'
                    outline
                    size="sm"
                    onClick={e => updateStatus(company.is_active, company.id)}
                  >
                    {company.is_active ? 'Disable' : 'Enable'}
                  </Button>
                </td>
                <td>
                  <Button color="danger" size="sm" onClick={() => handleCompanyDelete(company.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <Jumbotron>No Registered Companies</Jumbotron>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CompanyList;
