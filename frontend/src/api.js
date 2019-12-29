// import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3000/',
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each reques
    return client({
      method,
      url: resource,
      data,
    }).then(res => {
      return res.data
    })
  },
  async getSells () {
    return this.execute('get', 'sell/list');
  },
  async getPrevDaySell(data) {
    return this.execute('post', 'sell/prev-day-sale', data);
  },
  async createSell (data) {
    return this.execute('post', 'sell/', data);
  }
}