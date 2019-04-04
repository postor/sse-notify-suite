#!/usr/bin/env node
"use strict"

import express from 'express'
import SSE from 'express-sse'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'

const app = express()
const sse = new SSE();

app.use(cors())

app.post('/', [
  json(),
  urlencoded({ extended: true }),
], (req, res) => {
  if (!req.body) {
    res.json({ error: 'empty body!' })
    return
  }
  const { event, data } = req.body
  console.log(JSON.stringify(req.body))
  sse.send(data, event)
  res.json({ error: 0 })
})

app.get('/', sse.init)

let port = process.env.PORT || 3000
app.listen(port, (error) => {
  if (error) {
    throw error
  }
  console.log(`ready on port ${port}`)
  process.send && process.send(`ready on port ${port}`)
})
