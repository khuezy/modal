'use client'

import { PropsWithChildren } from "react"

export default function Client(props: PropsWithChildren) {
  return <div>
    <h1>hello client</h1>
    {props.children}
  </div>
}