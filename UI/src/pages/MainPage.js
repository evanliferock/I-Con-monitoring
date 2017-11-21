import React from 'react';
import Header from '../components/Header'
import { findDOMNode } from 'react-dom';
import Popover from 'material-ui/Popover';


class Sensor extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      anchorEl: null,
      data: null,
    }
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleClick() {
    // TODO: create fetch sensor data for the sensor id.
    let newData = this.props.id;

    this.setState({
      open: true,
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
        </Popover>
      </div>
    );
  }
}


class SensorLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      doorOne: { id: 'doorOne', color: null, },
      doorTwo: { id: 'doorTwo', color: null, },
      tempOne: { id: 'tempOne', color: null, },
      tempTwo: { id: 'tempTwo', color: null, },
      switchOne: { id: 'switchOne', color: null, },
      switchTwo: { id: 'switchTwo', color: null, },
      switchThree: { id: 'switchThree', color: null, },
      switchFour: { id: 'switchFour', color: null, },
    }
  }

  componentDidMount() {
    this.updateSensors();
    this.sensorTimer = setInterval(
      () => this.updateSensors(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.sensorTimer);
  }

  updateSensors() {
    // TODO: http request for sensor data.
    this.setState({
      doorOne: { id: this.state.doorOne.id, color: this.getRandomColor(), },
      doorTwo: { id: this.state.doorTwo.id, color: this.getRandomColor(), },
      tempOne: { id: this.state.tempOne.id, color: this.getRandomColor(), },
      tempTwo: { id: this.state.tempTwo.id, color: this.getRandomColor(), },
      switchOne: { id: this.state.switchOne.id, color: this.getRandomColor(), },
      switchTwo: { id: this.state.switchTwo.id, color: this.getRandomColor(), },
      switchThree: { id: this.state.switchThree.id, color: this.getRandomColor(), },
      switchFour: { id: this.state.switchFour.id, color: this.getRandomColor(), },
    });
  }

  // TODO remove when not used. from: https://stackoverflow.com/questions/1484506/random-color-generator
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    // TODO possibly rerender of window resize
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
          <img src={require('../resources/top_down_mine.png')} alt={'Top-Down Mine'}
            style={{ width: '100%', height: '100%' }} />
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


class MainPage extends React.Component {
  //<img src={require("./resources/top_down_mine.png")}/>
  render() {
    return (
      <div>
        <div>
          <Header title='Mixer' />
        </div>
        <div>
          <SensorLayout />
        </div>
      </div>
    );
  }
}

export default MainPage;
