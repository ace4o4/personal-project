import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Clock, Calendar, Rocket, Shield, Activity, TrendingUp, Compass, Layout } from 'lucide-react';

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

  const progress = (step / 4) * 100;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      
      {/* Progress Bar */}
      <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', position: 'fixed', top: 0, left: 0, zIndex: 100 }}>
        <div style={{ width: `${progress}%`, height: '100%', background: 'var(--color-accent)', transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)', boxShadow: '0 0 10px rgba(230,194,88,0.5)' }}></div>
      </div>

      {/* Editorial Navigation */}
      <nav style={{ padding: '40px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <button onClick={prevStep} className="btn-minimal" style={{ padding: 0 }}>
          <ArrowLeft size={16} /> ABORT PROFILING
        </button>
        <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.3em', color: 'var(--color-accent)' }}>
          PHASE 0{step} / 04
        </div>
      </nav>

      {/* Main Content */}
      <main className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-pro" key={step} style={{ maxWidth: '800px', width: '100%', padding: '64px 0' }}>
          
          {step === 1 && (
            <div className="text-center">
              <h2 style={{ fontSize: '4rem', marginBottom: '24px', fontWeight: 400, fontFamily: 'var(--font-serif)', color: 'white' }}>Capital Allocation</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '80px', fontSize: '16px', fontWeight: 300 }}>Define your primary investment boundary for prime asset acquisition.</p>
              
              <div style={{ marginBottom: '64px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', padding: '64px 40px', borderRadius: '24px', boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.5)' }}>
                <div style={{ fontSize: '6rem', fontWeight: 400, fontFamily: 'var(--font-serif)', color: 'var(--color-accent)', marginBottom: '64px', letterSpacing: '-0.02em', textShadow: '0 0 40px rgba(197, 168, 128, 0.15)' }}>
                  ₹{preferences.budget.toFixed(2)} Cr+
                </div>
                <div style={{ padding: '0 40px' }}>
                  <input 
                    type="range" 
                    min="1.5" max="25" step="0.5" 
                    value={preferences.budget}
                    onChange={(e) => updatePreference('budget', parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--color-accent)', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '0.15em' }}>
                    <span>₹1.50 Cr</span>
                    <span>₹25.00 Cr+</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <h2 style={{ fontSize: '4rem', marginBottom: '24px', fontWeight: 400, fontFamily: 'var(--font-serif)', color: 'white' }}>Liquidity Horizon</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '64px', fontSize: '16px', fontWeight: 300 }}>Balancing immediate asset utilization with mid-term capital appreciation.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {[
                  { id: 'immediate', icon: <Clock size={32} />, title: 'Immediate', desc: 'Ready to Move' },
                  { id: '1-2', icon: <Calendar size={32} />, title: '1-2 Years', desc: 'Mid-Term Delivery' },
                  { id: '3+', icon: <Rocket size={32} />, title: '3+ Years', desc: 'Under Construction Alpha' }
                ].map(opt => {
                  const isSelected = preferences.timeline === opt.id;
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => updatePreference('timeline', opt.id)}
                      style={{
                        padding: '40px 24px', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s ease',
                        background: isSelected ? 'rgba(230,194,88,0.05)' : 'rgba(255,255,255,0.02)',
                        border: isSelected ? '1px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.05)',
                        boxShadow: isSelected ? '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(230,194,88,0.1)' : 'none',
                        transform: isSelected ? 'translateY(-8px)' : 'none'
                      }}
                    >
                      <div style={{ color: isSelected ? 'var(--color-accent)' : 'rgba(255,255,255,0.3)', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                        {opt.icon}
                      </div>
                      <h4 style={{ color: 'white', fontSize: '18px', marginBottom: '8px' }}>{opt.title}</h4>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>{opt.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <h2 style={{ fontSize: '4rem', marginBottom: '24px', fontWeight: 400, fontFamily: 'var(--font-serif)', color: 'white' }}>Spatial Protocol</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '64px', fontSize: '16px', fontWeight: 300 }}>Determine the necessity of strict directional compliance (Vastu).</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                {[
                  { id: 'high', icon: <Compass size={32} />, title: 'Strict Compliance', desc: 'Non-Negotiable Vastu adherence for resale liquidity.' },
                  { id: 'flexible', icon: <Layout size={32} />, title: 'Flexible Layout', desc: 'Prioritize architectural efficiency over directional norms.' }
                ].map(opt => {
                  const isSelected = preferences.vastu === opt.id;
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => updatePreference('vastu', opt.id)}
                      style={{
                        padding: '48px 32px', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s ease',
                        background: isSelected ? 'rgba(230,194,88,0.05)' : 'rgba(255,255,255,0.02)',
                        border: isSelected ? '1px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.05)',
                        boxShadow: isSelected ? '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(230,194,88,0.1)' : 'none',
                        transform: isSelected ? 'translateY(-8px)' : 'none'
                      }}
                    >
                      <div style={{ color: isSelected ? 'var(--color-accent)' : 'rgba(255,255,255,0.3)', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                        {opt.icon}
                      </div>
                      <h4 style={{ color: 'white', fontSize: '20px', marginBottom: '12px' }}>{opt.title}</h4>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: 1.5 }}>{opt.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <h2 style={{ fontSize: '4rem', marginBottom: '24px', fontWeight: 400, fontFamily: 'var(--font-serif)', color: 'white' }}>Risk Profile</h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '64px', fontSize: '16px', fontWeight: 300 }}>Define developer execution tolerance versus projected yield multiplier.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                {[
                  { id: 'low', icon: <Shield size={32} />, title: 'Conservative', desc: 'Tier 1 Heritage Builders with proven delivery track records.' },
                  { id: 'high', icon: <TrendingUp size={32} />, title: 'Aggressive', desc: 'Emerging developers with high-yield capital appreciation potential.' }
                ].map(opt => {
                  const isSelected = preferences.riskTolerance === opt.id;
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => updatePreference('riskTolerance', opt.id)}
                      style={{
                        padding: '48px 32px', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s ease',
                        background: isSelected ? 'rgba(230,194,88,0.05)' : 'rgba(255,255,255,0.02)',
                        border: isSelected ? '1px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.05)',
                        boxShadow: isSelected ? '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(230,194,88,0.1)' : 'none',
                        transform: isSelected ? 'translateY(-8px)' : 'none'
                      }}
                    >
                      <div style={{ color: isSelected ? 'var(--color-accent)' : 'rgba(255,255,255,0.3)', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                        {opt.icon}
                      </div>
                      <h4 style={{ color: 'white', fontSize: '20px', marginBottom: '12px' }}>{opt.title}</h4>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: 1.5 }}>{opt.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center' }}>
            <button 
              className="btn-primary" 
              onClick={nextStep} 
              style={{ 
                width: '100%', maxWidth: '400px', padding: '24px', fontSize: '14px', 
                animation: step === 4 ? 'pulse 2s infinite' : 'none',
                boxShadow: step === 4 ? '0 0 40px rgba(230,194,88,0.4)' : 'none'
              }}
            >
              {step === 4 ? 'INITIALIZE FORENSIC ENGINE' : 'CONFIRM SELECTION'} <ChevronRight size={18} style={{ marginLeft: '8px' }} />
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default BuyerDNA;
