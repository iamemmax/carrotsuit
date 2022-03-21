import React, { Component } from 'react';
import {deleteAdmin, getAdmins } from '../../../actions/adminActions';
import { Table, Button, Jumbotron } from 'reactstrap';
import Modal from '../../common/modal/Modal';
import AdminForm from './AdminForm';

class AdminList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admins: [],
      showAddModal: false
    };
  }
  async componentDidMount() {
    const data = await getAdmins();
    if (data) {
      this.setState({
        admins: data
      });
    }
  }
  ToggleShowAddModal = () => {
    this.setState({
      showAddModal: !this.state.showAddModal
    });
  };

  handleAdd = data => {
    
    if (data) {
      this.setState({
        admins: this.state.admins.concat(data)
      });

      this.ToggleShowAddModal();
    }
  };
  handleDelete = async id => {
    await deleteAdmin(id);
    this.setState({
      admins: this.state.admins.filter(admin => admin.id !== id)
    });
  };

  render() {
    const { admins } = this.state;
    return (
      <div style={{ background: '#ffffff', padding: '2%' }}>
        <h4>Admin List</h4>
        <Button style={{ margin: '10px' }} color="danger" onClick={this.ToggleShowAddModal}>
          Add New
        </Button>
        {admins.length ? (
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>email</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {admins.map(admin => (
                <tr key={admin.id}>
                  <td>{admin.name} </td>
                  <td>{admin.email} </td>
                  <td>
                    <Button
                      color="danger"
                      size="sm"
                      outline
                      onClick={() => this.handleDelete(admin.id)}
                    >
                      delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Jumbotron>No admins</Jumbotron>
        )}
        <Modal
          show={this.state.showAddModal}
          close={this.ToggleShowAddModal}
          header="Add new admin"
        >
          <AdminForm handleAdd={this.handleAdd} />
        </Modal>
      </div>
    );
  }
}

export default AdminList;
