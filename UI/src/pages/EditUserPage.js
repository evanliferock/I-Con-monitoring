import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Header from '../components//Header';
import BackButton from '../components//BackButton';
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
    constructor() {
        super();

        this.state = {
            users: [],
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
    
    handlePutRequest(toDo){
		// if (this.state.selected.length > 0) {
		// 	let user_id = this.state.data[this.state.selected[0]].user_id;
		// 	if (toDoId !== -1) {
		// 		let page = this;
		// 		dbapi.put('/maintenance/' + toDo + '/' + toDoId)
		// 			.then(function (response) {
		// 				page.updateData();
		// 			})
		// 			.catch(function (response) {
		// 				console.log("Error marking as complete");
		// 			});
		// 	}
		// }
	}

    handleChangeAction(value, index) {
        this.setState((prevState) => { prevState.data[index].action = value; return prevState; })
    };

    componentWillMount() {
		this.updateData();
    }
    
    updateData() {
		let user_id = jwt.decode(localStorage.getItem('token')).user_id;
		let page = this;
		// dbapi.get('maintenance/' + user_id)
		// 	.then(function (response) {
		// 		for (let i = 0; i < response.data.length; i++) {
		// 			response.data[i].start_date_time = new Date(response.data[i].start_date_time);
		// 		}
		// 		page.setState({ data: response.data });
		// 	})
		// 	.catch(function (error) {
		// 		console.log("Error getting data: " + error);
		// 		page.setState({
		// 			data: [{ maintenance_id: -1, start_date_time: new Date(), equipment_name: "ERROR: Please Refresh" }],
		// 		})
		// 	})
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
                        <RaisedButton label="Edit User" primary={true} style={{ marginRight: '30px' }} />
                        <RaisedButton label="Delete User" secondary={true} />
                    </div>

                    {/** User List */}
                    <div className="col-md-12">
                        <Table multiSelectable={true}>
                            <TableHeader >
                                <TableRow>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Employee Id</TableHeaderColumn>
                                    <TableHeaderColumn>*</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody style={{ border: '1px solid rgb(224, 224, 224)' }} >
                                {this.state.users.map(function (user, i) {
                                    return (
                                        <TableRow key={i}>
                                            <TableRowColumn style={{ borderRight: '1px solid rgb(224, 224, 224)' }}>{user.name}</TableRowColumn>
                                            <TableRowColumn style={{ borderRight: '1px solid rgb(224, 224, 224)' }}>{user.employeeId}</TableRowColumn>
                                            <TableRowColumn>*</TableRowColumn>

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
