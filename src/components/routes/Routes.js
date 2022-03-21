import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "../common/PrivateRoute";

import Login from "../auth/Login";
// import Register from "../auth/Register";
import Register from "../auth/Register";

import Dashboard from "../dashboard/Dashboard";
import StaffAction from "../staff/StaffAction";
import AcknowledgeAppointment from "../appointments/AcknowledgeAppointment";
import NotFound from "../layout/NotFound";
import AcceptRoleForm from "../adminRoles/AcceptRoleForm";
import ClientSchedule from "../appointments/ClientSchedule";
import VisitorEbarge from "../visitors/VistorEbarge";
import AdminLogin from "../admin/auth/AdminLogin";
import AdminDashboard from "../admin/dashboard/AdminDashboard";
import AcknowledgeSchedule from "../appointments/AcknowledgeSchedule";
import ForgotPasswordAdmin from "../admin/auth/ForgotPasswordAdmin";
import PasswordResetAdmin from "../admin/auth/PasswordResetAdmin";
import ForgotPassword from "../auth/ForgotPassword";
import PasswordReset from "../auth/PasswordReset";
import SubscriptionSuccess from "../billing/SubscriptionSuccess";
import SubscriptionFailed from "../billing/SubscriptionFailed";
import CustomizePurpose from "../settings/signInFlow/CustomizePurpose";
import Messaging from "../messaging/Messaging";
import VisitorPhoneForm from "../visitors/MobileRedirect/VisitorPhoneForm";
import PersonalForms from "../visitors/MobileRedirect/PersonalForms";
import WelcomeNotf from "../visitors/MobileRedirect/WelcomeNotf";
import MobDashboard from "../visitors/MobileRedirect/MobDashboard";
import ReturningVisitor from "../visitors/MobileRedirect/ReturningVisitor";
import VisitorCheckOut from "../visitors/MobileRedirect/VisitorCheckOut";
import staffCheck from "../visitors/MobileRedirect/staffCheck";
import VisitorSignOut from "../visitors/MobileRedirect/VisitorSignOut";
import InvitationCode from "../visitors/MobileRedirect/InvitationCode";
import ContactUsBilling from "../billing/ContactUsBilling";

const MyRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/password-reset" component={PasswordReset} />
        {/* <Route exact path="/admin/login" component={AdminLogin} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/messaging/" component={Messaging} />
        <PrivateRoute path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/host-action" component={StaffAction} />
        <Route path="/visitor-e-barge" component={VisitorEbarge} />
        <Route
          path="/acknowledge-appointment"
          component={AcknowledgeAppointment}
        />
        <Route path="/visitor-schedule" component={ClientSchedule} />
        <Route path="/visit-schedule" component={AcknowledgeSchedule} />
        <Route path="/accept-role" component={AcceptRoleForm} />
        <Route path="/not-found" component={NotFound} />
        <Route path="/admin/password-reset" component={PasswordResetAdmin} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/admin/forgot-password" component={ForgotPasswordAdmin} />
        <Route path="/payment-success" component={SubscriptionSuccess} />
        <Route path="/payment-failed" component={SubscriptionFailed} />

        <Route path="/phone-form" component={VisitorPhoneForm} />
        <Route path="/personal-form" component={PersonalForms} />
        <Route path="/mob-welcome-notf" component={WelcomeNotf} />
        <Route path="/returnee-form" component={ReturningVisitor} />
        <Route path="/mobile-dashboard" component={MobDashboard} />
        <Route path="/staff-checkout" component={staffCheck} />
        <Route path="/visitor-checkout" component={VisitorCheckOut} />
        <Route path="/mob-signout" component={VisitorSignOut} />
        <Route path="/invitee-code" component={InvitationCode} />

        <Route path="/billing-contact-us" component={ContactUsBilling} /> */}
      </Switch>
    </Router>
  );
};

export default MyRoutes;
