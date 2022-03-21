import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  List,
} from "@material-ui/core";
import { AiFillEye } from "react-icons/ai";

import "./styles/style.scss";
import { loginUser } from "../../actions/authActions";

// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
//       errors: {},
//     };
//     this.onChange = this.onChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//   }

//   componentDidMount() {
//     if (this.props.auth.isAuthenticated) {
//       this.props.history.push("/dashboard");
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.auth.isAuthenticated) {
//       this.props.history.push("/dashboard");
//     }

//     if (nextProps.errors) {
//       this.setState({ errors: nextProps.errors });
//     }
//   }

//   onChange = (e) => {
//     this.setState({ [e.target.id]: e.target.value });
//   };

//   onSubmit = (e) => {
//     e.preventDefault();
//     const { from } = this.props.location.state || {
//       from: { pathName: "dasboard" },
//     };
//     const { history } = this.props;

//     const userData = {
//       email: this.state.email,
//       password: this.state.password,
//     };
//     this.props.loginUser(userData, history, from);
//     //this.props.history.push(from.pathname || from.pathName);
//   };
//   handleSignupClick = (e) => {
//     e.preventDefault();
//     this.props.history.push("/register");
//   };
//   renderSpinner = () => {
//     return (
//       <div
//         className="spinner-border text-light spinner-border-sm"
//         role="status"
//       >
//         <span className="sr-only">Loading...</span>
//       </div>
//     );
//   };
//   render() {
//     const { errors } = this.props.errors;
//     const { isLoading } = this.props.auth;

//     console.log(errors, "ooooo");

//     return (
//       <Row
//         style={{
//           height: "100vh",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Col md={6} lg={4}>
//           <Card body>
//             <div className="login-wrapper">
//               <Form onSubmit={this.onSubmit}>
//                 <div className="text-center pb-4">
//                   <img
//                     src={"/images/logo_200.png"}
//                     className="rounded"
//                     style={{ width: 150, height: 150, cursor: "pointer" }}
//                     alt="logo"
//                   />
//                 </div>
//                 <span className="text-danger" />
//                 <div style={{ color: "red", backgroundColor: "yellow" }}>
//                   {" "}
//                   {errors}
//                 </div>

//                 {console.log(errors)}
//                 <FormGroup>
//                   <Label for="email">Email</Label>

//                   <Input
//                     onChange={this.onChange}
//                     value={this.state.email}
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="Email"
//                     required
//                     autoComplete="off"
//                     className={classnames("form-control", {})}
//                   />
//                   <FormFeedback>{errors}</FormFeedback>
//                 </FormGroup>
//                 <FormGroup>
//                   <Label for="password">Password</Label>
//                   <Input
//                     onChange={this.onChange}
//                     value={this.state.password}
//                     id="password"
//                     name="password"
//                     type="password"
//                     placeholder="Password"
//                     required
//                     className={classnames("form-control", {})}
//                   />
//                   <FormFeedback></FormFeedback>
//                 </FormGroup>
//                 <FormGroup check>
//                   <Link to="/forgot-password">Forgot password?</Link>
//                 </FormGroup>
//                 <hr />
//                 <Button
//                   size="lg"
//                   className="bg-gradient-theme-left border-0"
//                   block
//                   onClick={this.handleSubmit}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? this.renderSpinner() : "Login"}
//                 </Button>
//                 <div className="text-center pt-1">
//                   <h6>or</h6>
//                   <h6>
//                     <a href="#register" onClick={this.handleSignupClick}>
//                       Signup
//                     </a>
//                   </h6>
//                 </div>
//               </Form>
//             </div>
//           </Card>
//         </Col>
//       </Row>
//     );
//   }
// }

// Login.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors,
// });

// export default connect(mapStateToProps, { loginUser })(Login);
const Login = () => {
  // const useStyles = makeStyle( )=>{}
  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = (e) => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      {/* <Box> */}
      <Grid container className="form-container">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <div className="left_side_form">
            <div className="middle_box">
              <form noValidate autoComplete="off">
                <div className="go_to_auth_page">
                  <Typography variant="subtitle1" className="have_account_link">
                    Have an account ?
                    <Link to="/register">
                      <span className="link">Sign Up</span>
                    </Link>
                  </Typography>
                </div>
                <div className="text-center logo">
                  <img src={"/images/logo_200.png"} alt="logo" />
                </div>
                <Typography variant="h4" component="h2" className="title">
                  Welcome to Carrotsuit
                </Typography>
                <div className="helperText">
                  <Typography
                    variant="body2"
                    component="body2"
                    className="helperText"
                    align="center"
                  >
                    Login with your work email address
                  </Typography>
                </div>

                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  type="email"
                  size="small"
                  required
                  className="inputs"
                />

                <TextField
                  id="outlined-basic"
                  label="password"
                  variant="outlined"
                  fullWidth
                  name="Password"
                  size="small"
                  required
                  type={showPassword ? "text" : "Password"}
                  className="inputs"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="
                        start"
                        id="passwordIcon"
                        onClick={handlePassword}
                      >
                        <AiFillEye />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  style={{ backgroundColor: "#f4733b" }}
                  className="cta_Btn"
                >
                  Login
                </Button>
              </form>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <div className="right_Side">
            <div className="sidebar_middle_box">
              <Typography variant="h3" className="title" component="h2">
                Make your impression count in your best interest
              </Typography>

              <div className="listItems">
                <li>Frictionless & Fast Sign in Process</li>
                <li>Recognise Returning Visitors</li>
                <li>Custom Notifications</li>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      {/* </Box> */}
    </div>
  );
};
export default Login;
