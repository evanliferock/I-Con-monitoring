import React from 'react';
import { findDOMNode } from 'react-dom';
import Popover from 'material-ui/Popover';
import iotapi from '../apirequests/iotapi';

// Class definition
class Sensor extends React.Component {
  constructor() {
    super();
    // Sensor state definitions
    this.state = {
      open: false,
      anchorEl: null,
      data: null,
      average: null,
      max: null
    }
  }

  // Close request
  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  // Sensor clicked
  handleClick() {
    this.setState({
      open: true,
      anchorEl: this.state.anchorEl ? this.state.anchorEl : findDOMNode(this.sensor),
      data: this.props.value,
      average: this.props.average,
      max: this.props.max
    });
  }

  // Rendering of sensor layout
  render() {
    let x = this.props.x * this.props.scale;
    let y = this.props.y * this.props.scale;
    let width = 30 * this.props.scale;
    let height = 30 * this.props.scale;
    return (
      <div ref={(k) => { this.sensor = k }}
        onClick={() => this.handleClick()}
        style={{
          position: 'absolute', left: x, top: y,
          background: this.props.color, border: '1px solid #a0a0a0',
          width: width, height: height,
          borderRadius: '3px'
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
          <div style={{ margin: '5px' }}>Data: {this.state.data}</div>
          <div style={{ margin: '5px' }}>Avg: {this.state.average}</div>
          <div style={{ margin: '5px' }}>Max: {this.state.max}</div>
        </Popover>
      </div>
    );
  }
}

// All sensors and default colors and values
class SensorLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      doorOne: { id:'doorOne', color: null, value: null},
      doorTwo: { id:'doorTwo', color: null, value: null},
      tempOne: { id:'tempOne', color: null, value: null},
      tempTwo: { id:'tempTwo', color: null, value: null},
      switchOne: { id:'switchOne', color: null, value: null},
      switchTwo: { id:'switchTwo', color: null, value: null},
      switchThree: { id:'switchThree', color: null, value: null},
      switchFour: { id:'switchFour', color: null, value: null},
    }
  }

  // Updating the sensor data
  componentDidMount() {
    this.updateSensors();
    this.sensorTimer = setInterval(
      () => this.updateSensors(),
      2000
    );
  }

  // Clears the sensor timer
  componentWillUnmount() {
    clearInterval(this.sensorTimer);
  }

  // Updating each sensor with iot data
  updateSensors() {
    var avg1, avg2;
    var max1, max2 = 0;
    iotapi.get('iot/lasthour/temp1')
      .then((response) => {
        var w = 0;
        var total = 0;
        while(response.data[w]) {
          if(response.data[w].temp > max1) {
            max1 = response.data[w].temp;
          }
          total += response.data[w].temp;
          w += 1;
        }
        avg1 = (total / w).toFixed(2);
      })
      .catch((error) => {
        console.log(error);
      })

    iotapi.get('iot/lasthour/temp2')
      .then((response) => {
        var w = 0;
        var total = 0;
        while(response.data[w]) {
          if(response.data[w].temp > max2) {
            max2 = response.data[w].temp;
          }
          total += response.data[w].temp;
          w += 1;
        }
        avg2 = (total / w).toFixed(2);
      })
      .catch((error) => {
        console.log(error);
      })

    iotapi.get('iot/temp/1') 
        .then((response) => {
            this.setState({
              tempOne: { color: response.data[0].color, value: response.data[0].temp, average: avg1, max: max1 }
            });
            console.log(avg1);
        })
        .catch((error) => {
          console.log(error);
        })

    iotapi.get('iot/temp/2') 
        .then((response) => {
            this.setState({
              tempTwo: { color: response.data[0].color, value: response.data[0].temp, average: avg2, max: max2 }
            });
        })
        .catch((error) => {
          console.log(error);
        })
      
    iotapi.get('iot/door') 
        .then((response) => {
            this.setState({
              doorOne: { color: response.data[0].color, value: response.data[0].temp, average: 'N/A', max: 'N/A' },
              doorTwo: { color: response.data[0].color, value: response.data[0].temp, average: 'N/A', max: 'N/A' }
            });
        })
        .catch((error) => {
          console.log(error);
        })
      
    iotapi.get('iot/switch') 
        .then((response) => {
            var openString;
            if(response.data[0].open === 1) {
              openString = 'On';
            } else {
              openString = 'Off'
            }
            this.setState({
              switchOne: { color: response.data[0].color, value: openString, average: 'N/A', max: 'N/A' },
              switchTwo: { color: response.data[0].color, value: openString, average: 'N/A', max: 'N/A' },
              switchThree: { color: response.data[0].color, value: openString, average: 'N/A', max: 'N/A' },
              switchFour: { color: response.data[0].color, value: openString, average: 'N/A', max: 'N/A' }
            });
        })
        .catch((error) => {
          console.log(error);
        })
  }

  // Rendering and placing of sensors
  render() {
    let yScale = (window.innerHeight / 1710) * .9;
    let xScale = (window.innerWidth / 1372) * .9;
    let theScale = 1;
    if (yScale < xScale) {
      theScale = yScale;
    } else {
      theScale = xScale;
    }
    return (
      <div style={{ position: 'relative', width: 1372 * theScale, height: 1710 * theScale }}>
        <div>
          {/** Imports mine image */}
          <img src={require('../resources/top_down_mine.png')} alt={'Top-Down Mine'}
           style={{ width: '100%', height: '100%' }} 
          />
        </div>
        <div>
          <Sensor x={1311} y={1400} scale={theScale} {...this.state.doorOne} />
          <Sensor x={810} y={907} scale={theScale} {...this.state.doorTwo} />
          <Sensor x={91} y={1216} scale={theScale} {...this.state.tempOne} />
          <Sensor x={680} y={1216} scale={theScale} {...this.state.tempTwo} />
          <Sensor x={730} y={375} scale={theScale} {...this.state.switchOne} />
          <Sensor x={730} y={450} scale={theScale} {...this.state.switchTwo} />
          <Sensor x={730} y={525} scale={theScale} {...this.state.switchThree} />
          <Sensor x={730} y={600} scale={theScale} {...this.state.switchFour} />
        </div>
      </div>
    );
  }
}

export default SensorLayout ;
