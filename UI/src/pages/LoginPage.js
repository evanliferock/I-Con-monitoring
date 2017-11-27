import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }

  handleClick(event) {

  }

  handleClickForget(event) {
    
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Enter your username"
          floatingLabelText="Username"
          style={{ width: '100%' }}
          floatingLabelStyle={{ color: '#FFF' }}
          inputStyle={{ color: '#FFF' }}
          onChange={(event, newValue) => this.setState({ username: newValue })}
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
        />
        <br />
        <RaisedButton label="Login" primary={true} style={{margin: "55px 0px", width: "100%"}} onClick={(event) => this.handleClick(event)} />

        <div className="col-md-12">
          <div className="pull-left" style={{ width: '50%' }} >
            <RaisedButton label="Forget?" primary={true} style={{ width: '100%' }} onClick={(event) => this.handleClickForget(event)} />
          </div>
        </div>
      </div>
    );
  }
}


class LoginPage extends Component {
  render() {
    return (
      <div style={{position: "fixed",  width: "100%",backgroundColor:'#00BCD4'}}>
        <div style={{}}>
          <AppBar
              titleStyle={{textAlign: "center"}}
              title="NIOSH I-Con-monitoring Login"
              showMenuIconButton = {false}
            />
        </div>
        <div className="" style={{position: "fixed",
          padding: "0px", margin: "0px", height: "100%",width: "100%",
          background:'url("https://www.parks.ca.gov/pages/499/images/img_5012.jpg") no-repeat center center fixed', backgroundSize:"cover" }}>
            <div className="col-md-4 loginscreen" style={{position: "fixed",height: "100%", backgroundColor:'#00BCD4',padding:'20px',paddingBottom:'40px'}}>
                <div style={{marginTop:'100px'}}>
                  <Login />
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
