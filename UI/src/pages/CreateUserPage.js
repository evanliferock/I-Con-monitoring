import React, { Component } from 'react';
import Header from '../components/Header';
import TextField from 'material-ui/TextField';
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
    handleClick(path) {
        window.location.pathname = path;
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
                                floatingLabelStyle={{color:"#708090"}}
                                floatingLabelFocusStyle={{color:"#708090"}}
                                underlineFocusStyle={{borderColor:"black"}}
                                underlineStyle={{borderColor:"#708090"}}
                                value={this.state.first_name}
                                onChange={this.handleChange('first_name')}                          
                                style={{ width: "100%" }} 
                            />
                            <TextField 
                                floatingLabelText="Last Name"
                                floatingLabelStyle={{color:"#708090"}}
                                floatingLabelFocusStyle={{color:"#708090"}}
                                underlineFocusStyle={{borderColor:"black"}}
                                underlineStyle={{borderColor:"#708090"}}  
                                value={this.state.last_name} 
                                onChange={this.handleChange('last_name')} 
                                style={{ width: "100%" }} 
                            />
                            <TextField 
                                floatingLabelText="Username"
                                floatingLabelStyle={{color:"#708090"}}
                                floatingLabelFocusStyle={{color:"#708090"}}
                                underlineFocusStyle={{borderColor:"black"}}
                                underlineStyle={{borderColor:"#708090"}}  
                                value={this.state.username} 
                                onChange={this.handleChange('username')} 
                                style={{ width: "100%" }}  
                            />
                            <TextField 
                                floatingLabelText="Password"
                                floatingLabelStyle={{color:"#708090"}}
                                floatingLabelFocusStyle={{color:"#708090"}}
                                underlineFocusStyle={{borderColor:"black"}}
                                underlineStyle={{borderColor:"#708090"}}  
                                value={this.state.password} 
                                onChange={this.handleChange('password')} 
                                style={{ width: "100%" }} 
                            />
                            <TextField 
                                floatingLabelText="Email"
                                floatingLabelStyle={{color:"#708090"}}
                                floatingLabelFocusStyle={{color:"#708090"}}
                                underlineFocusStyle={{borderColor:"black"}}
                                underlineStyle={{borderColor:"#708090"}}
                                value={this.state.email} 
                                onChange={this.handleChange('email')} 
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div className="col-md-12">
                            <button type="button"className="btn btn-success" label="Back" style={{ marginTop: '25px', width:"100%", fontWeight:"bold", fontSize:"20px"}}   onClick={(event) => this.handleCreateUser()}>CREATE</button>
                        </div>

                    </div>


                </div>

                {/** Home button */}

                <div className="pull-left">
                <button type="button"className="btn btn-info" label="Back" style={{ fontWeight:"bold", fontSize:"15px",left:"10px", top:"70px"}}  onClick={(event) => this.handleClick("/AdminUser")}>Back</button>
                </div>
            </div>
        )
    }
}


export default CreateUserPage;
