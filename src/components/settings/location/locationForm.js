import React, { Component } from 'react';
import { Button, Card, CardBody } from 'reactstrap';
class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.location.name || '',
      address: this.props.location.address || ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { location } = this.props;
    let { name, address } = this.state;
    if (location) {
      this.props.editLocation(location.id, { name, address });
    } else {
      this.props.addLocation({ name, address });
    }
    this.hideForm();
  }
  hideForm() {
    this.props.hideForm();
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <Card className="locajtion-form">
        <CardBody>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">
                Location name <span>*</span>
              </label>
              <input
                name="name"
                value={this.state.name}
                placeholder="enter name"
                required
                onChange={this.handleChange}
                className="form-control"
                style={{ border: 'none', borderBottom: '1px solid #ccc' }}
              />
            </div>
            <div>
              <label htmlFor="address">
                Location address <span>*</span>
              </label>
              <input
                name="address"
                value={this.state.address}
                placeholder="enter address"
                required
                onChange={this.handleChange}
                className="form-control"
                style={{ border: 'none', borderBottom: '1px solid #ccc' }}
              />
            </div>
            <br />
            <Button color="danger">
              {this.props.location ? 'Save' : 'Add'}
            </Button>
          </form>
          {this.props.location && (
            <span className="btn" onClick={this.hideForm}>
              cancel
            </span>
          )}
        </CardBody>
      </Card>
    );
  }
}

export default LocationForm;
