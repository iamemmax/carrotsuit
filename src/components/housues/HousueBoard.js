import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, Button, NavItem, Navbar } from 'reactstrap';
import Modal from '../common/modal/Modal'
import HouseList from './HouseList';
import { addEstateHouse, searchHouse } from "../../actions/staffActions";
import HouseForm from "./HouseForm";
import Paginate from '../common/pagination/Pagination';
import { withRouter } from 'react-router-dom';
import SearchInput from '../includes/SearchInput';
import bn from '../../utils/bemnames';

const bem = bn.create('header');

class HousesBoard extends Component {
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
  handleHouseSearch = (search) => {
    this.props.searchHouse(search);
  }
  render() {
    return (
      <div>
        <div>
          <div>
            <div className="mb-3">
              <div className="nav-wrapper">
                <Navbar light expand className={bem.b('bg-white')}>
                  <Nav navbar className="mr-2">
                    <Nav navbar>
                      <SearchInput onSearch={this.handleHouseSearch} />
                    </Nav>
                  </Nav>
                  <Nav navbar className={bem.e('nav-right')}>
                    <NavItem>
                      <div className="btns">
                        <Button size="sm" color="danger" onClick={this.openModalHandler}>
                          Add new
                        </Button>
                      </div>
                    </NavItem>
                  </Nav>
                </Navbar>
              </div>
                <br />
                <HouseList />
            </div>
          </div>
        </div>
        <Paginate />
        <Modal
          header="New House"
          className="modal"
          show={this.state.showModal}
          close={this.closeModalHandler}
        >
          <HouseForm closeModal={this.closeModalHandler} history = {this.props.history} />
        </Modal>
        </div>
    );
  }
}
export default withRouter(
  connect(
    null,
    {
      addEstateHouse,
      searchHouse
    }
  )(HousesBoard)
);
