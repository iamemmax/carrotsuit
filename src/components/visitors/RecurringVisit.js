import React, { Component } from 'react';
import { Input, Button, Form } from 'reactstrap';
import { addRecurringVisit, getRecurringVisits } from '../../actions/appointmentActions';
import moment from 'moment';

class RecurringVisit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visits: [],
      day_of_appoint: ''
    };
  }
  async componentDidMount() {
    const { short_id } = this.props;

    if (short_id) {
      const data = await getRecurringVisits(short_id);
      if (data)
        this.setState({
          visits: data
        });
    }
  }
  handleAdd = e => {
    e.preventDefault();

    const { day_of_appoint } = this.state;
    this.setState({
      visits: this.state.visits.concat({ day_of_appoint })
    });
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  handleSave = () => {
    const { short_id } = this.props;
    const { visits } = this.state;

    addRecurringVisit(short_id, visits);
  };
  formartDate(date) {
    return moment(date).format('LL');
  }
  render() {
    const { visits } = this.state;
    return (
      <div>
        <p>Select days to repeat visit</p>
        <small>Only dates without backdating errors will be added</small>
        <Form inline onSubmit={this.handleAdd}>
          <Input
            type="date"
            name="day_of_appoint"
            onChange={this.handleChange}
            placeholder="enter date"
            required
          />
          <Button>Add</Button>
        </Form>
        <br />
        {visits.length ? (
          <ul>
            {visits.map((visit, index) => (
              <li key={index}> {this.formartDate(visit.day_of_appoint)}</li>
            ))}
          </ul>
        ) : null
      }
        <br />
        <Button color="danger" onClick={this.handleSave}>
          Save
        </Button>
      </div>
    );
  }
}
export default RecurringVisit;
