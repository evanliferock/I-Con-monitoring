import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import dbapi from './apirequests/dbapi';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

function UserText(props) {
    return (
        <TextField
            hintText="Enter your username"
            floatingLabelText="Username"
            onChange = {(event,newValue) => props.onChange(newValue)}
        />
    );
}

function UserPassSubmission(props) {
    return (
        <div>
            <UserText onChange={(newUser) => props.onUserChange(newUser)}/>
            <br/>
            <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange = {(event,newPass) => props.onPassChange(newPass)}
                />
            <br/>
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => props.onClick(event)}/>
       </div>
    );
}


class Login extends Component {
  constructor(){
    super();
    var localloginComponent=[];
    localloginComponent.push(
      <MuiThemeProvider>
          <div>
              <UserPassSubmission
                  onUserChange={(newUser) => this.handleUserChange(newUser)}
                  onPassChange={(newPass) => this.handlePassChange(newPass)}
                  onClick={() => this.handleClick()}
              />
        </div>
       </MuiThemeProvider>
    )
    this.state={
      username:'',
      password:'',
      menuValue:1,
      loginComponent:localloginComponent,
      loginRole:'Admin'
    }
  }
  componentWillMount(){
  // console.log("willmount prop values",this.props);
      if(this.props.role){
        if(this.props.role === 'Admin'){
          console.log("in admin componentWillMount");
          var localloginComponent=[];
          localloginComponent.push(
            <MuiThemeProvider>
              <div>
                  <UserPassSubmission
                      onUserChange={(newUser) => this.handleUserChange(newUser)}
                      onPassChange={(newPass) => this.handlePassChange(newPass)}
                      onClick={() => this.handleClick()}
                  />
             </div>
             </MuiThemeProvider>
          )
          this.setState({menuValue:1,loginComponent:localloginComponent,loginRole:'admin'})
        }
        else if(this.props.role === 'miner'){
          console.log("in miner component");
          localloginComponent=[];
          localloginComponent.push(
            <MuiThemeProvider>
              <div>
                  <UserPassSubmission
                      onUserChange={(newUser) => this.handleUserChange(newUser)}
                      onPassChange={(newPass) => this.handlePassChange(newPass)}
                      onClick={() => this.handleClick()}
                  />
             </div>
             </MuiThemeProvider>
          )
          this.setState({menuValue:2,loginComponent:localloginComponent,loginRole:'miner'})
        }
      }
  }

  handleClick(){
    console.log("click");
    var payload={
      "username":this.state.username,
	    "password":this.state.password,
      "role":this.state.loginRole
    }
    dbapi.post('login', payload)
    .then(function (response) {
     console.log(response);
     if(response.data.code === 200){
       console.log("Login successful");
       Alert.success("Login successful", {
            position: 'top-right',
            effect: 'slide',
            beep: false,
            timeout: 1000,
            offset: 50
        });
       localStorage.setItem('token', response.data.token);
     }
     else if(response.data.code === 204){
       console.log("Username password do not match");
       Alert.warning("Username and password do not match", {
            position: 'top-right',
            effect: 'slide',
            beep: false,
            timeout: 5000,
            offset: 50
        });
     }
     else{
       console.log("Username does not exists");
       alert("Username does not exist");
       Alert.warning("Username does not exist", {
            position: 'top-right',
            effect: 'slide',
            beep: false,
            timeout: 5000,
            offset: 50
        });
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }

  handleMenuChange(value){
    console.log("menuvalue",value);
    var loginRole;
    if(value===1){
      var localloginComponent=[];
      loginRole='Admin';
      localloginComponent.push(
        <MuiThemeProvider>
        <div>
              <UserPassSubmission
                  onUserChange={(newUser) => this.handleUserChange(newUser)}
                  onPassChange={(newPass) => this.handlePassChange(newPass)}
                  onClick={() => this.handleClick()}
              />
        </div>
        </MuiThemeProvider>
      )
    }
    else if(value === 2){
      localloginComponent=[];
      loginRole='miner';
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
              <UserPassSubmission
                  onUserChange={(newUser) => this.handleUserChange(newUser)}
                  onPassChange={(newPass) => this.handlePassChange(newPass)}
                  onClick={(event) => this.handleClick(event)}
              />
         </div>
         </MuiThemeProvider>
      )
    }
    this.setState({menuValue:value,
                   loginComponent:localloginComponent,
                   loginRole:loginRole})
  }

  handleUserChange(newUser){
      this.setState({username:newUser});
  }

  handlePassChange(newPass){
      this.setState({password:newPass});
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
        <AppBar
             title="LOGIN PROTOTYPE"
           />
        </MuiThemeProvider>
        <MuiThemeProvider>
        <div>
        <p>Login as:</p>
        <DropDownMenu value={this.state.menuValue} onChange={(event,index,value)=>this.handleMenuChange(value)}>
          <MenuItem value={1} primaryText="Admin" />
          <MenuItem value={2} primaryText="Miner" />
        </DropDownMenu>
        </div>
        </MuiThemeProvider>
        {this.state.loginComponent}
        <Alert stack={{limit: 3}} />
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;
