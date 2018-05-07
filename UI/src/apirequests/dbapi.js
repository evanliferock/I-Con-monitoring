/**
 * dbapi is used to access the database api
 * baseURL is the URL of the api
 * The token is what is used to access the dbapi
 * the refresh token is used to get a new token
 */
import axios from 'axios';
import https from 'https';
import PATHS from '../global/paths';


var dbapi = axios.create({
  baseURL: 'https://localhost:3001/',
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    keepAlive:true,
  }),
  headers: {'token': localStorage.getItem('token')},
});

/**
 * This interceptor will intercept responses that indicate that token has expired in order to attempt
 * to get a new token and retry the original response
 */
dbapi.interceptors.response.use(undefined, function (err) {
  if(err.response.status === 401 && err.response.data.message && !err.config._isRetryRequest){
    return new Promise(function(resolve, reject){
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
          window.location.pathname = PATHS.LOGIN;
          return reject(error, 'access token expired and error on token reset');
        });
      }
    });
  }
  return Promise.reject(err);
});

export default dbapi;
