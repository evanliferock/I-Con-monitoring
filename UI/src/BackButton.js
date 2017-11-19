import React, { Component } from 'react';
import { Redirect } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';
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
                <RaisedButton label={this.props.buttonProps.label} secondary ={this.props.buttonProps.secondary } primary={this.props.buttonProps.primary} backgroundColor={this.props.buttonProps.backgroundColor} style={{position:'absolute',bottom:'10px',left:'10px'}} onClick={(event) => this.handleClick(this.props.redirectUrl)}/>
            
            </div>
        )
    }
}

//Components properties
BackButton.propTypes = {
  buttonProps: PropTypes.object.Required,
  redirectUrl: PropTypes.string.Required
};

export default BackButton;
