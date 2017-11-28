import axios from 'axios';
import https from 'https';

var dbapi = axios.create({
  baseURL: 'https://localhost:3001/',
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    keepAlive:true,
  })
});

export default dbapi;
