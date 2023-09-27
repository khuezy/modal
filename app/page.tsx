
import Image from 'next/image'
import Link from './link'

import Header from './components/Head'
import Action from './components/Action'
import Client from './client'

export default function ServerAction() {
  const l = "1";


  return <div>
    <Action />
    <br />
    <Link href='/test'>Login</Link>
    <br />
    <Link href='/feed'>Go to /feed</Link>
    <br />
    <Link href='/about'>Go to /about</Link>
    <br />
    <Link href='/help'>Go to /help</Link>
    <br />
    <Link href='/redirect'>Redirect to about</Link>
    <br />
    <Link href='/rewrite'>Rewrite to help</Link>
    {/* <br />
    <Link href='/config_rewrite'>Rewrite to help via next.config</Link> */}
    <br />
    <Link href='/match'>Normal routing to /match</Link>
    <br />
    <Link href='/modal'>Modal</Link>
    <br />
    <Link href='/oldpage'>Old Page</Link>
    <br />
    <Link href='/i18n'>i18n</Link>
    <br />
    <Link href='/intl'>next-intl</Link>
    <br />
    <Link href='/stream'>stream</Link>
    <br />
    <Link href='/isr'>isr</Link>

    <Client>Client component</Client>
    <Header />
  </div>
}