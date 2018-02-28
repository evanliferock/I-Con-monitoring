import React, { Component } from 'react';
import Header from '../components/Header';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import BackButton from '../components/BackButton';
import dbapi from '../apirequests/dbapi';


// Contains the user creation form
class CreateUserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            email: '',
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleCreateUser(){
        if(this.state.first_name && this.state.last_name && this.state.username && this.state.password && this.state.email){
            dbapi.post('/register', {
                ...this.state
            })
            .then((response) => {
                window.alert('Success in creating user: ' + this.state.username);
                this.setState({
                    first_name: '',
                    last_name: '',
                    username: '',
                    password: '',
                    email: '',
                });
            })
            .catch(function (error) {
                window.alert('Error creating user: ' + error.response.data.failed);
            });
        } else {
            window.alert('All fields must be filled in');
        }
    }

    render() {
        return (
            <div>
                {/** Nav bar */}
                <Header
                    title={"Create User"}
                />

                {/** Body */}
                <div className="container" style={{ marginTop: "50px" }}>
                    <div className="col-md-offset-3 col-md-6">
                        <div className="col-md-12">
                            <TextField 
                                floatingLabelText="First Name"
                                value={this.state.first_name}
                                onChange={this.handleChange('first_name')}                          
                                style={{ width: "100%" }} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}   
                            />
                            <TextField 
                                floatingLabelText="Last Name"  
                                value={this.state.last_name} 
                                onChange={this.handleChange('last_name')} 
                                style={{ width: "100%" }} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}   
                            />
                            <TextField 
                                floatingLabelText="Username"  
                                value={this.state.username} 
                                onChange={this.handleChange('username')} 
                                style={{ width: "100%" }} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}   
                            />
                            <TextField 
                                floatingLabelText="Password"  
                                value={this.state.password} 
                                onChange={this.handleChange('password')} 
                                style={{ width: "100%" }} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}   
                            />
                            <TextField 
                                floatingLabelText="Email"  
                                value={this.state.email} 
                                onChange={this.handleChange('email')} 
                                style={{ width: "100%" }} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}   
                            />
                        </div>
                        <div className="col-md-12">
                            <RaisedButton onClick={() => this.handleCreateUser()} label="Create" primary={true} style={{ marginTop: "25px", width: "100%" }} />

                        </div>

                    </div>


                </div>

                {/** Home button */}
                <BackButton className="btn btn-info" redirectUrl="/AdminUser" buttonProps={{ label: "Back", secondary: false }} />
            </div>
        )
    }
}


export default CreateUserPage;
