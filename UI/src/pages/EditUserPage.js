import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Header from '../components//Header';
import BackButton from '../components//BackButton';
import TextField from 'material-ui/TextField';
import {Modal,Button} from 'react-bootstrap';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


//it contains the users list and delete/edit functionalities
class EditUserPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [{ name: 'jack', employeeId: 1,position:'emp',phone:'+9032234',password:'' },
            { name: 'mack', employeeId: 2,position:'manager',phone:'+6772234',password:'' },
            { name: 'fam', employeeId: 3,position:'CTO',phone:'+4444',password:'' },
            { name: 'slim', employeeId: 4 ,position:'dev',phone:'+34',password:'444'},
            { name: 'prac', employeeId: 5 ,position:'tester',phone:'+2234',password:''},
            { name: 'lll', employeeId: 6,position:'emp',phone:'+904',password:'' },
            { name: 'lll', employeeId: 6 ,position:'emp',phone:'+54666',password:''},
            { name: 'lll', employeeId: 6 ,position:'officeBoy',phone:'+3435',password:'777'},
            { name: 'lll', employeeId: 6 ,position:'emp',phone:'+1032234',password:''},
            { name: 'lll', employeeId: 6,position:'emp',phone:'+4032234',password:'' },
            { name: 'lll', employeeId: 6 ,position:'emp',phone:'+2032234',password:'111'},
            ],
            selected : -1,
            selectedUser: {},
            action:null
        }


    }

    handleChangeAction(value, index) {
        this.setState((prevState) => { prevState.data[index].action = value; return prevState; })
    };



    handleRowSelection(selectedRows) {
        var selectedValue = selectedRows.length == 0 ? -1 : selectedRows[0]

        this.setState({
            selected: selectedValue,
        });
    };


    isSelected(index){
        return this.state.selected == index;
    };


    displayModalPop(action){
        
       var myState =   this.state;
        this.setState({
            selectedUser : myState.users[myState.selected],
            action : action
        });

       // $("#confirmationEditModal").modal("show");
    }

    


    handleChange(e,value){
         
        // var myState =   this.state;
        // var selectedUser = myState.selectedUser;
        // selectedUser[e.target.name] = value
        
        // this.setState({
        //     selectedUser : selectedUser
        // });

        this.state.selectedUser[e.target.name] = value; 
    }

    handleHide(){
        this.setState({
            selectedUser : {}
        });
    }

    handleSaveEdit(){

        var selectedUser =this.state.selectedUser;

        this.setState({
            selectedUser :{}
        });
    }




    render() {

        const EditModalPopup = () => {
            return <div className="static-modal">
                        <Modal show={this.state.selectedUser.hasOwnProperty("name") && this.state.action == "Edit"} container={this} style={{top:"125px"}}>
                            <Modal.Header>
                            <Modal.Title>Edit User</Modal.Title>
                            </Modal.Header>

                            <Modal.Body style={{height:"200px",overflowY:"scroll"}}>
                                <div className="col-md-12">
                                    <TextField floatingLabelText="Name" name="name" style={{ width: "100%" }} defaultValue={this.state.selectedUser.name} onChange={this.handleChange.bind(this)} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}} />
                                </div>
                                <div className="col-md-12">
                                    <TextField floatingLabelText="ID" name="id" style={{ width: "100%" }} defaultValue={this.state.selectedUser.employeeId} onChange={this.handleChange.bind(this)} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}} />
                                </div>
                                <div className="col-md-12">
                                    <TextField floatingLabelText="Position" name="position" style={{ width: "100%" }} defaultValue={this.state.selectedUser.position} onChange={this.handleChange.bind(this)} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}} />
                                </div>
                                <div className="col-md-12">
                                    <TextField floatingLabelText="Phone" name="phone" style={{ width: "100%" }} defaultValue={this.state.selectedUser.phone} onChange={this.handleChange.bind(this)} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}} />
                                </div>
                                <div className="col-md-12">
                                    <TextField floatingLabelText="Pasword" name="password" style={{ width: "100%" }} defaultValue={this.state.selectedUser.password} onChange={this.handleChange.bind(this)} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}} />
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                            <Button onClick={this.handleHide.bind(this)} bsStyle="danger">Close</Button>
                            <Button onClick={this.handleSaveEdit.bind(this)}  bsStyle="primary">Save changes</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
        }

        const DeleteModalPopup = () => {
            return <div className="static-modal">
                        <Modal show={this.state.selectedUser.hasOwnProperty("name") && this.state.action == "Delete"} container={this} style={{top:"125px"}}>
                            <Modal.Header>
                            <Modal.Title>Comfirmation Message</Modal.Title>
                            </Modal.Header>

                            <Modal.Body >
                                <p>Are you sure to delete?</p>
                            </Modal.Body>

                            <Modal.Footer>
                            <Button onClick={this.handleHide.bind(this)} bsStyle="danger">Close</Button>
                            <Button onClick={this.handleSaveEdit.bind(this)}  bsStyle="primary">yes</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
        }

        var self = this;
        return (
            <div>
                {/** Nav bar */}
                <Header
                    title={"Edit Users"}
                />

                {/** Body */}
                <div className="container" style={{ marginTop: "50px" }}>
                    <h2 className="pull-left">Users</h2>

                    {/** Buttons */}
                    <div className="pull-right">
                        <button type="button" disabled={this.state.selected == -1} className="btn btn-primary" style={{ marginRight: '30px' }} onClick={this.displayModalPop.bind(this,"Edit")}>Edit User</button>
                        <button type="button" disabled={this.state.selected == -1} className="btn btn-danger"   onClick={this.displayModalPop.bind(this,"Delete")}>Delete User</button>
                    </div>

                    {/** User List */}
                    <div className="col-md-12">
                        <Table multiSelectable={false} bodyStyle={{overflow:'x-scroll',height:"350px"}} onRowSelection={this.handleRowSelection.bind(this)}>
                            <TableHeader >
                                <TableRow>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Id</TableHeaderColumn>
                                    <TableHeaderColumn>Position</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody style={{ border: '1px solid rgb(224, 224, 224)' }}  deselectOnClickaway={false}>
                                {this.state.users.map(function (user, i) {
                                    return (
                                        <TableRow key={i} selected={self.isSelected(i)}>
                                            <TableRowColumn style={{ borderRight: '1px solid rgb(224, 224, 224)' }}>{user.name}</TableRowColumn>
                                            <TableRowColumn style={{ borderRight: '1px solid rgb(224, 224, 224)' }}>{user.employeeId}</TableRowColumn>
                                            <TableRowColumn>*</TableRowColumn>

                                        </TableRow>
                                    );
                                })}



                            </TableBody>
                        </Table>
                    </div>

                    {/** edit popup  */}                    
                    <EditModalPopup/>

                    {/** delete popup  */}
                    <DeleteModalPopup/>
                   



                    {/** Home */}
                    <BackButton  className="btn btn-info" redirectUrl="/AdminUser" buttonProps={{ label: "Back", secondary: false }} />

                </div>
            </div>
        )
    }
}


export default EditUserPage;
