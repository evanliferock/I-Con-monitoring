import React, { Component } from 'react';
import Header from '../components/Header';
import { Redirect } from 'react-router';
import PATHS from '../global/paths';


//its contains the admin user manage navigation buttons
class AdminUserPage extends Component {
    handleClick(url) {
        window.location.pathname = url;
    }

    render() {
        return (
            <div>

                {/** Nav bar */}
                <Header
                    title={"Admin"}
                />

                {/** Body */}
                <div className="container" style={{ marginTop: "50px" }}>
                    <div className="col-md-offset-3 col-md-6">
                        <div className="col-md-12">
                            <button id='create_user_button' type="button" className="btn btn-primary"  
                                onClick={this.handleClick.bind(this,PATHS.ADMIN_PATHS.CREATE_USER)} 
                                style={{ marginTop: "25px", width: "100%", fontWeight:"bold", fontSize:"15px" }} 
                            >
                                Add Users
                            </button>
                        </div>

                        <div className="col-md-12">
                            <button id='edit_user_button' type="button" className="btn btn-danger" onClick={this.handleClick.bind(this,PATHS.ADMIN_PATHS.EDIT_USER)} 
                                style={{ marginTop: "25px", width: "100%", fontWeight:"bold", fontSize:"15px" }} 
                                >
                                Edit / Delete Users
                            </button>
                        </div>

                    </div>
                </div>


            </div>
        )
    }
}


export default AdminUserPage;
