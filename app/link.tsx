'use client'

/**
 * The next/link is poorly designed; as it makes a network request on all links simultaneously,
 * which DDOS the server and consumes the user device CPU over 100%.
 * This version defers the requests to be run serially to prevent the spam and prevents CPU overload.
 * 
 * On mobile/tablets, all links are prefetch serially (since there's no hover state) when they come in view.
 * On desktop, links are prefetch on hover.
 */

import { useCallback, useEffect, useRef, MouseEvent, AnchorHTMLAttributes } from 'react'
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { PrefetchKind } from 'next/dist/client/components/router-reducer/router-reducer-types'
import { RefObject, useLayoutEffect, useState } from 'react'


// import NextLink from 'next/link'
// import { useTransition } from 'react'
const queue: string[] = []
const fetched = new Set<string>()

let router: AppRouterInstance

// A global generator to queue up fetch requests
async function* prefetch(): any {
  while (true) {
    while (queue.length) {
      await router.prefetch(queue.shift()!)
    }
    yield
  }
}
const generator = prefetch()

// For phones and tablets, prefetch all links in view
function TouchLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  router = useRouter()
  const href = props.href || ''

  const ref = useRef<HTMLAnchorElement>(null)
  const onScreen = useOnScreen(ref)

  // Queue up prefetch
  useEffect(() => {
    if (!onScreen || fetched.has(href)) return
    queue.push(href)
    generator.next()
    fetched.add(href)
  }, [href, onScreen])

  const onClick = useCallback(async function onClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    router.push(href)
    // await document?.startViewTransition().finished
  }, [href])

  return <a ref={ref} {...props} onClick={onClick} />
}

// For nonphone/tablet devices, only prefetch on link hover
function DesktopLink({ scrolling, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { scrolling?: boolean }) {
  router = useRouter()
  // const [, startTransition] = useTransition()
  const href = props.href || ''
  const onClick = useCallback(async function onClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()

    // startTransition(async () => {
    router.push(href, {})
    // await document?.startViewTransition(() => {
    //   router.push(href, {})
    //   return new Promise(res => setTimeout(res, 1))
    // }).finished
    // document.documentElement.classList.remove('back-transition')
    // })

  }, [href])

  const onHover = useCallback(function onClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    router.prefetch(href, { kind: PrefetchKind.FULL })
  }, [href])
  return <a {...props} onClick={onClick} onMouseEnter={scrolling ? undefined : onHover} />
}

export default function Link(props: AnchorHTMLAttributes<HTMLAnchorElement> & { scrolling?: boolean }) {
  return hasTouch() ? <TouchLink {...props} /> : <DesktopLink {...props} />
}

// export default function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
//   const [, startTransition] = useTransition()
//   return <NextLink {...props} onClick={async () => {
//     startTransition(async () => {
//       await document.startViewTransition(() => {
//         return new Promise(res => setTimeout(res, 1))
//       }).finished
//       document.documentElement.classList.remove('back-transition')
//     })

//   }} />
// }



/**
 * On the server, React emits a warning when calling `useLayoutEffect`.
 * This is because neither `useLayoutEffect` nor `useEffect` run on the server.
 * We use this safe version which suppresses the warning by replacing it with a noop on the server.
 *
 * See: https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */
// @ts-ignore
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function useOnScreen(ref?: RefObject<HTMLElement>, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false)
  const r = ref?.current
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      }, { rootMargin }
    )
    r && observer.observe(r)

    return () => {
      r && observer.unobserve(r)
    }
  }, [r, rootMargin])
  return isIntersecting
}

export function hasTouch() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined')
    return false
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore for MS
    navigator.msMaxTouchPoints > 0
  )
}