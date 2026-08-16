import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, MapPin, ExternalLink } from 'lucide-react';
import { calculateMatches, calculateTruthScore } from '../utils/scoringEngine';
import TruthScoreCard from '../components/TruthScoreCard';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!location.state?.preferences) {
      navigate('/dna');
      return;
    }
    const matches = calculateMatches(location.state.preferences);
    setResults(matches);
  }, [location, navigate]);

  if (results.length === 0) return null;

  const topMatch = results[0];
  const otherMatches = results.slice(1, 4);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <nav className="animate-pro" style={{ padding: '40px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
        <button onClick={() => navigate('/dna')} className="btn-minimal" style={{ padding: 0 }}>
          <ArrowLeft size={16} /> REVISE PARAMETERS
        </button>
        <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '3px', color: 'var(--color-accent)' }}>
          INTELLIGENCE REPORT GENERATED
        </div>
      </nav>

      <main className="container" style={{ paddingBottom: '120px' }}>
        <div className="animate-pro delay-100" style={{ textAlign: 'center', marginBottom: '80px', marginTop: '64px' }}>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 400, marginBottom: '24px', color: 'var(--color-text)' }}>The Independent Verdict</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', maxWidth: '600px', margin: '0 auto', fontWeight: 300 }}>
            Based on a multi-point forensic analysis and your strictly designated capital and liquidity parameters.
          </p>
        </div>

        {/* Cinematic Top Match Section (Editorial) */}
        <div className="animate-pro delay-200 pro-card" style={{ padding: 0, marginBottom: '100px', display: 'flex' }}>
          
          <div style={{ width: '45%', position: 'relative' }}>
            <img src={topMatch.image} alt={topMatch.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(18,18,18,0) 0%, rgba(18,18,18,1) 100%)' }} />
          </div>
          
          <div style={{ width: '55%', padding: '64px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--color-accent)', marginBottom: '16px' }}>
                  PRIMARY ASSET RECOMMENDATION
                </div>
                <h2 style={{ fontSize: '3.5rem', marginBottom: '12px', color: 'var(--color-text)' }}>{topMatch.name}</h2>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.05em' }}>
                  <MapPin size={14} color="var(--color-accent)" /> {topMatch.location}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1 }}>{topMatch.matchScore}%</div>
                <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-accent)', marginTop: '8px' }}>Your Fit Score</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginBottom: '48px', paddingBottom: '48px', borderBottom: '1px solid var(--color-border)' }}>
               <div>
                  <div className="data-label">Ticket Size</div>
                  <div className="data-value" style={{ fontSize: '24px' }}>₹{topMatch.priceCr.toFixed(2)} Cr</div>
               </div>
               <div>
                  <div className="data-label">Rate / Sq.Ft</div>
                  <div className="data-value" style={{ fontSize: '24px' }}>₹{topMatch.pricePerSqFt.toLocaleString()}</div>
               </div>
               <div>
                  <div className="data-label">Projected Yield</div>
                  <div className="data-value text-gold" style={{ fontSize: '24px' }}>{topMatch.roiEstimate}</div>
               </div>
            </div>

            <div style={{ marginBottom: '48px', fontStyle: 'italic', color: 'var(--color-text)', borderLeft: '1px solid var(--color-accent)', paddingLeft: '24px', fontSize: '18px', lineHeight: 1.8, fontWeight: 300 }}>
              "{topMatch.verdict}"
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '48px' }}>
              {topMatch.matchFactors.map((factor, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
                    {factor.matched ? <Check size={18} color="var(--color-accent)" /> : <X size={18} color="var(--color-text-muted)" />}
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '4px' }}>{factor.factor}</div>
                    <div style={{ fontSize: '14px', fontWeight: 400 }}>{factor.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-primary" style={{ width: '100%' }}>
              Access Deal Room & Financials <ExternalLink size={16} />
            </button>
          </div>
        </div>

        {/* Truth Score Forensic Breakdown */}
        <div className="animate-pro delay-300" style={{ marginBottom: '120px' }}>
          <TruthScoreCard truthData={calculateTruthScore(topMatch)} />
        </div>

        {/* Secondary Options */}
        <div className="animate-pro delay-400" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', borderBottom: '1px solid var(--color-border)', paddingBottom: '24px' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--color-text)' }}>Secondary Assets</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', letterSpacing: '0.05em' }}>OTHER QUALIFYING ASSETS</p>
        </div>

        <div className="animate-pro delay-400" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
          {otherMatches.map(p => (
            <div key={p.id} className="pro-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', fontWeight: 400, fontFamily: 'var(--font-serif)' }}>{p.name}</h3>
                  <div style={{ fontSize: '11px', color: 'var(--color-accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {p.developer}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', fontWeight: 400, color: 'var(--color-text)' }}>
                    {p.matchScore}%
                  </div>
                  <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>Fit</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="data-label" style={{ marginBottom: 0 }}>Capital Req.</span>
                  <span className="data-value" style={{ fontSize: '15px' }}>₹{p.priceCr.toFixed(2)} Cr</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="data-label" style={{ marginBottom: 0 }}>Execution Risk</span>
                  <span className="data-value" style={{ fontSize: '15px' }}>{p.riskScore}/10</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="data-label" style={{ marginBottom: 0 }}>Timeline</span>
                  <span className="data-value" style={{ fontSize: '15px' }}>{p.possession}</span>
                </div>
              </div>

              <button className="btn-primary" style={{ width: '100%', marginTop: 'auto', padding: '16px' }}>
                View Report
              </button>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
};

export default Results;
