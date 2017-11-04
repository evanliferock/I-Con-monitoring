import React from 'react';
import Header from './Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Layer, Rect, Stage, Group, Image} from 'react-konva';
import Popover from 'material-ui/Popover';
import './main.css';

class Sensor extends React.Component {
  render() {
  // color can be passed in as hex '#ffff00' or as string 'green' or 'rgb(0,255,0)'
  return (<Rect x={this.props.x * this.props.scale} y={this.props.y * this.props.scale} scale={{
    x: this.props.scale,
    y: this.props.scale
  }} width={30} height={30} shadowBlur={5} cornerRadius={5} fill={this.props.color} onClick={this.props.onClick}/>);
}
}

class SensorLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null,
      sensors: {
        doorOne: { color: 'rgb(0,255,0)', },
        doorTwo: { color: 'rgb(0,255,0)', },
        tempOne: { color: 'rgb(0,255,0)', },
        tempTwo: { color: 'rgb(0,255,0)', },
        switchOne: { color: 'rgb(0,255,0)', },
        switchTwo: { color: 'rgb(0,255,0)', },
        switchThree: { color: 'rgb(0,255,0)', },
        switchFour: { color: 'rgb(0,255,0)', },
      },
    }
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = require('./resources/top_down_mine.png');
    image.onload = () => {
      this.setState({image: image});
    }
    // TODO uncomment this line when API and function are implemented
    // this.updateSensors();
  }

  render() {
    // TODO possibly rerender of window resize
    let yScale = (window.innerHeight / 1710) * .9;
    let xScale = (window.innerWidth / 1372) * .9;
    let theScale = 1;
    if (yScale < xScale)
      theScale = yScale;
    else
      theScale = xScale;
    console.log("width: " + window.innerWidth + " height: " + window.innerHeight + " yScale: " + yScale);
    return (
      <div>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Image image={this.state.image} scale={{
              x: theScale,
              y: theScale
            }}/>
          </Layer>
          <Layer>
            {/* Doors */}
            <Sensor x={1316} y={1400} scale={theScale} color={this.state.sensors.doorOne.color} onClick={() => this.handleClick("doorOne")}/>
            <Sensor x={810} y={907} scale={theScale} color={this.state.sensors.doorTwo.color} onClick={() => this.handleClick("doorTwo")}/>
            {/* Temps */}
            <Sensor x={94} y={1216} scale={theScale} color={this.state.sensors.tempOne.color} onClick={() => this.handleClick("tempOne")}/>
            <Sensor x={683} y={1216} scale={theScale} color={this.state.sensors.tempTwo.color} onClick={() => this.handleClick("tempTwo")}/>
            {/* Switches */}
            <Sensor x={730} y={375} scale={theScale} color={this.state.sensors.switchOne.color} onClick={() => this.handleClick("switchOne")}/>
            <Sensor x={730} y={450} scale={theScale} color={this.state.sensors.switchTwo.color} onClick={() => this.handleClick("switchTwo")}/>
            <Sensor x={730} y={525} scale={theScale} color={this.state.sensors.switchThree.color} onClick={() => this.handleClick("switchThree")}/>
            <Sensor x={730} y={600} scale={theScale} color={this.state.sensors.switchFour.color} onClick={() => this.handleClick("switchFour")}/>
          </Layer>
        </Stage>
      </div>
    );
  }

  handleClick(id) {
    // TODO: create detailed sensor data for the sensor id
    this.updateSensors();
  }

  updateSensors() {
    // TODO: http request for sensor data
    this.setState({
      sensors: {
        doorOne: { color: window.Konva.Util.getRandomColor(), },
        doorOne: { color: window.Konva.Util.getRandomColor(), },
        doorTwo: { color: window.Konva.Util.getRandomColor(), },
        tempOne: { color: window.Konva.Util.getRandomColor(), },
        tempTwo: { color: window.Konva.Util.getRandomColor(), },
        switchOne: { color: window.Konva.Util.getRandomColor(), },
        switchTwo: { color: window.Konva.Util.getRandomColor(), },
        switchThree: { color: window.Konva.Util.getRandomColor(), },
        switchFour: { color: window.Konva.Util.getRandomColor(), },
      }
    });
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
