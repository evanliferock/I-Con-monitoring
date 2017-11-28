import axios from 'axios';
//import https from 'https'; // To be implemented

var iotapi = axios.create({
  baseURL: 'http://localhost:3002',
  //httpsAgent: new https.Agent({
  //  rejectUnauthorized: false,
  //  keepAlive:true,
  //})
});

export default iotapi;
