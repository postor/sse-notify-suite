"use strict"

import axios from 'axios'

export default class Publisher {
  constructor(url = '') {
    this.url = url
  }

  publish(event, data) {
    axios.post(this.url, { event, data })
  }
}