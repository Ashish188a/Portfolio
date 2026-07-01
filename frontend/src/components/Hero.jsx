import React from 'react';

const Hero = ({ projectsCount = 0, skillsCount = 0 }) => {
  return (
    <section id="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-status fade-in">
              <span className="status-dot"></span>
              Available for opportunities
            </div>
            <h1 className="hero-name fade-in fade-in-delay-1">
              Ashish<br /><span className="highlight">Kumar Xess</span>
            </h1>
            <p className="hero-role fade-in fade-in-delay-2">// Backend Developer &amp; Problem Solver</p>
            <p className="hero-tagline fade-in fade-in-delay-3">
              Building robust, scalable backend systems with clean architecture.
              Passionate about crafting APIs that power great user experiences.
            </p>
            <div className="hero-btns fade-in fade-in-delay-4">
              <a href="#contact" className="btn-primary"><i className="fas fa-paper-plane"></i> Hire Me</a>
              <a href="#projects" className="btn-outline"><i className="fas fa-code"></i> View Work</a>
            </div>
          </div>
          
          <div className="hero-visual fade-in fade-in-delay-2">
            <div className="hero-card">
              <div className="code-window">
                <div className="code-bar">
                  <span className="dot dot-r"></span>
                  <span className="dot dot-y"></span>
                  <span className="dot dot-g"></span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.7rem', color: 'var(--muted)', marginLeft: '0.5rem' }}>developer.py</span>
                </div>
                <div className="code-body">
                  <span className="c-key">class</span> <span className="c-fn">Developer</span>:<br />
                  &nbsp;&nbsp;<span class="c-key">def</span> <span class="c-fn">__init__</span>(<span class="c-var">self</span>):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span class="c-var">self</span>.name = <span class="c-str">"Ashish"</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span class="c-var">self</span>.stack = [<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-str">"JavaScript"</span>, <span class="c-str">"MongoDB"</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c-str">"GitHub"</span>, <span class="c-str">"Node.js"</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;]<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span class="c-var">self</span>.status = <span class="c-str">"open_to_work"</span><br />
                  <br />
                  <span className="c-cm"># Initializing...</span><br />
                  <span className="c-fn">me</span> = Developer()<span className="typing-cursor"></span>
                </div>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-num">{projectsCount || '2+'}</div>
                  <div className="stat-label">Projects</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">{skillsCount || '5+'}</div>
                  <div className="stat-label">Technologies</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">1</div>
                  <div className="stat-label">Internship</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
