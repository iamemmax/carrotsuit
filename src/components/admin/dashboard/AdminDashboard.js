import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainLayout from './MainLayout';
import { Route, Switch } from 'react-router-dom';

const AdminCompaniesBoard = React.lazy(() => import('../companies/AdminCompaniesBoard'));
const CompanyUsers = React.lazy(() => import('../companies/CompanyUsers'));
const CompanyPlan = React.lazy(() => import('../companies/CompanyPlan'));
const PlansDashboard = React.lazy(() => import('../plans/plansDasboard'));
const AdminList = React.lazy(() => import('../admins/AdminList'));
const CompanyBillings = React.lazy(() => import('../companies/CompnyBillings'));
const SubcribeCompany = React.lazy(() => import('../companies/SubscribeCompany'));


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenComponents: true,
      isOpenContents: true,
      isOpenPages: true
    };
  }
  componentDidMount() {
    const { match, history } = this.props;
    history.push(`${match.url}/home`);
  }

  render() {
    const { match } = this.props;
    return (
      <div className="main">
        <Switch>
          <MainLayout>
            <React.Suspense fallback="Loading...">
              <Route exact path={`${match.path}/:home`} component={Dashboard} />
              <Route path={`${match.path}/1/:companies`} component={AdminCompaniesBoard} />
              <Route path={`${match.path}/2/:plans`} component={PlansDashboard} />
              <Route path={`${match.path}/3/:admins`} component={AdminList} />
              <Route exact path={`${match.path}/companies/:id/users`} component={CompanyUsers} />
              <Route exact path={`${match.path}/companies/:id/plans`} component={CompanyPlan} />
              <Route exact path={`${match.path}/companies/:id/billings`} component={CompanyBillings} />
              <Route exact path={`${match.path}/companies/:id/subscribe`} component={SubcribeCompany} />
            </React.Suspense>
          </MainLayout>
        </Switch>
      </div>
    );
  }
}

export default connect(null)(Dashboard);
