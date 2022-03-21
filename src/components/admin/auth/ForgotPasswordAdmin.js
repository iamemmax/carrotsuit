import React from 'react';
import ForgotPasswordForm from '../../auth/ForgotPassworldForm';
import { forgotPassword } from '../../../actions/adminActions';

const ForgotPasswordAdmin = () => <ForgotPasswordForm forgotPassword={forgotPassword} />;

export default ForgotPasswordAdmin;
