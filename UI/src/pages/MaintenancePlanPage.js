import React, { Component } from 'react';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import dbapi from '../apirequests/dbapi';
import jwt from 'jsonwebtoken';

//it contains maintenance plan form
class MaintenancePlanPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: null,
            start_date_time: null,
            equipment_id: -1,
            location_id: -1,
            equipment:[],
            locations:[]
        }
    }

    handleChangeDateTimePicker = (dateTime) => this.setState({ start_date_time: dateTime});

    handleChangeMachine(event, index, value) {
        this.setState({ equipment_id: value })
    };

    handleChangeLocation(event, index, value) {
        this.setState({ location_id: value })
    };

    handlePostRequest(){
      this.setState({user_id: jwt.decode(localStorage.getItem('token')).user_id});
      this.state.start_date_time.toJSON();
      dbapi.post('/maintenance', {
        params: {
          user_id: this.state.user_id,
          start_date_time: this.state.start_date_time,
          equipment_id: this.state.equipment_id,
          location_id: this.state.location_id
        }
      })
        .then(function (response) {
          console.log("posted");
        })
        .catch(function (response) {
          console.log("Error: " + response);
        });
    }

    componentWillMount() {
  		this.updateData();
  	}

  	updateData() {
  		let user_id = jwt.decode(localStorage.getItem('token')).user_id;
      this.state.user_id = user_id;
  		let page = this;
  		dbapi.get('location')
  			.then(function (response) {
  				page.setState({ locations: response.data})
  			})
  			.catch(function (error) {
  				console.log("Error getting location data: " + error);
  			})
      dbapi.get('equipment')
  			.then(function (response) {
  				page.setState({ equipment: response.data})

  			})
  			.catch(function (error) {
  				console.log("Error getting equipment data: " + error);
  			})
  	}


    render() {
        return (
            <div>
                {/** Nav bar */}
                <Header
                    title={"Maintenance Plan" }
                />

                {/** Body */}

                <div className="col-md-12">
                    <DateTimePicker
                        hintText="Time"
                        floatingLabelText="Time"
                        value={this.state.start_date_time}
                        onChange={this.handleChangeDateTimePicker}
                        DatePicker={DatePickerDialog}
                        TimePicker={TimePickerDialog}
                        textFieldStyle={{ width: "100%" }}
                      />
                </div>
                <div className="col-md-12">

                    <SelectField
                        floatingLabelText="Machine"
                        value={this.state.equipment_id}
                        onChange={this.handleChangeMachine.bind(this)}
                        style={{ width: "100%", textAlign: "left" }}
                    >
                        {this.state.equipment.map((e,i) => {
                          return (
                            <MenuItem value={e.equipment_id} primaryText={e.name}/>
        									);
                        })}
                    </SelectField>
                </div>
                <div className="col-md-12">
                    <SelectField
                        floatingLabelText="Location"
                        value={this.state.location_id}
                        onChange={this.handleChangeLocation.bind(this)}
                        style={{ width: "100%", textAlign: "left" }}
                    >
                    {this.state.locations.map((l,i) => {
                      return (
                        <MenuItem value={l.location_id} primaryText={l.name}/>
                      );
                    })}
                    </SelectField>
                </div>

                <div className="col-md-12">
                    <RaisedButton label="Submit" onClick={() => this.handlePostRequest()} primary={true} style={{ marginTop: "40px", width: "100%" }} />
                </div>

                {/** Home button */}
                <BackButton redirectUrl="/MainPage" buttonProps={{ label: "Cancel", secondary: true }} />
            </div>
        );
    }
}


export default MaintenancePlanPage;
