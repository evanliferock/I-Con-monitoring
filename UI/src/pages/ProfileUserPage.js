import React, { Component } from 'react';
import Header from '../components/Header';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import BackButton from '../components/BackButton';

//it contains the user profile that can be changed
class ProfileUserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            firstName: '',
            LastName: '',
            email: ''
        }
    }

    handleChangeText(event) {
        var target = event.target;
        this.setState((prevState) => { prevState[target.name] = target.value; return prevState; });
    };

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
                            <TextField floatingLabelText="User Name" name="userName" style={{ width: "100%" }} value={this.state.userName} onChange={this.handleChangeText.bind(this)} />
                        </div>
                        <div className="col-md-4">
                            <RaisedButton label="Change" backgroundColor="#FF9800" style={{ width: "100%", marginTop: "25px" }} />
                        </div>

                        <div className="col-md-8">
                            <TextField floatingLabelText="First Name" name="firstName" style={{ width: "100%" }} value={this.state.firstName} onChange={this.handleChangeText.bind(this)} />
                        </div>
                        <div className="col-md-4">
                            <RaisedButton label="Change" backgroundColor="#FF9800" style={{ width: "100%", marginTop: "25px" }} />
                        </div>

                        <div className="col-md-8">
                            <TextField floatingLabelText="Last Name" name="lastName" style={{ width: "100%" }} value={this.state.lastName} onChange={this.handleChangeText.bind(this)} />
                        </div>
                        <div className="col-md-4">
                            <RaisedButton label="Change" backgroundColor="#FF9800" style={{ width: "100%", marginTop: "25px" }} />
                        </div>

                        <div className="col-md-8">
                            <TextField floatingLabelText="Email" style={{ width: "100%" }} name="email" value={this.state.email} onChange={this.handleChangeText.bind(this)} />
                        </div>
                        <div className="col-md-4">
                            <RaisedButton label="Change" backgroundColor="#FF9800" style={{ width: "100%", marginTop: "25px" }} />
                        </div>



                        <div className="col-md-8">
                            <RaisedButton label="Change Password" primary={true} style={{ marginTop: "25px", width: "100%" }} />
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
