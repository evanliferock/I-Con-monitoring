import React, { Component } from 'react';
import Header from '../components/Header';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
			machines: [],
			filterBy: 0,
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
						this.setState({ selected: [] });
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
				page.setState({ 
					data: response.data,
					machines: Array.from(new Set(response.data.map(a => a.equipment_name))),
				 });
			})
			.catch(function (error) {
				console.log("Error getting data: " + error);
				page.setState({
					data: [{ maintenance_id: -1, start_date_time: new Date(), equipment_name: "ERROR: Please Refresh" }],
				});
			})
	}

	handleChange = (event, index, value) => this.setState({filterBy:value});

	isFiltered(row){
		return this.state.filterBy === 0 || this.state.machines[this.state.filterBy - 1] === row.equipment_name;
	}

	render() {
		return (
			<div>
				{/** Nav bar */}
				<Header title={"Complete / Cancel"} />

				{/**body */}
				<div className="container" style={{ marginTop: "50px" }}>
					<div>
					<SelectField
          				floatingLabelText="Filter By Machine"
          				value={this.state.filterBy}
						 onChange={this.handleChange}
						 style={{
						 	margin: '0 auto',
							border: '2px solid #212121',
							backgroundColor: '#D3D3D3'
						}}
						iconStyle={{
							color:'#000000'
						}}
					>
          				<MenuItem key={0} value={0} primaryText="None" />
						{this.state.machines.map((d, i) => {
							return (
								<MenuItem key={i+1} value={i+1} primaryText={d} />
							);
						})}
        			</SelectField>
					</div>
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
								{this.state.data.filter((row) => this.isFiltered(row)).map((d, i) => {
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
						<button type="button"  onClick={() => this.handlePutRequest('complete')} className="btn btn-success" style={{ margin: "20px", width: "100%", fontWeight:"bold", fontSize:"13px" }} >Complete</button>

						<button type="button"  onClick={() => this.handlePutRequest('cancel')} className="btn btn-danger" style={{ margin: "40px 20px", width: "100%", fontWeight:"bold", fontSize:"13px" }} >Cancel</button>
					</div>


				</div>

			</div>
		)
	}
}


export default CompleteCancelPage;
