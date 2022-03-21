import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/roleList.css';
import AdminEditForm from './AdminEditForm';
import Modal from '../common/modal/Modal';
import Can from '../common/Can';
import { CardBody, Card, Row, Col, CardText, CardTitle, CardFooter, CardImg } from 'reactstrap';

class RoleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      staff: null
    };
    this.openEditModal = this.openEditModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
  }
  openEditModal() {
    this.setState({
      showEditModal: true
    });
  }
  closeEditModal() {
    this.setState({
      showEditModal: false
    });
  }
  handleEditClick(staff) {
    this.setState({
      staff
    });
    this.openEditModal();
  }
  render() {
    const { roleList, searchTerm, getRoles } = this.props;
    if (!roleList.length) return <div className="jumbotron">No assigned roles</div>;
    return (
      <div>
        <Row>
          {roleList
            .filter(role => role.role.toLowerCase().includes(searchTerm.toLowerCase() || ''))
            .map(role => (
              <Col md={6} sm={6} xs={12} className="mb-3" key={role.id}>
                <Card className="flex-row">
                  <CardImg
                    className="card-img-left"
                    src={role.avatar || '/images/defaultAvatar.png'}
                    style={{ width: 100, height: 100 }}
                  />
                  <CardBody>
                    <CardTitle>
                      {role.first_name} {role.last_name}
                    </CardTitle>
                    <CardText>
                      <small>{role.role}</small>
                      <br />
                      <small>
                        Last seen:
                        {new Date(role.last_seen).toLocaleString()}
                      </small>
                    </CardText>
                    <Can
                      role={this.props.auth.user.role}
                      perform="admin-roles:edit"
                      yes={() => (
                        <button
                          className="btn btn-light btn-block"
                          onClick={() => this.handleEditClick(role)}
                        >
                          Edit
                        </button>
                      )}
                    />
                  </CardBody>
                </Card>
              </Col>
            ))}
        </Row>
        <Modal header="Edit role" show={this.state.showEditModal} close={this.closeEditModal}>
          <AdminEditForm
            staff={this.state.staff}
            closeModal={this.closeEditModal}
            getRoles={getRoles}
          />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(RoleList);
