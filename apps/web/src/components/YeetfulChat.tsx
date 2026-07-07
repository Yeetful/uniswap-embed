import { useEffect } from 'react'
import { mountYeetfulChat } from 'yeetful/embed'

/**
 * Yeetful agentic chat (https://www.yeetful.com/docs/embed) — a floating
 * bubble scoped to the Uniswap MCP. `wallet: 'auto'` bridges this page's
 * EIP-1193 provider into the chat, so balance/order questions use the
 * connected account and any signature pops the user's own wallet here.
 *
 * The bubble mounts once on load and tears itself down on unmount, so it
 * adds no surface area to the host app beyond this component.
 */
export function YeetfulChat(): null {
  useEffect(() => {
    const chat = mountYeetfulChat({
      mode: 'bubble',
      mcps: ['uniswap-free'],
      wallet: 'auto',
      // PUBLIC embed key (publishable by design) — attributes this embed to
      // the owning Yeetful account: the site shows under the dashboard's
      // "Your embeds", turns feed its analytics, and house-model answers
      // bill the owner's plan instead of each visitor's free tier.
      key: process.env.YEETFUL_EMBED_KEY || 'yfe_c24dafeb5923c2020c62b65c',
      // oxlint-disable-next-line eslint-js/no-restricted-syntax -- dev-only origin override, empty in production builds
      origin: process.env.YEETFUL_EMBED_ORIGIN || undefined,
    })
    return () => chat.destroy()
  }, [])
  return null
}
