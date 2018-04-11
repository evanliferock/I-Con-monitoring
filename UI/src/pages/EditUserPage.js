import React, { Component } from 'react';
import Header from '../components//Header';
import dbapi from '../apirequests/dbapi';
import TextField from 'material-ui/TextField';
import PATHS from '../global/paths';
import SearchIcon from 'material-ui/svg-icons/action/search';


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

    handleChange = (event) => {
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
            if (user_id !== -1 && window.confirm('Are you sure you want to delete user: \'' + this.state.data[index].name +  
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
                let newPassword = window.prompt('Enter a new password for user: \'' + this.state.data[index].name +  
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
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].name = response.data[i].first_name + ' ' + response.data[i].last_name;
            }
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
		this.state.data.forEach((user,i) => {
			if (user.name.startsWith(value))
				arr.push(i);
		});
		this.setState({
			filteredIndexes:arr,
            nameFilter:value,
            selected:[],
		});
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
            <h2 className="pull-left" style={{marginLeft: "20px", fontWeight: "bold", fontSize:"30px"}}>
            <button type="button"className="btn btn-info" label="Back" secondary={true} style={{ position:"relative", marginRight: '-100px', fontWeight:"bold", fontSize:"10px", right: 10, top: -60}}   onClick={(event) => this.handleClick("/AdminUser")}>Back</button>

            Users
            <div style={{position: 'relative', display: 'inline-block'}}>
            <SearchIcon style={{position: 'absolute', right: -30, top: 0, width: 40, height: 40}}/>

                <TextField
                    value={this.state.first_name}
                    onChange={this.handleChange}
                    style={{left:'30px',
                    }}
                    underlineFocusStyle={{borderColor:"black"}}   
                    underlineStyle={{borderColor: "black"}}
                />
            </div>

            </h2>
            
            {/** Buttons */}
            <div className="pull-right">
                <button type="button"className="btn btn-success" label="Edit User" primary={true} style={{ marginRight: '30px', fontWeight:"bold" }} 
                  onClick={() => this.handlePasswordReset()}>Edit User</button>
                <button type="button"className="btn btn-danger" label="Delete User" secondary={true} style={{ marginRight: '30px', fontWeight:"bold" }} 
                  onClick={() => this.handleDeleteRequest()}>Delete User</button>
            </div>


            
            {/** User List */}
            <div className="col-md-12">
                <Table multiSelectable={false} onRowSelection={(selectedRows) => this.handleRowSelection(selectedRows)} bodyStyle={{overflow:'x-scroll',height:"450px"}}>
                    <TableHeader  displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Username</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} style={{ border: 'none' }} >
                        {this.state.filteredIndexes.map((index, i) => {
                            let user=this.state.data[index];
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
            </div>
            </div>
        )
    }
}


export default EditUserPage;