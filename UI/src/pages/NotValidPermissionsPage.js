/**
 * A page that indicates the page exists but they do not have proper permissions
 */
import React, { Component } from 'react';

class NotValidPermissionsPage extends Component {
    

    render(){
        document.title = "Invalid Permissions - ICon Monitoring";            
        return (
            <div className="container">
               <div className="alert alert-warning">You do not have the valid permissions to access this page.</div>
            </div>
        )
    }
}


export default NotValidPermissionsPage;
