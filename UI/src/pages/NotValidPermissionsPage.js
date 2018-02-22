import React, { Component } from 'react';

class NotValidPermissionsPage extends Component {
    

    render(){
        return (
            <div className="container">
               <div className="alert alert-warning">You do not have the valid permissions to access this page.</div>
            </div>
        )
    }
}


export default NotValidPermissionsPage;
