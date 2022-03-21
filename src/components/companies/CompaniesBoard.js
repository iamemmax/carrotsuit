import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row, Nav, Button, NavItem, Navbar } from 'reactstrap';
import Modal from '../common/modal/Modal';
import CompanyList from './CompanyList';
import { addWorkspaceCompany, searchCompany, exportCompanies } from '../../actions/staffActions';
import CompanyForm from './CompanyForm';
import Paginate from '../common/pagination/Pagination';
import { withRouter } from 'react-router-dom';
import SearchInput from '../includes/SearchInput';
import bn from '../../utils/bemnames';
import Page from '../includes/Page';
import { FaFileExport, FaPrint, FaPlus } from 'react-icons/fa';

const bem = bn.create('header');

class CompaniesBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.openModalHandler = this.openModalHandler.bind(this);
    this.handleCompanySearch = this.handleCompanySearch.bind(this);
  }
  closeModalHandler() {
    this.setState({
      showModal: false
    });
  }
  openModalHandler() {
    this.setState({
      showModal: true
    });
  }
  handleCompanySearch(search) {
    this.props.searchCompany(search);
  }
  handleExport = () => {
    const { user } = this.props.auth;

    exportCompanies(user.id);
  };
  handlePrint = () => {
    window.print();
  };
  render() {
    return (
        <div>
          <div>
            <div className="mb-3">
              <div>
                <Navbar light expand className={bem.b('bg-white')}>
                  <Nav navbar className="mr-2">
                    <Nav navbar>
                      <SearchInput onSearch={this.handleCompanySearch} />
                    </Nav>
                  </Nav>
                  <Nav navbar className={bem.e('nav-right')}>
                    <NavItem>
                      <Button size="sm" color="danger" onClick={this.openModalHandler}>
                        <FaPlus size={13} color="#ffffff" />
                        Add new
                      </Button>{' '}
                      <Button color="danger" size="sm" onClick={this.handleExport}>
                        <FaFileExport size={13} color="#ffffff" /> Export
                      </Button>{' '}
                      <Button color="danger" size="sm" onClick={this.handlePrint}>
                        <FaPrint size={13} color="#ffffff" /> Print
                      </Button>
                    </NavItem>
                  </Nav>
                </Navbar>
              </div>
              <br />
                <CompanyList />
            </div>
          </div>
        <Paginate />
        <Modal
          header="New Company"
          className="modal"
          show={this.state.showModal}
          close={this.closeModalHandler}
        >
          <CompanyForm closeModal={this.closeModalHandler} history={this.props.history} />
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
      addWorkspaceCompany,
      searchCompany
    }
  )(CompaniesBoard)
);
