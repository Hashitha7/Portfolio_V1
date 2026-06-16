import projectMail from '../assets/project_mail.png';
import projectWayback from '../assets/project_wayback.png';
import projectDomain from '../assets/project_domain.png';
import projectDiluBeats from '../assets/project_dilubeats.png';
import projectCQGroup from '../assets/project_cqgroup.png';
import projectNeuriox from '../assets/project_neuriox.png';
import './Projects.css';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  status: 'Production' | 'Development' | 'Beta';
  link?: string;
}

const projects: Project[] = [
  {
    title: 'Mail Management Service',
    description:
      'Official domain-based mailbox management system with mailbox request handling and role-based access control.',
    image: projectMail,
    tags: ['React', 'Node.js', 'MongoDB', 'RestAPI', '+1'],
    status: 'Production',
  },
  {
    title: 'Wayback Downloading Machine',
    description:
      'A tool to capture expired domains and download stable archived versions from the Wayback Machine.',
    image: projectWayback,
    tags: ['React', 'Node.js', 'RestAPI', 'Web Sockets'],
    status: 'Production',
  },
  {
    title: 'Domain Rank Checker',
    description:
      'A real-time domain rank checker, tracks Google Top 10 search results and analysise with system db to provide insights on domain performance and..',
    image: projectDomain,
    tags: ['React', 'Node.js', 'REST API', 'Web Sockets'],
    status: 'Production',
  },
  {
    title: 'DILU Beats',
    description:
      'Professional portfolio website for Sri Lankan music producer featuring interactive design and seamless user experience.',
    image: projectDiluBeats,
    tags: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    status: 'Production',
  },
  {
    title: 'CQ Group Landing Page',
    description:
      'Modern, responsive landing page for UK-based IT solutions company with professional design and animations.',
    image: projectCQGroup,
    tags: ['React', 'Vite', 'Tailwind CSS', 'TypeScript'],
    status: 'Production',
  },
  {
    title: 'Neuriox IT Landing Page',
    description:
      'Elegant landing page for freelancing web development company showcasing services and portfolio.',
    image: projectNeuriox,
    tags: ['React', 'Vite', 'Tailwind CSS', 'TypeScript'],
    status: 'Production',
  },
];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      {/* Section Header */}
      <div className="projects__header">
        <h2 className="projects__title">PROJECTS.DIR</h2>
        <p className="projects__subtitle">
          <span className="projects__cmd-prefix">&gt; $ </span>
          ls -la ~/projects | grep -i "innovative"
        </p>
        <div className="projects__title-underline"></div>
      </div>

      {/* Project Grid */}
      <div className="projects__grid">
        {projects.map((project, i) => (
          <article className="projects__card" key={i} id={`project-card-${i}`}>
            {/* Image */}
            <div className="projects__card-image">
              <img src={project.image} alt={project.title} loading="lazy" />
              {/* Status Badge */}
              <span className={`projects__badge projects__badge--${project.status.toLowerCase()}`}>
                {project.status}
              </span>
              {/* Hover Overlay */}
              <div className="projects__card-overlay">
                <span className="projects__card-view">View Project →</span>
              </div>
            </div>

            {/* Content */}
            <div className="projects__card-content">
              <h3 className="projects__card-title">{project.title}</h3>
              <p className="projects__card-desc">{project.description}</p>

              {/* Tags */}
              <div className="projects__card-tags">
                {project.tags.map((tag, j) => (
                  <span className="projects__tag" key={j}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* See More Button */}
      <div className="projects__more">
        <a href="#" className="projects__more-btn" id="see-more-projects">
          SEE MORE PROJECTS <span className="projects__more-arrow">→</span>
        </a>
        <div className="projects__more-line"></div>
      </div>
    </section>
  );
}
