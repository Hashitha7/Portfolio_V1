import { useState, useEffect, useRef } from 'react';
import './Skills.css';

interface Skill {
  icon: string;
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  color: string;
  colorVar: string;
  glowVar: string;
  skills: Skill[];
  masteryLabel: string;
}

const categories: SkillCategory[] = [
  {
    title: 'Frontend',
    color: '#00f0ff',
    colorVar: 'var(--cyan)',
    glowVar: 'var(--cyan-glow)',
    masteryLabel: 'FRONTEND MASTERY',
    skills: [
      { icon: '⚛️', name: 'React/Next.js', level: 90 },
      { icon: '🟦', name: 'TypeScript', level: 85 },
      { icon: '💙', name: 'HTML', level: 95 },
    ],
  },
  {
    title: 'Backend',
    color: '#ff00ff',
    colorVar: 'var(--magenta)',
    glowVar: 'var(--magenta-glow)',
    masteryLabel: 'BACKEND MASTERY',
    skills: [
      { icon: '🟢', name: 'Node.js', level: 88 },
      { icon: '🐘', name: 'PHP', level: 82 },
      { icon: '🚀', name: 'Express.js', level: 90 },
    ],
  },
  {
    title: 'Database',
    color: '#a855f7',
    colorVar: 'var(--purple)',
    glowVar: 'var(--purple-glow)',
    masteryLabel: 'DATABASE MASTERY',
    skills: [
      { icon: '🍃', name: 'MongoDB', level: 80 },
      { icon: '🗄️', name: 'SQL', level: 88 },
      { icon: '🔥', name: 'Firebase', level: 62 },
    ],
  },
  {
    title: 'Tools',
    color: '#ffd700',
    colorVar: 'var(--gold)',
    glowVar: 'rgba(255, 215, 0, 0.3)',
    masteryLabel: 'TOOLS MASTERY',
    skills: [
      { icon: '🟦', name: 'VS Code', level: 95 },
      { icon: '🎨', name: 'Figma', level: 85 },
      { icon: '📮', name: 'Postman', level: 88 },
    ],
  },
];

const overallXP = 85;

function AnimatedBar({
  level,
  color,
  glowColor,
  animate,
}: {
  level: number;
  color: string;
  glowColor: string;
  animate: boolean;
}) {
  return (
    <div className="skills__bar-track">
      <div
        className="skills__bar-fill"
        style={{
          width: animate ? `${level}%` : '0%',
          background: color,
          boxShadow: `0 0 10px ${glowColor}, 0 0 4px ${glowColor}`,
        }}
      ></div>
    </div>
  );
}

export default function Skills() {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      {/* Header */}
      <div className="skills__header">
        <h2 className="skills__title">SKILLS.JSON</h2>
        <p className="skills__subtitle">
          <span className="skills__cmd-prefix">&gt; </span>
          Technical proficiency across the development stack
        </p>
        <div className="skills__title-underline"></div>
      </div>

      {/* XP Bar */}
      <div className="skills__xp-container">
        <div className="skills__xp-header">
          <span className="skills__xp-label">
            Overall XP Level: <span className="skills__xp-value">{overallXP}/100</span>
          </span>
          <span className="skills__xp-orb"></span>
          <span className="skills__xp-levelup">LEVEL UP!</span>
        </div>
        <div className="skills__xp-track">
          <div
            className="skills__xp-fill"
            style={{ width: animate ? `${overallXP}%` : '0%' }}
          ></div>
        </div>
      </div>

      {/* Skill Categories Grid */}
      <div className="skills__grid">
        {categories.map((cat, i) => (
          <div
            className="skills__card"
            key={i}
            style={{
              '--card-color': cat.color,
              '--card-glow': cat.glowVar,
            } as React.CSSProperties}
            id={`skill-card-${cat.title.toLowerCase()}`}
          >
            {/* Card Header */}
            <div className="skills__card-header">
              <span
                className="skills__card-dot"
                style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
              ></span>
              <h3
                className="skills__card-title"
                style={{ color: cat.color }}
              >
                {cat.title}
              </h3>
            </div>

            {/* Skills List */}
            <div className="skills__card-list">
              {cat.skills.map((skill, j) => (
                <div className="skills__skill-row" key={j}>
                  <div className="skills__skill-info">
                    <span className="skills__skill-icon">{skill.icon}</span>
                    <span className="skills__skill-name">{skill.name}</span>
                    <span
                      className="skills__skill-level"
                      style={{ color: cat.color }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <AnimatedBar
                    level={skill.level}
                    color={cat.color}
                    glowColor={cat.glowVar}
                    animate={animate}
                  />
                </div>
              ))}
            </div>

            {/* Mastery Button */}
            <button
              className="skills__mastery-btn"
              style={{
                borderColor: cat.color,
                color: cat.color,
              }}
            >
              {cat.masteryLabel}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
