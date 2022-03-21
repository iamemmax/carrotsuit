import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchDirectory, getDirectory, exportDirectory, bulkExportDirectory } from '../../actions/visitorActions';
import { FaUserPlus, FaFileImport, FaFileExport } from 'react-icons/fa';
import Modal from '../common/modal/Modal';
import { Nav, Button, NavItem, Navbar } from 'reactstrap';
import DirectoryImport from './DirectoryImport';
import DirectoryForm from './DirectoryForm';
import DirectoryList from './DirectoryList';
import SearchInput from '../includes/SearchInput';
import Can from '../common/Can';
import bn from '../../utils/bemnames';

const bem = bn.create('header');

class DirectoryBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showAddModal: false,
      showCsvModal: false,
    };
  }
  componentDidMount(){
    this.props.getDirectory(1)
  }
  setOpenShowCsvModal = () => {
    this.setState({
      showCsvModal: true
    });
  };
  setCloseShowCsvModal = () => {
    this.setState({
      showCsvModal: false
    });
  };
  setOpenAddModal = () => {
    this.setState({
      showAddModal: true
    });
  };
  setCloseAddModal = () => {
    this.setState({
      showAddModal: false
    });
  };
  exportDirectory = () => {
    const {user} = this.props.auth;
    // const {currentCase} = this.state
    bulkExportDirectory(user.id)
  }

  handleSearch = search => {
    this.props.searchDirectory(search)
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div className="mb-3">
          <div className="nav-wrapper">
            <Navbar light expand className={bem.b('bg-white')}>
              <Nav navbar className="mr-2">
                <Nav navbar>
                  <SearchInput onSearch={this.handleSearch} />
                </Nav>
              </Nav>
              <Nav navbar className={bem.e('nav-right')}>
                <NavItem>
                  <div className="btns">
                    <Can
                      role={user.role}
                      perform="visitor-directory:write"
                      yes={() => {
                        return user.option === 'workspace' && !user.workspace_company ? null : (
                          <Button size="sm" color="danger" onClick={this.setOpenShowCsvModal}>
                            <FaFileImport color="#ffffff" size={12} /> Import
                          </Button>
                        );
                      }}
                    />{' '}
                    <Can
                      role={this.props.auth.user.role}
                      perform="visitors:create"
                      yes={() => {
                        return user.option === 'estate' ? null : (
                          <Button color="danger" size="sm" onClick={this.exportDirectory}>
                            <FaFileExport size={13} color="#ffffff" /> Export
                          </Button>
                        );
                      }}
                    />{' '}
                    <Can
                      role={user.role}
                      perform="visitor-directory:write"
                      yes={() => {
                        return user.option === 'workspace' && !user.workspace_company ? null : (
                          <Button size="sm" color="danger" onClick={this.setOpenAddModal}>
                            <FaUserPlus color="#ffffff" size={12} /> Add new
                          </Button>
                        );
                      }}
                    />
                    
                  </div>
                </NavItem>
              </Nav>
            </Navbar>
          </div>
          <br />
          <DirectoryList history={this.props.history} />
        </div>
        <Modal
          header="New Record"
          className="modal"
          show={this.state.showAddModal}
          close={this.setCloseAddModal}
        >
          <DirectoryForm closeAddModal={this.setCloseAddModal} history={this.props.history} />
        </Modal>
        <Modal
          header="Import Records"
          className="modal"
          show={this.state.showCsvModal}
          close={this.setCloseShowCsvModal}
        >
          <DirectoryImport closeCsvModal={this.setCloseShowCsvModal} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  directories: state.directories
});

export default connect(mapStateToProps, {searchDirectory,getDirectory })(DirectoryBoard);
