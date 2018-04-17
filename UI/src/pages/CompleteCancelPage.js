import React, { Component } from 'react';
import Header from '../components/Header';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import jwt from 'jsonwebtoken';
import dbapi from '../apirequests/dbapi';
import SearchIcon from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';


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
			machineFilter: 0,
			usernameFilter:'',
			timeFilter:0,
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
			let token = jwt.decode(localStorage.getItem('token'));
			if(token.user_id !== this.state.data[index].user_id && !token.admin){
				alert('You can only complete or cancel your own maintenance');
			} else if(token.user_id === this.state.data[index].user_id 
				|| (token.admin && window.confirm('This is not your maintenance, but as an admin you can ' + toDo + 
						' it.\nWould you like to ' + toDo + ' the maintenance for username: \'' + 
						this.state.data[index].username + '\''))) {
				let toDoId = this.state.data[index].maintenance_id;
				if (toDoId !== -1) {
				dbapi.put('/maintenance/' + toDo + '/' + toDoId)
					.then((response) => {
						if(toDo === 'complete')
							window.alert('Successfully ' + toDo + 'd maintenance');
						else
							window.alert('Successfully ' + toDo + 'ed maintenance');
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
	}

	componentWillMount() {
		this.updateData();
	}

	updateData() {
		dbapi.get('maintenance')
			.then((response) => {
				for (let i = 0; i < response.data.length; i++) {
					response.data[i].start_date_time = new Date(response.data[i].start_date_time);
				}
				this.setState({ 
					data: response.data,
					filteredIndexes: [],
					machines: Array.from(new Set(response.data.map(a => a.equipment_name))),
				});
				this.filterData('general', null);
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

	handleChange(event, index, value, type){
		this.filterData(type, value)
	};

	filterData(type,value){
		var arr = [];
		this.state.data.forEach((d,i) => {
			if (!this.isFiltered(d,type,value))
				arr.push(i);
		});
		if(type === 'machine'){
			this.setState({
				filteredIndexes:arr,
				machineFilter:value,
				selected:[],
			});
		} else if (type === 'username'){
			this.setState({
				filteredIndexes:arr,
				usernameFilter:value,
				selected:[],
			});
		} else if (type === 'time'){
			this.setState({
				filteredIndexes:arr,
				timeFilter:value,
				selected:[],
			});
		}else {
			this.setState({
				filteredIndexes:arr,
				selected:[],
			});
		}
	}

	isFiltered(row, type, value){
		if(type === 'machine'){
			return (value !== 0 && this.state.machines[value - 1] !== row.equipment_name)
				|| !row.username.toLowerCase().startsWith(this.state.usernameFilter.toLowerCase())
				|| (this.state.timeFilter !== 0 && this.checkDate(row, this.state.timeFilter === 1));
		} else if (type === 'username') {
			return (this.state.machineFilter !== 0 
				&& this.state.machines[this.state.machineFilter - 1] !== row.equipment_name)
				|| !row.username.toLowerCase().startsWith(value.toLowerCase())
				|| (this.state.timeFilter !== 0 && this.checkDate(row, this.state.timeFilter === 1));
		} else if (type === 'time'){
			return (this.state.machineFilter !== 0
				&& this.state.machines[this.state.machineFilter - 1] !== row.equipment_name)
				|| !row.username.toLowerCase().startsWith(this.state.usernameFilter.toLowerCase())
				|| (value !== 0 && this.checkDate(row, value === 1));
		} else {
			return (this.state.machineFilter !== 0 //machine is being filtered
				&& this.state.machines[this.state.machineFilter - 1] !== row.equipment_name) // machine filter does not match
				|| !row.username.toLowerCase().startsWith(this.state.usernameFilter.toLowerCase()) // or doesn't match username filter
				|| (this.state.timeFilter !== 0 && this.checkDate(row, this.state.timeFilter === 1)); // or is not matching the timeFilter
		}
	}

	checkDate(row, isPast){
		if(isPast){
			return row.start_date_time >= new Date();
		} else {
			return row.start_date_time <= new Date();
		}
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
						floatingLabelText='Sort by Machine: '
						floatingLabelStyle={{ color:"#4b307b", fontWeight:"bold", right: '55px', width: '100%', transformOrigin: 'center top 0px'}}	
						value={this.state.machineFilter}
						onChange={(event, index, value) => this.handleChange(event, index, value, 'machine')}
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
					<div style={{position: 'relative', display: 'inline-block'}}>
						<SearchIcon style={{position: 'absolute', right: -30, top: 0, width: 40, height: 40}}/>

						<TextField
							id="searchbar"
							placeholder="Search by Username"
							value={this.state.usernameFilter}
							onChange={(event) => this.handleChange(event, null, event.target.value, 'username')}
							style={{left:'30px',}}
							underlineFocusStyle={{borderColor:"black"}}   
							underlineStyle={{borderColor: "black"}}
						/>
					</div>
					<SelectField					  
						floatingLabelText='Sort by Time:'
						floatingLabelStyle={{ color:"#4b307b", fontWeight:"bold", right: '55px', width: '100%', transformOrigin: 'center top 0px'}}	
						value={this.state.timeFilter}
						onChange={(event, index, value) => this.handleChange(event, index, value, 'time')}
						style={{
							right:'-50px',
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
							<MenuItem value={0} primaryText="No filter" />
							<MenuItem value={1} primaryText="Past" />
							<MenuItem value={2} primaryText="Future" />
					</SelectField>		
					</div>
					</h2>
					<div className="col-md-10">

						{/** info list */}
						<Table onRowSelection={(selectedRows) => this.handleRowSelection(selectedRows)} bodyStyle={{overflow:'x-scroll',height:"450px"}}>
							<TableHeader displaySelectAll={false} adjustForCheckbox={true} >
								<TableRow>
									<TableHeaderColumn>Date</TableHeaderColumn>
									<TableHeaderColumn>Time</TableHeaderColumn>
									<TableHeaderColumn>Machine</TableHeaderColumn>
									<TableHeaderColumn>Username</TableHeaderColumn>
								</TableRow>
							</TableHeader>
							<TableBody displayRowCheckbox={true} style={{ border: '1px solid rgb(224, 224, 224)' }}>
								{this.state.filteredIndexes.map((value, i) => {
									let d=this.state.data[value];
									return (
										<TableRow key={i} selected={this.isSelected(i)}>
											<TableRowColumn style={{ borderRight: '1px solid rgb(224, 224, 224)' }}>{d.start_date_time.toDateString()}</TableRowColumn>
											<TableRowColumn style={{ borderRight: '1px solid rgb(224, 224, 224)' }}>{d.start_date_time.toLocaleTimeString()}</TableRowColumn>
											<TableRowColumn>{d.equipment_name}</TableRowColumn>
											<TableRowColumn>{d.username}</TableRowColumn>
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
