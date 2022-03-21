import Avatar from '../includes/Avatar';
import { UserCard } from '../includes/card';
import { Link, withRouter } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { MdClearAll, MdExitToApp, MdPersonPin } from 'react-icons/md';
import UseOnClickOutside from './UseOnClickOutside';
import {
  Button,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody
} from 'reactstrap';
import { logoutUser } from '../../actions/authActions';
import bn from '../../utils/bemnames';

const bem = bn.create('header');

class Header extends React.Component {
 

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      isOpenNotificationPopover: false,
      isNotificationConfirmed: false,
      isOpenUserCardPopover: false,
      clickedOutside: false
    };

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClickInside = this.handleClickInside.bind(this);
   
  }

  // myRef = React.myRef();
  // myRef = React.createRef();
  // const node = this.myRef.current;

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }


  handleClickOutside = e => {
    if (!this.myRef.current.contains(e.target)) {
      this.setState({ isOpenUserCardPopover: false });
    }
  };

  handleClickInside = () => this.setState({ isOpenUserCardPopover: true });

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };
  navigateToProfile() {
    this.props.history.push('/dashboard/staff/profile');
  }
  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };



 

  //handle onClick outside component
  // UseOnClickOutside($sideBarRef, 
  //   this.setState({
  //     isOpenUserCardPopover: !this.state.isOpenUserCardPopover
  //   })
  // )

  render() {
    const { user } = this.props.auth;

 


    return (
      <Navbar light expand className={bem.b('bg-white')}>
        {/* <div ref={this.myRef} onClick={this.handleClickInside}>ff</div> */}
        <Nav navbar className="mr-2">
          <Button outline color="danger" onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar className={bem.e('nav-right')}>
          <NavItem>
            <NavLink id="Popover2">
            <div ref={this.myRef} onClick={this.handleClickInside}>
              <Avatar  className="can-click" />
            </div>
            </NavLink>
          <div ref={this.myRef} onClick={this.handleClickInside}>
            <Popover
            
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              // toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody  className="p-0 border-light">
                <UserCard
                  title={`${user.first_name} ${user.last_name}`}
                  subtitle={user.role}
                  text={user.email}
                  className="border-light"
                >
                  <ListGroup flush>
                    <ListGroupItem tag="button" action className="border-light">
                      <Link to="/dashboard/staff/profile">
                        <span text="ligth"> <MdPersonPin /> Profile </span>
                      </Link>
                    </ListGroupItem>
                    <ListGroupItem
                      tag="button"
                      action
                      className="border-light"
                      onClick={() => {
                        this.props.logoutUser();
                      }}
                    >
                      <MdExitToApp /> Signout
                    </ListGroupItem>

                    <ListGroupItem
                      tag="button"
                      action
                      className="border-light"
                      onClick={async() => {
                        // this.props.logoutUser();
                        console.log('clicked')
                        this.setState({
                          // isOpenUserCardPopover: false
                        });
                        this.props.history.push('/dashboard/billing-page');
                        // this.setState({ isOpenUserCardPopover: false });

                        await setTimeout(this.setState({ isOpenUserCardPopover: false }),5000)
                      }}
                    >
                      <MdExitToApp /> Billing
                    </ListGroupItem>

                  
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </div>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default withRouter(connect(
  mapStateToProps,
  { logoutUser }
)(Header));
