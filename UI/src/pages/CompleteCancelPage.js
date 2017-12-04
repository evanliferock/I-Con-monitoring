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
					<div className="col-md-8">

						{/** info list */}
						<Table onRowSelection={(selectedRows) => this.handleRowSelection(selectedRows)}>
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
					<div className="col-md-offset-1 col-md-3">
						<RaisedButton label="Complete" onClick={() => this.handlePutRequest('complete')} backgroundColor="#00E676" style={{ margin: "20px", width: "100%" }} />

						<RaisedButton label="Cancel" onClick={() => this.handlePutRequest('cancel')} secondary={true} style={{ margin: "40px 20px", width: "100%" }} />
					</div>


				</div>

				{/** back home button */}
				<BackButton redirectUrl={"/MainPage"} buttonProps={{ label: "Home", primary: true }} />

			</div>
		)
	}
}


export default CompleteCancelPage;
