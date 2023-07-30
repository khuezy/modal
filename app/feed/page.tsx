'use client'

import Link from 'next/link'
export default function Page() {
  const arr = new Array(10).fill(0)
  return <div className='grid'>
    {arr.map((_, i) => {
      return <Link prefetch={true} key={i} href={`/feed/person/${i}`}>Click me to open modal for {i}</Link>
    })}
  </div>
}