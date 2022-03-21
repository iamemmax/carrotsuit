import React, { Component } from 'react';
import { getGeneralStats } from '../../actions/visitorActions';
import { Row, Col } from 'reactstrap';
import NumberWidget from '../Widget';

class GeneralStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }
  async componentDidMount() {
    const data = await getGeneralStats();

    if (data) {
      this.setState({ data });
    }
  }
  render() {
    const { data } = this.state;
    if (!data) return null;
    return (
      <Row>
        <Col lg={3} md={6} sm={6} xs={12}>
          <NumberWidget
            title="Visitors"
            subtitle="Today"
            number={data.todaysVisitors}
            color="danger"
            progress={{
              value: data.yesterdayVisitors,
              label: 'Yesterday'
            }}
          />
        </Col>
        <Col lg={3} md={6} sm={6} xs={12}>
          <NumberWidget
            title="Visitors in premises"
            subtitle=""
            number={data.signedInVisitors}
            color="danger"
            progress={{
              value: '',
              label: ''
            }}
          />
        </Col>

        <Col lg={3} md={6} sm={6} xs={12}>
          <NumberWidget
            title="Exits"
            subtitle=""
            number={data.signedOutVisitors}
            color="danger"
            progress={{
              value: '',
              label: ''
            }}
          />
        </Col>
        <Col
          lg={3}
          md={6}
          sm={6}
          xs={12}
          onClick={() => this.props.history.push('/dashboard/3/invites')}
          style={{cursor: 'pointer'}}
        >
          <NumberWidget
            title="Scheduled Visits"
            subtitle=""
            number={data.todayInvites}
            color="danger"
            progress={{
              value: '',
              label: ''
            }}
          />
        </Col>
      </Row>
    );
  }
}

export default GeneralStats;
