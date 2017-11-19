import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import RaisedButton from 'material-ui/RaisedButton';
import Header from './Header';
import BackButton from './BackButton';

var apiBaseUrl = "http://localhost:4000/api/";

//it contains maintenance plan form
class MaintenancePlanPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            name : '',
            date : '',
            time : '',
            machine : '',
            location :''
        }
    }


     handleChangeTimePicker(event, time) {
         this.setState({time: time});
     };

     handleChangeName(event) {
         this.setState({name: event.target.value});
     };

     handleChangeDatePicker(event, date){
       this.setState({ date: date});
     };

     handleChangeMachine(event, index, value){
         this.setState({machine:value})
     };

     handleChangeLocation(event, index, value){
         this.setState({location:value})
     };



    render(){
        return (
          <MuiThemeProvider>
            <div>
                {/** Nav bar */}
                 <Header
                    appBarProp= {{title:"Maintenance Plan"}}
                />

                {/** Body */}
                <div className="col-md-12">
                    <TextField floatingLabelText="Name" style={{width:"100%"}} value={this.state.name} onChange={this.handleChangeName.bind(this)}/>
                </div>

                <div className="col-md-12">
                    <DatePicker
                        hintText="Date Input"
                        floatingLabelText="Date"
                        value={this.state.date}
                        onChange={this.handleChangeDatePicker.bind(this)}
                        textFieldStyle={{width:"100%"}}
                    />
                </div>

                <div className="col-md-12">
                    <TimePicker
                        format="ampm"
                        hintText="Time"
                        floatingLabelText="Time"
                        value={this.state.time}
                        onChange={this.handleChangeTimePicker.bind(this)}
                        textFieldStyle={{width:"100%"}}
                    />
                </div>
                <div className="col-md-12">

                     <SelectField
                        floatingLabelText="Machine"
                        value={this.state.machine}
                        onChange={this.handleChangeMachine.bind(this)}
                        style={{width:"100%",textAlign:"left"}}
                        >
                        <MenuItem value={1} primaryText="Machine 1" />
                        <MenuItem value={2} primaryText="Machine 2" />
                        <MenuItem value={3} primaryText="Machine 3" />

                    </SelectField>
                </div>
                <div className="col-md-12">
                     <SelectField
                        floatingLabelText="Location"
                        value={this.state.location}
                        onChange={this.handleChangeLocation.bind(this)}
                        style={{width:"100%",textAlign:"left"}}
                        >
                        <MenuItem value={1} primaryText="Location 1" />
                        <MenuItem value={2} primaryText="Location 2" />
                        <MenuItem value={3} primaryText="Location 3" />

                    </SelectField>
                </div>

                <div className="col-md-12">
                    <RaisedButton label="Submit" primary={true} style={{marginTop:"40px",width:"100%"}} />
                </div>

                {/** Home button */}
                 <BackButton redirectUrl="/MainPage" buttonProps={{label:"Cancel",secondary:true}}/>
            </div>
            </MuiThemeProvider>
        );
    }
}


export default MaintenancePlanPage;
