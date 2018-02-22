import React, { Component } from 'react';
import Header from '../components/Header';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import BackButton from '../components/BackButton';
import {Modal,Button} from 'react-bootstrap';

//it contains the user profile that can be changed
class ProfileUserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            firstName: '',
            LastName: '',
            email: '',
            message : {
                show : false,
                context : ""
            },
            isChangePassword :false,
            notify : {
                show:false,
                on:true
            }
        }
    }

    handleChangeText(event,value) {
        var target = event.target;
        this.setState((prevState) => { prevState[target.name] = value; return prevState; });
    };

    handleChange(event,value) {
        var target = event.target;
        this.state[target.name] = value;
    };


    handleChangeBtn(ChangedValue){
        this.setState({
            message : {
                show : true,
                context : "Successfully changed "+ ChangedValue
            }
        })
    }

    handleHide(){
        this.setState({
            message : {
                show : false,
                context : ""
            }
        })
    }


    handleChangePasswordBtn(){
        this.setState({
            isChangePassword :true
        })
    }

    handleChangePasswordSave(){
        
        var myState = this.state;
        this.setState({
            isChangePassword :false,
            oldPassword :myState.oldPassword,
            newPassword : myState.newPassword
        })
    }

    handleDisplyNotifySetting(){
        var notify = this.state.notify;
        notify["show"] = true;
        this.setState({
            notify : notify
        })
    }

    handleNotifyChanger(){

        var notify = this.state.notify;
        notify["on"] = !notify.on;
        this.setState({
            notify : notify
        })
    }

    handleNotifyChangeSave(){

        var notify = this.state.notify;
        notify["show"] = false;
        this.setState({
            notify : notify
        })
    }

    render() {

        const MessageModalPopup = (props) => {
            debugger;
            return <div className="static-modal">
                        <Modal show={props.show} container={this} style={{top:"125px"}}>
                            <Modal.Header>
                            <Modal.Title>Confirmation Message</Modal.Title>
                            <span style={{position: "absolute",right: "10px",top: "10px" ,fontSize:"25px",cursor:"pointer"}} onClick={this.handleHide.bind(this)}>x</span>
                
                            </Modal.Header>

                            <Modal.Body >
                                <p>{props.message}</p>
                            </Modal.Body>

                        </Modal>
                    </div>
        }


        const PasswordChangerModalPopup = (props) => {
            debugger;
            return <div className="static-modal">
                        <Modal show={props.show} container={this} style={{top:"125px"}}>
                            <Modal.Header>
                            <Modal.Title>Change Password</Modal.Title>
                            <span style={{position: "absolute",right: "10px",top: "10px" ,fontSizr:"25px",cursor:"pointer"}} onClick={this.handleChangePasswordSave.bind(this)}>x</span>
                
                            </Modal.Header>

                            <Modal.Body >
                                <div className="col-md-12">
                                    <TextField floatingLabelText="Old Password" name="oldPassword" style={{ width: "100%" }} defaultValue={this.state.oldPassword} onChange={this.handleChange.bind(this)} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}/>
                                </div>
                                <div className="col-md-12">
                                    <TextField floatingLabelText="New Password" name="newPassword" style={{ width: "100%" }} defaultValue={this.state.newPassword} onChange={this.handleChange.bind(this)} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}/>
                                </div>
                            </Modal.Body>
                           
                            <Modal.Footer>
                            <Button onClick={this.handleChangePasswordSave.bind(this)}>Close</Button>
                            <Button onClick={this.handleChangePasswordSave.bind(this)}  bsStyle="primary">Save changes</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
        }


         const NotifySettingModalPopup = (props) => {
            debugger;
            return <div className="static-modal">
                        <Modal show={props.show} container={this} style={{top:"125px"}}>
                            <Modal.Header>
                            <Modal.Title>Change Password</Modal.Title>
                            <span style={{position: "absolute",right: "10px",top: "10px" ,fontSizr:"25px",cursor:"pointer"}} onClick={this.handleNotifyChangeSave.bind(this)}>x</span>
                
                            </Modal.Header>

                            <Modal.Body >
                            <div className="togglebutton">
                                 <label>
                                    <input type="checkbox" checked={props.on} onChange={this.handleNotifyChanger.bind(this)} />
                                    <span className="toggle"></span>
                                        Email Notification
                                </label>
                            </div>    
                            </Modal.Body>
                           
                            <Modal.Footer>
                            <Button onClick={this.handleNotifyChangeSave.bind(this)}>Close</Button>
                            <Button onClick={this.handleNotifyChangeSave.bind(this)}  bsStyle="primary">Save changes</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
        }

        return (
            <div>
                {/** Nav bar */}
                <Header
                    title={"Profile" }
                />

                {/** Body - form */}
                <div className="container" style={{ marginTop: "50px" }}>
                    <div className="col-md-12">
                        <div className="col-md-8">
                            <TextField floatingLabelText="User Name" floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}   name="userName" style={{ width: "100%" }} value={this.state.userName} onChange={this.handleChangeText.bind(this)} />
                        </div>
                        <div className="col-md-4">
                            <button type="button" className="btn btn-danger" style={{ width: "100%", marginTop: "25px" }} onClick={this.handleChangeBtn.bind(this,"User Name")}>Change</button>
                        </div>

                        <div className="col-md-8">
                            <TextField floatingLabelText="First Name" floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}  name="firstName" style={{ width: "100%" }} value={this.state.firstName} onChange={this.handleChangeText.bind(this)} />
                        </div> 
                        <div className="col-md-4">
                            <button type="button" className="btn btn-danger" style={{ width: "100%", marginTop: "25px" }} onClick={this.handleChangeBtn.bind(this,"First Name")}>Change</button>
                        </div>

                        <div className="col-md-8">
                            <TextField floatingLabelText="Last Name" floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}} name="lastName" style={{ width: "100%" }} value={this.state.lastName} onChange={this.handleChangeText.bind(this)} />
                        </div>
                        <div className="col-md-4">
                            <button type="button" className="btn btn-danger" style={{ width: "100%", marginTop: "25px" }} onClick={this.handleChangeBtn.bind(this,"Last Name")}>Change</button>                            
                        </div>

                        <div className="col-md-8">
                            <TextField floatingLabelText="Email" floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}   style={{ width: "100%" }} name="email" value={this.state.email} onChange={this.handleChangeText.bind(this)} />
                        </div>
                        <div className="col-md-4">
                            <button type="button" className="btn btn-danger" style={{ width: "100%", marginTop: "25px" }} onClick={this.handleChangeBtn.bind(this,"Email Name")}>Change</button>                            
                        </div>



                        <div className="col-md-8">
                            <button type="button" class="btn btn-danger" style={{ marginTop: "25px", width: "100%" }} onClick={this.handleChangePasswordBtn.bind(this)}>Change Password</button>
                        </div>

                        <div className="col-md-8">
                           <button type="button" class="btn btn-primary"  style={{ marginTop: "25px", width: "100%" }} onClick={this.handleDisplyNotifySetting.bind(this)}>Notification Preferences</button>
                        </div>

                    </div>

                    <PasswordChangerModalPopup show={this.state.isChangePassword} />
                    <MessageModalPopup show={this.state.message.show} message={this.state.message.context} />
                    <NotifySettingModalPopup show={this.state.notify.show} on={this.state.notify.on}/>
                    {/** Home button */}
                    <BackButton className="btn btn-info" redirectUrl="/MainPage" buttonProps={{ label: "Home", primary: false }} />
                </div>
            </div>
        )
    }
}


export default ProfileUserPage;
