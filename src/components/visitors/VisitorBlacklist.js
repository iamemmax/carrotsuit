import React, { Component } from 'react';
import { removeBlacklistedVisitor, getBlacklistVisitors } from '../../actions/visitorActions';
import { Nav, Navbar, Jumbotron, Table, Button, NavItem, Modal } from 'reactstrap';
import SearchInput from '../includes/SearchInput';
import bn from '../../utils/bemnames';
import Swal from 'sweetalert2';
import { FaFileExport, FaFileImport } from 'react-icons/fa';
import Can from '../common/Can';
import { connect } from 'react-redux';
import VisitorImport from './VisitorImport';
import ModalComponent from '../common/modal/Modal';
import { exptBlcklstedVisitors } from '../../actions/visitorActions';

const bem = bn.create('header');

class VisitorBlacklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blacklist: [],
      showCsvModal: false,
    };
  }
  async componentDidMount() {
    const data = await getBlacklistVisitors();
    console.log(data, 'jjdjdjjdjdjjdjjd')
    if (data)
      this.setState({
        blacklist: data,
        search: ''
      });
  }
  handleSearch = search => {
    this.setState({
      search
    });
  };

  deleteRecord = id => {
    Swal.fire({
      title: 'Remove visitor from blacklist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continue'
    }).then(result => {
      if (result.value) {
        this.setState({
          blacklist: this.state.blacklist.filter(item => item.id !== id)
        })
        removeBlacklistedVisitor(id);
      }
    });
    
  };

  showCsvModal = () => {
    this.setState({
      showCsvModal: true
    });
  };
  closeCsvModal = () => {
    this.setState({
      showCsvModal: false
    });
  };


  exptBlcklstedVisitors = () => {
    const {user} = this.props.auth;
    const {currentCase} = this.state
    exptBlcklstedVisitors(user.id)
  }


  render() {
    const { blacklist, search } = this.state;
    const { user } = this.props.auth;


    return (
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
                    
                    <Can
                      role={this.props.auth.user.role}
                      perform="visitors:create"
                      yes={() => {
                        return user.option === 'estate' ? null : (
                          <Button color="danger" size="sm" onClick={this.showCsvModal}>
                            <FaFileImport size={13} color="#ffffff" /> Import
                          </Button>
                        );
                      }}
                    />{" "}
                    <Can
                      role={this.props.auth.user.role}
                      perform="visitors:create"
                      yes={() => {
                        return user.option === 'estate' ? null : (
                          <Button color="danger" size="sm" onClick={this.exptBlcklstedVisitors}>
                            <FaFileExport size={13} color="#ffffff" /> Export
                          </Button>
                        );
                      }}
                    />
                 
                  </NavItem>
                </Nav>
          </Navbar>
        </div>
        <br />
        {blacklist.length ? (
          <div className="visitor-list">
            <Table size="sm">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>phone</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
              {console.log(blacklist)}
                {blacklist
                  .filter(record =>
                    String(record.name)
                      .toLocaleLowerCase()
                      .includes(String(search).toLocaleLowerCase())
                  )
                  .map(record => (
                    <tr key={record.id}>
                      <td>
                        <img
                          src={record.visitorInfo? record.visitorInfo.avatar : '/images/defaultAvatar.png'}
                          alt="visititor picture"
                          style={{width: '50px', height: '50px'}}
                          className="visitor-pix"
                        />
                      </td>
                      <td>{record.name}</td>
                      <td>{record.phone_number}</td>
                      <td>
                        <button
                          className="btn btn-ouline-light"
                          data-toggle="delete"
                          onClick={() => this.deleteRecord(record.id)}
                        >
                          x
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <Jumbotron>No blacklisted visitors</Jumbotron>
        )}


        <ModalComponent
          header="Import Visitors"
          className="modal"
          show={this.state.showCsvModal}
          close={this.closeCsvModal}
        >
          <VisitorImport closeModal={this.state.showCsvModal} />
        </ModalComponent>
      </div>

      
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  visitor: state.visitor,
  staff: state.staff
});
export default 
  connect(
    mapStateToProps,
    {
     
      // getDefaultVisitPurposesFetch
    }
  )(VisitorBlacklist)
;

// export default VisitorBlacklist;
