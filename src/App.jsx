import { startTransition, useEffect, useRef, useState } from 'react'
import './App.css'

const apps = [
  {
    id: 'neon',
    name: 'Neon Horizon Radio',
    eyebrow: 'Synthwave radio for Android Auto and beyond',
    description:
      'A cinematic streaming radio app with a late-night boulevard mood, built for drivers, desks, and background focus.',
    image: '/media/neon-sunset.png',
    logo: '/media/neon-logo.png',
    accent: 'var(--neon-accent)',
    tags: ['Android', 'Streaming', 'Automotive'],
    closedTestUrl: 'https://play.google.com/apps/testing/com.neonhorizonradio.app',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.neonhorizonradio.app',
  },
  {
    id: 'myco',
    name: 'MycoJournal Pro',
    eyebrow: 'Field notes and grow intelligence',
    description:
      'A polished mushroom cultivation journal for logging species, tracking runs, and building a cleaner growing workflow.',
    image: '/media/myco-lionsmane.png',
    logo: '/media/myco-logo.png',
    accent: 'var(--myco-accent)',
    tags: ['Android', 'Productivity', 'Cultivation'],
    closedTestUrl: 'https://play.google.com/apps/testing/com.mycojournalpro.app',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.mycojournalpro.app',
  },
]

const comingSoon = [
  {
    name: 'ハンコスタジオ',
    romanized: 'Hanko Studio',
    summary: 'A playful stamp-making studio with a crafted analog-meets-mobile feel.',
    details:
      'A future-facing maker app centered on custom stamp composition, tactile visuals, and a more expressive analog interface language.',
    image: '/media/hanko-top.jpg',
    imageAlt: 'Hanko Studio reference artwork',
    accent: 'rgba(255, 111, 97, 0.38)',
    display: 'kanji',
  },
  {
    name: 'YumTrail',
    romanized: 'YumTrail',
    summary:
      'A whimsical food-adventure concept with map energy, collectibles, and character-forward exploration.',
    details:
      'Designed as a more exploratory product world with illustrated environments, collectible interactions, and a softer brand mood than the current app lineup.',
    image: '/media/yumtrail-scene.png',
    imageAlt: 'YumTrail world art',
    logo: '/media/yumtrail-logo.png',
    accent: 'rgba(123, 231, 159, 0.3)',
    display: 'logo',
  },
  {
    name: 'The Mushroom Farming App',
    romanized: 'The Mushroom Farming App',
    summary:
      'A more expansive mushroom operations toolkit aimed at growers who need planning, references, and routines.',
    details:
      'This concept leans more operational than MycoJournal Pro, with room for broader planning flows, reference systems, and cultivation support tooling.',
    image: '/media/mushroom-farming-icon.png',
    imageAlt: 'The Mushroom Farming App icon',
    accent: 'rgba(127, 224, 142, 0.32)',
    display: 'icon',
  },
  {
    name: 'Nocturne Drive',
    romanized: 'Nocturne Drive',
    summary: 'A night-coded mobility concept with atmosphere-first interface direction.',
    details:
      'A cinematic transportation concept focused on mood, route presence, and a richer visual layer built around motion and nighttime contrast.',
    accent: 'rgba(132, 158, 255, 0.3)',
    display: 'type',
  },
]

const principles = [
  'Android-first product thinking',
  'Interfaces with narrative and atmosphere',
  'Small-batch tools shaped by real use cases',
]

const views = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'coming-soon', label: 'Coming Soon' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  const [activeView, setActiveView] = useState('work')
  const [featuredAppId, setFeaturedAppId] = useState(apps[0].id)
  const [activeProjectName, setActiveProjectName] = useState(comingSoon[0].name)
  const [formStatus, setFormStatus] = useState('idle')
  const appCardRefs = useRef({})

  const featuredApp =
    apps.find((app) => app.id === featuredAppId) ?? apps[0]
  const activeProject =
    comingSoon.find((project) => project.name === activeProjectName) ??
    comingSoon[0]

  useEffect(() => {
    document.title = 'FutureProof Labs'
  }, [])

  useEffect(() => {
    if (activeView !== 'work') {
      return undefined
    }

    const intervalId = window.setInterval(() => {
      setFeaturedAppId((currentId) => {
        const currentIndex = apps.findIndex((app) => app.id === currentId)
        const nextIndex = (currentIndex + 1) % apps.length
        return apps[nextIndex].id
      })
    }, 3600)

    return () => window.clearInterval(intervalId)
  }, [activeView])

  const switchView = (viewId) => {
    startTransition(() => {
      setActiveView(viewId)
    })
  }

  const jumpToAppCard = (appId) => {
    switchView('work')

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const targetCard = appCardRefs.current[appId]
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      })
    })
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    setFormStatus('submitting')

    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      event.currentTarget.reset()
      setFormStatus('success')
    } catch (error) {
      setFormStatus('error')
    }
  }

  return (
    <div className="site-shell" data-view={activeView}>
      <div className="site-noise" aria-hidden="true" />

      <header className="topbar">
        <div className="brand-lockup">
          <p className="brand-kicker">Android Apps / Creative Systems</p>
          <div>
            <a className="brand-name" href="#hero">
              <img
                className="brand-logo"
                src="/media/futureproof-logo.png"
                alt="FutureProof Labs"
              />
            </a>
            <p className="brand-jp">FutureProof Labs</p>
          </div>
        </div>

        <nav className="topnav" aria-label="Site Sections">
          {views.map((view) => (
            <button
              key={view.id}
              className="topnav-button"
              type="button"
              data-active={activeView === view.id}
              onClick={() => switchView(view.id)}
            >
              {view.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="page-frame">
        {activeView === 'work' && (
          <section className="hero-panel" id="hero">
            <div className="hero-copy">
              <p className="eyebrow">Creative Android products with atmosphere</p>
              <h1>Building Apps you will like to share with others</h1>
              <p className="hero-text">
                FutureProof Labs builds Android experiences with sharper visual
                identity, product clarity, and a distinct world around each app.
              </p>

              <div className="hero-actions">
                <button
                  className="primary-action"
                  type="button"
                  onClick={() => switchView('work')}
                >
                  Explore Current Apps
                </button>
                <button
                  className="ghost-action"
                  type="button"
                  onClick={() => switchView('coming-soon')}
                >
                  View Coming Soon
                </button>
              </div>

              <ul className="principles" aria-label="Studio Principles">
                {principles.map((principle) => (
                  <li key={principle}>{principle}</li>
                ))}
              </ul>
            </div>

            <aside className="hero-stage">
              <button
                className="stage-screen"
                type="button"
                style={{ '--stage-accent': featuredApp.accent }}
                onClick={() => jumpToAppCard(featuredApp.id)}
                aria-label={`Open download area for ${featuredApp.name}`}
              >
                <div className="stage-hud">
                  <span>Featured Build</span>
                  <span>01</span>
                </div>

                <div className="stage-content" key={featuredApp.id}>
                  <img
                    className="stage-logo"
                    src={featuredApp.logo}
                    alt={`${featuredApp.name} logo`}
                  />

                  <img
                    className="stage-image"
                    src={featuredApp.image}
                    alt={featuredApp.name}
                  />

                  <div className="stage-caption">
                    <p>{featuredApp.name}</p>
                    <span>{featuredApp.eyebrow} / Tap to open downloads</span>
                  </div>
                </div>
              </button>
            </aside>
          </section>
        )}

        <section className="panel-stack" aria-live="polite">
          {activeView === 'work' && (
            <section className="content-panel" data-active="true">
            <div className="panel-header">
              <p className="section-label">Current Work</p>
              <h2>Apps available now</h2>
              <p>
                Two public-facing app pages are live here now, each with direct
                paths to the Play Store listing and the current closed test.
              </p>
            </div>

            <div className="app-grid">
              {apps.map((app, index) => (
                <article
                  key={app.id}
                  className="app-card"
                  ref={(element) => {
                    appCardRefs.current[app.id] = element
                  }}
                  onMouseEnter={() => setFeaturedAppId(app.id)}
                  onFocusCapture={() => setFeaturedAppId(app.id)}
                  style={{ '--card-accent': app.accent, '--card-index': index }}
                >
                  <div className="app-card-media">
                    <div className="app-card-media-inner">
                      <img src={app.logo} alt="" aria-hidden="true" />
                    </div>
                  </div>

                  <div className="app-card-copy">
                    <p className="app-card-eyebrow">{app.eyebrow}</p>
                    <h3>{app.name}</h3>
                    <p>{app.description}</p>
                  </div>

                  <ul className="tag-row" aria-label={`${app.name} categories`}>
                    {app.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>

                  <div className="card-actions">
                    <a
                      href={app.closedTestUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Join Closed Test
                    </a>
                    <a href={app.storeUrl} target="_blank" rel="noreferrer">
                      Open Play Store
                    </a>
                  </div>
                </article>
              ))}
            </div>
            </section>
          )}

          {activeView === 'about' && (
            <section className="content-panel" data-active="true">
            <div className="panel-header">
              <p className="section-label">About</p>
              <h2>Built like a small studio with a point of view</h2>
              <p>
                FutureProof Labs is a product-focused creative agency layer for
                Android apps: equal parts software studio, visual system, and
                brand world.
              </p>
            </div>

            <div className="about-grid">
              <article className="about-card">
                <p className="about-label">What we make</p>
                <p>
                  Utility apps, media apps, niche tools, and experimental mobile
                  products that feel custom from the first frame.
                </p>
              </article>
              <article className="about-card">
                <p className="about-label">How we build</p>
                <p>
                  React-driven web surfaces, Android-first product direction,
                  and marketing pages that stay consistent with the software.
                </p>
              </article>
              <article className="about-card">
                <p className="about-label">What matters</p>
                <p>
                  Strong typography, memorable motion, clearer product stories,
                  and interfaces that do not look like everyone else&apos;s.
                </p>
              </article>
            </div>
            </section>
          )}

          {activeView === 'coming-soon' && (
            <section className="content-panel" data-active="true">
            <div className="panel-header">
              <p className="section-label">Coming Soon</p>
              <h2>Next projects in the lab</h2>
              <p>
                A mix of playful tools, more utility-first Android products, and
                atmospheric concepts already taking shape.
              </p>
            </div>

            <div className="soon-layout">
              <article className="soon-feature">
                <div
                  className="soon-feature-visual"
                  style={{ '--soon-accent': activeProject.accent }}
                >
                  {activeProject.image ? (
                    <img src={activeProject.image} alt={activeProject.imageAlt} />
                  ) : (
                    <div className="soon-feature-fallback" aria-hidden="true">
                      <span>NOCTURNE</span>
                      <span>DRIVE</span>
                    </div>
                  )}
                </div>
                <div>
                  {activeProject.logo ? (
                    <img
                      className="soon-feature-logo"
                      src={activeProject.logo}
                      alt={`${activeProject.romanized} logo`}
                    />
                  ) : (
                    <div
                      className="soon-feature-wordmark"
                      data-display={activeProject.display}
                    >
                      <span>{activeProject.name}</span>
                      <small>{activeProject.romanized}</small>
                    </div>
                  )}
                  <p>
                    {activeProject.summary}
                  </p>
                </div>
              </article>

              <div className="soon-list">
                {comingSoon.map((project) => (
                  <button
                    key={project.name}
                    className="soon-card"
                    type="button"
                    data-active={project.name === activeProject.name}
                    onClick={() => setActiveProjectName(project.name)}
                  >
                    <p className="soon-card-title">{project.name}</p>
                    <p className="soon-card-subtitle">{project.romanized}</p>
                    <p>{project.summary}</p>
                  </button>
                ))}
              </div>

              <article className="soon-detail">
                <p className="section-label">Selected Project</p>
                <h3>{activeProject.name}</h3>
                <p className="soon-detail-subtitle">{activeProject.romanized}</p>
                <p>{activeProject.details}</p>
              </article>
            </div>
            </section>
          )}

          {activeView === 'contact' && (
            <section className="content-panel" data-active="true">
              <div className="panel-header">
                <p className="section-label">Contact</p>
                <h2>Start a conversation</h2>
                <p>
                  Use the form below to reach FutureProof Labs. On Netlify, form
                  notifications can be routed to `lilholtapps@gmail.com`.
                </p>
              </div>

              <div className="contact-layout">
                <article className="contact-card">
                  <p className="about-label">Direct Email</p>
                  <a className="contact-link" href="mailto:lilholtapps@gmail.com">
                    lilholtapps@gmail.com
                  </a>
                  <p>
                    Best for project inquiries, Android app collaborations, and
                    product questions.
                  </p>
                </article>

                <form
                  className="contact-form"
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleContactSubmit}
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="subject" value="FutureProof Labs Contact" />
                  <p className="contact-honeypot">
                    <label>
                      Don&apos;t fill this out:
                      <input name="bot-field" />
                    </label>
                  </p>

                  <label className="field">
                    <span>Name</span>
                    <input type="text" name="name" required />
                  </label>

                  <label className="field">
                    <span>Email</span>
                    <input type="email" name="email" required />
                  </label>

                  <label className="field">
                    <span>What are you building?</span>
                    <input type="text" name="project" />
                  </label>

                  <label className="field field-message">
                    <span>Message</span>
                    <textarea name="message" rows="6" required />
                  </label>

                  <button
                    className="primary-action"
                    type="submit"
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>

                  <p className="form-status" data-status={formStatus}>
                    {formStatus === 'success' &&
                      'Message sent. Once Netlify notifications are enabled, submissions will route to lilholtapps@gmail.com.'}
                    {formStatus === 'error' &&
                      'Something went wrong. You can still reach out directly at lilholtapps@gmail.com.'}
                    {formStatus === 'idle' &&
                      'This form is ready for Netlify Forms and includes spam protection.'}
                  </p>
                </form>
              </div>
            </section>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
