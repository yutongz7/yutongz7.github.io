import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import "./App.css";
// import profileImage from "./images/IMG_9101.jpg";
import profileImage from "./images/IMG_9767.JPG";
import Research from "./pages/Research";
import {
  FaSquareXTwitter,
  FaBluesky,
  FaGithub,
  FaLinkedin,
  FaLocationDot,
  FaEnvelope,
  FaBars,
} from "react-icons/fa6";
import { SiGooglescholar } from "react-icons/si";

function VisitorsMap() {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const mutationObserverRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const s = document.createElement("script");
    s.type = "text/javascript";
    s.id = "mapmyvisitors";
    s.async = true;
    s.src =
      "https://mapmyvisitors.com/map.js?cl=d8d0bb&w=a&t=n&d=_u7xnM3BAbJNl9U6NQTSTOlq_BqOnm4XdFXwhGijbQo&co=ffffff&cmn=d1ae8b&cmo=4a4e69&ct=654a4a";

    container.appendChild(s);

    const findInner = () => {
      const inner =
        container.firstElementChild ||
        container.querySelector("iframe, div, canvas, img");
      if (!inner) return null;

      inner.style.transformOrigin = "top left";
      inner.style.position = "absolute";
      inner.style.left = "0";
      inner.style.top = "0";
      return inner;
    };

    const rescale = () => {
      const inner = innerRef.current || findInner();
      if (!inner || !container) return;

      const cw = container.clientWidth || 1;

      const rawW =
        parseInt(inner.style.width, 10) ||
        0 ||
        Math.round(inner.getBoundingClientRect().width) ||
        800;
      const rawH =
        parseInt(inner.style.height, 10) ||
        0 ||
        Math.round(inner.getBoundingClientRect().height) ||
        500;

      if (rawW === 0 || rawH === 0) {
        requestAnimationFrame(rescale);
        return;
      }

      const scale = Math.min(1, cw / rawW);

      // Apply scale to the inner widget
      inner.style.transform = `scale(${scale})`;

      container.style.height = `${Math.round(rawH * scale)}px`;
    };

    mutationObserverRef.current = new MutationObserver(() => {
      const inner = findInner();
      if (inner) innerRef.current = inner;

      requestAnimationFrame(rescale);
    });
    mutationObserverRef.current.observe(container, {
      childList: true,
      subtree: true,
    });

    resizeObserverRef.current = new ResizeObserver(() => rescale());
    resizeObserverRef.current.observe(container);

    window.addEventListener("resize", rescale);
    window.addEventListener("orientationchange", rescale);

    s.onload = () => requestAnimationFrame(rescale);

    requestAnimationFrame(rescale);

    return () => {
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
        mutationObserverRef.current = null;
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      window.removeEventListener("resize", rescale);
      window.removeEventListener("orientationchange", rescale);

      if (containerRef.current) containerRef.current.innerHTML = "";
      const existing = document.getElementById("mapmyvisitors");
      if (existing && existing.parentNode)
        existing.parentNode.removeChild(existing);
    };
  }, []);

  return (
    <div className="card" aria-label="Visitors map">
      <div ref={containerRef} className="visitors-map" />
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <Router>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="App">
        {/* Header */}
        <header className="header" role="banner">
          <div className="header-inner">
            <NavLink to="/" className="brand" onClick={closeMenu}>
              <span className="brand-initial">YZ</span>
              <span className="brand-text">Yutong Zhang</span>
            </NavLink>

            <button
              className="nav-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <FaBars className="menu-icon" />
            </button>

            <nav className={`nav ${menuOpen ? "open" : ""}`} aria-label="Main">
              <ul onClick={closeMenu}>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "active-link" : "inactive-link"
                    }
                    end
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/research"
                    className={({ isActive }) =>
                      isActive ? "active-link" : "inactive-link"
                    }
                  >
                    Research
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Layout */}
        <main id="main" className="container" role="main">
          {/* Sidebar */}
          <aside className="sidebar" aria-label="Author summary and contacts">
            <img
              src={profileImage}
              alt="Portrait of Yutong Zhang"
              className="profile-pic"
              loading="lazy"
            />
            <h1 className="name">Yutong Zhang</h1>

            <ul className="info-list" aria-label="Contact information">
              <li>
                <span className="info" role="text">
                  <FaLocationDot aria-hidden="true" />
                  <span>Palo Alto, CA</span>
                </span>
              </li>
              <li>
                <a
                  className="info"
                  href="mailto:yutongz7@stanford.edu"
                  aria-label="Email Yutong Zhang"
                  title="Email"
                >
                  <FaEnvelope />
                  <span>yutongz7@stanford.edu</span>
                </a>
              </li>
            </ul>

            <div className="link-list" aria-label="Social profiles">
              <a
                className="info"
                href="https://x.com/zhangyt0704"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                title="Twitter / X"
              >
                <FaSquareXTwitter />
                <span>Twitter</span>
              </a>

              <a
                className="info"
                href="https://bsky.app/profile/yutongzhang.bsky.social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bluesky"
                title="Bluesky"
              >
                <FaBluesky />
                <span>Bluesky</span>
              </a>

              <a
                className="info"
                href="https://scholar.google.com/citations?user=z-icHtMAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Scholar"
                title="Google Scholar"
              >
                <SiGooglescholar />
                <span>Google Scholar</span>
              </a>

              <a
                className="info"
                href="https://github.com/yutongz7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>

              <a
                className="info"
                href="https://www.linkedin.com/in/yutong-zhang74/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
            </div>
          </aside>
          <div className="mini-profile" aria-label="Compact author info">
            <img
              src={profileImage}
              alt="Portrait of Yutong Zhang"
              className="mini-profile-pic"
              loading="lazy"
            />
            <div className="mini-profile-text">
              <div className="mini-name">Yutong Zhang</div>
              <a
                className="mini-email"
                href="mailto:yutongz7@stanford.edu"
                aria-label="Email Yutong Zhang"
                title="Email"
              >
                yutongz7@stanford.edu
              </a>
            </div>
          </div>

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <section className="main-content">
                  <div className="card">
                    <h2>👋 Hello there!</h2>
                    <p>
                      I recently completed my M.S. in Computer Science with
                      Distinction in Research at Stanford University, where I
                      was fortunate to be advised by Professors{" "}
                      <a
                        href="https://hci.stanford.edu/msb/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Michael Bernstein
                      </a>
                      ,{" "}
                      <a
                        href="https://cs.stanford.edu/~diyiy/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Diyi Yang
                      </a>
                      , and{" "}
                      <a
                        href="https://comm.stanford.edu/people/jeffrey-hancock/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Jeff Hancock
                      </a>
                      . Previously, I earned my B.S. in Computer Science from
                      UIUC (“Go Illini!!”), where I worked with Professors{" "}
                      <a
                        href="https://cs.illinois.edu/about/people/faculty/kkarahal"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Karrie Karahalios
                      </a>
                      ,{" "}
                      <a
                        href="https://cs.illinois.edu/about/people/faculty/hs1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Hari Sundaram
                      </a>
                      ,{" "}
                      <a
                        href="https://cs.illinois.edu/about/people/faculty/zaher"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Tarek Abdelzaher
                      </a>
                      , and{" "}
                      <a
                        href="https://cs.illinois.edu/about/people/faculty/alawini"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Abdussalam Alawini
                      </a>
                      .
                    </p>
                  </div>

                  <div className="card">
                    <h2>🔖 Research Interests</h2>
                    <p>
                      My research areas fall broadly within human-computer
                      interaction (HCI) and social computing. I am interested in
                      how technologies shape social relationships and digital
                      well-being. My work explores social computing and human-AI
                      interaction, with the goal of designing technologies that
                      promote healthier, more meaningful, and more responsible
                      online experiences.
                    </p>
                  </div>

                  <div className="card">
                    <h2>🌟 Recent Updates</h2>
                    <ul className="updates">
                      <li>
                        <span className="update-date">10/2025</span> Joining
                        CSCW 2025 to present{" "}
                        <a
                          href="https://dl.acm.org/doi/10.1145/3757563"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Burst
                        </a>
                        .
                      </li>
                      <li>
                        <span className="update-date">08/2025</span>{" "}
                        <a
                          href="https://dl.acm.org/doi/10.1145/3757563"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Burst: Collaborative Curation in Connected Social
                          Media Communities
                        </a>{" "}
                        accepted for CSCW 2025.
                      </li>
                      <li>
                        <span className="update-date">08/2025</span>{" "}
                        <a
                          href="https://arxiv.org/abs/2508.19227"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Generative Interfaces for Language Models
                        </a>
                        .
                      </li>
                      <li>
                        <span className="update-date">06/2025</span>{" "}
                        <a
                          href="https://arxiv.org/abs/2506.12605"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          The Rise of AI Companions: How Human-Chatbot
                          Relationships Influence Well-Being
                        </a>
                        .
                      </li>
                      <li>
                        <span className="update-date">04/2025</span>{" "}
                        <a
                          href="https://dl.acm.org/doi/full/10.1145/3706598.3714193"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Organize, Then Vote: Exploring Cognitive Load in
                          Quadratic Survey Interfaces
                        </a>{" "}
                        accepted for CHI 2025.
                      </li>

                      <li>
                        <span className="update-date">11/2024</span> Our{" "}
                        <a
                          href="https://dl.acm.org/doi/10.1145/3687027"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Commit
                        </a>{" "}
                        paper received a{" "}
                        <a
                          href="https://cscw.acm.org/2024/index.php/awards/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="highlight"
                        >
                          🏆 Best Paper Honorable Mention
                        </a>{" "}
                        at CSCW 2024!
                      </li>
                      <li>
                        <span className="update-date">09/2024</span> Paper{" "}
                        <a
                          href="https://aclanthology.org/2024.findings-emnlp.288/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          CultureBank
                        </a>{" "}
                        accepted to EMNLP Findings 2024.
                      </li>
                      {/* <li>
                        <span className="update-date">05/2024</span> Paper{" "}
                        <a
                          href="https://dl.acm.org/doi/10.1145/3687027"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Commit
                        </a>{" "}
                        accepted to CSCW 2024.
                      </li>
                      <li>
                        <span className="update-date">07/2024</span>{" "}
                        Volunteering at SIGIR 2024 with NSF Travel Grant—see you
                        there!
                      </li>
                      <li>
                        <span className="update-date">03/2024</span>{" "}
                        <a
                          href="https://dl.acm.org/doi/10.1145/3626772.3657711"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          MetaHKG
                        </a>{" "}
                        and{" "}
                        <a
                          href="https://dl.acm.org/doi/10.1145/3626772.3657791"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          TGOnline
                        </a>{" "}
                        accepted to SIGIR 2024.
                      </li>
                      <li>
                        <span className="update-date">03/2023</span> Received
                        the{" "}
                        <a
                          href="https://siebelschool.illinois.edu/about/awards/undergraduate-scholarships-awards/cw-gear-outstanding-undergraduate-student"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          C.W. Gear Outstanding Undergraduate Student Award
                        </a>
                        .
                      </li> */}
                    </ul>
                  </div>

                  <VisitorsMap />
                </section>
              }
            />
            <Route path="/research" element={<Research />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer" role="contentinfo">
          <p className="footer-text">
            © {new Date().getFullYear()} Yutong Zhang{" "}
            <span className="divider">·</span> Last Updated: Nov 2025
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
