import React, { Component } from 'react';
import Header from '../components/Header';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import BackButton from '../components/BackButton';
import {Modal,Button} from 'react-bootstrap';
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

      handleEmailReset(){
        var user_id = this.state.user_id;
        let newEmail = window.prompt('Enter a new email: ');
        if(newEmail){
          dbapi.put('user/' + user_id  + '/' + newEmail)
            .then(function(response) {
              window.alert('Success in updating email');
            })
            .catch(function (error){
              window.alert("Error marking as complete: " + error.response.data.failed);
            })
          }
      }

      handlePasswordReset(){
        let newPassword = window.prompt('Enter a new password: ');
        if(newPassword){
            dbapi.put('/user/password/reset', {
                user_id: this.state.user_id,
                password: newPassword,
            })
            .then(function (response) {
              window.alert('Success in updating password');
            })
            .catch(function (error) {
              window.alert("Error marking as complete: " + error.response.data.failed);
            });
        }
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
                            <FlatButton label= {"Username: " + this.state.userName} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}  fullWidth={true} />
                        </div>

                        <div className="col-md-8">
                            <FlatButton label= {"firstName: " + this.state.firstName} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}  fullWidth={true} />
                        </div> 

                        <div className="col-md-8">
                            <FlatButton label= {"lastName: " + this.state.lastName} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}  fullWidth={true} />
                        </div>

                        <div className="col-md-8">
                            <FlatButton label= {"email: " + this.state.email} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}  fullWidth={true} />
                        </div>

                        <div className="col-md-4">
                            <RaisedButton label="Change Email" inputStyle={{ textAlign: 'center' }} primary={true} style={{ marginTop: "0px", width: "100%" }} onClick={this.handleEmailReset.bind(this)} />
                        </div>

                        <div className="col-md-8">
                            <RaisedButton label="Change Password" inputStyle={{ textAlign: 'center' }} primary={true} style={{ marginTop: "25px", width: "100%" }} onClick={this.handlePasswordReset.bind(this)} />
                        </div>

                        <div className="col-md-8">
                            <RaisedButton label="Notification Preferences" inputStyle={{ textAlign: 'center' }} primary={true} style={{ marginTop: "25px", width: "100%" }} />
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}


export default ProfileUserPage;
