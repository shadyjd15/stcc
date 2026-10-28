export const getServerSideURL = () =>
  (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')

export const getClientSideURL = () => {
  if (typeof window !== 'undefined') return window.location.origin
  return getServerSideURL()
}
