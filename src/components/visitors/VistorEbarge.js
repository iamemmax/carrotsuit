import React, { Component } from 'react';
import queryString from 'query-string';
import Navbar from '../layout/Navbar';
import QrCode from 'qrcode.react';
import { getVisitorBarge, signOutByShortId } from '../../actions/visitorActions';
import './styles/visitorEbarge.css';
import { Table } from 'reactstrap';

class VisitorEbarge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vistor: null
    };
  }
  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const token = query.token;
    getVisitorBarge(token).then(data => {
      if (data) {
        this.setState({
          visitor: data
        });
      }
    });
  }
  getVisitorName(fields) {
    const nameField = fields.find(field => field.field_name === 'name');
    return nameField.field_value;
  }
  getVisitorEmail(fields) {
    const emailField = fields.find(field => field.field_name === 'email');
    return emailField.field_value;
  }
  getVisitorPhone(fields) {
    const phoneField = fields.find(field => field.field_name === 'phone_number');
    return phoneField.field_value;
  }
  handleSignOut(id) {
    signOutByShortId(id);
  }
  render() {
    const { visitor } = this.state;
    if (!visitor) return <div className="jumbotron">Broken link</div>;
    return (
      <div className="e-barge">
        <Navbar />
        <main className="main">
          <div className="barge-wrapper">
            <figure>
              <img src={visitor.companyInfo.logo || '/images/logo_200.png'} alt="company_logo" />
              <figcaption>{visitor.companyInfo.name} </figcaption>
              <figcaption>
                {visitor.locationInfo.name}-
                {visitor.locationInfo.address}, {visitor.companyInfo.companyemail}
              </figcaption>
            </figure>
            <h4>Visitors e-pass</h4>
            {visitor.avatar && (
              <figure>
                <img src={visitor.avatar} alt="visitors picture" />
              </figure>
            )}
            <table className="table table-sm table-borderless ">
              <tbody>
                <tr>
                  <td className="field-name">Name</td>
                  <td>{this.getVisitorName(visitor.fields)}</td>
                </tr>
                <tr>
                  <td className="field-name">phone</td>
                  <td>{this.getVisitorPhone(visitor.fields)}</td>
                </tr>
                <tr>
                  <td className="field-name">Host</td>
                  <td>
                    {visitor.host.first_name} {visitor.host.last_name}
                  </td>
                </tr>
                <tr>
                  <td className="field-name">Date</td>
                  <td>{new Date(visitor.visiting_date).toLocaleString()} </td>
                </tr>
              </tbody>
            </table>
            <button
              className="btn btn-link btn-md"
              onClick={() => this.handleSignOut(visitor.short_id)}
            >
              CLICK HERE TO SIGN OUT
            </button>
            <div className="barcode">
              <QrCode value={visitor.short_id || '28491847657'} />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default VisitorEbarge;
