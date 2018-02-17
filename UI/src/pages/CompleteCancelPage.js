import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import jwt from 'jsonwebtoken';
import dbapi from '../apirequests/dbapi';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';

//it contains table and button
class CompleteCancelPage extends Component {
	constructor() {
		super();
		this.state = {
			data: [
					{start_date_time: new Date('12/01/2017 09:50:00'),equipment_name:'equipment'},
					{start_date_time: new Date('11/08/2017 06:50:00'),equipment_name:'equipment1'},
					{start_date_time: new Date('12/01/2017 07:55:00'),equipment_name:'equipment2'},
					{start_date_time: new Date('12/02/2017 10:50:00'),equipment_name:'equipment3'},
					{start_date_time: new Date('12/01/2017 09:50:00'),equipment_name:'equipment4'},
					{start_date_time: new Date('02/11/2017 09:50:00'),equipment_name:'equipment5'},
					{start_date_time: new Date('02/11/2017 10:50:00'),equipment_name:'equipment6'},
					{start_date_time: new Date('12/01/2017 09:50:00'),equipment_name:'equipment7'},
					{start_date_time: new Date('12/01/2017 03:50:00'),equipment_name:'equipment8'},
					{start_date_time: new Date('12/01/2017 09:50:00'),equipment_name:'equipment9'},
					{start_date_time: new Date('12/01/2017 10:50:00'),equipment_name:'equipment10'}
					
			      ],
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
		if (this.state.selected.length > 0) {
			let toDoId = this.state.data[this.state.selected[0]].maintenance_id;
			if (toDoId !== -1) {
				let page = this;
				dbapi.put('/maintenance/' + toDo + '/' + toDoId)
					.then(function (response) {
						page.updateData();
					})
					.catch(function (response) {
						console.log("Error marking as complete");
					});
			}
		}
	}

	componentWillMount() {
		this.updateData();
	}

	updateData() {
		let user_id = jwt.decode(localStorage.getItem('token')).user_id;
		let page = this;
		dbapi.get('maintenance/' + user_id)
			.then(function (response) {
				for (let i = 0; i < response.data.length; i++) {
					response.data[i].start_date_time = new Date(response.data[i].start_date_time);
				}
				page.setState({ data: response.data });
			})
			.catch(function (error) {
				console.log("Error getting data: " + error);
				page.setState({
					data: [{ maintenance_id: -1, start_date_time: new Date(), equipment_name: "ERROR: Please Refresh" }],
				})
			})
	}

	render() {
		return (
			<div>
				{/** Nav bar */}
				<Header title={"Complete / Cancel"} />

				{/**body */}
				<div className="container" style={{ marginTop: "50px" }}>
					<div className="col-md-10">

						{/** info list */}
						<Table onRowSelection={(selectedRows) => this.handleRowSelection(selectedRows)} bodyStyle={{overflow:'x-scroll',height:"450px"}}>
							<TableHeader displaySelectAll={false} adjustForCheckbox={false} >
								<TableRow>
									<TableHeaderColumn >Date</TableHeaderColumn>
									<TableHeaderColumn >Time</TableHeaderColumn>
									<TableHeaderColumn>Machine</TableHeaderColumn>
								</TableRow>
							</TableHeader>
							<TableBody displayRowCheckbox={false} style={{ border: '1px solid rgb(224, 224, 224)' }}>
								{this.state.data.map((d, i) => {
									return (
										<TableRow key={i} selected={this.isSelected(i)}>
											<TableRowColumn style={{ borderRight: '1px solid rgb(224, 224, 224)' }}>{d.start_date_time.toDateString()}</TableRowColumn>
											<TableRowColumn style={{ borderRight: '1px solid rgb(224, 224, 224)' }}>{d.start_date_time.toLocaleTimeString()}</TableRowColumn>
											<TableRowColumn>{d.equipment_name}</TableRowColumn>

										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</div>

					{/** right buttons */}
					<div className="col-md-2">
						<button type="button"  onClick={() => this.handlePutRequest('complete')} className="btn btn-primary" style={{ margin: "20px", width: "100%" }} >Complete</button>

						<button type="button"  onClick={() => this.handlePutRequest('cancel')} className="btn btn-danger" style={{ margin: "40px 20px", width: "100%" }} >Cancel</button>
					</div>


				</div>

			</div>
		)
	}
}


export default CompleteCancelPage;
