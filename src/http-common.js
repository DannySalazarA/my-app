import axios from 'axios';

export default axios.create({
  baseURL: 'https://truehomewebapi.azurewebsites.net/',
  headers: {
    "Content-type": "application/json"
  }
});