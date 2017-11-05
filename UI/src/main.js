import React from 'react';
import Header from './Header'
import { findDOMNode } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Popover from 'material-ui/Popover';
import './main.css';

class Sensor extends React.Component {
  render() {
    // color can be passed in as hex '#ffff00' or as string 'green' or 'rgb(0,255,0)'
    // x={this.props.x * this.props.scale} y={this.props.y * this.props.scale} scale={{
    //     x: this.props.scale,
    //     y: this.props.scale
    // }} width={30} height={30} shadowBlur={5} cornerRadius={5} fill={this.props.color}
    let x = this.props.x * this.props.scale;
    let y = this.props.y * this.props.scale;
    let width = 30 * this.props.scale;
    let height = 30 * this.props.scale;
    return (
      <div onClick={this.props.onClick}
        style={{position:'absolute', left:x, top:y,
        background:this.props.color, border:'1px solid #a0a0a0',
        width:width, height:height,
        borderRadius:'3px'
      }}/>
    );
  }
}


function ThePopup(props) {
  return(
    <Popover
      open={props.open}
      anchorEl={props.anchorEl}
      onRequestClose={props.onRequestClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'middle',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      >
        <div style={{margin:'5px'}}>Data: {props.data}</div>
      </Popover>
  );
}


class SensorLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      doorOne: { color: 'rgb(0,255,0)', open: false, anchorEl: null, data: 'Door One'},
      doorTwo: { color: 'rgb(0,255,0)', open: false, anchorEl: null, data: 'Door Two'},
      tempOne: { color: 'rgb(0,255,0)', open: false, anchorEl: null, data: 'Temp One'},
      tempTwo: { color: 'rgb(0,255,0)', open: false, anchorEl: null, data: 'Temp Two'},
      switchOne: { color: 'rgb(0,255,0)', open: false, anchorEl: null, data: 'Switch One'},
      switchTwo: { color: 'rgb(0,255,0)', open: false, anchorEl: null, data: 'Switch Two'},
      switchThree: { color: 'rgb(0,255,0)', open: false, anchorEl: null, data: 'Switch Three'},
      switchFour: { color: 'rgb(0,255,0)', open: false, anchorEl: null, data: 'Switch Four'},
    }
  }

  handleRequestClose(id){
    if (id === 'doorOne'){
      this.setState({
        doorOne: { color: this.state.doorOne.color, open: false, anchorEl:this.state.doorOne.anchorEl, data:this.state.doorOne.data}
      });
    }else if (id === 'doorTwo'){
      this.setState({
        doorTwo: { color: this.state.doorTwo.color, open: false, anchorEl:this.state.doorTwo.anchorEl, data:this.state.doorTwo.data}
      });
    }else if (id === 'tempOne') {
      this.setState({
        tempOne: { color: this.state.tempOne.color, open: false, anchorEl:this.state.tempOne.anchorEl, data:this.state.tempOne.data}
      });
    }else if (id === 'tempTwo'){
      this.setState({
        tempTwo: { color: this.state.tempTwo.color, open: false, anchorEl:this.state.tempTwo.anchorEl, data:this.state.tempTwo.data}
      });
    }else if (id === 'switchOne'){
      this.setState({
        switchOne: { color: this.state.switchOne.color, open: false, anchorEl:this.state.switchOne.anchorEl, data:this.state.switchOne.data}
      });
    }else if (id === 'switchTwo'){
      this.setState({
        switchTwo: { color: this.state.switchTwo.color, open: false, anchorEl:this.state.switchTwo.anchorEl, data:this.state.switchTwo.data}
      });
    }else if (id === 'switchThree'){
      this.setState({
        switchThree: { color: this.state.switchThree.color, open: false, anchorEl:this.state.switchThree.anchorEl, data:this.state.switchThree.data}
      });
    }else if (id === 'switchFour'){
      this.setState({
        switchFour: { color: this.state.switchFour.color, open: false, anchorEl:this.state.switchFour.anchorEl, data:this.state.switchFour.data}
      });
    }
  };

  handleClick(id) {
    // TODO: create fetch sensor data for the sensor id
    if (id === 'doorOne'){
      this.setState({
        doorOne: { color: this.state.doorOne.color, open: true,
          anchorEl: this.state.doorOne.anchorEl ? this.state.doorOne.anchorEl : findDOMNode(this.doorOne),
          data:this.state.doorOne.data}
      });
    }else if (id === 'doorTwo'){
      this.setState({
        doorTwo: { color: this.state.doorTwo.color, open: true,
          anchorEl: this.state.doorTwo.anchorEl ? this.state.doorTwo.anchorEl : findDOMNode(this.doorTwo),
          data:this.state.doorTwo.data}
      });
    }else if (id === 'tempOne') {
      this.setState({
        tempOne: { color: this.state.tempOne.color, open: true,
          anchorEl: this.state.tempOne.anchorEl ? this.state.tempOne.anchorEl : findDOMNode(this.tempOne),
          data:this.state.tempOne.data}
      });
    }else if (id === 'tempTwo'){
      this.setState({
        tempTwo: { color: this.state.tempTwo.color, open: true,
          anchorEl: this.state.tempTwo.anchorEl ? this.state.tempTwo.anchorEl : findDOMNode(this.tempTwo),
          data:this.state.tempTwo.data}
      });
    }else if (id === 'switchOne'){
      this.setState({
        switchOne: { color: this.state.switchOne.color, open: true,
          anchorEl: this.state.switchOne.anchorEl ? this.state.switchOne.anchorEl : findDOMNode(this.switchOne),
          data:this.state.switchOne.data}
      });
    }else if (id === 'switchTwo'){
      this.setState({
        switchTwo: { color: this.state.switchTwo.color, open: true,
          anchorEl: this.state.switchTwo.anchorEl ? this.state.switchTwo.anchorEl : findDOMNode(this.switchTwo),
          data:this.state.switchTwo.data}
      });
    }else if (id === 'switchThree'){
      this.setState({
        switchThree: { color: this.state.switchThree.color, open: true,
          anchorEl: this.state.switchThree.anchorEl ? this.state.switchThree.anchorEl : findDOMNode(this.switchThree),
          data:this.state.switchThree.data}
      });
    }else if (id === 'switchFour'){
      this.setState({
        switchFour: { color: this.state.switchFour.color, open: true,
          anchorEl: this.state.switchFour.anchorEl ? this.state.switchFour.anchorEl : findDOMNode(this.switchFour),
          data:this.state.switchFour.data}
      });
    }
    // this.updateSensors();
  }

  updateSensors() {
    // TODO: http request for sensor data
    // this.setState({
    //   doorOne: { color: , },
    //   doorTwo: { color: , },
    //   tempOne: { color: , },
    //   tempTwo: { color: , },
    //   switchOne: { color: , },
    //   switchTwo: { color: , },
    //   switchThree: { color: , },
    //   switchFour: { color: , },
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
          <Sensor ref={(sensor) =>{this.doorOne = sensor}} x={1311} y={1400} scale={theScale} color={this.state.doorOne.color} onClick={() => this.handleClick("doorOne")}/>
          <Sensor ref={(sensor) =>{this.doorTwo = sensor}} x={810} y={907} scale={theScale} color={this.state.doorTwo.color} onClick={() => this.handleClick("doorTwo")}/>
          <Sensor ref={(sensor) =>{this.tempOne = sensor}} x={91} y={1216} scale={theScale} color={this.state.tempOne.color} onClick={() => this.handleClick("tempOne")}/>
          <Sensor ref={(sensor) =>{this.tempTwo = sensor}} x={680} y={1216} scale={theScale} color={this.state.tempTwo.color} onClick={() => this.handleClick("tempTwo")}/>
          <Sensor ref={(sensor) =>{this.switchOne = sensor}} x={730} y={375} scale={theScale} color={this.state.switchOne.color} onClick={() => this.handleClick("switchOne")}/>
          <Sensor ref={(sensor) =>{this.switchTwo = sensor}} x={730} y={450} scale={theScale} color={this.state.switchTwo.color} onClick={() => this.handleClick("switchTwo")}/>
          <Sensor ref={(sensor) =>{this.switchThree = sensor}} x={730} y={525} scale={theScale} color={this.state.switchThree.color} onClick={() => this.handleClick("switchThree")}/>
          <Sensor ref={(sensor) =>{this.switchFour = sensor}} x={730} y={600} scale={theScale} color={this.state.switchFour.color} onClick={() => this.handleClick("switchFour")}/>
        </div>
        <div>
          <ThePopup {...this.state.doorOne} onRequestClose={() => this.handleRequestClose("doorOne")}/>
          <ThePopup {...this.state.doorTwo} onRequestClose={() => this.handleRequestClose("doorTwo")}/>
          <ThePopup {...this.state.tempOne} onRequestClose={() => this.handleRequestClose("tempOne")}/>
          <ThePopup {...this.state.tempTwo} onRequestClose={() => this.handleRequestClose("tempTwo")}/>
          <ThePopup {...this.state.switchOne} onRequestClose={() => this.handleRequestClose("switchOne")}/>
          <ThePopup {...this.state.switchTwo} onRequestClose={() => this.handleRequestClose("switchTwo")}/>
          <ThePopup {...this.state.switchThree} onRequestClose={() => this.handleRequestClose("switchThree")}/>
          <ThePopup {...this.state.switchFour} onRequestClose={() => this.handleRequestClose("switchFour")}/>
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
