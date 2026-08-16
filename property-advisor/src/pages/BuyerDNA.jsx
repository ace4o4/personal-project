import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft } from 'lucide-react';

const BuyerDNA = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    budget: 8.5,
    timeline: 'immediate',
    vastu: 'flexible',
    riskTolerance: 'low'
  });

  const updatePreference = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else navigate('/results', { state: { preferences } });
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Editorial Navigation */}
      <nav style={{ padding: '40px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
        <button onClick={prevStep} className="btn-minimal" style={{ padding: 0 }}>
          <ArrowLeft size={16} /> ABORT PROFILING
        </button>
        <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '3px', color: 'var(--color-accent)' }}>
          STEP 0{step} / 04
        </div>
      </nav>

      {/* Main Content */}
      <main className="container animate-pro" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '640px', width: '100%', padding: '64px 0' }}>
          
          {step === 1 && (
            <div className="animate-pro text-center">
              <h2 style={{ fontSize: '3.5rem', marginBottom: '24px', fontWeight: 400, color: 'var(--color-text)' }}>Capital Allocation</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '80px', fontSize: '16px', fontWeight: 300 }}>Define your primary investment boundary for prime asset acquisition.</p>
              
              <div style={{ marginBottom: '64px' }}>
                <div style={{ fontSize: '5rem', fontWeight: 400, fontFamily: 'var(--font-serif)', color: 'var(--color-accent)', marginBottom: '64px', letterSpacing: '-0.02em', textShadow: '0 0 24px rgba(197, 168, 128, 0.1)' }}>
                  ₹{preferences.budget.toFixed(2)} Cr+
                </div>
                <div style={{ padding: '0 24px' }}>
                  <input 
                    type="range" 
                    min="4" max="50" step="0.50" 
                    value={preferences.budget}
                    onChange={(e) => updatePreference('budget', parseFloat(e.target.value))}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '0.1em' }}>
                    <span>₹4.00 Cr</span>
                    <span>₹50.00 Cr+</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-pro text-center">
              <h2 style={{ fontSize: '3.5rem', marginBottom: '24px', fontWeight: 400, color: 'var(--color-text)' }}>Liquidity Horizon</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '64px', fontSize: '16px', fontWeight: 300 }}>Balancing immediate asset utilization with mid-term capital appreciation.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '480px', margin: '0 auto' }}>
                {['immediate', '1-2 years', '3+ years'].map(t => {
                  const labels = {
                    'immediate': 'Immediate Transfer (Ready to Move)',
                    '1-2 years': 'Mid-Term Delivery (1-2 Years)',
                    '3+ years': 'Long-Term Alpha (Under Construction)'
                  };
                  const isSelected = preferences.timeline === t;
                  
                  return (
                    <button 
                      key={t}
                      onClick={() => updatePreference('timeline', t)}
                      className={`btn-quiz-option ${isSelected ? 'active' : ''}`}
                      style={{ width: '100%' }}
                    >
                      {labels[t]}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-pro text-center">
              <h2 style={{ fontSize: '3.5rem', marginBottom: '24px', fontWeight: 400, color: 'var(--color-text)' }}>Spatial Protocol</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '64px', fontSize: '16px', fontWeight: 300 }}>Determine the necessity of strict directional compliance (Vastu) for resale liquidity.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '480px', margin: '0 auto' }}>
                <button 
                  onClick={() => updatePreference('vastu', 'high')}
                  className={`btn-quiz-option ${preferences.vastu === 'high' ? 'active' : ''}`}
                  style={{ width: '100%' }}
                >
                  Strict Compliance (Non-Negotiable)
                </button>
                <button 
                  onClick={() => updatePreference('vastu', 'flexible')}
                  className={`btn-quiz-option ${preferences.vastu === 'flexible' ? 'active' : ''}`}
                  style={{ width: '100%' }}
                >
                  Flexible (Prioritize Layout Efficiency)
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-pro text-center">
              <h2 style={{ fontSize: '3.5rem', marginBottom: '24px', fontWeight: 400, color: 'var(--color-text)' }}>Execution Risk Profile</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '64px', fontSize: '16px', fontWeight: 300 }}>Define developer execution tolerance versus projected yield multiplier.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '480px', margin: '0 auto' }}>
                <button 
                  onClick={() => updatePreference('riskTolerance', 'low')}
                  className={`btn-quiz-option ${preferences.riskTolerance === 'low' ? 'active' : ''}`}
                  style={{ width: '100%' }}
                >
                  Conservative (Tier 1 Heritage Builders)
                </button>
                <button 
                  onClick={() => updatePreference('riskTolerance', 'high')}
                  className={`btn-quiz-option ${preferences.riskTolerance === 'high' ? 'active' : ''}`}
                  style={{ width: '100%' }}
                >
                  Aggressive (High Yield Emerging Developers)
                </button>
              </div>
            </div>
          )}

          <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={nextStep} style={{ width: '480px' }}>
              {step === 4 ? 'GENERATE FORENSIC MATCH' : 'CONFIRM SELECTION'} <ChevronRight size={16} />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default BuyerDNA;
