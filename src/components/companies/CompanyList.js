import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteCompany, getWorkspaceCompanies } from '../../actions/staffActions';
import Pagination from '../common/pagination/Pagination';
import Swal from 'sweetalert2';
import { Card, Col, Row, Table, Input, Button } from 'reactstrap';
import Modal from '../common/modal/Modal';
import MessageForm from '../visitors/MessageForm';
import EditForm from './EditForm';

class CompanyList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: null,
      marked: [],
      allMarked: false,
      list: [],
      showMessageModal: false,
      showEditModal: false
    };

    this.deleteOneCompany = this.deleteOneCompany.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  componentDidMount() {
    this.props.getWorkspaceCompanies();
  }
  handlEdit = company => {
    this.setState({
      company,
      showEditModal: true
    });
  };
  openMessageModal = () => {
    const { marked, allMarked } = this.state;
    const { companies } = this.props.workspace;
    const ids = companies.map(comp => comp.id);

    const list = allMarked ? ids : marked;
    this.setState({
      list,
      showMessageModal: true
    });
  };
  closeMessageModal = () => {
    this.setState({
      showMessageModal: false
    });
  };
  handleMarked = (e, id) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      this.setState({
        marked: this.state.marked.concat(id),
        allMarked: false
      });
    } else {
      this.setState({
        marked: this.state.marked.filter(vid => vid !== id),
        allMarked: false
      });
    }
  };
  isMarked = id => {
    const { marked } = this.state;
    return marked.includes(id);
  };
  deleteOneCompany(id) {
    Swal.fire({
      title: 'Are you sure you want to delete company?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.value) {
        this.props.deleteCompany(id);
        Swal.fire('Deleted!', 'Company successfully deleted.', 'success');
      }
    });
  }
  handlePageChange(page) {
    this.props.getCompany(page);
  }
  render() {
    const { companies, count } = this.props.workspace;
    const limit = 10;
    const pages = Math.ceil(count / limit);
    const { marked, allMarked } = this.state;
    if (companies)
      return (
        <div className="table-responsive">
          <Row>
            <Col>
              <Card body>
                {allMarked || marked.length ? (
                  <div>
                    <Button color="danger" size="sm" onClick={this.openMessageModal}>
                      Send message
                    </Button>
                  </div>
                ) : null}
                <Table responsive>
                  <thead>
                    <tr>
                      <th />
                      <th style={{position:'relative', bottom: '20px'}}>
                        <Input
                          type="checkbox"
                          onChange={e => this.setState({ allMarked: e.target.checked })}
                        />
                      </th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {companies.map(company => (
                      <tr key={company.id}>
                        <td />
                        <td className="single-mark">
                          <Input
                            type="checkbox"
                            checked={allMarked ? allMarked : this.isMarked(company.id)}
                            onChange={e => this.handleMarked(e, company.id)}
                          />
                        </td>
                        <td>{company.name}</td>
                        <td>{company.companyemail}</td>
                        <td>
                          <button
                            className="btn btn-ouline-light"
                            data-toggle="edit"
                            onClick={() => this.handlEdit(company)}
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-ouline-light"
                            data-toggle="delete"
                            onClick={() => this.deleteOneCompany(company.id)}
                          >
                            x
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>

          <Pagination pages={pages} changePage={this.handlePageChange} />
          <Modal
            show={this.state.showMessageModal}
            close={this.closeMessageModal}
            header="Send message"
          >
            <MessageForm list={this.state.list} type="company" close={this.closeMessageModal} />
          </Modal>
          {this.state.company && (
            <Modal
              show={this.state.showEditModal}
              close={() => this.setState({ showEditModal: false })}
              header="Edit Company"
            >
              <EditForm
                id={this.state.company.id}
                name={this.state.company.name}
                email={this.state.company.companyemail}
                closeModal={() => this.setState({ showEditModal: false })}
              />
            </Modal>
          )}
        </div>
      );
    if (!companies)
      return (
        <div style={{ textAlign: 'center' }}>
          <div className="spinner-border text-danger " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    if (!companies.length)
      return (
        <div style={{ textAlign: 'center', background: '#ffffff' }} className="jumbotron">
          No Company added
        </div>
      );
  }
}
const mapStateToProps = state => ({
  workspace: state.workspace
});
export default connect(
  mapStateToProps,
  {
    getWorkspaceCompanies,
    deleteCompany
  }
)(CompanyList);
