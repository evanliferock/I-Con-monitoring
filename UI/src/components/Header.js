import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import PATHS from '../global/paths';
import NAMES from '../global/page_names';

//**** It contains main Appbar and navigation menu.
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectUrl: ''
    }
  }

  //Nav Menu handler
  handleClick(path) {
    window.location.pathname = path;
  }

  handleToggle(){this.setState({open: !this.state.open});}
  
  handleClose(){this.setState({open: false});}

  render() {      
    /** Nav Right menu options */
    var RightMenu = () => (
      <div>
      <button id="ccbutton" type="button" className="btn btn-info" style={{marginRight:"15px", fontWeight:"bold", fontSize:"12px"}}
          onClick={this.handleClick.bind(this,PATHS.COMPLETE_CANCEL)}
       >Complete / Cancel
       </button>
      <button id="upcombutton" type="button" className="btn btn-info" style={{marginRight:"15px", fontWeight:"bold", fontSize:"12px"}} 
          onClick={this.handleClick.bind(this,PATHS.UPCOMING)}>
        Upcoming
      </button>
      <button id="planbutton" type="button" className="btn btn-info" style={{marginRight:"15px", fontWeight:"bold", fontSize:"12px"}} 
        onClick={this.handleClick.bind(this,PATHS.PLAN)}>
          Plan
      </button>
      </div>
    );

    const Logo = () => (
      <span>
      <a onClick={this.handleClick.bind(this,PATHS.MAIN)} style={{cursor:'pointer'}}>
      <img src={require('../resources/MineLogo.png')} alt={'Mine Logo'}
      width="35" height="35" style={{position:"relative",top:"-20px", left:"60px"}} />
      </a>
      </span>
    ) 
    /** Nav menu options */
    var NavMenu = (props) => (
      <div>
      <button
        label="Menu"
        type="button" className="btn btn-secondary" style={{marginRight:"55px", top:"16px", fontSize:"12px", fontWeight:"bold"}}       
        onClick={this.handleToggle.bind(this)}
      > 
        Menu
      </button>
      <Drawer overlayStyle={{opacity:"50"}}	style={{color:"red"}}docked={false} width={200} open={this.state.open} 
        onRequestChange={(open)=> this.setState({open})} {...props} 
        targetOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }} anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}
        >
        
        <MenuItem id="main_menu_item" primaryText={NAMES.MAIN} onClick={(event) => {
          this.handleClick(PATHS.MAIN)
        }} />
        <MenuItem id='plan_menu_item' primaryText={NAMES.PLAN} onClick={(event) => {
          this.handleClick(PATHS.PLAN)
        }} />
        <MenuItem id='upcoming_menu_item' primaryText={NAMES.UPCOMING} onClick={(event) => {
          this.handleClick(PATHS.UPCOMING)
        }} />
        <MenuItem id='cc_menu_item' primaryText={NAMES.COMPLETE_CANCEL} onClick={(event) => {
          this.handleClick(PATHS.COMPLETE_CANCEL)
        }} />
        <MenuItem id='profile_menu_item' primaryText={NAMES.PROFILE} onClick={(event) => {
          this.handleClick(PATHS.PROFILE)
        }} />
        {jwt.decode(localStorage.getItem('token')) && jwt.decode(localStorage.getItem('token')).admin ?  
            <MenuItem id='admin_menu_item' primaryText={NAMES.ADMIN} onClick={(event) => {
              this.handleClick(PATHS.ADMIN_PATHS.ADMIN)
            }} />
          :
          null
          }
        <MenuItem id='sign_out_menu_item' primaryText={NAMES.SIGN_OUT} onClick={(event) => {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          this.handleClick(PATHS.LOGIN);
        }} />
      </Drawer>
      <Logo/>
      </div>
    );

    NavMenu.muiName = 'IconMenu';

    return (
      <div>

        {/** Nav bar */}
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