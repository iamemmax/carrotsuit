import Avatar from '../../includes/Avatar';
import { UserCard } from '../../includes/card';
import React from 'react';
import { connect } from 'react-redux';
import { MdClearAll, MdExitToApp} from 'react-icons/md';
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
import { logoutUser } from '../../../actions/authActions';
import bn from '../../../utils/bemnames';

const bem = bn.create('header');

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
    
  };
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

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

  render() {
    const { user } = this.props.auth;
    const $sideBarRef = this.myRef.current;

    //handle onClick outside component
    UseOnClickOutside($sideBarRef, 
      this.setState({
        isOpenUserCardPopover: !this.state.isOpenUserCardPopover
      })
    )



    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline color="danger" onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar className={bem.e('nav-right')}>
          <NavItem>
            <NavLink id="Popover2">
              <Avatar onClick={this.toggleUserCardPopover} className="can-click" />
            </NavLink>
            <Popover
              ref={$sideBarRef}
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard title={`${user.name} `} text={user.email} className="border-light">
                  <ListGroup flush>
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
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
