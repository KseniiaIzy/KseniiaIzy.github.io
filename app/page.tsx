"use client";

import { useEffect, useState } from "react";
import content from "@/content/site.json";

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
  const { navigation, hero, profile, workSection, projects, experienceSection, experience, skillsSection, skills, education, furtherLearning, languages, contact } = content;

  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <div className="aurora aurora-one" aria-hidden="true" />
      <div className="aurora aurora-two" aria-hidden="true" />

      <header className="site-header">
        <a className="monogram" href="#top" aria-label={`${hero.firstName} ${hero.lastName}, home`}>KI<span>.</span></a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="primary-navigation">
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav id="primary-navigation" className={menuOpen ? "nav-open" : ""} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>{navigation.work}</a>
          <a href="#experience" onClick={closeMenu}>{navigation.experience}</a>
          <a href="#skills" onClick={closeMenu}>{navigation.skills}</a>
          <a href="#contact" onClick={closeMenu}>{navigation.contact}</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow"><span /> {hero.eyebrow}</p>
          <h1>{hero.firstName}<br /><em>{hero.lastName}</em></h1>
          <p className="hero-intro">
            {hero.introBefore}<strong>{hero.introStrong}</strong>{hero.introAfter}
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">{hero.primaryButton} <span>↘</span></a>
            <a className="button button-ghost" href={hero.cvFile} download>{hero.cvButton}</a>
          </div>
        </div>

        <div className="portrait-stage" data-reveal>
          <div className="portrait-halo" aria-hidden="true" />
          <div className="portrait-frame">
            <img src={hero.portrait} alt={hero.portraitAlt} />
          </div>
          <div className="orbit-label orbit-top">{hero.location}</div>
          <div className="orbit-label orbit-bottom"><span /> {hero.availability}</div>
        </div>

        <a className="scroll-cue" href="#profile" aria-label="Scroll to profile">
          <span>{hero.scrollLabel}</span><i>↓</i>
        </a>
      </section>

      <section className="profile section-shell" id="profile" data-reveal>
        <div className="section-index">{profile.index}</div>
        <div className="profile-statement">
          <p className="statement-kicker">{profile.kicker}</p>
          <h2>{profile.headingBefore}<em>{profile.headingEmphasis}</em>{profile.headingAfter}</h2>
          <div className="profile-grid">
            {profile.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="work section-shell" id="work">
        <div className="section-heading" data-reveal>
          <div className="section-index">{workSection.index}</div>
          <h2>{workSection.headingBefore}<em>{workSection.headingEmphasis}</em></h2>
          <p>{workSection.description}</p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-card ${project.accent}`} key={`${project.number}-${project.title}`} data-reveal>
              <div className="project-number">{project.number}</div>
              <div className="project-body">
                <p className="project-type">{project.type}</p>
                <h3>{project.title}</h3>
                {project.image && <img className="project-image" src={project.image} alt={`${project.title} project`} />}
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
          <div className="section-index">{experienceSection.index}</div>
          <h2>{experienceSection.headingBefore}<em>{experienceSection.headingEmphasis}</em></h2>
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
          <div className="section-index">{skillsSection.index}</div>
          <h2>{skillsSection.heading}<br /><em>{skillsSection.headingEmphasis}</em></h2>
        </div>
        <div className="skill-grid">
          {skills.map((group, index) => (
            <article className="skill-group" key={group.title} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span><h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="details section-shell" data-reveal>
        <div className="detail-card education-card">
          <p className="detail-label">{education.label}</p>
          <h3>{education.degree}</h3>
          <p>{education.school}</p>
          <span>{education.years}</span>
        </div>
        <div className="detail-card">
          <p className="detail-label">{furtherLearning.label}</p>
          <p>{furtherLearning.text}</p>
        </div>
        <div className="detail-card language-card">
          <p className="detail-label">{languages.label}</p>
          {languages.items.map((item) => <div key={item.language}><span>{item.language}</span><span>{item.level}</span></div>)}
        </div>
      </section>

      <footer id="contact">
        <div className="footer-glow" aria-hidden="true" />
        <p className="eyebrow"><span /> {contact.eyebrow}</p>
        <h2>{contact.headingLine}<br />{contact.headingBefore}<em>{contact.headingEmphasis}</em></h2>
        <a className="contact-link" href={`mailto:${contact.email}`}>{contact.email} <span>↗</span></a>
        <div className="footer-meta">
          <span>{contact.location}</span>
          <a href={`tel:${contact.phoneLink}`}>{contact.phoneDisplay}</a>
          <span>© {new Date().getFullYear()} {contact.copyrightName}</span>
        </div>
      </footer>
    </main>
  );
}
