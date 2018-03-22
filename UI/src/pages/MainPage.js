import React from 'react';
import Header from '../components/Header'
import SensorLayout from '../components/SensorLayout'
import {Modal} from 'react-bootstrap';


class Sensor extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      anchorEl: null,
      data: null
    }
  }
}



class MainPage extends React.Component {

 constructor() {
    super();
    this.state = {
      sensors :[{
        name:'Sensor 1',
        tempInfo:[{temp:"105.3 C",time:"11:00"},{temp:"95.3 C",time:"10:00"},{temp:"75.3 C",time:"7:00"}],
        state:"close",
        lastUpdate :"2 feb 2017 11:00"
      },
        {
        name:'Sensor 2',
        tempInfo:[{temp:"105.3 C",time:"11:00"},{temp:"95.3 C",time:"10:00"},{temp:"75.3 C",time:"7:00"}],
        state:"open",
        lastUpdate :"3 feb 2017"
      },
      {
        name:'Sensor 3',
        tempInfo:[{temp:"95.3 C",time:"12:00"},{temp:"65.3 C",time:"4:00"},{temp:"45.3 C",time:"1:00"}],
        state:"close",
        lastUpdate :"12 feb 2017"
      },{
        name:'Sensor 4',
        tempInfo:[{temp:"107.3 C",time:"15:00"},{temp:"95.3 C",time:"13:00"},{temp:"75.3 C",time:"12:00"}],
        state:"close",
        lastUpdate :"22 feb 2017"
      },{
        name:'Sensor 5',
       tempInfo:[{temp:"35.3 C",time:"11:00"},{temp:"95.3 C",time:"10:00"},{temp:"75.3 C",time:"7:00"}],
        state:"open",
        lastUpdate :"2 April 2017"
      },{
        name:'Sensor 6',
        tempInfo:[{temp:"55.3 C",time:"04:00"},{temp:"65.3 C",time:"02:00"},{temp:"15.3 C",time:"01:00"}],
        state:"open",
        lastUpdate :"2 Jan 2017 04:00"
      }
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
                <span style={{position: "absolute",right: "10px",top: "10px" ,fontSizr:"25px",cursor:"pointer"}} onClick={this.handleHide.bind(this)}>x</span>
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
          <Header title='Mixer' />
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
