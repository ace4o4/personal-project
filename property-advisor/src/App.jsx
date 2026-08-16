import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BuyerDNA from './pages/BuyerDNA';
import Results from './pages/Results';
import Compare from './pages/Compare';
import Portfolio from './pages/Portfolio';
import Explore from './pages/Explore';
import ChatAssistant from './components/ChatAssistant';
import './App.css';

export const ChatContext = React.createContext();

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ChatContext.Provider value={{ isChatOpen, setIsChatOpen }}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dna" element={<BuyerDNA />} />
            <Route path="/results" element={<Results />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
          
          <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
          
          {/* Global Floating Action Button */}
          {!isChatOpen && (
            <button 
              onClick={() => setIsChatOpen(true)}
              style={{
                position: 'fixed',
                bottom: '40px',
                right: '40px',
                background: 'var(--color-bg)',
                border: '1px solid var(--color-accent)',
                color: 'var(--color-accent)',
                padding: '16px 32px',
                borderRadius: '32px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                zIndex: 999,
                boxShadow: '0 8px 32px rgba(212, 175, 55, 0.15)',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-accent)';
                e.currentTarget.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-bg)';
                e.currentTarget.style.color = 'var(--color-accent)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
              Engage Truth Engine
            </button>
          )}

        </div>
      </Router>
    </ChatContext.Provider>
  );
}

export default App;
