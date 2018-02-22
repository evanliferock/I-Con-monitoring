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
                            <button type="button" className="btn btn-primary"  onClick={this.handleClick.bind(this, "/CreateUser")} style={{ marginTop: "25px", width: "100%" }} >Add Users</button>
                        </div>

                        <div className="col-md-12">
                            <button type="button" className="btn btn-danger" onClick={this.handleClick.bind(this, "/EditUser")} style={{ marginTop: "25px", width: "100%" }} >Edit / Delete Users</button>
                        </div>

                    </div>
                </div>

                {/** Home */}
                <BackButton className="btn btn-info" redirectUrl="/MainPage" buttonProps={{ label: "Home", primary: false }} />


            </div>
        )
    }
}


export default AdminUserPage;
