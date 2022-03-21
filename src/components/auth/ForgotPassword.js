import React from 'react';
import ForgotPasswordForm from './ForgotPassworldForm';
import { forgotPassword } from '../../actions/staffActions';

const ForgotPassword = () => <ForgotPasswordForm forgotPassword={forgotPassword} />;

export default ForgotPassword;
