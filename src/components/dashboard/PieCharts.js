import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { getColor } from '../../utils/color';
import { Card, Row, Col, CardHeader, CardBody } from 'reactstrap';
import { getVisitingStats } from '../../actions/visitorActions';
import 'chartjs-plugin-labels';

class PieCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      

    };
  }
  async componentDidMount() {
    const data = await getVisitingStats();

    console.log(data, 'jjj')

    if (data) {
      this.setState({
        data
      });
    }
  }


  
  render() {
    const { data } = this.state;
    if (data) {
      const visitTypes = {
        datasets: [
          {
            data: data.purposeVisitors.data,
            // backgroundColor: data.purposeVisitors.colors,
            backgroundColor: [
              getColor('primary'),
              getColor('danger'),
              getColor('success'),
              getColor('info'),
              getColor('success')
            ],
            label: 'Dataset 1'
          }
        ],
        labels: data.purposeVisitors.label
      };
      const scheduleOrNot = {
        datasets: [
          {
            data: data.scheduleOrNot.data,
            backgroundColor: [
              getColor('primary'),
              getColor('danger'),
              getColor('success'),
              getColor('info'),
              getColor('success')
            ],
            label: 'Dataset 1'
          }
        ],
        labels: data.scheduleOrNot.label
      };
      const newOrReturning = {
        datasets: [
          {
            data: data.newOrReturning.data,
            backgroundColor: [
              getColor('primary'),
              getColor('danger'),
              getColor('success'),
              getColor('info'),
              getColor('success')
            ],
            label: 'Dataset 1'
          }
        ],
        labels: data.newOrReturning.label
      };
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
      return (
        <Row>
          <Col   >
            <Card>
              <CardHeader>Visitors by purpose</CardHeader>
              <CardBody>
                <Pie data={visitTypes}

                    options={{
                      legend: { display: true, position: "right" },

                      datalabels: {
                        display: true,
                        color: "white",
                      },
                      tooltips: {
                        backgroundColor: "#5a6e7f",
                      },

                      plugins: {
                        labels: {
                       
                          fontColor: '#ffffff',
                          // showZero: false,
                          fontSize: 13,
                        
                        }
                      }
                    }}
                
                />
              </CardBody>
            </Card>
          </Col>
          <Col   >
            <Card>
              <CardHeader>Visitors by schedule</CardHeader>
              <CardBody>
                <Pie data={scheduleOrNot} 
                
                  options={{

                   
                    legend: { display: true, position: "right" },
          
                    datalabels: {
                      display: true,
                      color: "white",
                    },
                    
                    tooltips: {
                      backgroundColor: "#5a6e7f",
                    },

                    plugins: {
                      labels: {
                     
                        fontColor: '#ffffff',
                        showZero: false,
                        fontSize: 13,
                      
                      }
                    }
                  }}
                
                
                
                />
              </CardBody>
            </Card>
          </Col>
          <Col >
            <Card>
              <CardHeader>Visitors by type</CardHeader>
              <CardBody>
                <Pie data={newOrReturning} 

                    options={{
                      legend: { display: true, position: "right" },

                      datalabels: {
                        display: true,
                        color: "white",
                      },
                      tooltips: {
                        backgroundColor: "#5a6e7f",
                      },

                      plugins: {
                        labels: {
                       
                          fontColor: '#ffffff',
                          showZero: false,
                          fontSize: 13,
                        
                        }
                      }
                    }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      );
    } else {
      return null;
    }
  }
}

export default PieCharts;
