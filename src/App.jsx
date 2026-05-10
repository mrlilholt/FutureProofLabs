import { startTransition, useEffect, useState } from 'react'
import './App.css'

const apps = [
  {
    id: 'sketchshelf',
    name: 'SketchShelf',
    image: '/media/sketchshelf-feature-graphic.png',
    logo: '/media/sketchshelf-logo.png',
    accent: '#82dde4',
    privacyUrl: '/sketchshelf-privacy-policy.html',
    gallery: [
      '/media/sketchshelf-feature-graphic.png',
    ],
  },
  {
    id: 'neon',
    name: 'Neon Horizon Radio',
    image: '/media/neon-feature-graphic.png',
    logo: '/media/neon-logo.png',
    accent: 'var(--neon-accent)',
    closedTestUrl: 'https://play.google.com/apps/testing/com.neonhorizonradio.app',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.neonhorizonradio.app',
    webUrl: 'https://neonhorizonradio.netlify.app/',
  },
  {
    id: 'myco',
    name: 'MycoJournal Pro',
    image: '/media/myco-feature-graphic.png',
    logo: '/media/myco-icon.png',
    accent: 'var(--myco-accent)',
    closedTestUrl: 'https://play.google.com/apps/testing/com.mycojournalpro.app',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.mycojournalpro.app',
  },
  {
    id: 'easel',
    name: 'Easel AR-Art Studio',
    image: '/media/easel-feature-graphic.png',
    logo: '/media/easel-logo.png',
    accent: 'var(--easel-accent)',
    closedTestUrl: 'https://play.google.com/apps/testing/com.easel.app',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.easel.app',
    privacyUrl: '/easel-privacy-policy.html',
    gallery: [
      '/media/easel-feature-graphic.png',
      '/media/easel-splash.png',
    ],
  },
]

const comingSoon = [
  {
    id: 'hanko',
    image: '/media/hanko-top.jpg',
    name: 'Hanko Studio',
    summary: 'A stamp-making studio with a warmer analog personality and a more crafted material language.',
  },
  {
    id: 'yumtrail',
    image: '/media/yumtrail-scene.png',
    name: 'YumTrail',
    summary: 'A playful food-adventure world built around exploration, landmarks, and collectible moments.',
  },
]

const views = [
  { id: 'work', label: 'Work' },
  { id: 'archive', label: 'In the Works' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  const [activeView, setActiveView] = useState('work')
  const [featuredAppId, setFeaturedAppId] = useState(apps[0].id)
  const [selectedAppId, setSelectedAppId] = useState(null)
  const [selectedWorkId, setSelectedWorkId] = useState(null)

  const featuredApp = apps.find((app) => app.id === featuredAppId) ?? apps[0]
  const selectedApp = apps.find((app) => app.id === selectedAppId) ?? null
  const selectedWork = comingSoon.find((project) => project.id === selectedWorkId) ?? null

  useEffect(() => {
    document.title = 'FutureProof Labs'
  }, [])

  const switchView = (viewId) => {
    startTransition(() => {
      setActiveView(viewId)
      setSelectedAppId(null)
      setSelectedWorkId(null)
    })
  }

  const openAppPage = (appId) => {
    setFeaturedAppId(appId)
    setSelectedAppId(appId)
  }

  const openWorkPage = (workId) => {
    setSelectedWorkId(workId)
  }

  return (
    <div className="site-shell" data-view={activeView}>
      <div className="paper-grain" aria-hidden="true" />

      <header className="topbar">
        <a className="brand-name" href="#room">
          <img
            className="brand-logo"
            src="/media/futureproof-logo.png"
            alt="FutureProof Labs"
          />
          <span className="brand-wordmark">FutureProof Labs</span>
        </a>

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
          <a
            className="topnav-link"
            href="https://play.google.com/store/apps/dev?id=5951937079147942477&hl=en-US"
            target="_blank"
            rel="noreferrer"
          >
            Google Play
          </a>
        </nav>
      </header>

      <main className="room-frame" id="room">
        {activeView === 'work' && !selectedApp && (
          <section className="tea-wall" aria-label="Featured apps wall">
            <div className="tokonoma-bay">
              <div className="scroll-hanger" aria-hidden="true" />
              <div className="scroll-panel">
                <img src="/media/side-logo.png" alt="FutureProof Labs side logo" />
              </div>
            </div>

            <div className="display-bay">
              <div className="beam beam-top" aria-hidden="true" />
              <div className="beam beam-mid" aria-hidden="true" />
              <div className="beam beam-side" aria-hidden="true" />

              <div className="shelf-row shelf-row-top">
                {apps.slice(0, 2).map((app) => (
                  <button
                    key={app.id}
                    className="object-card object-card-small"
                    type="button"
                    data-active={featuredApp.id === app.id}
                  onMouseEnter={() => setFeaturedAppId(app.id)}
                    onFocus={() => setFeaturedAppId(app.id)}
                    onClick={() => openAppPage(app.id)}
                    aria-label={`Show ${app.name}`}
                  >
                    <img className="shelf-logo" src={app.logo} alt={app.name} />
                  </button>
                ))}
              </div>

              <div className="shelf-row shelf-row-feature">
                <article
                  className="object-card object-card-feature"
                  style={{ '--feature-accent': featuredApp.accent }}
                >
                  <button
                    type="button"
                    className="feature-image-wrap"
                    onClick={() => openAppPage(featuredApp.id)}
                    aria-label={`Open ${featuredApp.name}`}
                  >
                    <img
                      className="feature-image"
                      src={featuredApp.image}
                      alt={featuredApp.name}
                    />
                  </button>
                  <div className="feature-actions" aria-label={`${featuredApp.name} links`}>
                    <a
                      href={featuredApp.closedTestUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${featuredApp.name} closed test`}
                      title="Closed test"
                    >
                      ◉
                    </a>
                    <a
                      href={featuredApp.storeUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${featuredApp.name} Play Store`}
                      title="Play Store"
                    >
                      ↗
                    </a>
                    {featuredApp.privacyUrl ? (
                      <a
                        href={featuredApp.privacyUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${featuredApp.name} privacy policy`}
                        title="Privacy policy"
                      >
                        □
                      </a>
                    ) : null}
                  </div>
                </article>
              </div>

              <div className="shelf-row shelf-row-bottom">
                {apps.slice(2).map((app) => (
                  <button
                    key={app.id}
                    className="object-card object-card-small object-card-wide"
                    type="button"
                    data-active={featuredApp.id === app.id}
                    onMouseEnter={() => setFeaturedAppId(app.id)}
                    onFocus={() => setFeaturedAppId(app.id)}
                    onClick={() => openAppPage(app.id)}
                    aria-label={`Show ${app.name}`}
                  >
                    <img className="shelf-logo shelf-logo-wide" src={app.logo} alt={app.name} />
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeView === 'work' && selectedApp && (
          <section className="app-detail-wall" aria-label={`${selectedApp.name} page`}>
            <div className="detail-header">
              <button
                type="button"
                className="detail-back"
                onClick={() => setSelectedAppId(null)}
              >
                Back
              </button>
            </div>

            <div className="detail-layout">
              <aside className="detail-tokonoma">
                <img
                  className="detail-logo"
                  src={selectedApp.logo}
                  alt={selectedApp.name}
                />
              </aside>

              <article
                className="detail-stage"
                style={{ '--detail-accent': selectedApp.accent }}
              >
                <div className="detail-image-frame">
                  <img
                    className="detail-image"
                    src={selectedApp.image}
                    alt={selectedApp.name}
                  />
                </div>

                {selectedApp.gallery?.length ? (
                  <div className="detail-gallery" aria-label={`${selectedApp.name} gallery`}>
                    {selectedApp.gallery.map((image, index) => (
                      <div key={image} className="detail-gallery-card">
                        <img
                          src={image}
                          alt={`${selectedApp.name} preview ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="detail-actions">
                  {selectedApp.closedTestUrl ? (
                    <a href={selectedApp.closedTestUrl} target="_blank" rel="noreferrer">
                      Closed Test
                    </a>
                  ) : null}
                  {selectedApp.storeUrl ? (
                    <a href={selectedApp.storeUrl} target="_blank" rel="noreferrer">
                      Play Store
                    </a>
                  ) : null}
                  {selectedApp.webUrl ? (
                    <a href={selectedApp.webUrl} target="_blank" rel="noreferrer">
                      Web App
                    </a>
                  ) : null}
                  {selectedApp.privacyUrl ? (
                    <a href={selectedApp.privacyUrl} target="_blank" rel="noreferrer">
                      Privacy Policy
                    </a>
                  ) : null}
                </div>
              </article>
            </div>
          </section>
        )}

        {activeView === 'archive' && !selectedWork && (
          <section className="gallery-wall" aria-label="Archive wall">
            <div className="gallery-grid">
              {comingSoon.map((project) => (
                <button
                  key={project.id}
                  className="gallery-object"
                  type="button"
                  onClick={() => openWorkPage(project.id)}
                  aria-label={`Open ${project.name}`}
                >
                  <img src={project.image} alt={project.name} />
                </button>
              ))}
            </div>
          </section>
        )}

        {activeView === 'archive' && selectedWork && (
          <section className="app-detail-wall" aria-label={`${selectedWork.name} page`}>
            <div className="detail-header">
              <button
                type="button"
                className="detail-back"
                onClick={() => setSelectedWorkId(null)}
              >
                Back
              </button>
            </div>

            <div className="detail-layout detail-layout-work">
              <aside className="detail-tokonoma detail-tokonoma-work">
                <img
                  className="detail-work-image"
                  src={selectedWork.image}
                  alt={selectedWork.name}
                />
              </aside>

              <article className="detail-stage detail-stage-work">
                <div className="detail-work-copy">
                  <h2>{selectedWork.name}</h2>
                  <p>{selectedWork.summary}</p>
                </div>
              </article>
            </div>
          </section>
        )}

        {activeView === 'contact' && (
          <section className="contact-wall" aria-label="Contact wall">
            <div className="contact-scroll">
              <img
                className="contact-logo"
                src="/media/futureproof-logo.png"
                alt="FutureProof Labs"
              />
              <a className="contact-link" href="mailto:lilholtapps@gmail.com">
                lilholtapps@gmail.com
              </a>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
