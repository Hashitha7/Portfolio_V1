import { useState, useEffect } from 'react';
import './Navbar.css';

const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState('HOME');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
      <div className="navbar__logo">
        <span className="navbar__logo-text">H.D</span>
        <span className="navbar__logo-dot"></span>
      </div>

      <button
        className={`navbar__hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        id="nav-toggle"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className={`navbar__link ${activeLink === link.label ? 'navbar__link--active' : ''}`}
              onClick={() => {
                setActiveLink(link.label);
                setMenuOpen(false);
              }}
              id={`nav-link-${link.label.toLowerCase()}`}
            >
              {link.label}
              {activeLink === link.label && <span className="navbar__link-underline"></span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
