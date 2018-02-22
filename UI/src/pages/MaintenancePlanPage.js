import React, { Component } from 'react';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import SensorLayout from '../components/SensorLayout'
import {Link} from 'react-router-dom';

//it contains maintenance plan form
class MaintenancePlanPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            date: '',
            time: '',
            machine: '',
            location: ''
        }
    }


    handleChangeTimePicker(event,time) {
        debugger;
        this.setState({ time: time });
    };

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    };

    handleChangeDatePicker(event,date) {
        debugger;
        this.setState({ date: date});
    };

    handleChangeMachine(event, index, value) {
        this.setState({ machine: value })
    };

    handleChangeLocation(event, index, value) {
        this.setState({ location: value })
    };



    render() {
        return (
            <div>
                {/** Nav bar */}
                <Header
                    title={"Maintenance Plan Creation" }
                />

                {/** Body */}

                <div className="col-md-12">
                    <div className="col-md-6">
                        <div className="col-md-12">
                            <TextField floatingLabelText="Name" style={{ width: "100%" }} value={this.state.name} onChange={this.handleChangeName.bind(this)} />
                        </div>
                    <div className="col-md-12">
                       <DatePicker
                            hintText="Date Input"
                            floatingLabelText="Date"
                            value={this.state.date}
                            onChange={this.handleChangeDatePicker.bind(this)}
                            textFieldStyle={{ width: "100%" }}
                            container="inline"
                            minDate= {new Date()}
                            autoOk={true}
                            
                        />

                       {/**  <TextField floatingLabelText="Date" className="datepicker" style={{ width: "100%" }} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}  value={this.state.date} onChange={this.handleChangeDatePicker.bind(this)} />
                        */}
                </div>

                <div className="col-md-12">
                    <TimePicker
                        format="ampm"
                        hintText="Time"
                        floatingLabelText="Time"
                        value={this.state.time}
                        onChange={this.handleChangeTimePicker.bind(this)}
                        textFieldStyle={{ width: "100%" }}
                        container="inline"
                        
                        />
                  
                   {/**    <TextField floatingLabelText="Time" className="timepicker" style={{ width: "100%" }} floatingLabelFocusStyle={{color:"#6441A4"}} underlineFocusStyle={{borderColor:"#6441A4"}}  value={this.state.time} onChange={this.handleChangeTimePicker.bind(this)} />
                  */}
                    
                </div>
                <div className="col-md-12">

                    <SelectField
                        floatingLabelText="Machine"
                        value={this.state.machine}
                        onChange={this.handleChangeMachine.bind(this)}
                        style={{ width: "100%", textAlign: "left" }}
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
                        style={{ width: "100%", textAlign: "left" }}
                    >
                        <MenuItem value={1} primaryText="Location 1" />
                        <MenuItem value={2} primaryText="Location 2" />
                        <MenuItem value={3} primaryText="Location 3" />

                    </SelectField>
                </div>


                        <div className="col-md-6">
                            <button type="button" className="btn btn-primary"style={{ marginTop: "40px", width: "100%" }}>Submit</button>
                        </div>
                        <div className="col-md-6">
                            {/** Home button */}
                            <Link to="/MainPage" className="btn btn-danger"style={{ marginTop: "40px", width: "100%" }}>Cancel</Link>
                            
                            
                        </div>
                    </div>

                    <div className="col-md-6">
                      <SensorLayout/>
                    </div>
                </div>    

                
            </div>
        );
    }
}


export default MaintenancePlanPage;
