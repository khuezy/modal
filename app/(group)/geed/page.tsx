'use client'

import Link from '../../link'
export default function Page() {
  const arr = new Array(10).fill(0)
  return <div className='grid'>
    {arr.map((_, i) => {
      return <Link key={i} href={`/geed/person/${i}`}>Click me to open modal for {i}</Link>
    })}
  </div>
}