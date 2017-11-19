import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';


import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Header from './Header';
import BackButton from './BackButton';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


var apiBaseUrl = "http://localhost:4000/api/";

//it contains table and button
class CompleteCancelPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            data : [{date:'25/10/2017',time:'2:10 PM',machine:'machine1'},
                    {date:'29/07/2017',time:'5:15 PM',machine:'machine2'}]
        }


    }


    render(){
        return (
          <MuiThemeProvider>
            <div>
                {/** Nav bar */}
                <Header
                    appBarProp= {{title:"Complete / Cancel "}}
                />

                {/**body */}
                <div className="container" style={{marginTop:"50px"}}>
                   <div className="col-md-8">

                        {/** info list */}
                        <Table >
                            <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                            <TableRow>
                                <TableHeaderColumn >Date</TableHeaderColumn>
                                <TableHeaderColumn >Time</TableHeaderColumn>
                                <TableHeaderColumn>Machine</TableHeaderColumn>
                            </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} style={{border:'1px solid rgb(224, 224, 224)'}}>
                                {this.state.data.map(function(d,i){
                                    return (
                                        <TableRow key={i}>
                                            <TableRowColumn style={{borderRight:'1px solid rgb(224, 224, 224)'}}>{d.date}</TableRowColumn>
                                            <TableRowColumn style={{borderRight:'1px solid rgb(224, 224, 224)'}}>{d.time}</TableRowColumn>
                                            <TableRowColumn>{d.machine}</TableRowColumn>

                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                    </Table>
                   </div>

                   {/** right buttons */}
                   <div className="col-md-offset-1 col-md-3">
                             <RaisedButton label="Complete" backgroundColor="#00E676" style={{margin:"20px",width:"100%"}} />

                             <RaisedButton label="Cancel" secondary={true} style={{margin:"40px 20px",width:"100%"}} />
                      </div>


                </div>

                {/** back home button */}
                <BackButton redirectUrl="/MainPage" buttonProps={{label:"Home",primary:true}}/>

            </div>
            </MuiThemeProvider>
        )
    }
}


export default CompleteCancelPage;
