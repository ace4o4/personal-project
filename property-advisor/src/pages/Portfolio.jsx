import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { properties } from '../data/mockProperties';
import { calculateTruthScore } from '../utils/scoringEngine';

const Portfolio = () => {
  const navigate = useNavigate();
  // Simulate saved properties
  const savedAssets = properties.slice(0, 2); 

  // Compute aggregated portfolio ROI over 5 years
  const aggregateData = savedAssets[0].projectedROI.map((point, index) => {
    let totalValue = 0;
    savedAssets.forEach(asset => {
      totalValue += asset.projectedROI[index].value;
    });
    return {
      year: point.year,
      value: Number(totalValue.toFixed(2))
    };
  });

  const totalCurrentValue = aggregateData[0].value;
  const totalProjectedValue = aggregateData[aggregateData.length - 1].value;
  const growthPercentage = (((totalProjectedValue - totalCurrentValue) / totalCurrentValue) * 100).toFixed(1);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel" style={{ padding: '16px', border: '1px solid var(--color-accent)' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Year {label}</p>
          <p style={{ color: 'var(--color-text)', fontSize: '18px', fontWeight: 500 }}>₹{payload[0].value} Cr</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav className="animate-pro" style={{ padding: '40px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
        <button onClick={() => navigate('/')} className="btn-minimal" style={{ padding: 0 }}>
          <ArrowLeft size={16} /> DASHBOARD
        </button>
        <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '3px', color: 'var(--color-accent)' }}>
          CLIENT PORTFOLIO
        </div>
      </nav>

      <main className="container animate-pro delay-100" style={{ padding: '64px 40px', flex: 1 }}>
        <div style={{ marginBottom: '64px' }}>
          <h1 style={{ fontSize: '3rem', color: 'var(--color-text)', marginBottom: '16px' }}>Asset Projections</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', fontWeight: 300 }}>Automated 5-year valuation modelling based on micro-market historical trends.</p>
        </div>

        <div className="bento-grid">
          
          {/* Main Chart Card */}
          <div className="bento-col-8 glass-panel" style={{ padding: '48px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px' }}>
              <div>
                <div className="data-label">Combined Portfolio Value (Projected 2028)</div>
                <div style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', lineHeight: 1 }}>₹{totalProjectedValue} Cr</div>
              </div>
              <div style={{ background: 'rgba(42, 125, 67, 0.1)', border: '1px solid rgba(42, 125, 67, 0.3)', color: '#5EE082', padding: '12px 24px', borderRadius: '32px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600 }}>
                <TrendingUp size={16} /> +{growthPercentage}% Yield
              </div>
            </div>

            <div style={{ flex: 1, minHeight: '300px', width: '100%', marginLeft: '-20px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={aggregateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.2)" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} tickFormatter={(val) => `₹${val}Cr`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="value" stroke="var(--color-accent)" strokeWidth={3} dot={{ fill: 'var(--color-bg)', stroke: 'var(--color-accent)', strokeWidth: 2, r: 6 }} activeDot={{ r: 8, fill: 'var(--color-accent)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Individual Assets */}
          <div className="bento-col-4" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '32px', flex: 1 }}>
               <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-text-muted)', marginBottom: '32px' }}>Tracked Assets</h3>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                 {savedAssets.map(asset => {
                   const truthData = calculateTruthScore(asset);
                   return (
                   <div key={asset.id} style={{ display: 'flex', gap: '16px', alignItems: 'center', paddingBottom: '24px', borderBottom: '1px solid var(--color-border)' }}>
                     <div style={{ width: '64px', height: '64px', borderRadius: '4px', overflow: 'hidden' }}>
                       <img src={asset.image} alt={asset.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                     </div>
                     <div style={{ flex: 1 }}>
                       <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--color-text)' }}>{asset.name}</div>
                       <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>Current: ₹{asset.priceCr} Cr</div>
                     </div>
                     <div style={{ textAlign: 'right' }}>
                       <div style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', color: 'var(--color-accent)', lineHeight: 1 }}>{truthData.score}</div>
                       <div style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginTop: '4px' }}>Truth Score</div>
                     </div>
                   </div>
                 )})}
               </div>

               <button onClick={() => navigate('/')} className="btn-quiz-option" style={{ width: '100%', marginTop: '32px', padding: '16px' }}>
                 + Add Asset
               </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Portfolio;
