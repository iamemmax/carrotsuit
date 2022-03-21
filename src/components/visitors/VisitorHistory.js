import React, { Component } from 'react';
import { getVisitingHistory } from '../../actions/visitorActions';
import { Row, Col, Table, Card, CardBody, Jumbotron } from 'reactstrap';
class VisitorHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      name1: '',
      lastName1: '',
    };
  }
  async componentDidMount() {
    const { phone, name, lastName } = this.props.match.params;
    // console.log(n)

    this.setState({
      name1: name,
      lastName1: lastName
    })
    console.log(phone);
    try {
      const history = await getVisitingHistory(phone);
      if (history)
        this.setState({
          history
        });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <Row>
        <Col>
          <h5>Visitor History</h5>
          {this.state.history.length ? (
            <Card>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Signed in</th>
                      <th>Purpose</th>
                      <th>Host</th>
                      <th>Signed out</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.history.map(item => (
                      <tr>
                        <td>{item.name}</td>
                        <td>{new Date(item.visiting_date).toLocaleString()}</td>
                        <td>{item.purpose}</td>
                        <td>{this.state.name1 }  {this.state.lastName1}</td>
                        
                        <td>
                          {item.leaving_date
                            ? new Date(item.leaving_date).toLocaleString()
                            : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          ) : (
            <Jumbotron>No History</Jumbotron>
          )}
        </Col>
      </Row>
    );
  }
}

export default VisitorHistory;
