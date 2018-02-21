import React, { Component } from 'react';
import Header from '../components/Header';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import BackButton from '../components/BackButton';
import dbapi from '../apirequests/dbapi';
import jwt from 'jsonwebtoken';

//it contains the user profile that can be changed
class ProfileUserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            newEmail: '',
            password: ''
        }
    }

    componentWillMount() {
      this.updateData();
    }

    handleChangeEmail(event) {
        var target = event.target;
        this.setState({newEmail: target.value});
        this.setState((prevState) => { prevState[target.name] = target.value; return prevState; });
    };

    handleChangePassword(event) {
        var target = event.target;
        this.setState({password: target.value});
        this.setState((prevState) => { prevState[target.name] = target.value; return prevState; });
    };

    updateEmail(){
      var user_id = this.state.user_id;
      var newEmail = this.state.newEmail;
      dbapi.put('user/' + user_id  + '/' + newEmail)
        .then(function(response) {
          console.log("changed email");
        })
        .catch(function (error){
          console.log("Error changing email");
        })
    }

    updatePwd(){
      dbapi.put('/password/reset', {
        user_id: this.state.user_id,
        password: this.state.password
      })
        .then(function (response) {
          console.log("changed password");
        })
        .catch(function (response) {
          console.log("Error changing password: " + response);
        });
    }

    updateData(){
      let user_id = jwt.decode(localStorage.getItem('token')).user_id;
      this.setState({user_id: user_id});
      let page = this;
      dbapi.get('user/'+user_id)
        .then(function (response) {
          console.log(response);
          page.setState({ user: response.data[0]})
          page.setState({userName: response.data[0].username})
          page.setState({firstName: response.data[0].first_name})
          page.setState({lastName: response.data[0].last_name})
          page.setState({email: response.data[0].email})
        })
        .catch(function (error) {
          console.log("Error getting user data: " + error);
        })
    }

    render() {
        return (
            <div>
                {/** Nav bar */}
                <Header
                    title={"Profile" }
                />

                {/** Body - form */}
                <div className="container" style={{ marginTop: "50px" }}>
                    <div className="col-md-12">
                        <div className="col-md-8">
                            <TextField floatingLabelText="User Name" name="userName" style={{ width: "100%" }} value={this.state.userName}/>
                        </div>

                        <div className="col-md-8">
                            <TextField floatingLabelText="First Name" name="firstName" style={{ width: "100%" }} value={this.state.firstName}/>
                        </div>

                        <div className="col-md-8">
                            <TextField floatingLabelText="Last Name" name="lastName" style={{ width: "100%" }} value={this.state.lastName}/>
                        </div>

                        <div className="col-md-8">
                            <TextField floatingLabelText="Email" style={{ width: "100%" }} name="email" value={this.state.email} onChange={this.handleChangeEmail.bind(this)} />
                        </div>
                        <div className="col-md-4">
                            <RaisedButton label="Submit Email Changes" backgroundColor="#FF9800" style={{ width: "100%", marginTop: "25px"}} onClick={this.updateEmail.bind(this)} />
                        </div>

                        <div className="col-md-8">
                            <TextField floatingLabelText="New Password" style={{ width: "100%" }} name="password" value={this.state.password} onChange={this.handleChangePassword.bind(this)} />
                        </div>

                        <div className="col-md-8">
                            <RaisedButton label="Change Password" primary={true} style={{ marginTop: "25px", width: "100%" }} onClick={this.updatePwd.bind(this)} />
                        </div>

                        <div className="col-md-8">
                            <RaisedButton label="Notification Preferences" primary={true} style={{ marginTop: "25px", width: "100%" }} />
                        </div>

                    </div>

                    {/** Home button */}
                    <BackButton redirectUrl="/MainPage" buttonProps={{ label: "Home", primary: true }} />
                </div>
            </div>
        )
    }
}


export default ProfileUserPage;
