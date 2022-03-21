import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Table, Card, CardBody, Button } from 'reactstrap';
import {
  getAttendance,
  getTodayAttendance,
  getWeekAttendance,
  getCustomAttendance
} from '../../actions/staffActions';
import Pagination from '../common/pagination/Pagination';

class StaffAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: '',
      dateTo: '',
      currentCase: '',
      showCustomDateSelect: false
    };
  }
  async componentDidMount() {
    const date = new Date();
    let dateFrom = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    let dateTo = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    this.setState({
      dateFrom,
      dateTo
    });

    const { id } = this.props.match.params;
    this.props.getWeekAttendance(id, 1, 10);
  }
  formatDate(date) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];

    const newDate = new Date(date);
    const theDate = `${days[newDate.getDay()]},${months[newDate.getMonth()]} ${newDate.getFullYear()} `;
    return theDate;
  }
  toggleCustomDateSelect = () => {
    this.setState({
      showCustomDateSelect: !this.state.showCustomDateSelect
    });
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  getCustomAttendance = e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { dateFrom, dateTo } = this.state;
    this.props.getCustomAttendance(id, dateFrom, dateTo, 1, 10);
  };
  handlePageChange = page => {
    const { currentCase } = this.state;
    switch (currentCase) {
      case 'Today': {
        const { id } = this.props.match.params;
        this.props.getTodayAttendance(id, page, 10);
        break;
      }

      case 'One_week_ago': {
        const { id } = this.props.match.params;
        this.props.getWeekAgoAppointment(id, page, 10);
        break;
      }
      case 'Custom': {
        const { dateFrom, dateTo } = this.state;
        const { id } = this.props.match.params;
        this.props.getCustomAttendance(id, dateFrom, dateTo, page, 10);
        break;
      }
      default: {
        const { id } = this.props.match.params;
        this.props.getWeekAttendance(id, 1, 10);
      }
    }
  };
  handleDateSelect = e => {
    const { value } = e.target;
    this.setState({ currentCase: value });
    switch (value) {
      case 'Today':
        const { id } = this.props.match.params;
        this.props.getTodayAttendance(id, 1, 10);
        break;

      case 'One_week_ago': {
        const { id } = this.props.match.params;
        this.props.getWeekAttendance(id, 1, 10);
        break;
      }
      case 'Custom': {
        const { id } = this.props.match.params;
        this.toggleCustomDateSelect(id, 1, 10);
        break;
      }
      default: {
        const { id } = this.props.match.params;
        this.props.getWeekAttendance(id, 1, 10);
      }
    }
  };
  renderDateSelect = () => {
    return (
      <Card>
        <CardBody>
          <label>Filter Records</label>
          <select
            style={{ border: 'none', borderBottom: '1px solid #ccc' }}
            onChange={this.handleDateSelect}
            name="date"
            className="form-control date-select"
          >
            <option value="One_week_ago">Last 7 days</option>
            <option value="Today">Today</option>
            <option value="Custom">Custom</option>
          </select>
          <br />
          {this.state.showCustomDateSelect && this.renderCustomDateSelect()}
        </CardBody>
      </Card>
    );
  };
  renderCustomDateSelect = () => {
    const { dateFrom, dateTo } = this.state;
    return (
      <form onSubmit={this.getCustomAttendance}>
        <div className="custom-date">
          <div className="form-group">
            <label>from</label>
            <input
              type="text"
              name="dateFrom"
              onChange={this.handleChange}
              className="form-control"
              value={dateFrom}
            />
          </div>{' '}
          <div className="form-group">
            <label>to</label>
            <input
              type="text"
              value={dateTo}
              name="dateTo"
              onChange={this.handleChange}
              className="form-control"
            />
          </div>{' '}
          <div className="btn-filter">
            <Button color="danger" size="sm">
              Search
            </Button>
          </div>{' '}
          <span onClick={this.toggleCustomDateSelect}>x</span>
        </div>
      </form>
    );
  };
  render() {
    const limit = 10;
    const { count, attendance } = this.props.staff;
    const pages = Math.ceil(count / limit);
    return (
      <div>
        <main className="attendance">
          <h4>Staff Attendance record</h4>
          {this.renderDateSelect()}
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Signed-in</th>
                <th>Signed-out</th>
              </tr>
            </thead>

            <tbody>
              {console.log(attendance)}
              {attendance ? (
                attendance.map(record => (
                  <tr>
                    <td>{this.formatDate(record.date)}</td>
                    <td>{record.time_in || '-'}</td>
                    <td>{record.time_out || '-'}</td>
                  </tr>
                ))
              ) : (
                <span>No Records</span>
              )}
            </tbody>
          </Table>
          
        </main>
        <Pagination pages={pages} changePage={this.handlePageChange} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  staff: state.staff
});
export default connect(
  mapStateToProps,
  {
    getAttendance,
    getCustomAttendance,
    getTodayAttendance,
    getWeekAttendance
  }
)(StaffAttendance);
