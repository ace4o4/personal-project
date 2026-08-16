import React from 'react';
import { ShieldCheck, ShieldAlert, Activity, Building, Landmark, Target, CheckCircle2 } from 'lucide-react';

const TruthScoreCard = ({ truthData }) => {
  if (!truthData || !truthData.subScores) return null;

  const { score, confidenceTag, subScores } = truthData;

  // Simplified user-friendly names for the pillars
  const pillars = [
    { name: 'Location & Future Growth', score: subScores.location, icon: <Target size={16} /> },
    { name: 'Builder Reliability', score: subScores.developer, icon: <Building size={16} /> },
    { name: 'Build Quality & Timeline', score: subScores.construction, icon: <Activity size={16} /> },
    { name: 'Legal Safety', score: subScores.legal, icon: <Landmark size={16} /> },
    { name: 'Lifestyle & Amenities', score: subScores.usps, icon: <ShieldCheck size={16} /> }
  ];

  const getScoreColor = (val) => {
    if (val >= 85) return '#00E676'; // Bright green for excellent
    if (val >= 70) return '#E6C258'; // Bright Gold for good
    return '#FF3D00'; // Red for warning
  };

  const getSubScoreColor = (val) => {
    if (val >= 8.5) return '#00E676';
    if (val >= 7.0) return '#E6C258';
    return '#FF3D00';
  };

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(145deg, #18181a 0%, #0a0a0a 100%)',
      border: '1px solid rgba(230, 194, 88, 0.3)',
      borderRadius: '24px',
      overflow: 'hidden',
      color: 'white',
      fontFamily: 'var(--font-sans)',
      boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.1)'
    }}>
      
      {/* Background Ambient Glow */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: `radial-gradient(circle, ${getScoreColor(score)}30 0%, transparent 70%)`, filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(230,194,88,0.1) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }}></div>

      {/* Header Area */}
      <div style={{ position: 'relative', zIndex: 10, padding: '48px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <CheckCircle2 size={18} color="var(--color-accent)" />
            <span style={{ fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 700 }}>Unbiased Property Rating</span>
          </div>
          <h3 style={{ fontSize: '42px', fontFamily: 'var(--font-serif)', margin: 0, color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Truth Score</h3>
          <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', marginTop: '12px', maxWidth: '350px', lineHeight: 1.6, fontWeight: 300 }}>Our independent, data-backed assessment of this property's overall quality, safety, and yield potential.</p>
        </div>

        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            width: '120px', height: '120px', borderRadius: '50%', 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.8) 100%)', 
            border: `3px solid ${getScoreColor(score)}`, 
            boxShadow: `0 0 40px ${getScoreColor(score)}60, inset 0 0 20px rgba(0,0,0,0.5)` 
          }}>
            <span style={{ fontSize: '48px', fontFamily: 'var(--font-serif)', lineHeight: 1, color: 'white', fontWeight: 500, textShadow: `0 0 20px ${getScoreColor(score)}80` }}>{score}</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '6px', fontWeight: 600, letterSpacing: '0.1em' }}>OUT OF 100</span>
          </div>
        </div>
      </div>

      {/* Pillars Breakdown */}
      <div style={{ position: 'relative', zIndex: 10, padding: '48px' }}>
        <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'white', marginBottom: '40px', letterSpacing: '0.05em' }}>What makes up this score?</h4>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
          {pillars.map((pillar, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              
              <div style={{ width: '220px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(230,194,88,0.08)', color: 'var(--color-accent)', border: '1px solid rgba(230,194,88,0.2)' }}>
                  {pillar.icon}
                </div>
                <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>{pillar.name}</span>
              </div>

              {/* Progress Bar */}
              <div style={{ flex: 1, height: '8px', background: 'rgba(0,0,0,0.5)', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8)' }}>
                <div style={{ 
                  width: `${(pillar.score / 10) * 100}%`, 
                  height: '100%', 
                  background: `linear-gradient(90deg, ${getSubScoreColor(pillar.score)}99 0%, ${getSubScoreColor(pillar.score)} 100%)`,
                  borderRadius: '4px',
                  boxShadow: `0 0 15px ${getSubScoreColor(pillar.score)}80`
                }}></div>
              </div>

              <div style={{ width: '50px', textAlign: 'right', fontSize: '18px', fontWeight: 600, color: getSubScoreColor(pillar.score), textShadow: `0 0 10px ${getSubScoreColor(pillar.score)}50` }}>
                {pillar.score.toFixed(1)}
              </div>

            </div>
          ))}
        </div>
        
        {confidenceTag === 'High' && (
          <div style={{ marginTop: '48px', padding: '24px 32px', background: 'linear-gradient(90deg, rgba(0, 230, 118, 0.1) 0%, transparent 100%)', borderLeft: '4px solid #00E676', borderRadius: '0 12px 12px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(0, 230, 118, 0.2)', padding: '10px', borderRadius: '50%' }}>
              <ShieldCheck size={24} color="#00E676" />
            </div>
            <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
              <strong style={{ color: '#00E676', display: 'block', fontSize: '16px', marginBottom: '4px' }}>High Confidence Rating</strong> 
              This score is backed by extensively verified RERA filings, title documents, and on-ground analysis.
            </span>
          </div>
        )}
      </div>

    </div>
  );
};

export default TruthScoreCard;
