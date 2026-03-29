import { motion } from 'framer-motion'

const links = [
  { href: '#about', label: 'About' },
  { href: '#programs', label: 'Programs' },
  { href: '#transform', label: 'Results' },
  { href: '#trainers', label: 'Trainers' },
  { href: '#pricing', label: 'Plans' },
]

export function Navbar() {
  return (
    <motion.header
      className="site-nav"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="site-nav__brand" href="#top">
        Sensaion
      </a>
      <nav className="site-nav__links" aria-label="Primary">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <a className="site-nav__cta" href="#join">
        Join Now
      </a>
    </motion.header>
  )
}
