import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Nav, Button, NavItem, Navbar } from 'reactstrap';
import AdminForm from './AdminForm';
import Modal from '../common/modal/Modal';
import RoleList from './RoleList';
import { getRoles } from '../../actions/staffActions';
import './styles/adminRolesBoard.css';
import Can from '../common/Can';
import SearchInput from '../includes/SearchInput';
import bn from '../../utils/bemnames';
import Page from '../includes/Page';

const bem = bn.create('header');

class AdminRolesBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdminForm: false,
      roleList: [],
      searchTerm: ''
    };
    this.openAdminForm = this.openAdminForm.bind(this);
    this.closeAdminForm = this.closeAdminForm.bind(this);
    this.getAdminRoles = this.getAdminRoles.bind(this);
    this.searchRole = this.searchRole.bind(this);
  }
  componentDidMount() {
    this.getAdminRoles();
  }
  getAdminRoles() {
    getRoles().then(roles => {
      if (roles) {
        this.setState({
          roleList: roles
        });
      }
    });
  }
  openAdminForm() {
    this.setState({
      showAdminForm: true
    });
  }
  closeAdminForm() {
    this.setState({
      showAdminForm: false
    });
  }
  searchRole(search) {
    this.setState({
      searchTerm: search
    });
  }
  render() {
    const { showAdminForm } = this.state;
    return (
      <Page title="Roles" breadcrumbs={[{ name: 'Admin Roles', active: true }]}>
        <Row>
          <Col>
            <Card className="mb-3">
              <CardBody>
                <Navbar light expand className={bem.b('bg-white')}>
                  <Nav navbar className="mr-2">
                      <SearchInput onSearch={this.searchRole} />
                  </Nav>
                  <Nav navbar className={bem.e('nav-right')}>
                    <NavItem>
                      <Can
                        role={this.props.auth.user.role}
                        perform="admin-roles:write"
                        yes={() => (
                          <Button size="sm" color="danger" onClick={this.openAdminForm}>
                            New Admin
                          </Button>
                        )}
                      />
                    </NavItem>
                  </Nav>
                </Navbar>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <RoleList
                  roleList={this.state.roleList}
                  searchTerm={this.state.searchTerm}
                  getRoles={this.getAdminRoles}
                />
                {showAdminForm && (
                  <Modal header="Add admin" show={showAdminForm} close={this.closeAdminForm}>
                    <AdminForm closeModal={this.closeAdminForm} />
                  </Modal>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(AdminRolesBoard);
