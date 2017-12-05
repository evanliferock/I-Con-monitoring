import React, { Component } from 'react';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router'

//its contains the admin user manage navigation buttons
class AdminUserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectUrl: ''
        };
    }


    handleClick(url) {
        this.setState({ redirectUrl: url });
    }

    render() {
        return (
            <div>

                {/** Use for redirection */}
                {this.state.redirectUrl !== '' && <Redirect to={this.state.redirectUrl} />}

                {/** Nav bar */}
                <Header
                    title={"Admin"}
                />

                {/** Body */}
                <div className="container" style={{ marginTop: "50px" }}>
                    <div className="col-md-offset-3 col-md-6">
                        <div className="col-md-12">
                            <RaisedButton label="Add Users" primary={true} onClick={this.handleClick.bind(this, "/CreateUser")} style={{ marginTop: "25px", width: "100%" }} />
                        </div>

                        <div className="col-md-12">
                            <RaisedButton label="Edit / Delete Users" onClick={this.handleClick.bind(this, "/EditUser")} primary={true} style={{ marginTop: "25px", width: "100%" }} />
                        </div>

                    </div>
                </div>

                {/** Home */}
                <BackButton redirectUrl="/MainPage" buttonProps={{ label: "Home", primary: true }} />


            </div>
        )
    }
}


export default AdminUserPage;
