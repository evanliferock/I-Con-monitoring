import React, { Component } from 'react';
import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Header from '../components/Header';
import {Link} from 'react-router-dom';
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
      let page = this;
      this.state.start_date_time.toJSON();
      dbapi.post('/maintenance', {
      user_id: this.state.user_id,
      start_date_time: this.state.start_date_time,
      equipment_id: this.state.equipment_id,
      location_id: this.state.location_id
      })
        .then(function (response) {
            page.setState({
            start_date_time: null,
            equipment_id: -1,
            location_id: -1,
            })
            window.alert('Success in posting Maintenance');
        })
        .catch(function (error) {
            window.alert("Error posting maintenance: " + error);
        });
    }

    componentWillMount() {
  		this.updateData();
  	}

  	updateData() {
  		let user_id = jwt.decode(localStorage.getItem('token')).user_id;
        this.setState({user_id: user_id});
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
        const today = new Date();
        return (
            <div>
                {/** Nav bar */}
                <Header
                    title={"Maintenance Plan Creation" }
                />

                {/** Body */}

                    <div className="col-md-12">
                        <DateTimePicker
                            hintText=" "
                            minDate={today}                           
                            floatingLabelText="Time"
                            floatingLabelStyle={{fontSize: "20px", color:"black"}}
                            value={this.state.start_date_time}
                            onChange={this.handleChangeDateTimePicker}
                            DatePicker={DatePickerDialog}
                            TimePicker={TimePickerDialog}
                            textFieldStyle={{ width: "100%", fontSize: "30px" }}
                        />
                    
                </div>
                <div className="col-md-12">

                    <SelectField
                        hintText="Machine"
                        floatingLabelText="Machine"
                        floatingLabelStyle={{fontSize: "20px", color:"black"}}
                        value={this.state.equipment_id}
                        onChange={this.handleChangeMachine.bind(this)}
                        style={{ width: "100%", textAlign: "left", fontSize: "30px"}}
                    >
                        {this.state.equipment.map((e,i) => {
                          return (
                            <MenuItem key={i} value={e.equipment_id} primaryText={e.name}/>
                            
        				  );
                        })}
                    </SelectField>
                </div>
                <div className="col-md-12">
                    <SelectField
                        hintText="Location"
                        floatingLabelText="Location"
                        floatingLabelStyle={{fontSize: "20px", color:"black"}}                                                
                        value={this.state.location_id}
                        onChange={this.handleChangeLocation.bind(this)}
                        style={{ width: "100%", textAlign: "left", fontSize: "30px"}}
                    >
                    {this.state.locations.map((l,i) => {
                      return (
                        <MenuItem key={i} value={l.location_id} primaryText={l.name}/>
                      );
                    })}
                    </SelectField>
                </div>
                        <div className="col-md-6">
                            <button type="button" className="btn btn-success" onClick={() => this.handlePostRequest()} style={{ marginTop: "40px", width: "100%", fontWeight:"Bold", fontSize:"15px" }}>Submit</button>
                        </div>
                        <div className="col-md-6">
                            {/** Home button */}
                            <Link to="/MainPage" className="btn btn-danger"style={{ marginTop: "40px", width: "100%", fontWeight:"Bold", fontSize:"15px" }}>Cancel</Link>
                        </div>
                </div>    
        );
    }
}


export default MaintenancePlanPage;
