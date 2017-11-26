import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

var apiBaseUrl = "http://localhost:4000/api/";


class Login extends Component {
  constructor(props){
    super(props);
    var localloginComponent=[];
    localloginComponent.push(
      <MuiThemeProvider>
        <div>
         <TextField
           hintText="Enter your username"
           floatingLabelText="Username"
           style={{width:'100%'}}
           floatingLabelStyle={{color:'#FFF'}}
           inputStyle={{color:'#FFF'}}
           onChange = {(event,newValue) => this.setState({username:newValue})}
           />
         <br/>
           <TextField
             type="password"
             style={{width:'100%'}}
             floatingLabelStyle={{color:'#FFF'}}
             hintText="Enter your Password"
              inputStyle={{color:'#FFF'}}
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Login" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>

            <div  className="col-md-12">
              <div className="pull-left" style={{width:'50%'}} >
                  <RaisedButton label="Forget?" primary={true}  style={{width:'100%'}}   onClick={(event) => this.handleClickForget(event)}/>
              </div>
             </div>
       </div>
       </MuiThemeProvider>
    )
    this.state={
      username:'',
      password:'',
      loginComponent:localloginComponent
    }
  }
  componentWillMount(){

  }

  handleClick(event){

  }

  handleClickForget(event){

  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
        <div>

        </div>
        </MuiThemeProvider>
        {this.state.loginComponent}
      </div>
    );
  }
}

const style = {
  margin: "55px 0px",
  width: "100%"
};

export default Login;
