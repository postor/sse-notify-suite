import { useState, useEffect } from 'react'
import { Subscriber } from 'sse-notify-suite'


export default () => {
  const [event, setEvent] = useState('testEvent')
  const [enabled, setEnabled] = useState(true)
  const [logs, setLogs] = useState([])

  useEffect(() => {
    this.subscriber = new Subscriber(process.env.SSE_SERVER)
    return () => {
      this.subscriber.unsubscribe()
    }
  }, [])

  return (<div>
    <h1>receiver</h1>
    <p>
      <label>event</label>
      <input
        value={event}
        onChange={e => setEvent(e.target.value)}
        enabled={enabled}
      />
      <button onClick={() => {
        setEnabled(false)
        let callback = (data) => setLogs([data, ...logs])
        this.subscriber.on(event, callback)
        this.callback = callback
      }}>listen</button>
      <button onClick={() => {
        this.subscriber.off(event, this.callback)
      }}>stop</button>
    </p>
    <p>
      <ul>
        <li>logs</li>
      </ul>
    </p>
    <button>send</button>
  </div>)
}