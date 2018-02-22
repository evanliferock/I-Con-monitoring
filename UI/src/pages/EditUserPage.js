import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Header from '../components//Header';
import BackButton from '../components//BackButton';
import dbapi from '../apirequests/dbapi';

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
    constructor() {
        super();
        
        this.state = {
            data: [],
            selected: [],
        }
    }
    
    isSelected(i) {
		return this.state.selected.indexOf(i) !== -1;
    }
    
    handleRowSelection(selectedRows) {
		if (selectedRows.length !== 0)
        this.setState({ selected: selectedRows });
    }
    
    handleDeleteRequest(){
		if (this.state.selected.length > 0) {
			let user_id = this.state.data[this.state.selected[0]].user_id;
            if (user_id !== -1 && window.confirm('Are you sure you want to delete user: \'' + this.state.data[this.state.selected[0]].name +  
            '\' with username: \'' + this.state.data[this.state.selected[0]].username + '\'')) {
				dbapi.put('/user/remove/', {
                    user_id: user_id,
                })
                .then((response) => {
                    this.updateData();
                    window.alert('Success in deleting user');
                })
                .catch(function (error) {
                    window.alert('Error deleting user: ' + error.response.data.failed);
                });
			}
		}
    }
    
    handlePasswordReset(){
		if (this.state.selected.length > 0) {
            let user_id = this.state.data[this.state.selected[0]].user_id;
            if (user_id !== -1) {
                let newPassword = window.prompt('Enter a new password for user: \'' + this.state.data[this.state.selected[0]].name +  
                '\' with username: \'' + this.state.data[this.state.selected[0]].username + '\'');
                if(newPassword){
                    dbapi.put('/user/password/reset', {
                        password: newPassword,
                    })
					.then(function (response) {
						window.alert('Success in updating password');
					})
					.catch(function (error) {
						window.alert("Error marking as complete: " + error.response.data.failed);
                    });
                }
			}
		}
	}

    componentWillMount() {
		this.updateData();
    }
    
    updateData() {
		let page = this;
		dbapi.get('user/')
        .then(function (response) {
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].name = response.data[i].first_name + ' ' + response.data[i].last_name;
            }
            page.setState({ data: response.data });
        })
        .catch(function (error) {
            console.log("Error getting data: " + error);
            page.setState({
                data: [{ user_id: -1, name: "ERROR: Please Refresh", username: "ERROR: Please Refresh", equipment_nam: "ERROR: Please Refresh" }],
            })
        })
	}
    
    render() {
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
            <RaisedButton label="Edit User" primary={true} onClick={() => this.handlePasswordReset()} style={{ marginRight: '30px' }} />
            <RaisedButton label="Delete User" secondary={true} onClick={() => this.handleDeleteRequest()}/>
            </div>
            
            {/** User List */}
            <div className="col-md-12">
            <Table multiSelectable={false} onRowSelection={(selectedRows) => this.handleRowSelection(selectedRows)}>
            <TableHeader  displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Username</TableHeaderColumn>
            <TableHeaderColumn>Email</TableHeaderColumn>
            </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} style={{ border: '1px solid rgb(224, 224, 224)' }} >
            {this.state.data.map((user, i) => {
                return (
                    <TableRow key={i} selected={this.isSelected(i)}>
                    <TableRowColumn style={{ borderRight: '1px solid rgb(224, 224, 224)' }}>{user.name}</TableRowColumn>
                    <TableRowColumn style={{ borderRight: '1px solid rgb(224, 224, 224)' }}>{user.username}</TableRowColumn>
                    <TableRowColumn style={{ borderRight: '1px solid rgb(224, 224, 224)' }}>{user.email}</TableRowColumn>
                    
                    </TableRow>
                );
            })}
            </TableBody>
            </Table>
            </div>
            
            {/** Home */}
            <BackButton redirectUrl="/AdminUser" buttonProps={{ label: "Back", secondary: true }} />
            
            </div>
            </div>
        )
    }
}


export default EditUserPage;
