import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import PATHS from '../global/paths';
import NAMES from '../global/page_names';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


//**** It contains main Appbar and navigation menu.
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectUrl: ''
    }
  }

  // Handles the users clicks and redirects them to desired path
  handleClick(path) {
    window.location.pathname = path;
  }

  // Determines if the drawer menu is open
  handleToggle(){this.setState({open: !this.state.open});}
  
  // Sets the drawer menu to close
  handleClose(){this.setState({open: false});}

  render() {      
    /** Navigation right menu buttons */
    var RightMenu = () => (
      <div>
      <span class="maintenanceHead">
      Maintenance: 
     </span>
      <button id="planbutton" type="button" className="btn btn-info" style={{right: "100px", bottom: "2px", marginRight: "15px", fontWeight:"bold", fontSize:"12px"}} 
        onClick={this.handleClick.bind(this,PATHS.PLAN)} // Handles the Plan Maintenance button placement and redirect
      >Plan
      </button>
      <button id="ccbutton" type="button" className="btn btn-info" style={{right: "100px", bottom: "2px", marginRight: "15px", fontWeight:"bold", fontSize:"12px"}}
        onClick={this.handleClick.bind(this,PATHS.COMPLETE_CANCEL)} // Handles the Complete/Cancel button placement and redirect
       >Complete or Cancel
       </button>

       <button // Defines the Menu button and places it on screen
        label="Menu"
        type="button" className="btn btn-secondary" style={{bottom: "2px", fontSize:"12px", fontWeight:"bold", marginRight: "15px"}}       
        onClick={this.handleToggle.bind(this)}
      > 
        Menu
      </button>
      </div>
    );

    // Defines the mine logo that acts as a "home" button
    const Logo = () => (
      <span>
      <a onClick={this.handleClick.bind(this,PATHS.MAIN)} style={{cursor:'pointer'}}>
      <img src={require('../resources/MineLogoTest.png')} alt={'Mine Logo'} // Sets image source
      width="60" height="60" style={{position:"relative", top:"-3px", marginLeft:"10px"}} />
      </a>
      </span>
    ) 
    /** Navigation drawer menu options */
    var NavMenu = (props) => (
      <div>

      <Drawer openSecondary={true} overlayStyle={{opacity:"50"}}	docked={false} width={200} open={this.state.open} 
        onRequestChange={(open)=> this.setState({open})} {...props} // Defines the Drawer menu and styles it
        >
        
        <MenuItem id="main_menu_item" primaryText={NAMES.MAIN} onClick={(event) => {
          this.handleClick(PATHS.MAIN) // Defines all of the buttons and redirects within the drawer menu
        }} />
        <MenuItem id='plan_menu_item' primaryText={NAMES.PLAN} onClick={(event) => {
          this.handleClick(PATHS.PLAN)
        }} />
        <MenuItem id='cc_menu_item' primaryText={NAMES.COMPLETE_CANCEL} onClick={(event) => {
          this.handleClick(PATHS.COMPLETE_CANCEL)
        }} />
        <MenuItem id='profile_menu_item' primaryText={NAMES.PROFILE} onClick={(event) => {
          this.handleClick(PATHS.PROFILE)
        }} />
        {jwt.decode(localStorage.getItem('token')) && jwt.decode(localStorage.getItem('token')).admin ?  
            <MenuItem id='admin_menu_item' primaryText={NAMES.ADMIN} onClick={(event) => {
              this.handleClick(PATHS.ADMIN_PATHS.ADMIN) // Checks if use is an admin, if they are they can see the admin button
            }} />
          :
          null
          }
        <MenuItem id='sign_out_menu-item' primaryText={NAMES.SIGN_OUT} onClick={(event) => {
          this.handleClose();
          confirmAlert({
            title: 'Signing Out',
            message: 'Are you sure you want to signout?',
             buttons: [
          {
            label: 'Yes',
            onClick: () => {
            localStorage.removeItem("token")
            localStorage.removeItem("refresh_token")
            this.handleClick(PATHS.LOGIN) // Handles signing out of the application, clearing the token and redirecting
            } 
          },
          {
            label: 'No',
            onClick: () => null
          }
            ]
          })
        }} />
      </Drawer>
      <Logo/>
      </div>
    );

    NavMenu.muiName = 'IconMenu'; // Defines the icon menu

    return (
      <div>
        {/** Navigation bar */}
        <AppBar className="navbar navbar-dark bg-primary" title={this.props.title} iconElementLeft={< NavMenu />}
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