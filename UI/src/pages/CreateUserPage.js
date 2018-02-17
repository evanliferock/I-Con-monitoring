import React, { Component } from 'react';
import Header from '../components/Header';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import BackButton from '../components/BackButton';

// Contains the user creation form
class CreateUserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ''
        }
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    };

    render() {
        return (
            <div>
                {/** Nav bar */}
                <Header
                    title={"Create User"}
                />

                {/** Body */}
                <div className="container" style={{ marginTop: "50px" }}>
                    <div className="col-md-offset-3 col-md-6">
                        <div className="col-md-12">
                            <TextField floatingLabelText="New user's work email" style={{ width: "100%" }} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}   value={this.state.email} onChange={this.handleChangeEmail.bind(this)} />
                        </div>
                        <div className="col-md-12">
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#confirmationModal" style={{ marginTop: "25px", width: "100%" }} >Send</button>
                        </div>

                    </div>


                </div>

                {/** popup  */}
                <div class="modal" tabindex="-1" role="dialog" id="confirmationModal">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Confirmation Message</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Email has been sent.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/** Home button */}
                <BackButton className="btn btn-info" redirectUrl="/AdminUser" buttonProps={{ label: "Back", secondary: false }} />
            </div>
        )
    }
}


export default CreateUserPage;
