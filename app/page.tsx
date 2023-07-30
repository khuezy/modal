'use client'

import { test } from './actions'
export default function ServerAction() {
  return <div>
    <button onClick={async () => {
      const start = new Date().getTime()
      const r = await test()
      const end = new Date().getTime()
      console.log(end - start, r)
    }}>Fire Server Action</button>

    <button onClick={async () => {
      const start = new Date().getTime()
      const r = await fetch('/api/hello')
      const d = await r.json()
      const end = new Date().getTime()
      console.log(end - start, d)
    }}>Fire Regular fetch</button>
  </div>
}