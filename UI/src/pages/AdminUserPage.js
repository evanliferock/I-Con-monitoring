/**
 * The admin page contains the header, a button to redirect to the create user page and 
 * a button to redirect to the edit/delete user page
 */
import React, { Component } from 'react';
import Header from '../components/Header';
import PATHS from '../global/paths';

// Class definition of admin only page
class AdminUserPage extends Component {

    // Handles click redirects
    handleClick(url) {
        window.location.pathname = url;
    }

    render() {
        return (
            <div>
                {/** Navigation bar specifications */}
                <Header
                    title={"Admin"}
                />

                {/** Page body */}
                <div className="container" style={{ marginTop: "50px" }}>
                    <div className="col-md-offset-3 col-md-6">
                        {/** Handles create user button */}
                        <div className="col-md-12">
                            <button id='create_user_button' type="button" className="btn btn-success"  
                                onClick={this.handleClick.bind(this,PATHS.ADMIN_PATHS.CREATE_USER)} 
                                style={{ marginTop: "25px", width: "100%", fontWeight:"bold", fontSize:"15px" }} 
                            >
                                Add Users
                            </button>
                        </div>
                        {/** Handles edit user button */}
                        <div className="col-md-12">
                            <button id='edit_user_button' type="button" className="btn btn-warning" onClick={this.handleClick.bind(this,PATHS.ADMIN_PATHS.EDIT_USER)} 
                                style={{ marginTop: "25px", width: "100%", fontWeight:"bold", fontSize:"15px" }} 
                                >
                                Edit or Delete Users
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminUserPage;
