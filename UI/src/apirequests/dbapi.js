import axios from 'axios';
import https from 'https';


var dbapi = axios.create({
  baseURL: 'https://localhost:3001/',
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    keepAlive:true,
  }),
  headers: {'token': localStorage.getItem('token')},
});

// Will log you out if token is expired
dbapi.interceptors.response.use(undefined, function (err) {
  console.log(err);
  if(err.response.status === 401 && err.response.data.message){
    // if(localStorage.getItem('refresh_token')){
    //   dbapi.post('/refresh', {'refresh_token' : localStorage.getItem('refresh_token')})
    //   .then(function(response){
    //     localStorage.setItem('token', response.data.token);
    //     localStorage.setItem('refresh_toksn', response.data.refresh_token);
    //     dbapi.defaults.headers.common['token'] = localStorage.getItem('token');
    //     err.config.__isRetryRequest = true;
    //     dbapi(err.config);
    //   })
    //   .catch(function(error)){

    //   });
    // }
    localStorage.removeItem('token');
    window.location.pathname = '/login';
    return Promise.reject('JWT expired');
  }
  return Promise.reject(err);
});

export default dbapi;
