#!/usr/bin/env node
"use strict"

import { Router } from 'express'
import SSE from 'express-sse'
import cors from 'cors'
import { json, urlencoded } from 'body-parser'

const app = new Router()
const sse = new SSE()

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
  sse.send(data, event)
  res.json({ error: 0 })
})

app.get('/', sse.init)

export default app