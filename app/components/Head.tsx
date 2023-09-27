import { headers } from 'next/headers'
export default function Header() {
  return <div>
    Header: {headers().get('khue')}
  </div>
}