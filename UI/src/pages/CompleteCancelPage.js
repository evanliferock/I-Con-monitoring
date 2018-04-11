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
			filteredIndexes: [],
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
			let index = this.state.filteredIndexes[this.state.selected[0]];
			let toDoId = this.state.data[index].maintenance_id;
			if (toDoId !== -1) {
				dbapi.put('/maintenance/' + toDo + '/' + toDoId)
					.then((response) => {
						this.setState({ selected: [] });
						this.updateData();
					})
					.catch(function (error) {
						console.log("Error marking as complete");
						console.log(error);
					});
			}
		}
	}

	componentWillMount() {
		this.updateData();
	}

	updateData() {
		let user_id = jwt.decode(localStorage.getItem('token')).user_id;
		dbapi.get('maintenance/' + user_id)
			.then((response) => {
				for (let i = 0; i < response.data.length; i++) {
					response.data[i].start_date_time = new Date(response.data[i].start_date_time);
				}
				this.setState({ 
					data: response.data,
					filteredIndexes: [],
					machines: Array.from(new Set(response.data.map(a => a.equipment_name))),
				});
				this.filterData(this.state.filterBy);
			})
			.catch((error) => {
				console.log("Error updating data");
				console.log(error);
				this.setState({
					data: [{ maintenance_id: -1, start_date_time: new Date(), equipment_name: "ERROR: Please Refresh" }],
					filteredIndexes:[0],
				});
			})
	}

	handleChange(event, index, value){
		this.filterData(value)
	};

	filterData(value){
		var arr = [];
		this.state.data.forEach((d,i) => {
			if (!this.isFiltered(d,value))
				arr.push(i);
		});
		this.setState({
			filteredIndexes:arr,
			filterBy:value,
			selected:[],
		});
	}

	isFiltered(row, value){
		return value !== 0 && this.state.machines[value - 1] !== row.equipment_name;
	}

	render() {
		return (
			<div>
				{/** Nav bar */}
				<Header title={"Complete / Cancel"} />

				{/**body */}
				<div className="container" style={{ marginTop: "50px" }}>
				<h2 className="pull-left" style={{marginLeft: "20px", fontWeight: "bold", fontSize:"30px"}}>
				
				<div>
					<SelectField					  
						autoWidth='true'
						floatingLabelText='Sort by Machine: '
						floatingLabelStyle={{ color:"#4b307b", fontWeight:"bold", right: '55px', width: '100%', transformOrigin: 'center top 0px'}}	
						value={this.state.filterBy}
						onChange={(event, index, value) => this.handleChange(event, index, value)}
						style={{
						backgroundColor: '#D3D3D3',
						textAlign: 'center',
						margin: '0',
						border: '2px solid #212121',
						borderRadius: '50px',
						borderColor:"black"
						}}
						underlineFocusStyle={{borderColor:"black"}}   
						underlineStyle={{borderColor: "black", width: "200px", left:"30px"}}
						>
						<MenuItem key={0} value={0} primaryText="No filter" />
						{this.state.machines.map((d, i) => {
						return (
							<MenuItem key={i+1} value={i+1} primaryText={d} />
						);
						})}
						</SelectField>
									
					</div>
					</h2>
					<div className="col-md-10">

						{/** info list */}
						<Table onRowSelection={(selectedRows) => this.handleRowSelection(selectedRows)} bodyStyle={{overflow:'x-scroll',height:"450px"}}>
							<TableHeader displaySelectAll={false} adjustForCheckbox={false} >
								<TableRow>
									<TableHeaderColumn>Date</TableHeaderColumn>
									<TableHeaderColumn>Time</TableHeaderColumn>
									<TableHeaderColumn>Machine</TableHeaderColumn>
								</TableRow>
							</TableHeader>
							<TableBody displayRowCheckbox={false} style={{ border: '1px solid rgb(224, 224, 224)' }}>
								{this.state.filteredIndexes.map((value, i) => {
									let d=this.state.data[value];
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
