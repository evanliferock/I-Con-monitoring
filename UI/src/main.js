import React from 'react';
import Header from './Header'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Layer, Rect, Stage, Group, Image} from 'react-konva';
import './main.css';

function Sensor(props) {
  // color can be passed in as hex '#ffff00' or as string 'green' or 'rgb(0,255,0)'
  return (<Rect x={props.x * props.scale} y={props.y * props.scale} scale={{
    x: props.scale,
    y: props.scale
  }} width={30} height={30} shadowBlur={5} cornerRadius={5} fill={props.color} onClick={props.onClick}/>);
}

class SensorLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      image: null,
      sensors: {
        one: {
          color: 'rgb(0,255,0)',
        },
      },
    }
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = require('./resources/top_down_mine.png');
    image.onload = () => {
      this.setState({image: image});
    }
    // TODO uncomment this line
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
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Image image={this.state.image} scale={{
            x: theScale,
            y: theScale
          }}/>
        </Layer>
        <Layer>
          <Sensor x={1316} y={1400} scale={theScale} color={this.state.sensors.one.color} onClick={() => this.handleClick(1)}/>
        </Layer>
      </Stage>
    );
  }

  handleClick(id) {
    // TODO: create detailed sensor data
    this.updateSensors();
  }

  updateSensors() {
    // TODO: http request for sensor data
    this.setState({
      sensors: {one: {color: window.Konva.Util.getRandomColor()} }
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
