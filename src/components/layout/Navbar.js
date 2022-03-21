import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import classnames from "classnames";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsedNavbar: true
    };
    this.toggleIsCollapsedNavbar = this.toggleIsCollapsedNavbar.bind(this);
    this.guestLinks = this.guestLinks.bind(this);
    this.authLinks = this.authLinks.bind(this);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  toggleIsCollapsedNavbar() {
    this.setState({
      isCollapsedNavbar: !this.state.isCollapsedNavbar
    })
  }
  guestLinks = user => (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item text-light">
        <Link to="/register" className="nav-link">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
    </ul>
  );

  authLinks = user => (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/visitors" className="nav-link ">Visitors</Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link to="/" className="nav-link">
          {user.avatar ? (
            <img
              className="circle"
              src={user.avatar}
              alt={user.first_name}
              style={{ width: '35px', marginRight: '5px' }}
              title="You must upload an image to see it here"
            />
          ) : (
            user.first_name
          )}
        </Link>
      </li>
    </ul>
  );

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div>
        <nav className="navbar navbar-expand-lg  navbar-light bg-light ">
          <a className="navbar-brand" href="/">
            <img src='/images/logo_200.png' style={{width: '50px', height:'50px'}} /> {' '}
              CarrotsuiteSpace
          </a>
          <button
            onClick={this.toggleIsCollapsedNavbar}
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className={classnames('navbar-collapse',{'collapse': this.state.isCollapsedNavbar})}
            id="navbarSupportedContent"
          >
            {isAuthenticated ? this.authLinks(user) : this.guestLinks()}
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
