import React from 'react';
import axios from 'axios';
// things to think about are redux-thunk and redux-saga with axios for aschychrony

function UpdateButton(props) {
    return (
        <button className='button' onClick={props.onClick}>
            Click Me!
        </button>
    );
}

class Maintenance extends React.Component {
    constructor(){
        super();
        this.state = { text:'Hi',};
    }

    render() {
        return (
            <div>
                <UpdateButton onClick={() => this.handleClick()}/>
                <div>{this.state.text}</div>
            </div>
        );
    }

    handleClick(){
        axios({
            method : 'get',
            url : 'http://db-api-server.kp2phfstdm.us-west-2.elasticbeanstalk.com/maintenance',
        }) // returns a Promise. an async data holder
            .then((response) => { // then happens when promise is fullfilled
                console.log(response);
                this.setState({text : JSON.stringify(response.data[0]),});
            })
            .catch((error) => { // catch happens when promise is rejected
                console.log(error);
            });
    }
}

export default Maintenance;
