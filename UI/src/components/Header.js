import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';

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
    if (jwt.decode(localStorage.getItem('token')) && jwt.decode(localStorage.getItem('token')).admin){
      var Logged = (props) => (
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
        <MenuItem primaryText="Profile" onClick={(event) => {
          this.handleClick("/UserProfile")
        }} />
        <MenuItem primaryText="Administration" onClick={(event) => {
          this.handleClick("/AdminUser")
        }} />
        <MenuItem primaryText="Sign out" onClick={(event) => {
          localStorage.removeItem("token");
          this.handleClick("/Login");
        }} />
        </IconMenu>
      );
    } else {
      Logged = (props) => (
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
        <MenuItem primaryText="User Profile" onClick={(event) => {
          this.handleClick("/UserProfile")
        }} />
        <MenuItem primaryText="Sign out" onClick={(event) => {
          localStorage.removeItem("token");
          this.handleClick("/Login");
        }} />
        </IconMenu>
      );
    }
    
    /** Nav menu options */
    
    
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
  title: PropTypes.string.isRequired,
};
export default Header;
