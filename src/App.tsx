import { useEffect, useState } from 'react'
import { FiFolder, FiLayers, FiMail, FiMenu, FiUser, FiX } from 'react-icons/fi'
import ramelPortrait from './assets/ramel-1.jpg'
import './App.css'

const sectionIds = ['hero', 'about', 'work', 'contacts'] as const

const projects = [
  {
    planet: 'neptune',
    link: 'http://lauraricci.dyndns.org:5100/Login',
    title: 'Laura-Ricci Biometrics',
    description:
      'A biometric system with a mobile app for capturing user photos, time logs, and location, supported by a web app for employee registration and log management, powered by a centralized API backend.',
    tags: ['React Native', 'Next.js', 'Nest.js', 'Pm2', 'Axios', 'Zustand', 'Tailwind'],
  },
  {
    planet: 'mercury',
    link: 'private',
    title: 'Datacenter Vendor Module',
    description:
      'Co-developer of a system that updates product prices across different branches. I built the vendor section, unit of measurement management, and discounts management features.',
    tags: ['Next.js', 'Smurf.js', 'Axios', 'Redux'],
  },
  {
    planet: 'mars',
    link: 'private',
    title: 'Smart-Eload',
    description:
      'An API backend system that integrates with the Smart gateway via SOAP, enabling POS systems to perform direct mobile load transactions.',
    tags: ['Nest.js', 'Pm2'],
  },
  {
    planet: 'saturn',
    link: 'private',
    title: 'Import-RR',
    description:
      'A cron-based automation system that processes receipts and records transactions between stores and suppliers, scheduled to run daily at 4 AM.',
    tags: ['Nest.js', 'Pm2'],
  },
  {
    planet: 'neptune',
    link: 'private',
    title: 'Scriptrunner',
    description:
      'A CLI-based backend system that automates deployments and scheduled tasks, including GCash/Maya reconciliation, weighing scale updates, and multi-branch customer data distribution.',
    tags: ['Nest.js', 'Pm2'],
  },
]

const stacks = [
  'React',
  'React Native',
  'Nest.js',
  'Next.js',
  'PHP',
  'MSSQL',
  'MySQL',
  'Tailwind',
  'Bootstrap',
  'Node.js',
  'Axios',
  'Redux',
  'Zustand',
  'PM2',
  'Git',
  'Linux',
  'Adobe Illustrator'
]

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [showUfoHelper, setShowUfoHelper] = useState(false)
  const [isUfoReturning, setIsUfoReturning] = useState(false)
  const [activeSection, setActiveSection] =
    useState<(typeof sectionIds)[number]>('hero')

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false)
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries.length > 0) {
          setActiveSection(
            visibleEntries[0].target.id as (typeof sectionIds)[number],
          )
        }
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0.2, 0.4, 0.6],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowUfoHelper(window.scrollY > 420)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setIsMobileNavOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>('.scroll-reveal'),
    )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal--visible')
          } else if (
            !(entry.target as HTMLElement).classList.contains(
              'scroll-reveal--persist',
            )
          ) {
            entry.target.classList.remove('scroll-reveal--visible')
          }
        })
      },
      {
        threshold: 0.18,
        rootMargin: '-6% 0px -10% 0px',
      },
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  const handleReturnToHero = () => {
    setIsUfoReturning(true)
    setActiveSection('hero')
    document.getElementById('hero')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    window.setTimeout(() => {
      setIsUfoReturning(false)
    }, 800)
  }

  const handleNavSelect = (section: (typeof sectionIds)[number]) => {
    setActiveSection(section)
    setIsMobileNavOpen(false)
  }

  return (
    <>
      <div
        className={`loading-screen ${!isLoading ? 'loading-screen--hidden' : ''}`}
      >
        <div className="loading-alien" aria-hidden="true">
          <span className="loading-alien-head" />
          <span className="loading-alien-eye loading-alien-eye-left" />
          <span className="loading-alien-eye loading-alien-eye-right" />
          <span className="loading-signal" />
        </div>
        <p className="loading-text">Establishing contact...</p>
      </div>

      <button
        className={`ufo-helper ${showUfoHelper ? 'ufo-helper--visible' : ''} ${isUfoReturning ? 'ufo-helper--launch' : ''}`}
        type="button"
        aria-label="Launch back to hero section"
        onClick={handleReturnToHero}
      >
        <span className="ufo-helper-craft" aria-hidden="true">
          <span className="rocket-helper-body" />
          <span className="rocket-helper-nose" />
          <span className="rocket-helper-window" />
          <span className="rocket-helper-fin rocket-helper-fin-left" />
          <span className="rocket-helper-fin rocket-helper-fin-right" />
          <span className="rocket-helper-flame" />
          <span className="rocket-helper-trail" />
        </span>
        <span className="ufo-helper-message">Fly-up ↑</span>
      </button>

      <main className={`app-shell ${!isLoading ? 'app-shell--ready' : ''}`}>
        <div className="space-grid" aria-hidden="true" />
        <div className="stars stars-one" aria-hidden="true" />
        <div className="stars stars-two" aria-hidden="true" />

        <header className="topbar">
          <a
            className={`brand ${activeSection === 'hero' ? 'brand--active' : ''}`}
            href="#hero"
            onClick={() => handleNavSelect('hero')}
          >
            <span className="brand-mark" aria-hidden="true">
              <span
                className={`brand-alien ${!isLoading ? 'brand-alien--awake' : ''}`}
              >
                <span className="alien-head" />
                <span className="alien-eye alien-eye-left" />
                <span className="alien-eye alien-eye-right" />
              </span>
            </span>
            <span>RAM</span>
          </a>

          <button
            className={`mobile-nav-toggle ${isMobileNavOpen ? 'mobile-nav-toggle--active' : ''}`}
            type="button"
            aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileNavOpen}
            onClick={() => setIsMobileNavOpen((open) => !open)}
          >
            {isMobileNavOpen ? <FiX /> : <FiMenu />}
          </button>

          <nav className={`nav ${isMobileNavOpen ? 'nav--open' : ''}`}>
            <a
              className={activeSection === 'about' ? 'nav-link--active' : ''}
              href="#about"
              onClick={() => handleNavSelect('about')}
            >
              <span className="nav-icon" aria-hidden="true">
                <FiUser />
              </span>
              <span>About</span>
            </a>
            <a
              className={activeSection === 'work' ? 'nav-link--active' : ''}
              href="#work"
              onClick={() => handleNavSelect('work')}
            >
              <span className="nav-icon" aria-hidden="true">
                <FiFolder />
              </span>
              <span>Projects</span>
            </a>
            <a
              className={activeSection === 'contacts' ? 'nav-link--active' : ''}
              href="#contacts"
              onClick={() => handleNavSelect('contacts')}
            >
              <span className="nav-icon" aria-hidden="true">
                <FiMail />
              </span>
              <span>Contacts</span>
            </a>
          </nav>
        </header>

        <section id="hero" className="hero-section panel">
          <div className="hero-copy">
            <h1>
              Hi, I&apos;m
              <span> Ramel Millanes.</span>
            </h1>
            <p className="eyebrow hero-typing">
              <span className="hero-typing-text">Full-Stack Developer</span>
            </p>
            <p className="hero-text">
              I build full-stack web applications using Next.js, React Native, Nest.js, PHP,
              Node.js, and SQL databases, with modern UI styling through
              Tailwind and Bootstrap.
            </p>
            <div className="hero-actions">
              <a className="primary-btn" href="#work">
                View Missions
              </a>
              <a className="ghost-btn" href="#contacts">
                Contact Base
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="beam" />
            <div className="ufo">
              <div className="ufo-dome" />
              <div className="ufo-ring" />
              <div className="ufo-lights">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="planet" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
          </div>
        </section>

        <section id="about" className="content-section">
          <div
            className={`section-heading ${activeSection === 'about' ? 'section-heading--active' : ''}`}
          >
            <p className="eyebrow">About</p>
            <h2>The pilot behind the signal</h2>
          </div>
          <div className="about-grid">
            <article className="panel about-intro-card scroll-reveal reveal-delay-1">
              <img
                className="about-photo"
                src={ramelPortrait}
                alt="Ramel Millanes portrait"
              />
              <div className="about-intro-copy">
                <p>
                  I am Ramel Millanes, a developer who enjoys building reliable
                  web applications across frontend and backend stacks. My toolkit
                  covers modern JavaScript frameworks, PHP systems, and SQL-backed
                  platforms that need to feel smooth, practical, and production
                  ready.
                </p>
              </div>
            </article>
            <article className="panel stat-card scroll-reveal reveal-delay-2">
              <span className="stat-value">3+</span>
              <span className="stat-label">Years exploring web interfaces</span>
            </article>
            <article className="panel stat-card scroll-reveal reveal-delay-3">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Curious about design systems</span>
            </article>
          </div>
        </section>

        <section id="work" className="content-section">
          <div
            className={`section-heading ${activeSection === 'work' ? 'section-heading--active' : ''}`}
          >
            <p className="eyebrow">Projects & Stacks</p>
            <h2>Recent missions and core technologies</h2>
          </div>
          <div className="card-grid">
            {projects.map((project, index) => {
              const isAvailable = project.link !== 'private'

              return (
                <article
                  className={`panel project-card scroll-reveal reveal-delay-${(index % 3) + 1} project-card--${project.planet} ${isAvailable ? 'project-card--clickable' : 'project-card--private'}`}
                  key={project.title}
                >
                  {isAvailable ? (
                    <a
                      className="project-card-link"
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.title}`}
                    >
                      <p className="card-kicker">
                        Link:{' '}
                        <span className="card-kicker-link">Available Click Me!</span>
                      </p>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="tag-row">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </a>
                  ) : (
                    <>
                      <p className="card-kicker">
                        Link: <span className="card-kicker-link">Private</span>
                      </p>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="tag-row">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </>
                  )}
                </article>
              )
            })}
          </div>
          <div className="panel stack-panel scroll-reveal reveal-delay-2">
            <div className="stack-heading">
              <span className="nav-icon" aria-hidden="true">
                <FiLayers />
              </span>
              <h3>Technology inside the mothership</h3>
            </div>
            {stacks.map((stack) => (
              <span className="stack-chip" key={stack}>
                {stack}
              </span>
            ))}
          </div>
        </section>

        <section id="contacts" className="content-section">
          <div
            className={`section-heading ${activeSection === 'contacts' ? 'section-heading--active' : ''}`}
          >
            <p className="eyebrow">Contacts</p>
            <h2>Open a communication channel</h2>
          </div>
          <div className="panel contact-form-panel scroll-reveal reveal-delay-1">
            <div className="contact-form-copy">
              <p className="card-kicker">Send a Message</p>
              <h3>Transmit a signal to my inbox</h3>
              <p>
                Send your name, email, and message here and it will be forwarded
                to my Gmail account through FormSubmit.
              </p>
            </div>
            <form
              className="contact-form"
              action="https://formsubmit.co/ramelmillanes@gmail.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="New portfolio message from Ramportfolio" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <label className="contact-field">
                <span>Name</span>
                <input type="text" name="name" placeholder="Your name" required />
              </label>

              <label className="contact-field">
                <span>Email</span>
                <input type="email" name="email" placeholder="you@example.com" required />
              </label>

              <label className="contact-field contact-field--full">
                <span>Message</span>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Tell me about your project or idea..."
                  required
                />
              </label>

              <button className="contact-submit" type="submit">
                Send Transmission
              </button>
            </form>
          </div>
          <div className="contact-grid">
            <article className="panel contact-card contact-card--email scroll-reveal reveal-delay-1">
              <p className="card-kicker">Email</p>
              <a href="mailto:ramelmillanes@gmail.com">ramelmillanes@gmail.com</a>
            </article>
            <article className="panel contact-card contact-card--github scroll-reveal reveal-delay-2">
              <p className="card-kicker">GitHub</p>
              <a href="https://github.com/starwars1898" target="_blank" rel="noreferrer">
                github.com/starwars1898
              </a>
            </article>
            <article className="panel contact-card contact-card--linkedin scroll-reveal reveal-delay-3">
              <p className="card-kicker">LinkedIn</p>
              <a href="https://www.linkedin.com/in/ramel-millanes/" target="_blank" rel="noreferrer">
                Ramel Millanes
              </a>
            </article>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
