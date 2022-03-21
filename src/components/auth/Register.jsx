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
import { registerUser } from "../../actions/authActions";

const Register = () => {
  // const useStyles = makeStyle( )=>{}
  const [showPassword, setShowPassword] = useState(false);
  const [selectOption, setSelectOption] = useState(" Select Use Case");
  const handlePassword = (e) => {
    setShowPassword(!showPassword);
  };
  const handleSelect = (e) => {
    setSelectOption(e.target.value);
    console.log(selectOption);
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
                    <Link to="/login">
                      <span className="link">Sign in</span>
                    </Link>
                  </Typography>
                </div>
                <div className="text-center logo">
                  <img src={"/images/logo_200.png"} alt="logo" />
                </div>
                <Typography variant="h6" component="h2" className="title">
                  Welcome to Carrotsuit
                </Typography>
                <div className="helperText">
                  <Typography
                    variant="body2"
                    component="body2"
                    className="helperText"
                    align="center"
                  >
                    achieve a paperless visitor experience
                  </Typography>
                </div>
                <Grid
                  container
                  justifyContent="space-between"
                  alignContent="center"
                  spacing={2}
                >
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <TextField
                      label="First Name"
                      fullWidth
                      name="Fist_name"
                      size="small"
                      margin="normal"
                      variant="outlined"
                      color="secondary"
                      required
                      className="inputs"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      name="last_name"
                      size="small"
                      margin="normal"
                      color="secondary"
                      required
                      className="inputs"
                    />
                  </Grid>
                </Grid>

                <TextField
                  label="Company Name"
                  variant="outlined"
                  fullWidth
                  name="company_name"
                  size="small"
                  required
                  className="inputs"
                />

                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  color="secondary"
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

                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">
                    {/* Select Use Case */}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}

                    variant="outlined"
                    className="inputs"
                    size="small"
                    onChange={handleSelect}
                    value={selectOption}
                  >
                    <MenuItem size="small" value="Select Use Case">
                      Select Use Case
                    </MenuItem>
                    <MenuItem size="small" value="Office">
                      Office
                    </MenuItem>
                    <MenuItem size="small" value="estate">
                      Estate
                    </MenuItem>
                    <MenuItem size="small" value="workspace">
                      Work space
                    </MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="contained"
                  fullWidth
                  style={{ backgroundColor: "#f6733b" }}
                  className="cta_Btn"
                >
                  SIGNUP
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

export default Register;
