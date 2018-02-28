import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import dbapi from '../apirequests/dbapi';
import Alert from 'react-s-alert';
import { Redirect } from 'react-router';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      loggedIn: false,
    };
  }

  handleClick(event) {
    let loginObject = this;
    var payload = {
      "username": this.state.username,
      "password": this.state.password,
    }
    dbapi.post('login', payload)
      .then(function (response) {
        if (response.status === 201) {
          Alert.success("Login successful", {
               position: 'bottom',
               effect: 'slide',
               beep: false,
               timeout: 1000,
               offset: 50
           });
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refresh_token', response.data.refresh_token);
          dbapi.defaults.headers.token = localStorage.getItem('token');
          window.setTimeout(() => {loginObject.setState({ loggedIn: true })}, 50);
        }
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          if (error.response.status === 401) {
            console.log("Username password do not match");
            Alert.warning("Username and password do not match", {
              position: 'top-left',
              effect: 'slide',
              beep: false,
              timeout: 5000,
              offset: 50
            });
          } else {
            console.log(error);
          }
        } else {
          console.log("Error on db api end: " + error);
        }
      })
  }

  handleClickForget(event) {

  }

  render() {
    if (this.state.loggedIn) {
      return (<Redirect to={"/MainPage"} />);
    } else {
      return (
        <div>
          <TextField
            hintText="Enter your username"
            floatingLabelText="Username"
            style={{ width: '100%' }}
            floatingLabelStyle={{ color: '#FFF' }}
            inputStyle={{ color: '#FFF' }}
            onChange={(event, newValue) => this.setState({ username: newValue })}
            floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}} hintStyle={{color:"#FFF"}}
          />
          <br />
          <TextField
            type="password"
            style={{ width: '100%' }}
            floatingLabelStyle={{ color: '#FFF' }}
            hintText="Enter your Password"
            inputStyle={{ color: '#FFF' }}
            floatingLabelText="Password"
            onChange={(event, newValue) => this.setState({ password: newValue })}
            floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}} hintStyle={{color:"#FFF"}}
          />
          <br />
          <button type="button" className="btn btn-secondary" style={{ marginTop: "55px", width: "100%" }}  onClick={(event) => this.handleClick(event)} >Login</button>
          <button type="button" className="btn btn-danger" style={{ marginTop: "15px", width: "100%" }}  onClick={(event) => this.handleClickForget(event)} >Forget?</button>
          
          <div className="col-md-12">
            <div className="pull-left" style={{ width: '' }} >
            </div>
          </div>
        </div>
      );
    }
  }
}


class LoginPage extends Component {
  render() {
    return (
      <div style={{ position: "fixed", width: "100%", backgroundColor: '#19171C' }}>
        <div style={{}}>
          <AppBar
            titleStyle={{ textAlign: "center" }}
            title="NIOSH I-Con-monitoring Login"
            showMenuIconButton={false}
            className="navbar navbar-dark bg-primary" 
          />

        
        </div>
        <div className="" style={{
          position: "fixed",
          padding: "0px", margin: "0px", height: "100%", width: "100%",top:"0px",
          background: 'url("https://www.parks.ca.gov/pages/499/images/img_5012.jpg") no-repeat center center fixed', backgroundSize: "cover"
        }}>
          <div className="col-md-4 loginscreen" style={{ position: "fixed", height: "100%", backgroundColor: '#6441A4', padding: '20px', paddingBottom: '40px' }}>
            <div style={{ marginTop: '200px' }}>
              <Login />
            </div>
          </div>
        </div>
        <Alert stack={{ limit: 3 }} />
      </div>
    );

  }
}

export default LoginPage;
