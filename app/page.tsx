"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    number: "01",
    title: "Metaheads AI",
    type: "Independent AI project",
    summary:
      "A creative AI initiative exploring identity-led visual worlds and repeatable generative production. I shape the visual direction, curate outputs, and turn experiments into practical workflows.",
    tags: ["Creative AI", "Visual R&D", "Generative systems"],
    accent: "violet",
  },
  {
    number: "02",
    title: "Reading Mentor",
    type: "AI learning product · 2026",
    summary:
      "A multilingual voice companion for reading English books. It imports TXT and EPUB locally, follows reading progress, explains words in context, creates vocabulary cards, and gives gentle pronunciation guidance.",
    tags: ["Gemini Live", "Voice UX", "Product prototyping"],
    accent: "cyan",
  },
  {
    number: "03",
    title: "Production AI Systems",
    type: "Applied research · Glera Games",
    summary:
      "Custom Stable Diffusion, LoRA, DreamBooth and GPT workflows delivered as documented, art-team-ready systems—from curated datasets and training analysis to cloud storage and integration guidance.",
    tags: ["Stable Diffusion", "LoRA", "Workflow design"],
    accent: "coral",
  },
];

const experience = [
  {
    years: "2024 — now",
    role: "AI Art Researcher · Generative AI Specialist",
    company: "Glera Games",
    text: "Researching new AI capabilities, curating training datasets, developing LoRA and DreamBooth models, analysing training performance, and delivering complete model packages and documentation to production art teams.",
  },
  {
    years: "2023 — 2024",
    role: "Technical Artist",
    company: "Kwalee · Lisbon",
    text: "Owned chapter building for a Unity and INK interactive story, implemented its visual language, UI, animation and VFX, built C# and Python tools, and improved cross-discipline production workflows.",
  },
  {
    years: "2021 — 2023",
    role: "Technical Artist",
    company: "Playrix / VOKI Games · Kyiv",
    text: "Shipped two major free-to-play mobile projects, automated art tasks, led technical animation and feature implementation, and raised the department’s technical proficiency through training and mentorship.",
  },
  {
    years: "2020 — 2022",
    role: "Freelance Lead Artist",
    company: "Independent game projects",
    text: "Led end-to-end art production for tower defence, real-time strategy, platformer and runner projects—from early concepts to environments, animation, UI and production-ready assets.",
  },
];

const skills = [
  {
    title: "Generative AI",
    items: ["Stable Diffusion", "SDXL", "FLUX", "LoRA", "DreamBooth", "ControlNet", "Kohya_ss", "OneTrainer"],
  },
  {
    title: "AI Operations",
    items: ["Dataset curation", "Model evaluation", "TensorBoard", "RunPod", "S3 + rclone", "Custom GPTs", "Technical documentation"],
  },
  {
    title: "Technical Art",
    items: ["Unity", "C#", "Python", "Shaders", "VFX", "Spine", "Cinemachine", "Asset optimisation", "INK"],
  },
  {
    title: "Visual Toolkit",
    items: ["Photoshop", "Illustrator", "After Effects", "Blender", "Cinema 4D", "UI/UX", "Motion design"],
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <div className="aurora aurora-one" aria-hidden="true" />
      <div className="aurora aurora-two" aria-hidden="true" />

      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Ksenia Isidorova, home">KI<span>.</span></a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="primary-navigation">
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav id="primary-navigation" className={menuOpen ? "nav-open" : ""} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow"><span /> AI specialist · Technical artist</p>
          <h1>Ksenia<br /><em>Isidorova</em></h1>
          <p className="hero-intro">
            I build the bridge between <strong>generative AI</strong> and creative production—training models, designing workflows, and turning emerging technology into tools artists can actually use.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">Explore my work <span>↘</span></a>
            <a className="button button-ghost" href="/Ksenia-Isidorova-CV.pdf" download>Download CV</a>
          </div>
        </div>

        <div className="portrait-stage" data-reveal>
          <div className="portrait-halo" aria-hidden="true" />
          <div className="portrait-frame">
            <img src="/ksenia-isidorova.jpg" alt="Portrait of Ksenia Isidorova" />
          </div>
          <div className="orbit-label orbit-top">Based in Europe</div>
          <div className="orbit-label orbit-bottom"><span /> Open to ambitious AI work</div>
        </div>

        <a className="scroll-cue" href="#profile" aria-label="Scroll to profile">
          <span>Scroll to discover</span><i>↓</i>
        </a>
      </section>

      <section className="profile section-shell" id="profile" data-reveal>
        <div className="section-index">01 / Profile</div>
        <div className="profile-statement">
          <p className="statement-kicker">Art intuition. Technical discipline.</p>
          <h2>I make complex AI systems feel <em>clear, useful</em> and production-ready.</h2>
          <div className="profile-grid">
            <p>My focus is generative neural networks, dataset curation, model fine-tuning and AI-assisted content creation for mobile game assets, CG scenes and illustration.</p>
            <p>I combine visual evaluation with loss tracking, debugging and workflow automation—then package the result with the guidance teams need to use it confidently.</p>
          </div>
        </div>
      </section>

      <section className="work section-shell" id="work">
        <div className="section-heading" data-reveal>
          <div className="section-index">02 / Selected work</div>
          <h2>Recent <em>AI projects</em></h2>
          <p>Research becomes valuable when it survives contact with real users, teams and production constraints.</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-card ${project.accent}`} key={project.title} data-reveal>
              <div className="project-number">{project.number}</div>
              <div className="project-body">
                <p className="project-type">{project.type}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <div className="project-glyph" aria-hidden="true"><span /><i /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience section-shell" id="experience">
        <div className="section-heading compact" data-reveal>
          <div className="section-index">03 / Experience</div>
          <h2>A career at the intersection of <em>art + systems</em></h2>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-item" key={`${item.company}-${item.years}`} data-reveal>
              <div className="timeline-years">{item.years}</div>
              <div className="timeline-role"><h3>{item.role}</h3><p>{item.company}</p></div>
              <p className="timeline-copy">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="skills section-shell" id="skills">
        <div className="section-heading" data-reveal>
          <div className="section-index">04 / Capabilities</div>
          <h2>Creative range.<br /><em>Technical depth.</em></h2>
        </div>
        <div className="skill-grid">
          {skills.map((group, index) => (
            <article className="skill-group" key={group.title} data-reveal>
              <span>0{index + 1}</span><h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="details section-shell" data-reveal>
        <div className="detail-card education-card">
          <p className="detail-label">Education</p>
          <h3>Bachelor of Fine Arts</h3>
          <p>Southern Ukrainian National Pedagogical University, Odesa</p>
          <span>2018 — 2022</span>
        </div>
        <div className="detail-card">
          <p className="detail-label">Further learning</p>
          <p>Automation with Python · Motion Design · Illustration · Brand Identity · 2D Platformer Development with Unity</p>
        </div>
        <div className="detail-card language-card">
          <p className="detail-label">Languages</p>
          <div><span>Ukrainian</span><span>Native</span></div>
          <div><span>Russian</span><span>Native</span></div>
          <div><span>English</span><span>Professional</span></div>
          <div><span>Portuguese</span><span>Basic</span></div>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-glow" aria-hidden="true" />
        <p className="eyebrow"><span /> Let’s create something useful</p>
        <h2>Have an ambitious<br />AI idea? <em>Let’s talk.</em></h2>
        <a className="contact-link" href="mailto:kseniia.is.upark@gmail.com">kseniia.is.upark@gmail.com <span>↗</span></a>
        <div className="footer-meta">
          <span>Odesa, Ukraine / Lisbon, Portugal</span>
          <a href="tel:+380985447363">+380 98 544 73 63</a>
          <span>© {new Date().getFullYear()} Ksenia Isidorova</span>
        </div>
      </footer>
    </main>
  );
}
