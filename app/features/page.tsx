'use client';

import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';

export default function FeaturesPage() {
  return (
    <div className="page-container">
      <div className="content-scroll">
        <div className="content-inner">
          
          {/* Title and Theme Toggle */}
          <div className="title-row">
            <h1 className="page-title">Features</h1>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Link href="/" className="persona-btn persona-inactive" style={{ transition: 'all 0.3s ease-in-out' }}>🏠</Link>
              <ThemeToggle />
            </div>
          </div>

          {/* Features List */}
          <div className="features-grid">
            
            {/* Professor Feature */}
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h2 className="feature-title">Professor Mode</h2>
              <p className="feature-description">
                Debate against a rigorous academic opponent who values logic, evidence, and structured arguments. 
                The Professor will challenge weak reasoning, demand citations, and expect well-formed premises. 
                Perfect for sharpening your critical thinking and learning to build solid, fact-based arguments.
              </p>
            </div>

            {/* Troll Feature */}
            <div className="feature-card">
              <div className="feature-icon">😈</div>
              <h2 className="feature-title">Troll Mode</h2>
              <p className="feature-description">
                Face off against an internet troll who uses sarcasm, logical fallacies, and bad-faith arguments. 
                This mode tests your patience and ability to stay composed under provocation. 
                Learn to identify common debate traps like ad hominem attacks, straw man arguments, and red herrings.
              </p>
            </div>

            {/* Credibility Score Feature */}
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h2 className="feature-title">Credibility Score</h2>
              <p className="feature-description">
                Your credibility score (0-100%) reflects the strength of your arguments throughout the debate. 
                It increases when you present solid evidence, logical reasoning, and coherent points. 
                It decreases when you use fallacies, make unsubstantiated claims, or contradict yourself. 
                Watch the gradient bar change color based on your performance!
              </p>
            </div>

            {/* Judge's Reasoning Feature */}
            <div className="feature-card">
              <div className="feature-icon">🧑‍⚖️</div>
              <h2 className="feature-title">Judge's Reasoning</h2>
              <p className="feature-description">
                After each exchange, an AI judge analyzes your argument and explains why your credibility score changed. 
                This real-time feedback helps you understand what made your argument strong or weak. 
                You'll see specific insights like "Lack of evidence," "Strong logical structure," or "Emotional appeal without facts."
              </p>
            </div>

          </div>

          {/* Call to Action */}
          <div className="cta-section">
            <h3 className="cta-title">Ready to test your debate skills?</h3>
            <Link href="/" className="cta-button">Start Debating</Link>
          </div>

        </div>
      </div>
    </div>
  );
}
