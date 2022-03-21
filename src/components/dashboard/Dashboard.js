import React, { Component } from 'react';
import './dashboard.css';
import MainLayout from '../layout/MainLayout';
import PageSpinner from '../common/PageSpinner'
import componentQueries from 'react-component-queries';

import { Route, Switch } from 'react-router-dom';
import CompaniesBoard from '../companies/CompaniesBoard';
import VisitorHistory from '../visitors/VisitorHistory';
import CustomizePurpose from '../settings/signInFlow/CustomizePurpose';
// import BillingPage from '../billing/BillingPage';

// import PaystackPayment from '../admin/PaystackPayment';

// import PayStackPayment from '../admin/Payment.js/PayStackPayment';

// import SubscriptionSuccess from '../billing/SubscriptionSuccess';

const BoarderLanding = React.lazy(() => import('./dashBoardLanding/BoardLanding'));
const StaffBoard = React.lazy(() => import('../staff/StaffBoard'));
const VisitorsBoard = React.lazy(() => import('../visitors/VisitorsBoard'));
const AppointmentBoard = React.lazy(() => import('../appointments/AppointmentBoard'));
const AdminRolesBoard = React.lazy(() => import('../adminRoles/AdminRolesBoard'));
const StaffProfile = React.lazy(() => import('../staff/StaffProfile'));
const CompanySettings = React.lazy(() => import('../settings/logo/LogoSettings'));
const ConfigurationSettings = React.lazy(() => import('../settings/configs/AccountConfigs'));
const LocationSettings = React.lazy(() => import('../settings/location/LocationSettings'));
const DefaultCompanyHost = React.lazy(() => import('../../components/companies/DefaultCompanyHost'));
const WelcomeScreen = React.lazy(() => import('../../components/settings/welcomeScreen/WelcomeScreen'));
const SignInFlow = React.lazy(() => import('../../components/settings/signInFlow/SignInFlow'));
const VisitType = React.lazy(() => import('../../components/settings/signInFlow/VisitType'));
const ExhibitionMode = React.lazy(() => import('../settings/exhibitionMode/ExhibitionMode'));
const StaffAttendance = React.lazy(() => import('../staff/StaffAttendance'));
const Messaging = React.lazy(() => import('../messaging/Messaging'));

const HousesBoard = React.lazy(() => import('../housues/HousueBoard'));
const TenantsBoard = React.lazy(() => import('../tenants/TenantBoard'));
const PlanList = React.lazy(() => import('../billing/PlanList'));
const OrderConfirmation = React.lazy(() => import('../billing/OrderConfirmation'));
const BillingHistory = React.lazy(() => import('../billing/BillingHistory'));
const FutureBilling = React.lazy(() => import('../billing/FutureBilling'));
const VisitorBlacklist = React.lazy(() => import('../visitors/VisitorBlacklist'));
const VisitorDirectory = React.lazy(() => import('../directory/DirectoryBoard'));

const BillingPage = React.lazy(() => import('../billing/BillingPage'));
const PaystackPayment = React.lazy(() => import('../admin/PaystackPayment'));
const SubscriptionSuccess = React.lazy(() => import('../billing/SubscriptionSuccess'));

const AllEvents = React.lazy(() => import('../events/AllEvents'));
const EventSettings = React.lazy(() => import('../events/EventSettings'));
const Attendees = React.lazy(() => import('../events/Attendees'));
const EventsBoard = React.lazy(() => import('../events/EventsBoard'));
const OrderForm = React.lazy(() => import('../events/OrderForm'));
const CreateEventTicket = React.lazy(() => import('../events/CreateEventTicket'));
// import OrderForm from '../events/OrderForm';

// import CreateEventTicket from '../events/CreateEventTicket';





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
    history.push(`${match.url}/`);
  }

  render() {
    const { match } = this.props;
    return (
      <div className="main">
        <Switch>
          <MainLayout breakpoint={this.props.breakpoint}>
            <React.Suspense fallback={<PageSpinner />}>
              <Route exact path={`${match.path}/`} component={BoarderLanding} />
              <Route path={`${match.path}/2/:staff`} component={StaffBoard} />
              <Route path={`${match.path}/workspace/:companies`} component={CompaniesBoard} />
              <Route exact path={`${match.path}/estate/:houses`} component={HousesBoard} />
              <Route exact path={`${match.path}/5/:occupants`} component={TenantsBoard} />
              <Route path={`${match.path}/1/:visitors/logs`} component={VisitorsBoard} />
              <Route path={`${match.path}/1/:visitors/directory`} component={VisitorDirectory} />
              <Route path={`${match.path}/1/:visitors/blacklist`} component={VisitorBlacklist} />
              <Route path={`${match.path}/3/:invites`} component={AppointmentBoard} />
              <Route path={`${match.path}/4/:roles`} component={AdminRolesBoard} />
              <Route path={`${match.path}/9/:messaging`} component={Messaging} />
              <Route exact path={`${match.path}/staff/:profile`} component={StaffProfile} />
              <Route path={`${match.path}/staff/attendance/:id`} component={StaffAttendance} />
             
              <Route path={`${match.path}/billing/1/:plans`} component={PlanList} />
              <Route path={`${match.path}/billing/3/:history`} component={BillingHistory} />
              <Route path={`${match.path}/billing/4/:recurring`} component={FutureBilling} />
              <Route path={`${match.path}/billing/2/order-confirmation/:plan`} component={OrderConfirmation} />
              <Route
                path={`${match.path}/settings/3/:configurations`}
                component={ConfigurationSettings}
              />
              <Route path={`${match.path}/settings/1/:company`} component={CompanySettings} />
              <Route path={`${match.path}/settings/4/:exhibition`} component={ExhibitionMode} />
              <Route path={`${match.path}/settings/2/:location`} component={LocationSettings} />
              <Route path={`${match.path}/settings/5/:welcome-screen`} component={WelcomeScreen} />
              <Route path={`${match.path}/company/:default-host`} component={DefaultCompanyHost} />
              <Route path={`${match.path}/visitors/history/:phone/:name/:lastName`} component={VisitorHistory} />
              <Route exact path={`${match.path}/settings/6/sign-in-flow`} component={SignInFlow} />
              <Route exact path={`${match.path}/settings/6/sign-in-flow/:type`} component={VisitType} />
              
              
              
              <Route exact path={`${match.path}/billing-payment`} component={PaystackPayment} />


              <Route path={`${match.path}/billing-page`} component={BillingPage} />

              <Route path={`${match.path}/all-events`} component={AllEvents} />
              <Route path={`${match.path}/event-attendees`} component={Attendees} />
              <Route path={`${match.path}/event-settings`} component={EventSettings} />
              <Route path={`${match.path}/events-board`} component={EventsBoard} />
              <Route path={`${match.path}/order-form`} component={OrderForm} />
              <Route path={`${match.path}/create-event-ticket`} component={CreateEventTicket} />

              

              






              {/* <Route path={`${match.path}/payment-success`} component={SubscriptionSuccess} /> */}

              
              {/* <PrivateRoute path="/admin/payment" component={AdminDashboard} /> */}


            </React.Suspense>
          </MainLayout>
        </Switch>
      </div>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};
export default componentQueries(query)(Dashboard);
