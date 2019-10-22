import React from 'react'
import axios from 'axios'
import {BASEURL} from './url'

axios.defaults.baseURL = BASEURL
console.log(BASEURL);


React.Component.prototype.$axios = axios

export {axios} 