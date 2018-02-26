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

// Will try to refresh the tokens if access_token is expired
dbapi.interceptors.response.use(undefined, function (err) {
  return new Promise(function(resolve, reject){
    if(err.response.status === 401 && err.response.data.message && !err.config._isRetryRequest){
      if(localStorage.getItem('refresh_token')){
        // here is where it will try to refresh the JWT
        dbapi.post('/login/refresh', {'refresh_token' : localStorage.getItem('refresh_token')})
        .then(function(response){
          // if it sucessfully refreshes JWT it will save the new tokens and try the original failed request again
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refresh_token', response.data.refresh_token);
          dbapi.defaults.headers.token = localStorage.getItem('token');
          err.config._isRetryRequest = true;
          err.config.headers.token = localStorage.getItem('token');
          return dbapi(err.config).then(resolve, reject);
        })
        .catch(function(error){
          // failed to refresh tokens
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          window.location.pathname = '/login';
          return reject(error, 'access token expired and error on token reset');
        });
      }
    }
  });
});

export default dbapi;
