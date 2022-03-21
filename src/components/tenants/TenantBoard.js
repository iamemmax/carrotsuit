import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, Button, NavItem, Navbar } from 'reactstrap';
import TenantList from './TenantList';
import './styles.css';
import Modal from '../common/modal/Modal';
import TenantForm from './TenantForm';
import { searchStaff } from '../../actions/staffActions';
import Paginate from '../common/pagination/Pagination';
import { withRouter } from 'react-router-dom';
import SearchInput from '../includes/SearchInput';
import bn from '../../utils/bemnames';
import Can from '../common/Can';

const bem = bn.create('header');

class TenantBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }
  closeModalHandler = () => {
    this.setState({
      showModal: false
    });
  }
  openModalHandler = () => {
    this.setState({
      showModal: true
    });
  }
  
  handleTenantSearch = (search) => {
    this.props.searchStaff(search);
  }
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div>
          <div>
            <div className="mb-3">
              <div className="nav-wrapper">
                <Navbar light expand className={bem.b('bg-white')}>
                  <Nav navbar className="mr-2">
                    <Nav navbar>
                      <SearchInput onSearch={this.handleTenantSearch} />
                    </Nav>
                  </Nav>
                  <Nav navbar className={bem.e('nav-right')}>
                    <NavItem>
                      <div className="btns">
                        <Can
                          role={user.role}
                          perform="tenant-directory:write"
                          yes={() => 
                              <Button size="sm" color="danger" onClick={this.openModalHandler}>
                                Add new
                              </Button>
                    
                          }
                        />
                      </div>
                    </NavItem>
                  </Nav>
                </Navbar>
              </div>
              <br />
                <TenantList history={this.props.history} />
              
            </div>
          </div>
        </div>
        <Paginate />
        <Modal
          header="New Occupant"
          className="modal"
          show={this.state.showModal}
          close={this.closeModalHandler}
        >
          <TenantForm closeAddTenantModal={this.closeModalHandler} history={this.props.history} />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default withRouter(
  connect(
    mapStateToProps,
    {
      searchStaff
    }
  )(TenantBoard)
);
