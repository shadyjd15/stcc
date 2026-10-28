import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="hero" style={{ minHeight: '60vh' }}>
      <meta name="x-status" content="404" />
      <meta name="robots" content="noindex" />
      <div className="pattern-grid" aria-hidden="true" />
      <div className="container hero__inner" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <div className="hero__copy" style={{ alignItems: 'center', maxWidth: 640 }}>
          <span className="eyebrow eyebrow--plain eyebrow--accent">404</span>
          <h1 className="display">Page not found</h1>
          <p className="lead" style={{ marginInline: 'auto' }}>The page you are looking for has moved or no longer exists. Try the menu above or search the site.</p>
          <div className="cluster" style={{ justifyContent: 'center' }}>
            <Link href="/" className="btn">Back to home</Link>
            <Link href="/search" className="btn btn--outline">Search</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
