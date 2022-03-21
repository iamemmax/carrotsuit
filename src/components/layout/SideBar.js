import SourceLink from '../includes/SourceLink';
import React from 'react';
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdSettings,
  MdPermDataSetting,
  MdAddLocation,
  MdNotificationsActive,
  MdMonetizationOn,
  MdFeaturedPlayList,
  MdLocalFlorist,
  MdPeople,
  MdSecurity,
  MdFolder,
  MdGroupWork
} from 'react-icons/md';
import { connect } from 'react-redux';
import Can from '../common/Can';
import Modal from '../common/modal/Modal';
import {
  FaUserTie,
  FaUserCog,
  FaHouzz,
  FaUsers,
  FaShoePrints,
  FaHistory,
  FaClock,
  FaHome,
  FaRegEnvelope,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import {getCompany} from '../../actions/settingsActions'
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink
} from 'reactstrap';
import bn from '../../utils/bemnames';
import EmergencyForm from '../visitors/EmergencyForm';
import { IoIosPeople, IoIosWalk } from 'react-icons/io';
const sidebarBgImage = '/images/sidebar-4.jpg';
const logo200Image = '/images/logo_200.png';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

const navComponents = [
  { to: '/dashboard/settings/1/company', name: 'company', exact: false, Icon: MdGroupWork },
  {
    to: '/dashboard/settings/6/sign-in-flow',
    name: 'sign-in flow',
    exact: false,
    Icon: IoIosWalk
  },
  {
    to: '/dashboard/settings/2/location',
    name: 'location',
    exact: false,
    Icon: MdAddLocation
  },

  {
    to: '/dashboard/settings/5/welcome-screen',
    name: 'welcome screen',
    exact: false,
    Icon: MdLocalFlorist
  },
  {
    to: '/dashboard/settings/3/configurations',
    name: 'configurations',
    exact: false,
    Icon: MdPermDataSetting
  },
  {
    to: '/dashboard/settings/4/exhibition',
    name: 'exhibition mode',
    exact: false,
    Icon: FaShoePrints
  }
];
const billingComponents = [
  { to: '/dashboard/events-board', name: 'Events', exact: false, Icon: MdFeaturedPlayList },
  {
    to: '/dashboard/all-events',
    name: 'Attendees',
    exact: false,
    Icon: FaHistory
  },
  {
    to: '/dashboard/event-settings',
    name: 'Event Settings',
    exact: false,
    Icon: FaClock
  }
];

const visitorComponent = [
  { to: '/dashboard/1/visitors/logs', name: 'Visitor Logs', exact: false, Icon: MdPeople },
  {
    to: '/dashboard/1/visitors/directory',
    name: 'Directory',
    exact: false,
    Icon: MdFolder
  },
  {
    to: '/dashboard/1/visitors/blacklist',
    name: 'Blacklist',
    exact: false,
    Icon: MdSecurity
  }
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: false,
    isOpenBillingComponents: false,
    isOpenVisitorComponents: false,
    isOpenEmergencyModal: false
  };
  componentDidMount(){
    this.props.getCompany()
  }
  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen
      };
    });
  };
  handleBillingClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen
      };
    });
  };
  handleVisitorsClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen
      };
    });
  };
  toggleEmergencyModal = () => {
    this.setState({
      isOpenEmergencyModal: !this.state.isOpenEmergencyModal
    });
  };
  renderSettings() {
    const { user } = this.props.auth;
    if (!user.workspace_company) {
      return (
        <Collapse isOpen={this.state.isOpenComponents}>
          {navComponents.map(({ to, name, exact, Icon }, index) => (
            <NavItem key={index} className={bem.e('nav-item')}>
              <BSNavLink
                id={`navItem-${name}-${index}`}
                className="text-uppercase"
                tag={NavLink}
                to={to}
                
                exact={exact}
              >
                <Icon className={bem.e('nav-item-icon')} />
                <span className="">{name}</span>
              </BSNavLink>
            </NavItem>
          ))}
        </Collapse>
      );
    } else if (user.workspace_company || user.role === 'CARE_TAKER') {
      return (
        <Collapse isOpen={this.state.isOpenComponents}>
          <NavItem className={bem.e('nav-item')}>
            <BSNavLink
              id={`navItem-defaulthost`}
              className="text-uppercase"
              tag={NavLink}
              to="/dashboard/company/default-host"
              
              exact={true}
            >
              <FaUserCog className={bem.e('nav-item-icon')} />
              <span className="">default host</span>
            </BSNavLink>
          </NavItem>
        </Collapse>
      );
    }
  }
  renderBillings() {
    const { user } = this.props.auth;
    return (
      <Collapse className='items-menu' isOpen={this.state.isOpenBillingComponents}>
        {billingComponents.map(({ to, name, exact, Icon }, index) => (
          <NavItem key={index} className={bem.e('nav-item')}>
            <BSNavLink
              id={`navItem-${name}-${index}`}
              className="text-uppercase"
              tag={NavLink}
              to={to}
              
              exact={exact}
            >
              <Icon className={bem.e('nav-item-icon')} />
              <span className="">{name}</span>
            </BSNavLink>
          </NavItem>
        ))}
      </Collapse>
    );
  }
  renderVisitor() {
    return (
      <Collapse isOpen={this.state.isOpenVisitorComponents}>
        {visitorComponent.map(({ to, name, exact, Icon }, index) => (
          <NavItem key={index} className={bem.e('nav-item')}>
            <BSNavLink
              id={`navItem-${name}-${index}`}
              className="text-uppercase"
              tag={NavLink}
              to={to}
              
              exact={exact}
            >
              <Icon className={bem.e('nav-item-icon')} />
              <span className="">{name}</span>
            </BSNavLink>
          </NavItem>
        ))}
      </Collapse>
    );
  }
  render() {
    const { user } = this.props.auth;
    const { company } = this.props.settings;
    // var isActive = this.context.router.route.location.pathname === this.props.to;
    // var className = isActive ? 'active' : '';


    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img src={logo200Image} width="40" height="30" className="pr-2" alt="" />
              <span style={{fontSize:'medium'}} className="text-white">Carrotsuite Space</span>
            </SourceLink>
            <div style={{ color: '#ffffff', marginTop: '5px', padding: '10px' }}>
              {company.name}
            </div>
          </Navbar>
          <Nav vertical>
            {/*{navItems.map(({ to, name, exact, Icon }, index) => (*/}
            <NavItem className={bem.e('nav-item')}>
              <BSNavLink
                id={`navItem-dashboard`}
                className="text-uppercase"
                tag={NavLink}
                to="/dashboard/"
                
                exact={true}
              >
                <MdDashboard className={bem.e('nav-item-icon')} />
                <span className="">dashboard</span>
              </BSNavLink>
              {user.option === 'workspace' && !user.workspace_company && (
                <BSNavLink
                  id={`navItem-companies`}
                  className="text-uppercase"
                  tag={NavLink}
                  to="/dashboard/workspace/companies"
                  
                  exact={true}
                >
                  <MdGroupWork className={bem.e('nav-item-icon')} />
                  <span className="">companies</span>
                </BSNavLink>
              )}
              {user.option === 'estate' && user.role === 'GLOBAL_ADMIN' && (
                <BSNavLink
                  id={`navItem-houses`}
                  className="text-uppercase"
                  tag={NavLink}
                  to="/dashboard/estate/houses"
                  
                  exact={true}
                >
                  <FaHome className={bem.e('nav-item-icon')} />
                  <span className="">houses</span>
                </BSNavLink>
              )}
              {user.option === 'estate' && (
                <Can
                  role={user.role}
                  perform="tenant-directory:read"
                  yes={() => (
                    <BSNavLink
                      id={`navItem-tenants`}
                      className="text-uppercase"
                      tag={NavLink}
                      to="/dashboard/5/occupants"
                      
                      exact={true}
                    >
                      <IoIosPeople className={bem.e('nav-item-icon')} />
                      <span className="">occupants</span>
                    </BSNavLink>
                  )}
                />
              )}




        
             
          
                    
                    <BSNavLink className={bem.e('nav-item-collapse')}
                    className={bem.e('nav-item')}
                    onClick={this.handleVisitorsClick('VisitorComponents')}
                    
                    >
                    <div className="d-flex">
                      <FaUsers className={bem.e('nav-item-icon')} />
                      <span style={{ textTransform: 'uppercase' }} className=" align-self-start">
                        Visitors
                      </span>
                    </div>
                    <MdKeyboardArrowDown
                      className={bem.e('nav-item-icon')}
                      style={{
                        padding: 0,
                        transform: this.state.isOpenComponents ? 'rotate(0deg)' : 'rotate(-90deg)',
                        transitionDuration: '0.3s',
                        transitionProperty: 'transform'
                      }}
                    />
                  </BSNavLink>
              
            


              
              
          
                {/* <NavItem
                  className={bem.e('nav-item')}
                  onClick={this.handleVisitorsClick('VisitorComponents')}
                >
                  <BSNavLink className={bem.e('nav-item-collapse')}>
                    <div className="d-flex">
                      <FaUsers className={bem.e('nav-item-icon')} />
                      <span style={{ textTransform: 'uppercase' }} className=" align-self-start">
                        Visitors
                      </span>
                    </div>
                    <MdKeyboardArrowDown
                      className={bem.e('nav-item-icon')}
                      style={{
                        padding: 0,
                        transform: this.state.isOpenComponents ? 'rotate(0deg)' : 'rotate(-90deg)',
                        transitionDuration: '0.3s',
                        transitionProperty: 'transform'
                      }}
                    />
                  </BSNavLink>
                </NavItem> */}
          

                      


                
             
            {this.renderVisitor()}
              {user.option !== 'estate' && (
                <Can
                  role={user.role}
                  perform="staff-directory:read"
                  yes={() => (
                    <BSNavLink
                      id={`navItem-staff`}
                      className="text-uppercase"
                      tag={NavLink}
                      to="/dashboard/2/staff"
                      // className={className}
                      // {...this.props}
                      // activeClassName="active"
                      exact={false}
                    >
                      <FaUserTie className={bem.e('nav-item-icon')} />
                      <span className="">staff</span>
                    </BSNavLink>
                  )}
                />
              )}

              <Can
                role={user.role}
                perform="invites:read"
                yes={() => (
                  <BSNavLink
                    id={`navItem-invites`}
                    className="text-uppercase"
                    tag={NavLink}
                    to="/dashboard/3/invites"
                    
                    exact={false}
                  >
                    <FaRegEnvelope className={bem.e('nav-item-icon')} />
                    <span className="">invites</span>
                  </BSNavLink>
                )}
              />
              <Can
                role={user.role}
                perform="admin-roles:read"
                yes={() => (
                  <BSNavLink
                    id={`navItem-roles`}
                    className="text-uppercase"
                    tag={NavLink}
                    to="/dashboard/4/roles"
                    
                    exact={true}
                  >
                    <FaUserCog className={bem.e('nav-item-icon')} />
                    <span className="">admin roles</span>
                  </BSNavLink>
                )}
              />
              
                 
              
            </NavItem>

            <NavItem>


            <BSNavLink
                      id={`navItem-staff`}
                      className="text-uppercase"
                      tag={NavLink}
                      to="/dashboard/9/messaging"
                      
                      exact={false}
                    >
                      <FaUserTie className={bem.e('nav-item-icon')} />
                      <span className="">messagings</span>
                    </BSNavLink>
                  {/* <BSNavLink
                    id={`navItem-messagings`}
                    className="text-uppercase"
                    tag={NavLink}
                    to="/dashboard/9/messaging"
                    // 
                    exact={false}
                  >
                    <FaUserCog className={bem.e('nav-item-icon')} />
                    <span className="">messagings</span>
                  </BSNavLink> */}


            </NavItem>
            <Can
              role={user.role}
              perform="settings:edit"
              yes={() => (
                <NavItem className={bem.e('nav-item')} onClick={this.handleClick('Components')}>
                  <BSNavLink className={bem.e('nav-item-collapse')}>
                    <div className="d-flex">
                      <MdSettings className={bem.e('nav-item-icon')} />
                      <span style={{ textTransform: 'uppercase' }} className=" align-self-start">
                        SETTINGS
                      </span>
                    </div>
                    <MdKeyboardArrowDown
                      className={bem.e('nav-item-icon')}
                      style={{
                        padding: 0,
                        transform: this.state.isOpenComponents ? 'rotate(0deg)' : 'rotate(-90deg)',
                        transitionDuration: '0.3s',
                        transitionProperty: 'transform'
                      }}
                    />
                  </BSNavLink>
                </NavItem>
              )}
            />
            {this.renderSettings()}
           
            <Can
              role={user.role}
              perform="billing:read"
              yes={() => (
                <NavItem
                  className={bem.e('nav-item')}
                  onClick={this.handleBillingClick('BillingComponents')}
                >
                  <BSNavLink className={bem.e('nav-item-collapse')}>
                    <div  activeClassName="active" className="d-flex">
                      <MdMonetizationOn className={bem.e('nav-item-icon')} />
                      <span style={{ textTransform: 'uppercase' }} className=" align-self-start">
                       Events
                      </span>
                    </div>
                    <MdKeyboardArrowDown
                      className={bem.e('nav-item-icon')}
                      style={{
                        padding: 0,
                        transform: this.state.isOpenComponents ? 'rotate(0deg)' : 'rotate(-90deg)',
                        transitionDuration: '0.3s',
                        transitionProperty: 'transform'
                      }}
                    />
                  </BSNavLink>
                </NavItem>
              )}
            />
            {this.renderBillings()}


            
          </Nav>

         

      <MdNotificationsActive style={{marginLeft: '1.55rem'}} color="#ffffff" size={15} onClick={this.toggleEmergencyModal} /> <span onClick={this.toggleEmergencyModal}>NOTIFICATION </span> 
       
     
       
        </div>
        <Modal
          show={this.state.isOpenEmergencyModal}
          close={this.toggleEmergencyModal}
          header="Send emergency alert"
        >
          <EmergencyForm closeModal={this.toggleEmergencyModal} />
        </Modal>
      </aside>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  settings: state.settings
});
export default connect(mapStateToProps, {
  getCompany
})(Sidebar);
