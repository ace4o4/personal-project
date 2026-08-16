import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, X, Send, ShieldCheck, AlertTriangle } from 'lucide-react';

const ChatAssistant = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'I am the Truth Engine. I have direct access to RERA tribunals, NGT records, and historical pricing data. What asset or locality would you like me to evaluate today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Mock AI Logic based on PRD requirements
    setTimeout(() => {
      let aiResponse = '';
      const lowerQuery = userMsg.toLowerCase();

      if (lowerQuery.includes('dlf phase 5') || lowerQuery.includes('dlf')) {
        aiResponse = "DLF Phase 5 is currently the most defensible micro-market in Gurugram. However, current secondary trades are pricing in future infrastructure developments prematurely. \n\n<FLAG_GREEN>Zero Litigation Risk</FLAG_GREEN>\n<FLAG_YELLOW>Overvalued by ~8% compared to intrinsic yield</FLAG_YELLOW>";
      } else if (lowerQuery.includes('under 2 cr') || lowerQuery.includes('2cr')) {
        aiResponse = "At a 2 Cr ticket size, I strongly advise against under-construction assets on the Dwarka Expressway due to ongoing RERA delays with Tier-2 developers. I recommend looking at ready-to-move secondary assets in Sector 56 or 57 to mitigate execution risk. \n\n<FLAG_RED>High Execution Risk on Dwarka Expy</FLAG_RED>";
      } else {
        aiResponse = "I have scanned the records for that parameter. While the surface-level marketing looks promising, our forensic data shows a historical 14-month delivery delay average for this developer profile. I would advise caution and strict RERA compliance checks before proceeding.";
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1800);
  };

  const renderText = (text) => {
    const parts = text.split(/(<FLAG_GREEN>.*?<\/FLAG_GREEN>|<FLAG_YELLOW>.*?<\/FLAG_YELLOW>|<FLAG_RED>.*?<\/FLAG_RED>)/g);
    return parts.map((part, i) => {
      if (part.startsWith('<FLAG_GREEN>')) {
        return <div key={i} className="flag-badge flag-green" style={{ display: 'flex', marginTop: '12px' }}><ShieldCheck size={12}/> {part.replace(/<[^>]+>/g, '')}</div>;
      }
      if (part.startsWith('<FLAG_YELLOW>')) {
        return <div key={i} className="flag-badge flag-yellow" style={{ display: 'flex', marginTop: '12px' }}><AlertTriangle size={12}/> {part.replace(/<[^>]+>/g, '')}</div>;
      }
      if (part.startsWith('<FLAG_RED>')) {
        return <div key={i} className="flag-badge flag-red" style={{ display: 'flex', marginTop: '12px' }}><AlertTriangle size={12}/> {part.replace(/<[^>]+>/g, '')}</div>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className={`chat-panel-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="chat-panel" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ padding: '32px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(212,175,55,0.3)' }}>
              <Bot size={20} color="var(--color-accent)" />
            </div>
            <div>
              <h3 style={{ fontSize: '14px', fontFamily: 'var(--font-serif)', letterSpacing: '0.1em' }}>Truth Engine Advisor</h3>
              <div style={{ fontSize: '10px', color: 'var(--color-success)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Online & Regulated</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '16px', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: msg.role === 'ai' ? 'rgba(255,255,255,0.05)' : 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {msg.role === 'ai' ? <Bot size={14} color="var(--color-text)" /> : <User size={14} color="#000" />}
              </div>
              <div style={{ 
                background: msg.role === 'ai' ? 'transparent' : 'rgba(255,255,255,0.05)', 
                border: msg.role === 'ai' ? '1px solid var(--color-border)' : 'none',
                padding: '16px 24px', 
                borderRadius: '12px',
                borderTopLeftRadius: msg.role === 'ai' ? 0 : '12px',
                borderTopRightRadius: msg.role === 'user' ? 0 : '12px',
                maxWidth: '80%',
                fontSize: '14px',
                lineHeight: 1.6,
                color: msg.role === 'user' ? 'var(--color-text)' : 'var(--color-text-muted)',
                whiteSpace: 'pre-wrap'
              }}>
                {renderText(msg.text)}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={14} color="var(--color-text)" />
              </div>
              <div style={{ padding: '16px', fontSize: '12px', color: 'var(--color-accent)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Accessing RERA tribunals...
              </div>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '24px 32px', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg)' }}>
          <form onSubmit={handleSend} style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', borderRadius: '32px', padding: '8px 24px', alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="Ask for an unbiased forensic evaluation..."
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--color-text)', fontSize: '14px', padding: '12px 0' }}
            />
            <button type="submit" disabled={!input.trim() || isTyping} style={{ background: 'none', border: 'none', color: input.trim() ? 'var(--color-accent)' : 'var(--color-text-muted)', cursor: 'pointer' }}>
              <Send size={20} />
            </button>
          </form>
          <div style={{ textAlign: 'center', fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '16px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Data powered by live registry feeds.
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatAssistant;
