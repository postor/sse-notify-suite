/* eslint-env jest */

import { fork } from 'child_process'
import { join } from 'path'
import eventsource from 'eventsource'
import Publisher from '../src/Publisher'
import Subscriber from '../src/Subscriber'


let server, url = 'http://localhost:3000'

beforeAll(() => {
  global.EventSource = eventsource
  return new Promise(resolve => {
    server = fork(join('dist', 'server.js'))
    server.on('message', resolve)
  })
})

afterAll(() => {
  server.kill()
})

test('publish and subscrib', () => new Promise((resolve, reject) => {
  let p = new Publisher(url)
  let s = new Subscriber(url)
  s.on('test', data => {
    expect(data.abc).toBe('def')
    s.unsubscribe()
    resolve()
  })
  p.publish('test', { abc: 'def' })
}))