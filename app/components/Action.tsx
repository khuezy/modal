'use client'
import { test } from '../actions'

export default function Action() {
  return <div>
    <button onClick={async () => {
      const start = new Date().getTime()
      const r = await test()
      const end = new Date().getTime()
      console.log(end - start, r)
    }}>Fire Server Action</button>

    <button onClick={async () => {
      const eventSource = new EventSource('/api/hello', {
        withCredentials: true
      })
      eventSource.onopen = () => {
        console.log('open')
      }
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.message === 'close') {
          eventSource.close()
        }
      }
      eventSource.onerror = (e) => {
        console.log('ES Error: ', e)
      }
      // const start = new Date().getTime()
      // const r = await fetch('/api/hello')
      // const d = await r.json()
      // const end = new Date().getTime()


      // console.log(end - start, d)
    }}>Fire Regular fetch</button>
  </div>
}