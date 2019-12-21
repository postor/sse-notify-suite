import { useState, useEffect, useRef, useReducer } from 'react'
import { Subscriber } from 'sse-notify-suite'
import { SSE_SERVER } from './config'


export default () => {
  const [event, setEvent] = useState('testEvent')
  const [enabled, setEnabled] = useState(true)
  const [logs, addLog] = useReducer((state, action) => {
    let n = [action, ...state]
    if (n.length > 20) n.length = 20
    return n
  }, [])
  const subscriberRef = useRef()
  const callbackRef = useRef()

  useEffect(() => {
    subscriberRef.current = new Subscriber(SSE_SERVER)
    return () => {
      subscriberRef.current.unsubscribe()
    }
  }, [])


  return (<div>
    <h1>receiver</h1>
    <p>
      <label>event</label>
      {enabled ? [(<input
        key={0}
        value={event}
        onChange={e => setEvent(e.target.value)}
      />), (<button
        key={1}
        onClick={() => {
          setEnabled(false)
          let callback = (data) => addLog(data)
          subscriberRef.current.on(event, callback)
          callbackRef.current = callback
        }}>listen</button>)
      ] : [
          (<span
            key={0}
            style={{ border: '1px solid #000' }}>{event}</span>),
          <button
            key={1}
            onClick={() => {
              subscriberRef.current.off(event, callbackRef.current)
              setEnabled(true)
            }}>stop</button>
        ]}

    </p>
    <ul>{logs.map((x, i) => <li key={i}>{x}</li>)}</ul>
  </div>)
}