import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addOneDirRecord, editDirRecord } from '../../actions/visitorActions';
import { Button } from 'reactstrap';

class DirectoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name || '',
      email: this.props.email || '',
      phone: this.props.phone || '',
      type: this.props.type || '',
    };
  }
  hanldeChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      type: this.state.type
    };
    if (this.props.id) {
      this.props.editDirRecord(this.props.id, data).then(data => {
        if (data) {
          this.props.closeEditModal();
        }
      });
    } else
      this.props.addOneDirRecord(data).then(data => {
        if (data) {
          this.props.closeAddModal();
        }
      });
  }
  
  renderSpinner = () => {
    return (
      <div className="spinner-border text-light spinner-border-sm" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  };
  renderName() {
    return this.props.id ? 'Save' : 'Add';
  }
  
  render() {
    const { isLoading } = this.props.auth;
    const style = {border: 'none', borderBottom: '1px solid #ccc'}
    return (
      <div className="dir-form">
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="name">
                  Name <span>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.hanldeChange}
                  required
                  style={style}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="email">
                  Email <span>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.hanldeChange}
                  required
                  style={style}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="phone_number">
                  Phone <span>*</span>
                </label>
                <br />
                <input
                  type="tel"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.hanldeChange}
                  required
                  style={style}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label htmlFor="type">
                  Type <span>*</span>
                </label>
                <input
                  type="text"
                  name="type"
                  value={this.state.type}
                  onChange={this.hanldeChange}
                  required
                  style={style}
                />
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Button color="danger" disabled={isLoading}>
              {isLoading ? this.renderSpinner() : this.renderName()}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  {
    editDirRecord,
    addOneDirRecord,
  }
)(DirectoryForm);
