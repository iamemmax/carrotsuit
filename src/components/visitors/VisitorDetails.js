import React, { Component } from 'react';
import './styles/visitorDetails.css';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class VisitorDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      phone_number: ''
    };
    this.handleHistory = this.handleHistory.bind(this);
  }

  getPhoneNumber(visitorFields) {
    visitorFields =[visitorFields]
    console.log(visitorFields[0],'llllllllllllllllll')
    const gjjd = visitorFields[0].map(field => console.log(field, 'jjjjjjjjjjjj'))
    const phoneField = visitorFields.find(field => field[0].field_name == 'phone_number');
    console.log(phoneField, gjjd)
    console.log(visitorFields[0][2].field_value, 'lgywwwwwwwww')
    return visitorFields[0][2] && visitorFields[0][2].field_value
  }
  handleHistory(phone_number) {
    this.setState({
      phone_number,
      redirect: true
    });
  }
  render() {
    const { visitor, host} = this.props;
    //host from props 
    const { soughtVisitor } = this.props;

    console.log(host, 'jjjjjjjjjjjjjj00000jjjjjjjjjjjjjjhy')
    const { phone_number, redirect } = this.state;
    const name = host[0].last_name
    const lastName = host[0].first_name
    if (redirect) return <Redirect to={`/dashboard/visitors/history/${phone_number}/${lastName}/${name}`} />;
    return (
      <div className="details-wrapper">
        <section className="visitor-main">
          <figure>{visitor && <img src={visitor.avatar || '/images/defaultAvatar.png'} />}</figure>
          <table className="table table-striped">
            <tbody>
              {visitor.fields &&
                visitor.fields.map(field => {
                  if (
                    field.field_name !== 'private_note' &&
                    field.field_name !== 'estate_house' &&
                    field.field_name !== 'staff' &&
                    field.field_name !== 'workspace_company' &&
                    field.field_name !== 'company'
                  )
                    return (
                      <tr>
                        <td>{field.field_name}</td>
                        <td>{field.field_value}</td>
                      </tr>
                    );
                })}
              <tr>
                <td>Host</td>
                <td>
                  {/* {this.props.host.last_name} {host[0].last_name} */}
                  {host[0] && host[0].last_name} {host[0] && host[0].first_name}
                  {/* {soughtVisitor && soughtVisitor.first_name} {soughtVisitor && soughtVisitor.last_name} */}
                </td>
              </tr>
              <tr>
                <td>Sign in date</td>
                <td>{visitor.visiting_date && new Date(visitor.visiting_date).toLocaleString()}</td>
              </tr>
              <tr>
                <td>Sign out date</td>
                <td>
                  {visitor.leaving_date
                    ? new Date(visitor.leaving_date).toLocaleString()
                    : 'Still in'}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <div style={{ textAlign: 'center' }}>
            <Button
              color="danger"
              onClick={() => this.handleHistory(this.getPhoneNumber(visitor.fields))}
            >
              View History
            </Button>
          </div>
        </section>
      </div>
    );
  }
}

export default VisitorDetails;
