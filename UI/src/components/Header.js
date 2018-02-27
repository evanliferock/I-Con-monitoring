import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
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
      
    /** Nav Right menu options */
    var RightMenu = () => (
      <div>
        <button type="button" className="btn btn-info" style={{marginRight:"15px"}} onClick={this.handleClick.bind(this,"/CompleteCancel")}>Complete / Cancel</button>
        <button type="button" className="btn btn-info" style={{marginRight:"15px"}} onClick={this.handleClick.bind(this,"/UpcomingMaintenance")}>Upcoming</button>
        <button type="button" className="btn btn-info" style={{marginRight:"15px"}} onClick={this.handleClick.bind(this,"/MaintenancePlan")}>Plan</button>
      </div>
    );

    const Logo = () => (
      <span>
          <a onClick={this.handleClick.bind(this,"/MainPage")} style={{cursor:'pointer'}}>
            <img src={require('../resources/MineLogo.png')} alt={'Mine Logo'}
           width="35" height="35" style={{position:"relative",top:"-10px"}} />
        </a>
      </span>
    )

    /** Nav menu options */
    var Logged = (props) => (
      <div>
      <IconMenu {...props} iconButtonElement={< IconButton iconStyle={{color:"#FFF"}}> <NavigationMenu /> </IconButton>}
     
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
        <MenuItem primaryText="Upcoming Maintenance" onClick={(event) => {
          this.handleClick("/UpcomingMaintenance")
        }} />
        <MenuItem primaryText="Complete Cancel" onClick={(event) => {
          this.handleClick("/CompleteCancel")
        }} />
        <MenuItem primaryText="User Profile" onClick={(event) => {
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
      <Logo/>
      </div>
    );
  } else {

        /** Nav Right menu options */
        var RightMenu = () => (
          <div>
            <button type="button" className="btn btn-info" style={{marginRight:"15px"}} onClick={this.handleClick.bind(this,"/CompleteCancel")}>Complete / Cancel</button>
            <button type="button" className="btn btn-info" style={{marginRight:"15px"}} onClick={this.handleClick.bind(this,"/UpcomingMaintenance")}>Upcoming</button>
            <button type="button" className="btn btn-info" style={{marginRight:"15px"}} onClick={this.handleClick.bind(this,"/MaintenancePlan")}>Plan</button>
          </div>
        );
    
        const Logo = () => (
          <span>
            <a onClick={this.handleClick.bind(this,"/MainPage")} style={{cursor:'pointer'}}>
            <img src={require('../resources/MineLogo.png')} alt={'Mine Logo'}
               width="35" height="35" style={{position:"relative",top:"-10px"}} />
            </a>
          </span>
        )
    
        /** Nav menu options */
        Logged = (props) => (
          <div>
          <IconMenu {...props} iconButtonElement={< IconButton iconStyle={{color:"#FFF"}}> <NavigationMenu /> </IconButton>}
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
            <MenuItem primaryText="Upcoming Maintenance" onClick={(event) => {
              this.handleClick("/UpcomingMaintenance")
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
          <Logo/>
          </div>
        );
      }

    Logged.muiName = 'IconMenu';

    return (
      <div>
        {/** Use for redirection by nav menu*/}
        {this.state.redirectUrl !== '' && <Redirect to={this.state.redirectUrl} />}

        {/** Nav bar */}
        <AppBar className="navbar navbar-dark bg-primary" title={this.props.title} iconElementLeft={< Logged />}
           iconElementRight={<RightMenu/>}
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
