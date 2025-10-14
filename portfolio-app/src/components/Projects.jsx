export default function Projects() {
  const projects = [
    {
      title: "Project Alpha",
      description: "A stunning web application that revolutionizes the way users interact with data. Built with modern technologies and best practices.",
      tags: ["React", "TypeScript", "Node.js"]
    },
    {
      title: "Project Beta",
      description: "An innovative machine learning solution that predicts user behavior with unprecedented accuracy using cutting-edge AI algorithms.",
      tags: ["Python", "TensorFlow", "FastAPI"]
    },
    {
      title: "Project Gamma",
      description: "A beautiful mobile-first design system that helps teams build consistent, accessible user interfaces at scale.",
      tags: ["UI/UX", "Figma", "CSS"]
    }
  ];

  return (
    <section id="projects">
      <div className="container">
        <h2 className="section-title fade-in">Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card fade-in">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

