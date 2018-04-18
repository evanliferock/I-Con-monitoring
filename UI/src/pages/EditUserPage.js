import React, { Component } from 'react';
import Header from '../components//Header';
import dbapi from '../apirequests/dbapi';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';
import jwt from 'jsonwebtoken';


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
            data: [],
            selected : [],
            filteredIndexes: [],
            nameFilter: '',
            text: '',
        }


    }

    handleChange(event) {
        this.filterData(event.target.value);
    };

    isSelected(i){
		return this.state.selected.indexOf(i) !== -1;
    };

    handleRowSelection(selectedRows) {
		if (selectedRows.length !== 0)
        this.setState({ selected: selectedRows });
    };

    handleDeleteRequest(){
		if (this.state.selected.length > 0) {
            let index = this.state.filteredIndexes[this.state.selected[0]];
			let user_id = this.state.data[index].user_id;
            if (user_id !== -1 && window.confirm('Are you sure you want to delete user: \'' + this.state.data[index].first_name + 
            ' '  + this.state.data[index].last_name +
            '\' with username: \'' + this.state.data[index].username + '\'')) {
				dbapi.put('/user/remove/', {
                    user_id: user_id,
                })
                .then((response) => {
                    this.updateData();                    
                    this.setState({ selected: [] });
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
            let index = this.state.filteredIndexes[this.state.selected[0]];
			      let user_id = this.state.data[index].user_id;
            if (user_id !== -1) {
                let newPassword = window.prompt('Enter a new password for user: \'' + this.state.data[index].first_name + 
                ' '  + this.state.data[index].last_name +
                '\' with username: \'' + this.state.data[index].username + '\'');
                if(newPassword){
                    dbapi.put('/user/password/reset', {
                        user_id: user_id,
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

    handleClick(path) {
        window.location.pathname = path;
    }
    
    componentWillMount() {
		this.updateData();
    }

    updateData() {
		dbapi.get('user/')
        .then((response) => {
            this.setState({
                data: response.data,
                filteredIndexes: [],
            });
            this.filterData(this.state.nameFilter);
        })
        .catch((error) => {
            console.log("Error getting data: " + error);
            this.setState({
                data: [{ user_id: -1, name: "ERROR: Please Refresh", username: "ERROR: Please Refresh", equipment_nam: "ERROR: Please Refresh" }],
            })
        })
    }
    
    filterData(value){
        var arr = [];
        var the_user_id = jwt.decode(localStorage.getItem('token')).user_id;
		this.state.data.forEach((user,i) => {
			if (user.user_id !== the_user_id && user.last_name.toLowerCase().startsWith(value.toLowerCase()))
				arr.push(i);
		});
		this.setState({
			filteredIndexes:arr,
            nameFilter:value,
            selected:[],
		});
	}

    render() {
    document.title = "Edit User - ICon Monitoring";            
      return (
            <div>
            {/** Nav bar */}
            <Header
                title={"Edit Users"}
            />
            
            {/** Body */}
            <div className="container" style={{ marginTop: "50px" }}>
            <h2 className="pull-left" style={{marginLeft: "20px", fontWeight: "bold", fontSize:"30px"}}>
            <div style={{position: 'relative', display: 'inline-block'}}>
            <SearchIcon style={{position: 'absolute', right: -30, top: 0, width: 40, height: 40}}/>

                <TextField
                    id="searchbar"
                    placeholder="Search by Last Name"
                    value={this.state.first_name}
                    onChange={(event) => this.handleChange(event)}
                    style={{left:'30px',
                    }}
                    underlineFocusStyle={{borderColor:"black"}}   
                    underlineStyle={{borderColor: "black"}}
                />
            </div>

            </h2>
            
            {/** Buttons */}
            <div className="pull-right">
                <button type="button"className="btn btn-success" label="Edit User" style={{ marginRight: '30px', fontWeight:"bold" }} 
                  onClick={() => this.handlePasswordReset()}>Edit User</button>
                <button type="button"className="btn btn-danger" label="Delete User" style={{ marginRight: '30px', fontWeight:"bold" }} 
                  onClick={() => this.handleDeleteRequest()}>Delete User</button>
            </div>


            
            {/** User List */}
            <div className="col-md-12">
                <Table multiSelectable={false} onRowSelection={(selectedRows) => this.handleRowSelection(selectedRows)} bodyStyle={{overflow:'x-scroll',height:"450px"}}>
                    <TableHeader  displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Last Name</TableHeaderColumn>
                            <TableHeaderColumn>First Name</TableHeaderColumn>
                            <TableHeaderColumn>Username</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} style={{ border: 'none' }} >
                        {this.state.filteredIndexes.map((index, i) => {
                            let user=this.state.data[index];
                            return (
                                <TableRow key={i} selected={this.isSelected(i)}>
                                    <TableRowColumn style={{ borderRight: '1px solid rgb(224, 224, 224)' }}>{user.last_name}</TableRowColumn>
                                    <TableRowColumn style={{ borderRight: '1px solid rgb(224, 224, 224)' }}>{user.first_name}</TableRowColumn>
                                    <TableRowColumn style={{ borderRight: '1px solid rgb(224, 224, 224)' }}>{user.username}</TableRowColumn>
                                    <TableRowColumn style={{ borderRight: '1px solid rgb(224, 224, 224)' }}>{user.email}</TableRowColumn>
                    
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                
            </div>
            </div>
            </div>
        )
    }
}


export default EditUserPage;