import React from 'react';
import PlanList from './PlanList';
import BillingHistory from './BillingHistory';
import FutureBilling from './FutureBilling';
import Tabs from './Tabs';
import Panel from './Panel';
import './styles.css'
import { withRouter } from 'react-router-dom';


function BillingPage() {
  return <div style={{backgroundColor: 'white'}}>
      <Tabs>
          <Panel title="Plan List">
                <PlanList/>
          </Panel>
          <Panel title="Billing History">
                <BillingHistory/>
          </Panel>
          <Panel title="Future Billings">
                <FutureBilling/>
          </Panel>
      </Tabs>


  </div>;
}

export default withRouter(BillingPage)