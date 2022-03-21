import React, { Component } from 'react';
import {
  getAllCompanies,
  deleteOneCompany,
  enableCompany,
  disableCompany,
  searchCompany
} from '../../../actions/adminActions';
import CompanyList from './CompanyList';
import SearchInput from '../../includes/SearchInput';
import Pagination from '../../common/pagination/Pagination';

class AdminCompaniesBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      count: 0
    };
  }
  async componentDidMount() {
    const companies = await getAllCompanies();
    if (companies) {
      this.setState({
        companies: companies.rows,
        count: companies.count
      });
    }
  }
  async deleteCompany(id, data) {
    const result = await deleteOneCompany(id, data);
    if (result) {
      const filtered = this.state.companies.filter(company => company.id !== id);
      this.setState({
        companies: filtered
      });
    }
  }
  updateStatus = async (id, action) => {
    switch (action) {
      case 0:
        this.setState({
          companies: this.state.companies.map(company =>
            company.id === id ? Object.assign({}, company, { is_active: 1 }) : company
          )
        });
        await enableCompany(id);

        break;
      case 1:
        this.setState({
          companies: this.state.companies.map(company =>
            company.id === id ? Object.assign({}, company, { is_active: 0 }) : company
          )
        });
        await disableCompany(id);

        break;
      default:
        return;
    }
  }
  searchCompany = async (search) => {
   const companies = await searchCompany(search)
   if (companies) {
    this.setState({
      companies: companies.rows,
      count: companies.count
    });
  }
  }
  handlePageChange = async (page) => {
    const companies = await getAllCompanies(page);
    if (companies) {
      this.setState({
        companies: companies.rows,
        count: companies.count
      });
    }
  }
  render() {
    const limit = 100;
    const { count } = this.state;
    const pages = Math.ceil(count / limit);

    return (
      <div style={{background: '#ffffff', padding:'2%'}}>
        <SearchInput onSearch={this.searchCompany} />
        <br />
        <CompanyList
          companies={this.state.companies}
          history={this.props.history}
          handleDelete={this.deleteCompany}
          handleStatusUpdate={this.updateStatus}
        />
        
        <Pagination pages={pages} changePage={this.handlePageChange} />
      </div>
    );
  }
}

export default AdminCompaniesBoard;
