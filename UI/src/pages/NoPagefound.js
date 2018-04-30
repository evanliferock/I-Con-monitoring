/**
 * A page to indicate there is not page
 */
import React, { Component } from 'react';

class MainPage extends Component {
    

    render(){
        document.title = "No Page Found - ICon Monitoring";            
        return (
            <div className="container">
               <div className="alert alert-warning">Sorry no page found</div>
            </div>
        )
    }
}


export default MainPage;
