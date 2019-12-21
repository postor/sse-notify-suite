import { useState, useEffect, useRef } from 'react'
import { Publisher } from 'sse-notify-suite'
import { SSE_SERVER } from './config'

export default () => {
  const [event, setEvent] = useState('testEvent')
  const [data, setData] = useState('testData')
  const publisherRef = useRef()
  useEffect(() => {
    publisherRef.current = new Publisher(SSE_SERVER)
  }, [])

  return (<div>
    <h1>sender</h1>
    <p>
      <label>event</label>
      <input value={event} onChange={e => setEvent(e.target.value)} />
    </p>
    <p>
      <label>data</label>
      <input value={data} onChange={e => setData(e.target.value)} />
    </p>
    <button onClick={() => {
      publisherRef.current.publish(event, data)
      setData('')
    }}>send</button>
  </div>)
}