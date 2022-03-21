import React, { Component } from 'react';
import { lastMonthStats } from '../../actions/visitorActions';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import {Line, Bar } from 'react-chartjs-2';
import { getColor } from '../../utils/color';

class LastMonthStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }
  async componentDidMount() {
    const data = await lastMonthStats();

    if (data) {
      this.setState({
        data
      });
    }
  }
  getData(moreData = {}, moreData2 = {}) {
    const { data } = this.state;
    return {
      labels: data.label,
      datasets: [
        {
          label: 'Scheduled Visitors',
          backgroundColor: getColor('primary'),
          borderColor: getColor('primary'),
          borderWidth: 1,
          data: data.invitedVisitors,
          ...moreData
        },
        {
          label: 'Unscheduled visitors',
          backgroundColor: getColor('danger'),
          borderColor: getColor('danger'),
          borderWidth: 1,
          data: data.uninvitedVisitors,
          ...moreData2
        }
      ]
    };
  }
  render() {
    const { data } = this.state;
    const options = {
      plugins: {
        labels: {
          render: args => {
            if (args.value > 0) return `${args.percentage}%`;
            return 0;
          },
          fontColor: '#ffffff',
          showZero: false,
          fontSize: 13,
          arc: true
        }
      }
    };
    if (data) {
      return (
        <Row>
          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Last Month</CardHeader>
              <CardBody>
                <Bar data={this.getData()}  options={options} />
              </CardBody>
            </Card>
          </Col>
          <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Last Month</CardHeader>
              <CardBody>
                <Line data={this.getData({ fill: false }, { fill: false })} options={options} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      );
    } else return null;
  }
}

export default LastMonthStats;
