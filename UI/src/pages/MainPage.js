import React from 'react';
import Header from '../components/Header'
import SensorLayout from '../components/SensorLayout'

class MainPage extends React.Component {

 constructor() {
    super();
    this.state = {
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
    document.title = "Main Page - ICon Monitoring";        
    return (
      <div>
        <div>
          <Header title='Mixer' />
        </div>
        <div className="col-md-6">
          <SensorLayout />
        </div>
         <div className="col-md-6" style={{ width:"100%",margin:'50px auto',height:"450px",overflowY:"scroll"}}>
        </div>
      </div>
    );
  }
}

export default MainPage;
