import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Login from './Login';

class Loginscreen extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    var loginscreen=[];
    loginscreen.push(<Login parentContext={this} appContext={this.props.appContext}/>);
    this.setState({
                  loginscreen:loginscreen
                    })
  }

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
        <div className="" style={{position: "fixed",padding: "0px", margin: "0px", height: "100%",width: "100%",background:'url("https://www.parks.ca.gov/pages/499/images/img_5012.jpg") no-repeat center center fixed', backgroundSize:"cover" }}>


            <div className="col-md-4 loginscreen" style={{position: "fixed",height: "100%", backgroundColor:'#00BCD4',padding:'20px',paddingBottom:'40px'}}>
                <div style={{marginTop:'100px'}}>
                  {this.state.loginscreen}
                </div>
            </div>

        </div>

      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Loginscreen;
