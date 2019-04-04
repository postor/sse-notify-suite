import { useState,useEffect } from 'react'
import { Publisher } from 'sse-notify-suite'

export default () => {
  const [event, setEvent] = useState('testEvent')
  const [data, setData] = useState('testData')
  
  useEffect(() => {
    this.publisher = new Publisher(process.env.SSE_SERVER)
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
      this.publisher.publish(event, data)
      setEvent('')
      setData('')
    }}>send</button>
  </div>)
}