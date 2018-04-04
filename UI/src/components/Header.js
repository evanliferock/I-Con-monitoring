import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
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


  handleToggle = () => this.setState({open: !this.state.open});
  
  handleClose = () => this.setState({open: false});

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
    if (jwt.decode(localStorage.getItem('token')) && jwt.decode(localStorage.getItem('token')).admin){  
      
    /** Nav menu options */
    var Logged = (props) => (
      <div>
      <button
        bsSize="small"
        label="Menu"
        type="button" className="btn btn-secondary" style={{marginRight:"55px", top:"16px", fontSize:"12px", fontWeight:"bold"}}       
        onClick={this.handleToggle}
      > 
        Menu
      </button>
      <Drawer overlayStyle={{opacity:"50"}}	style={{color:"red"}}docked={false} width={200} open={this.state.open} onRequestChange={(open)=> this.setState({open})} {...props} iconButtonElement={< IconButton iconStyle={{color:"#FFF"}}> <NavigationMenu /> </IconButton>}
     
        targetOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }} anchorOrigin={{
          horizontal: 'right',
          vertical: 'top'
        }}>
        
        <MenuItem primaryText={NAMES.MAIN} onClick={(event) => {
          this.handleClick(PATHS.MAIN)
        }} />
        <MenuItem primaryText={NAMES.PLAN} onClick={(event) => {
          this.handleClick(PATHS.PLAN)
        }} />
        <MenuItem primaryText={NAMES.UPCOMING} onClick={(event) => {
          this.handleClick(PATHS.UPCOMING)
        }} />
        <MenuItem primaryText={NAMES.COMPLETE_CANCEL} onClick={(event) => {
          this.handleClick(PATHS.COMPLETE_CANCEL)
        }} />
        <MenuItem primaryText={NAMES.PROFILE} onClick={(event) => {
          this.handleClick(PATHS.PROFILE)
        }} />
        <MenuItem primaryText={NAMES.ADMIN} onClick={(event) => {
          this.handleClick(PATHS.ADMIN_PATHS.ADMIN)
        }} />
        <MenuItem primaryText={NAMES.SIGN_OUT} onClick={(event) => {
          localStorage.removeItem("token");
          this.handleClick(PATHS.LOGIN);
        }} />
      </Drawer>
      <Logo/>
      </div>
    );
  } else {
        /** Nav menu options */
        Logged = (props) => (
          <div>
          <button
            bsSize="small"
            label="Menu"
            type="button" className="btn btn-secondary" style={{marginRight:"55px", top:"16px", fontSize:"12px", fontWeight:"bold"}}       
            onClick={this.handleToggle}
          > 
            Menu
          </button>
          <Drawer overlayStyle={{opacity:"50"}}	style={{color:"red"}}docked={false} width={200} open={this.state.open} onRequestChange={(open)=> this.setState({open})} {...props} iconButtonElement={< IconButton iconStyle={{color:"#FFF"}}> <NavigationMenu /> </IconButton>}
         
            targetOrigin={{
              horizontal: 'right',
              vertical: 'top'
            }} anchorOrigin={{
              horizontal: 'right',
              vertical: 'top'
            }}>
    
            <MenuItem primaryText={NAMES.MAIN} onClick={(event) => {
              this.handleClick(PATHS.MAIN)
            }} />
            <MenuItem primaryText={NAMES.PLAN} onClick={(event) => {
              this.handleClick(PATHS.PLAN)
            }} />
            <MenuItem primaryText={NAMES.UPCOMING} onClick={(event) => {
              this.handleClick(PATHS.UPCOMING)
            }} />
            <MenuItem primaryText={NAMES.COMPLETE_CANCEL} onClick={(event) => {
             this.handleClick(PATHS.COMPLETE_CANCEL)
            }} />
            <MenuItem primaryText={NAMES.PROFILE} onClick={(event) => {
              this.handleClick(PATHS.PROFILE)
            }} />
            <MenuItem primaryText={NAMES.SIGN_OUT} onClick={(event) => {
              localStorage.removeItem("token");
              this.handleClick(PATHS.LOGIN);
            }} />
          </Drawer>
          <Logo/>
          </div>
        );
      }

    Logged.muiName = 'IconMenu';

    return (
      <div>

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