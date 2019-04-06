#!/usr/bin/env node
"use strict"

import express from 'express'
import router from './router'

const app = express()

app.use('/', router)

let port = process.env.PORT || 3000
app.listen(port, (error) => {
  if (error) {
    throw error
  }
  console.log(`ready on port ${port}`)
  process.send && process.send(`ready on port ${port}`)
})
