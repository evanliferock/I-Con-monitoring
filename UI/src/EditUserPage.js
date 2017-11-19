import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
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


//it contains the users list and delete/edit functionalities
class EditUserPage extends Component {
    constructor(props){
        super(props);

        this.state = {
           users : [{name:'jack',employeeId:1},
                    {name:'mack',employeeId:2},
                    {name:'fam',employeeId:3},
                    {name:'slim',employeeId:4},
                    {name:'prac',employeeId:5},
                    {name:'lll',employeeId:6}
           ]
        }


    }

    handleChangeAction(value,index){
        this.setState((prevState) => { prevState.data[index].action = value; return prevState; } )
    };






    render(){
        return (
          <MuiThemeProvider>
            <div>
                {/** Nav bar */}
                 <Header
                    appBarProp= {{title:"Edit Users"}}
                />

                {/** Body */}
                <div className="container" style={{marginTop:"50px"}}>
                   <h2 className="pull-left">Users</h2>

                   {/** Buttons */}
                   <div className="pull-right">
                        <RaisedButton label="Edit User" primary={true} style={{marginRight:'30px'}}/>
                        <RaisedButton label="Delete User" secondary={true} />
                   </div>

                   {/** User List */}
                   <div className="col-md-12">
                         <Table multiSelectable={true}>
                        <TableHeader >
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Employee Id</TableHeaderColumn>
                            <TableHeaderColumn>*</TableHeaderColumn>
                        </TableRow>
                        </TableHeader>
                        <TableBody style={{border:'1px solid rgb(224, 224, 224)'}} >
                            {this.state.users.map(function(user,i){
                                return (
                                    <TableRow key={i}>
                                        <TableRowColumn style={{borderRight:'1px solid rgb(224, 224, 224)'}}>{user.name}</TableRowColumn>
                                        <TableRowColumn style={{borderRight:'1px solid rgb(224, 224, 224)'}}>{user.employeeId}</TableRowColumn>
                                        <TableRowColumn>*</TableRowColumn>

                                    </TableRow>
                                );
                            })}



                        </TableBody>
                    </Table>
                   </div>

                  {/** Home */}
                    <BackButton redirectUrl="/AdminUser" buttonProps={{label:"Back",secondary:true}}/>

                </div>
            </div>
            </MuiThemeProvider>
        )
    }
}


export default EditUserPage;
