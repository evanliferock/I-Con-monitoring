import React from 'react';
import Header from '../components/Header'
import SensorLayout from '../components/SensorLayout'
import { findDOMNode } from 'react-dom';
import Popover from 'material-ui/Popover';
import iotapi from '../apirequests/iotapi';
import {Modal,Button} from 'react-bootstrap';




class MainPage extends React.Component {
  //<img src={require("./resources/top_down_mine.png")}/>

 constructor() {
    super();
    this.state = {
      sensors :[
      ],
      selectedSensor : {}
    }
  }

  sensorDetailHandler(index){
    var myState = this.state;
    var selectedDetails = myState.sensors[index];
    this.setState({
      selectedSensor: selectedDetails
    })

  }

   handleHide(){
        this.setState({
            selectedSensor : {}
        });
    }

  


  

  render() {

    const SensorDetailModal = () =>{
     var sensorDetail =this.state.selectedSensor;
     return <div className="static-modal">
            <Modal show={sensorDetail.hasOwnProperty("name")} container={this} style={{top:"125px"}}>
                <Modal.Header>
                <Modal.Title>Sensor Detail</Modal.Title>
                <span style={{position: "absolute",right: "10px",top: "10px" ,fontSize:"25px",cursor:"pointer"}} onClick={this.handleHide.bind(this)}>x</span>
                </Modal.Header>

                <Modal.Body style={{height:"150px",overflowY:"scroll"}}>
                   <div>Last updated</div>
                   <div>{sensorDetail.lastUpdate}</div>
                   <br></br>
                   <br></br>
                   <div>Temperature history</div>
                   <div>{sensorDetail.hasOwnProperty("tempInfo") && sensorDetail.tempInfo.map((s,i)=>{
                      return (<div> {s.time} &nbsp; : &nbsp; {s.temp}</div>)
                   })}</div>

                   
                </Modal.Body>
            </Modal>
    </div>
  
  }




    return (
      <div>
        <div>
          <Header title='Home'/>
        </div>
        <div className="col-md-6">
          <SensorLayout />
        </div>
         <div className="col-md-6" style={{width:"100%",margin:'50px auto',height:"450px",overflowY:"scroll"}}>
              <div className="form-horizontal" >
                  {this.state.sensors.map((s,i) => {
                     return <div style={{padding:"20px",cursor:"pointer"}} className="row form-group" >
                              <span className="col-md-3 control-label" style={{fontSize:"15px"}} for={s.name}>{s.name} :</span> 
                              <div className="col-md-8">
                                 <input className="btn-block btn btn-primary" onClick={this.sensorDetailHandler.bind(this,i)}  id={s.name} value={s.tempInfo[0].temp}/>
                              </div>   
                            </div>
                  })}
              </div>
          </div>

          <SensorDetailModal/>
      </div>
    );
  }
}

export default MainPage;
