export default function About() {
  return (
    <section id="about">
      <div className="container">
        <h2 className="section-title fade-in">About Me</h2>
        <div className="about-content">
          <div className="about-text fade-in">
            <p>
              Hey there! I'm a passionate developer who loves creating beautiful, 
              functional digital experiences. I believe that great design and clean 
              code go hand in hand.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, 
              contributing to open source, or sharing knowledge with the community.
            </p>
            <div className="skills">
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">React</span>
              <span className="skill-tag">Python</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">UI/UX</span>
              <span className="skill-tag">Machine Learning</span>
            </div>
          </div>
          <div className="about-image fade-in">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="80" fill="url(#grad1)" opacity="0.6"/>
              <path d="M100 40 L140 160 L60 160 Z" fill="url(#grad1)" opacity="0.8"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

