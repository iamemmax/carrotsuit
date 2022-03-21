import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deleteHouse, getEstateHouses } from '../../actions/staffActions';
import Pagination from '../common/pagination/Pagination';
import Swal from 'sweetalert2';
import { Card, Col, Row, Table } from 'reactstrap';

class HouseList extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount(){
    this.props.getEstateHouses();
  }
  deleteOneHouse = (id) => {
    Swal.fire({
      title: 'Are you sure you want to delete house?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(result => {
      if (result.value) {
        this.props.deleteHouse(id);
        Swal.fire('Deleted!', 'House successfully deleted.', 'success');
      }
    });
  }
  handlePageChange = (page) => {
    this.props.getEstateHouses(page);
  }
  render() {
    const { houses, count } = this.props.estate;
    const limit = 10;
    const pages = Math.ceil(count / limit);
    if (houses)
      return (
        <div className="table-responsive">
          <Row>
            <Col>
              <Card body>
                <Table>
                  <thead>
                    <tr>
                      <th>House Number</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {houses.map(house => (
                      <tr key={house.id}>
                        <td>{house.block_no}</td>
                        <td>
                          <button
                            className="btn btn-ouline-light"
                            data-toggle="delete"
                            onClick={() => this.deleteOneHouse(house.id)}
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
        </div>
      );
    if (houses.length)
      return (
        <div style={{ textAlign: 'center' }}>
          <div className="spinner-border text-danger " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    if (!houses.length)
      return (
        <div style={{ textAlign: 'center', background: '#ffffff' }} className="jumbotron">
          No house added
        </div>
      );
  }
}
const mapStateToProps = state => ({
  estate: state.estate
});
export default connect(
  mapStateToProps,
  {
    getEstateHouses,
    deleteHouse,
  }
)(HouseList);
