import React, { Component } from 'react';
import Header from '../components/Header';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import BackButton from '../components/BackButton';

// Contains the user creation form
class CreateUserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ''
        }
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    };

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
                            <TextField floatingLabelText="Email" style={{ width: "100%" }} value={this.state.email} onChange={this.handleChangeEmail.bind(this)} />
                        </div>
                        <div className="col-md-12">
                            <RaisedButton label="Create" primary={true} style={{ marginTop: "25px", width: "100%" }} />
                        </div>

                    </div>


                </div>

                {/** Home button */}
                <BackButton redirectUrl="/AdminUser" buttonProps={{ label: "Back", secondary: true }} />
            </div>
        )
    }
}


export default CreateUserPage;
