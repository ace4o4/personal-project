import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertTriangle, Info, Plus } from 'lucide-react';
import { properties } from '../data/mockProperties';

const Compare = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const ids = location.state?.propertyIds || ['p1', 'p2'];
    const selected = properties.filter(p => ids.includes(p.id));
    setItems(selected);
  }, [location]);

  if (items.length === 0) return null;

  const getFlagBadge = (status, text) => {
    if (status === 'clean' || status === 'excellent') {
      return <div className="flag-badge flag-green"><CheckCircle size={12}/> {text}</div>;
    }
    if (status === 'warning') {
      return <div className="flag-badge flag-yellow"><AlertTriangle size={12}/> {text}</div>;
    }
    return <div className="flag-badge flag-red"><AlertTriangle size={12}/> {text}</div>;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav className="animate-pro" style={{ padding: '40px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
        <button onClick={() => navigate('/')} className="btn-minimal" style={{ padding: 0 }}>
          <ArrowLeft size={16} /> NEW QUERY
        </button>
        <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '3px', color: 'var(--color-text-muted)' }}>
          SMART COMPARISON MATRIX
        </div>
      </nav>

      <main className="container animate-pro delay-100" style={{ padding: '64px 40px', flex: 1, maxWidth: '1600px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
          <div>
            <h1 style={{ fontSize: '3rem', color: 'var(--color-text)', marginBottom: '16px' }}>Forensic Evaluation</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', maxWidth: '600px', fontWeight: 300 }}>Side-by-side analysis of your shortlisted assets highlighting critical red and green flags.</p>
          </div>
          <button className="btn-primary" onClick={() => navigate('/portfolio')}>
            Save to Portfolio <Plus size={16} style={{ marginLeft: '8px' }}/>
          </button>
        </div>

        {/* Dynamic Bento Grid based on number of items */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: '32px' }}>
          
          {items.map(p => (
            <div key={p.id} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Asset Header Card */}
              <div className="glass-panel" style={{ padding: '32px', borderTop: '2px solid var(--color-accent)' }}>
                 <div style={{ height: '200px', width: '100%', marginBottom: '24px', borderRadius: '4px', overflow: 'hidden' }}>
                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }} />
                 </div>
                 <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{p.name}</h2>
                 <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>{p.developer} • {p.location}</div>
                 
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                   <div>
                     <div className="data-label">Ticket Size</div>
                     <div className="data-value">₹{p.priceCr.toFixed(2)} Cr</div>
                   </div>
                   <div style={{ textAlign: 'right' }}>
                     <div className="data-label">Truth Score</div>
                     <div className="data-value text-gold" style={{ fontSize: '28px' }}>{p.riskScore * 10}</div>
                   </div>
                 </div>
              </div>

              {/* Bento Row: Legal / RERA */}
              <div className="glass-panel" style={{ padding: '32px' }}>
                <h4 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-text-muted)', marginBottom: '24px' }}>Legal & Compliance</h4>
                
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ marginBottom: '8px' }}>{getFlagBadge(p.litigationHistory.status, p.litigationHistory.status === 'clean' ? 'Clear Title' : 'Litigation Warning')}</div>
                  <p style={{ fontSize: '14px', color: 'var(--color-text)', fontWeight: 300 }}>{p.litigationHistory.detail}</p>
                </div>

                <div>
                  <div style={{ marginBottom: '8px' }}>{getFlagBadge(p.reraStatus.status, 'RERA Checked')}</div>
                  <p style={{ fontSize: '14px', color: 'var(--color-text)', fontWeight: 300 }}>{p.reraStatus.detail}</p>
                </div>
              </div>

              {/* Bento Row: Construction & Value */}
              <div className="glass-panel" style={{ padding: '32px' }}>
                <h4 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-text-muted)', marginBottom: '24px' }}>Execution & Value</h4>
                
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ marginBottom: '8px' }}>{getFlagBadge(p.constructionQuality.status, 'Execution Quality')}</div>
                  <p style={{ fontSize: '14px', color: 'var(--color-text)', fontWeight: 300 }}>{p.constructionQuality.detail}</p>
                </div>

                <div>
                  <div style={{ marginBottom: '8px' }}>{getFlagBadge(p.priceToValueRatio.status, 'Value Ratio')}</div>
                  <p style={{ fontSize: '14px', color: 'var(--color-text)', fontWeight: 300 }}>{p.priceToValueRatio.detail}</p>
                </div>
              </div>

              {/* Bento Row: Financials */}
              <div className="glass-panel" style={{ padding: '32px', background: 'rgba(212, 175, 55, 0.02)', borderColor: 'rgba(212, 175, 55, 0.1)' }}>
                <h4 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-accent)', marginBottom: '24px' }}>Financial Projections</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <div className="data-label">Rate / Sq.Ft</div>
                    <div style={{ fontSize: '18px', color: 'var(--color-text)' }}>₹{p.pricePerSqFt.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="data-label">Projected Yield</div>
                    <div style={{ fontSize: '18px', color: 'var(--color-accent)' }}>{p.roiEstimate}</div>
                  </div>
                </div>
              </div>

            </div>
          ))}

        </div>
      </main>
    </div>
  );
};

export default Compare;
