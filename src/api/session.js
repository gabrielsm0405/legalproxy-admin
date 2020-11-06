import axios from 'axios'

//const CSRF_COOKIE_NAME = 'csrftoken';
//const CSRF_HEADER_NAME = 'X-CSRFToken';

const session = axios.create({
  baseURL: 'http://ec2-3-235-143-10.compute-1.amazonaws.com/'
});

export default session