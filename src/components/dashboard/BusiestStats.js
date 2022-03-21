import React, { Component } from 'react';
import { busiestStats } from '../../actions/visitorActions';
import { FaUsers } from 'react-icons/fa';

import { CardGroup } from 'reactstrap';
import IconWidget from '../IconWidget';

class BusiestStats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }
  async componentDidMount() {
    const data = await busiestStats();

    if (data) {
      this.setState({ data });
    }
  }
  render() {
    const { data } = this.state;

    console.log("...me.",(data))
    // console.log("...me.",data[2])
    
    if (!data) return null;
    return (
      <div>
        {console.log("...me.",(data))}
        <h4>Busiest Days</h4>
        <CardGroup style={{ marginBottom: '1rem' }}>
          {data && data.map(datum => (
            <IconWidget
              key={datum.title}
              bgColor="white"
              inverse={false}
              icon={FaUsers}
              title={datum.title}
              subtitle={datum.data}
              visitors={datum.visitors1}
            />
          ))}
        </CardGroup>
      </div>
    );
  }
}

export default BusiestStats;
