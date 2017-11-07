import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import {Redirect} from 'react-router'
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
    this.setState({redirectUrl: url});
  }

  render() {

    /** Nav menu options */
    const Logged = (props) => (
      <IconMenu {...props} iconButtonElement={< IconButton > <NavigationMenu/> < /IconButton>} targetOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }} anchorOrigin={{
        horizontal: 'right',
        vertical: 'top'
      }}>

        <MenuItem primaryText="Main Page" onClick={(event) => {
          this.handleClick("/")
        }}/>
        <MenuItem primaryText="Maintenance Plan Page" onClick={(event) => {
          this.handleClick("/MaintenancePlanPage")
        }}/>
        <MenuItem primaryText="Complete Cancel Page" onClick={(event) => {
          this.handleClick("/CompleteCancelPage")
        }}/>
        <MenuItem primaryText="Create User" onClick={(event) => {
          this.handleClick("/CreateUser")
        }}/>
        <MenuItem primaryText="Edit User" onClick={(event) => {
          this.handleClick("/EditUser")
        }}/>
        <MenuItem primaryText="User Profile" onClick={(event) => {
          this.handleClick("/UserProfile")
        }}/>
        <MenuItem primaryText="Admin User" onClick={(event) => {
          this.handleClick("/AdminUser")
        }}/>
        <MenuItem primaryText="Sign out" onClick={(event) => {
          this.handleClick("/Login")
        }}/>
      </IconMenu>
    );

    Logged.muiName = 'IconMenu';

    return (
      <MuiThemeProvider>
        <div>
          {/** Use for redirection by nav menu*/}
          {this.state.redirectUrl !== '' && <Redirect to={this.state.redirectUrl}/>}

          {/** Nav bar */}
          <AppBar title={this.props.title} iconElementLeft={< Logged />}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

//Components properties
// Header.propTypes = {
//   title: PropTypes.object.Required
// };
export default Header;
