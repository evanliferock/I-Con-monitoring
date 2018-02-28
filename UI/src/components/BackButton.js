import React, { Component } from 'react';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'; 

//it contains the back button functionality passing url and button property
class BackButton extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirectUrl : ''
        }
    }

    handleClick(url){
        this.setState({redirectUrl:url});
    }

    render(){
      
        
        return (
            <div className="row">

                {/** Use for redirection by nav menu*/}
                {this.state.redirectUrl !== '' && <Redirect to={this.state.redirectUrl}/>}

                 {/** Button*/}

                <button className={this.props.className}  style={{position:'absolute',bottom:'10px',right:'10px'}} onClick={(event) => this.handleClick(this.props.redirectUrl)}>{this.props.buttonProps.label}</button>
            
            </div>
        )
    }
}

//Components properties
BackButton.propTypes = {
  buttonProps: PropTypes.object.isRequired,
  redirectUrl: PropTypes.string.isRequired
};

export default BackButton;
