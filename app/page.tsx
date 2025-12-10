'use client';

import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import ThemeToggle from './components/ThemeToggle';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [score, setScore] = useState(100);
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState('professor');
  const [apiError, setApiError] = useState('');
  const [judgeFeedback, setJudgeFeedback] = useState('');

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || loading) return;

    setApiError('');

    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: newMessages, persona }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        setApiError("The AI service is unavailable. Please try again in a moment.");
        setLoading(false);
        setMessages([...newMessages, { role: 'assistant', content: "SYSTEM ERROR: Opponent failed to respond." }]);
        return;
      }

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      setScore(data.score);
      setJudgeFeedback(data.reason || '');

    } catch (error) {
      console.error("Fetch Error:", error);
      setApiError("A network or parsing error occurred. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handlePersonaChange = (newPersona: string) => {
    setPersona(newPersona);
    setMessages([]);
    setScore(100);
    setApiError('');
    setJudgeFeedback('');
  }

  return (
    <div className="page-container">
      {/* Main Content Area */}
      <div className="content-scroll">
        <div className="content-inner">
          
          {/* Title and Theme Toggle */}
          <div className="title-row">
            <h1 className="page-title">Debate Simulator</h1>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Link href="/features" className="persona-btn persona-inactive" style={{ transition: 'all 0.3s ease-in-out' }}>ℹ️</Link>
              <ThemeToggle />
            </div>
          </div>
          
          {/* Persona Selector */}
          <div className="persona-selector">
            <button 
              onClick={() => handlePersonaChange('professor')} 
              className={`persona-btn ${persona === 'professor' ? 'persona-active-professor' : 'persona-inactive'}`}
            >
              Professor 🎓
            </button>
            <button 
              onClick={() => handlePersonaChange('troll')} 
              className={`persona-btn ${persona === 'troll' ? 'persona-active-troll' : 'persona-inactive'}`}
            >
              Troll 😈
            </button>
          </div>

          {/* Credibility Score */}
          <div className="score-card">
            <p className="score-label">Your Credibility Score</p>
            <div className="score-bar-bg">
              <div 
                className="score-bar-fill" 
                style={{ 
                  width: `${score}%`,
                  backgroundImage: score > 50 
                    ? 'linear-gradient(to right, #3b82f6, #10b981)' 
                    : 'linear-gradient(to right, #f97316, #ef4444)'
                }} 
              ></div>
            </div>
            <p className="score-value">{score}%</p>
            {judgeFeedback && (
              <div className="judge-feedback">
                <p className="judge-label">🧑‍⚖️ Judge's Reasoning:</p>
                <p className="judge-text">{judgeFeedback}</p>
              </div>
            )}
          </div>

          {/* Chat Messages Container (Scrollable) */}
          <div className="chat-messages-container">
            {messages.length === 0 && (
              <div className="empty-state">
                <p className="empty-title">Start a debate</p>
                <p className="empty-subtitle">Choose an opponent and make your first argument</p>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`message-row ${m.role === 'user' ? 'message-row-user' : 'message-row-assistant'}`}>
                <div className={m.role === 'user' ? 'message-bubble-user' : 'message-bubble-assistant'}>
                  <p className="message-text">{m.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="message-row message-row-assistant">
                <div className="message-bubble-loading">
                  <div className="loading-dots">
                    <div className="dot"></div>
                    <div className="dot dot-delay-1"></div>
                    <div className="dot dot-delay-2"></div>
                  </div>
                </div>
              </div>
            )}

            {apiError && (
              <div className="error-message">
                {apiError}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Area - Fixed Bottom */}
      <div className="input-container">
        <form onSubmit={sendMessage} className="input-form">
          <input 
            className="input-field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your argument..."
            disabled={loading}
          />
          <button 
            type="submit" 
            className={loading ? 'send-btn send-btn-disabled' : 'send-btn'}
            disabled={loading}
          >
            {loading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}