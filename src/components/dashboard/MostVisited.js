import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import UserProgressTable from '../UserProgressData';
import { mostVisited } from '../../actions/visitorActions';
import { MdPersonPin } from 'react-icons/md';

class MostVisited extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }
  async componentDidMount() {
    const data = await mostVisited();
    if (data) {
      this.setState({
        data
      });
    }
  }
  render() {
    const { data } = this.state;
    if(!data) return null
    return (
      <Row>
        <Col md="6" sm="12" xs="12">
          <Card>
            <CardHeader>Most Visited</CardHeader>
            <CardBody>
              <UserProgressTable
                headers={[<MdPersonPin size={25} />, 'name', 'visitors', 'percentile', '%']}
                usersData={data}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default MostVisited;
