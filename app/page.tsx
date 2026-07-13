"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    number: "01",
    title: "Reading Mentor",
    type: "Applied conversational AI · 2026",
    summary:
      "An end-to-end multilingual voice product that turns any TXT or EPUB book into an interactive learning experience. The system follows reading progress, understands mixed-language speech, explains words in context, creates a personal vocabulary, and gives careful pronunciation feedback.",
    tags: ["Gemini Live", "Voice AI", "Tool calling", "Product development"],
    accent: "violet",
  },
  {
    number: "02",
    title: "Metaheads AI",
    type: "Independent applied AI project",
    summary:
      "A custom AI initiative developed from exploration to a working system: defining the use case, selecting and testing approaches, shaping the product logic, and building repeatable workflows around generative models.",
    tags: ["AI R&D", "Custom solution", "Generative AI", "Workflow design"],
    accent: "cyan",
  },
  {
    number: "03",
    title: "Cultural Heritage AI",
    type: "AI expertise for cultural projects",
    summary:
      "Applied AI expertise for cultural heritage work, where source quality, context and responsible interpretation matter as much as model capability. The work connects research, structured data, human review and practical delivery for a specialist team.",
    tags: ["Research", "Knowledge workflows", "Human-in-the-loop", "Validation"],
    accent: "coral",
  },
  {
    number: "04",
    title: "Production AI Systems",
    type: "Enterprise R&D · Glera Games",
    summary:
      "Full-cycle AI solutions for production teams: technology research, dataset design, model training, evaluation, cloud workflows, integration guidance and ongoing support. Each solution is delivered with documentation, repeatable pipelines and clear ownership for the teams using it.",
    tags: ["Stable Diffusion", "LoRA", "Custom GPTs", "MLOps", "Documentation"],
    accent: "violet",
  },
];

const experience = [
  {
    years: "2024 — now",
    role: "AI Art Researcher · Generative AI Specialist",
    company: "Glera Games",
    text: "Owning full-cycle AI R&D: researching technologies and use cases, designing datasets, developing and evaluating models and custom GPT tools, integrating solutions into production, documenting them, and supporting teams after delivery.",
  },
  {
    years: "2023 — 2024",
    role: "Technical Artist",
    company: "Kwalee · Lisbon",
    text: "Led technical delivery for a Unity and INK product across content systems, UI, animation and VFX. Built C# and Python tools, worked with programmers and artists, improved cross-team workflows, and maintained implementation documentation.",
  },
  {
    years: "2021 — 2023",
    role: "Technical Artist",
    company: "Playrix / VOKI Games · Kyiv",
    text: "Shipped two large-scale free-to-play products, automated production tasks, debugged and optimised complex content systems, led feature implementation, and raised the department’s technical proficiency through training and mentorship.",
  },
  {
    years: "2020 — 2022",
    role: "Freelance Lead Artist",
    company: "Independent game projects",
    text: "Worked directly with small teams and varied clients, translating open-ended needs into practical technical and creative solutions. Led delivery from initial concept through implementation, iteration and production support.",
  },
];

const skills = [
  {
    title: "Applied AI & GenAI",
    items: ["LLM applications", "Conversational + Voice AI", "Multimodal workflows", "Stable Diffusion", "SDXL", "FLUX", "LoRA", "DreamBooth", "ControlNet"],
  },
  {
    title: "Full-cycle AI R&D",
    items: ["Use-case discovery", "Technology research", "Solution architecture", "Rapid prototyping", "Evaluation + QA", "Integration", "Support + iteration", "Technical documentation"],
  },
  {
    title: "Engineering & Operations",
    items: ["Python", "C#", "API integration", "Custom GPTs", "TensorBoard", "RunPod", "S3 + rclone", "Git", "Automation", "Data pipelines"],
  },
  {
    title: "Product & Technical Art",
    items: ["Unity", "Shaders", "VFX", "INK", "UI/UX", "Asset optimisation", "Photoshop", "Illustrator", "After Effects", "Blender"],
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
          <p className="eyebrow"><span /> Applied AI specialist · End-to-end R&D</p>
          <h1>Ksenia<br /><em>Isidorova</em></h1>
          <p className="hero-intro">
            I research, design and deliver <strong>applied AI solutions</strong>—from the first use-case hypothesis to development, integration, testing, documentation and long-term support.
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
          <p className="statement-kicker">Broad AI expertise. Deep technical foundation.</p>
          <h2>I turn complex AI capabilities into <em>useful, reliable</em> products and systems.</h2>
          <div className="profile-grid">
            <p>I have delivered in very different environments: global game companies including Playrix, Kwalee and Glera Games; small independent teams; custom client work; and AI expertise for cultural heritage initiatives.</p>
            <p>My role spans the complete solution lifecycle: problem framing, technology research, prototyping, development, integration, evaluation, testing, technical documentation, training and post-launch support.</p>
          </div>
        </div>
      </section>

      <section className="work section-shell" id="work">
        <div className="section-heading" data-reveal>
          <div className="section-index">02 / Selected work</div>
          <h2>Applied AI in <em>different contexts</em></h2>
          <p>From enterprise production to education and cultural heritage—each solution starts with the real problem, not a fashionable model.</p>
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
          <h2>From global products to <em>small expert teams</em></h2>
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
          <h2>Full-cycle AI R&D.<br /><em>Technical depth.</em></h2>
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
        <p className="eyebrow"><span /> Research · Build · Integrate · Support</p>
        <h2>Need an AI solution<br />that works? <em>Let’s talk.</em></h2>
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
