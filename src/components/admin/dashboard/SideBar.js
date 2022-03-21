import SourceLink from '../../includes/SourceLink';
import React from 'react';
import { MdDashboard } from 'react-icons/md';
import { connect } from 'react-redux';
import { FaUserTie, FaUserCog, FaHouzz } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink
} from 'reactstrap';
import bn from '../../../utils/bemnames';
const sidebarBgImage = '/images/sidebar-4.jpg';
const logo200Image = '/images/logo_200.png';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: false
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img src={logo200Image} width="40" height="30" className="pr-2" alt="" />
              <span className="text-white">Carrotsuite OfficeMan</span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {/*{navItems.map(({ to, name, exact, Icon }, index) => (*/}
            <NavItem className={bem.e('nav-item')}>
              <BSNavLink
                id={`navItem-dashboard`}
                className="text-uppercase"
                tag={NavLink}
                to="/"
                activeClassName="active"
                exact={true}
              >
                <MdDashboard className={bem.e('nav-item-icon')} />
                <span className="">dashboard</span>
              </BSNavLink>

              <BSNavLink
                id={`navItem-visitors`}
                className="text-uppercase"
                tag={NavLink}
                to="/admin/dashboard/1/companies"
                activeClassName="active"
                exact={false}
              >
                <FaHouzz className={bem.e('nav-item-icon')} />
                <span className="">companies</span>
              </BSNavLink>
              <BSNavLink
                id={`navItem-staff`}
                className="text-uppercase"
                tag={NavLink}
                to="/admin/dashboard/2/plans"
                activeClassName="active"
                exact={false}
              >
                <FaUserTie className={bem.e('nav-item-icon')} />
                <span className="">plans</span>
              </BSNavLink>

              <BSNavLink
                id={`navItem-invites`}
                className="text-uppercase"
                tag={NavLink}
                to="/admin/dashboard/3/admins"
                activeClassName="active"
                exact={false}
              >
                <FaUserCog className={bem.e('nav-item-icon')} />
                <span className="">admins</span>
              </BSNavLink>
            </NavItem>
          </Nav>
        </div>
      </aside>
    );
  }
}

export default connect(null)(Sidebar);
