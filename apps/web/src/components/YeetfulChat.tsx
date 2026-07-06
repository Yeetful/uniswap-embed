import { useEffect } from 'react'
import { mountYeetfulChat } from 'yeetful/embed'

/**
 * Yeetful agentic chat (https://www.yeetful.com/docs/embed) — a floating
 * bubble scoped to the Uniswap MCP. `wallet: 'auto'` bridges this page's
 * EIP-1193 provider into the chat, so balance/order questions use the
 * connected account and any signature pops the user's own wallet here.
 */
export function YeetfulChat(): null {
  useEffect(() => {
    const chat = mountYeetfulChat({
      mode: 'bubble',
      mcps: ['uniswap-free'],
      wallet: 'auto',
      // oxlint-disable-next-line eslint-js/no-restricted-syntax -- dev-only origin override, empty in production builds
      origin: process.env.YEETFUL_EMBED_ORIGIN || undefined,
    })
    return () => chat.destroy()
  }, [])
  return null
}
