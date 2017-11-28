import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';

//**** It contains main Appbar and navigation menu.
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectUrl: ''
    }
  }

  //Nav Menu handler
  handleClick(url) {
    this.setState({ redirectUrl: url });
  }

  render() {

    /** Nav menu options */
    const Logged = (props) => (
      <IconMenu {...props} iconButtonElement={< IconButton > <NavigationMenu /> </IconButton>}
        targetOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }} anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}>

        <MenuItem primaryText="Main Page" onClick={(event) => {
          this.handleClick("/MainPage")
        }} />
        <MenuItem primaryText="Maintenance Plan" onClick={(event) => {
          this.handleClick("/MaintenancePlan")
        }} />
        <MenuItem primaryText="Complete Cancel" onClick={(event) => {
          this.handleClick("/CompleteCancel")
        }} />
        <MenuItem primaryText="Create User" onClick={(event) => {
          this.handleClick("/CreateUser")
        }} />
        <MenuItem primaryText="Edit User" onClick={(event) => {
          this.handleClick("/EditUser")
        }} />
        <MenuItem primaryText="User Profile" onClick={(event) => {
          this.handleClick("/UserProfile")
        }} />
        <MenuItem primaryText="Admin User" onClick={(event) => {
          this.handleClick("/AdminUser")
        }} />
        <MenuItem primaryText="Sign out" onClick={(event) => {
          localStorage.removeItem("token");
          this.handleClick("/Login");
        }} />
      </IconMenu>
    );

    Logged.muiName = 'IconMenu';

    return (
      <div>
        {/** Use for redirection by nav menu*/}
        {this.state.redirectUrl !== '' && <Redirect to={this.state.redirectUrl} />}

        {/** Nav bar */}
        <AppBar title={this.props.title} iconElementLeft={< Logged />}
        />
      </div>
    )
  }
}

//Components properties
Header.propTypes = {
  title: PropTypes.string.isRequred
};
export default Header;
