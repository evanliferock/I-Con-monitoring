import React from 'react';
import Header from './Header'
import { findDOMNode } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover from 'material-ui/Popover';
import './main.css';

class Sensor extends React.Component {
  constructor(){
    super();
    this.state = {
       open: false,
       anchorEl: null,
       data: null,
    }
  }

  handleRequestClose(){
    this.setState({
      open:false,
    });
  }

  handleClick() {
    // TODO: create fetch sensor data for the sensor id.
    let newData = this.props.id;

    this.setState({
      open:true,
      anchorEl: this.state.anchorEl ? this.state.anchorEl : findDOMNode(this.sensor),
      data: newData,
    });
  }

  render() {
    let x = this.props.x * this.props.scale;
    let y = this.props.y * this.props.scale;
    let width = 30 * this.props.scale;
    let height = 30 * this.props.scale;
    return (
      <div ref={(k) => {this.sensor = k}}
        onClick={() => this.handleClick()}
        style={{position:'absolute', left:x, top:y,
        background:this.props.color, border:'1px solid #a0a0a0',
        width:width, height:height,
        borderRadius:'3px'
      }}>
      <Popover
        open={this.state.open}
        anchorEl={this.state.anchorEl}
        onRequestClose={() => this.handleRequestClose()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'middle',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        >
          <div style={{margin:'5px'}}>Data: {this.state.data}</div>
        </Popover>
        </div>
    );
  }
}


class SensorLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      doorOne: { id:'doorOne', color: 'rgb(0,255,0)'},
      doorTwo: { id:'doorTwo', color: 'rgb(0,255,0)',},
      tempOne: { id:'tempOne', color: 'rgb(0,255,0)',},
      tempTwo: { id:'tempTwo', color: 'rgb(0,255,0)',},
      switchOne: { id:'switchOne', color: 'rgb(0,255,0)',},
      switchTwo: { id:'switchTwo', color: 'rgb(0,255,0)',},
      switchThree: { id:'switchThree', color: 'rgb(0,255,0)',},
      switchFour: { id:'switchFour', color: 'rgb(0,255,0)',},
    }
  }

  updateSensors() {
    // TODO: http request for sensor data. Create a timer for it
    // this.setState({
    //   doorOne: { id: this.state.doorOne.id, color: , },
    //   doorTwo: { id: this.state.doorTwo.id, color: , },
    //   tempOne: { id: this.state.tempOne.id, color: , },
    //   tempTwo: { id: this.state.tempTwo.id, color: , },
    //   switchOne: { id: this.state.switchOne.id, color: , },
    //   switchTwo: { id: this.state.switchTwo.id, color: , },
    //   switchThree: { id: this.state.switchThree.id, color: , },
    //   switchFour: { id: this.state.switchFour.id, color: , },
    // });
  }

  render() {
    // TODO possibly rerender of window resize
    let yScale = (window.innerHeight / 1710) * .9;
    let xScale = (window.innerWidth / 1372) * .9;
    let theScale = 1;
    if (yScale < xScale){
      theScale = yScale;
    }else{
      theScale = xScale;
    }
    return (
      <div style={{position:'relative', width:1372 * theScale, height:1710 * theScale}}>
        <div>
          <img src={require('./resources/top_down_mine.png')} style={{width:'100%', height:'100%'}}/>
        </div>
        <div>
          <Sensor x={1311} y={1400} scale={theScale} {...this.state.doorOne}/>
          <Sensor x={810} y={907} scale={theScale} {...this.state.doorTwo}/>
          <Sensor x={91} y={1216} scale={theScale} {...this.state.tempOne}/>
          <Sensor x={680} y={1216} scale={theScale} {...this.state.tempTwo}/>
          <Sensor x={730} y={375} scale={theScale} {...this.state.switchOne}/>
          <Sensor x={730} y={450} scale={theScale} {...this.state.switchTwo}/>
          <Sensor x={730} y={525} scale={theScale} {...this.state.switchThree}/>
          <Sensor x={730} y={600} scale={theScale} {...this.state.switchFour}/>
        </div>
      </div>
    );
  }
}


class MainPage extends React.Component {
  //<img src={require("./resources/top_down_mine.png")}/>
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div>
            <Header title='Mixer' />
          </div>
          <div className="sensorlayout">
            <SensorLayout/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default MainPage;
