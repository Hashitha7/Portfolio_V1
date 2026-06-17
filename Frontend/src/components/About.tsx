import './About.css';

const traits = [
  { icon: '💻', title: 'Software Engineering', subtitle: 'Student', color: 'var(--cyan)' },
  { icon: '🎨', title: 'Creative', subtitle: 'Designer', color: 'var(--magenta)' },
  { icon: '💡', title: 'Solution', subtitle: 'Thinker', color: 'var(--gold)' },
  { icon: '🤝', title: 'Team', subtitle: 'Planner', color: 'var(--orange)' },
];

const timeline = [
  {
    period: '2025 Feb - 2025 Aug',
    title: 'Software Engineering Intern',
    org: 'Mobitel (Pvt) Ltd',
    description: 'Contributed to Web application development and backend systems',
    dotColor: 'var(--magenta)',
  },
  {
    period: '2024',
    title: 'Higher National Diploma in Information Technology',
    org: 'SLIIT - Sri Lanka Institute of Information Technology',
    description: 'Successfully completed HND in Information Technology with distinction',
    dotColor: 'var(--cyan)',
  },
  {
    period: '2022-Present',
    title: 'Undergraduate Student',
    org: 'SLIIT - Sri Lanka Institute of Information Technology',
    description: 'Pursuing BSc (Hons) in Information Technology, specializing in Software Engineering',
    dotColor: 'var(--neon-green)',
  },
];

export default function About() {
  return (
    <section className="about" id="about">
      {/* Section header */}
      <div className="about__header">
        <span className="about__header-tag">&lt;about&gt;</span>
      </div>

      <div className="about__content">
        {/* Left Column - Avatar & Traits */}
        <div className="about__left">
          {/* Orbital Avatar */}
          <div className="about__avatar-wrapper">
            {/* Outer orbit ring */}
            <div className="about__orbit about__orbit--outer">
              <span className="about__orbit-dot about__orbit-dot--1"></span>
              <span className="about__orbit-dot about__orbit-dot--2"></span>
              <span className="about__orbit-dot about__orbit-dot--3"></span>
            </div>
            {/* Inner orbit ring */}
            <div className="about__orbit about__orbit--inner">
              <span className="about__orbit-dot about__orbit-dot--4"></span>
              <span className="about__orbit-dot about__orbit-dot--5"></span>
            </div>
            {/* Center circle */}
            <div className="about__avatar-circle">
              <span className="about__avatar-text">HD</span>
            </div>
          </div>

          {/* Trait Cards Grid */}
          <div className="about__traits">
            {traits.map((trait, i) => (
              <div className="about__trait-card" key={i}>
                <span className="about__trait-icon">{trait.icon}</span>
                <span className="about__trait-title" style={{ color: trait.color }}>
                  {trait.title}
                </span>
                <span className="about__trait-subtitle">{trait.subtitle}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Timeline */}
        <div className="about__right">
          <div className="about__timeline">
            <div className="about__timeline-line"></div>
            {timeline.map((item, i) => (
              <div className="about__timeline-item" key={i}>
                {/* Dot on the line */}
                <div className="about__timeline-dot-wrapper">
                  <span
                    className="about__timeline-dot"
                    style={{
                      background: item.dotColor,
                      boxShadow: `0 0 12px ${item.dotColor}, 0 0 24px ${item.dotColor}`,
                    }}
                  ></span>
                  <span
                    className="about__timeline-dot-ring"
                    style={{ borderColor: item.dotColor }}
                  ></span>
                </div>
                {/* Content card */}
                <div className="about__timeline-card">
                  <span className="about__timeline-period">{item.period}</span>
                  <h3 className="about__timeline-title">{item.title}</h3>
                  <span className="about__timeline-org">{item.org}</span>
                  <p className="about__timeline-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="about__footer">
        <span className="about__header-tag">&lt;/about&gt;</span>
      </div>
    </section>
  );
}
