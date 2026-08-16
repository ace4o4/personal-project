import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal, Scale, Plus, Check } from 'lucide-react';
import { properties } from '../data/mockProperties';
import { calculateTruthScore } from '../utils/scoringEngine';

const Explore = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('score-desc');
  const [compareList, setCompareList] = useState([]);

  // Calculate Truth Scores for all properties so we can sort by them
  const enrichedProperties = useMemo(() => {
    return properties.map(p => ({
      ...p,
      calculatedTruthScore: calculateTruthScore(p).score
    }));
  }, []);

  const sortedProperties = useMemo(() => {
    let sorted = [...enrichedProperties];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.priceCr - b.priceCr);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.priceCr - a.priceCr);
        break;
      case 'score-desc':
        sorted.sort((a, b) => b.calculatedTruthScore - a.calculatedTruthScore);
        break;
      case 'yield-desc':
        // Extremely basic string extraction for ROI sorting based on mock data ("12-15% PA" -> 12)
        const getYield = (roiStr) => parseFloat(roiStr.match(/\d+(\.\d+)?/)?.[0] || 0);
        sorted.sort((a, b) => getYield(b.roiEstimate) - getYield(a.roiEstimate));
        break;
      default:
        break;
    }
    return sorted;
  }, [enrichedProperties, sortBy]);

  const toggleCompare = (id) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(pId => pId !== id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 properties at a time.");
        return prev;
      }
      return [...prev, id];
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: compareList.length > 0 ? '120px' : '0' }}>
      
      {/* Navigation & Header */}
      <nav className="animate-pro" style={{ padding: '40px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
        <button onClick={() => navigate('/')} className="btn-minimal" style={{ padding: 0 }}>
          <ArrowLeft size={16} /> HOME
        </button>
        <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '3px', color: 'var(--color-accent)' }}>
          PROPERTY EXPLORER
        </div>
      </nav>

      <main className="container animate-pro delay-100" style={{ padding: '64px 40px', flex: 1, maxWidth: '1600px' }}>
        
        {/* Title and Sort Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
          <div>
            <h1 style={{ fontSize: '4.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', marginBottom: '16px', lineHeight: 1 }}>Explore Assets</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', maxWidth: '600px', fontWeight: 300 }}>
              Browse our curated list of forensic-audited real estate assets. Select up to 3 properties for a side-by-side comparison.
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <SlidersHorizontal size={14} /> Sort By:
            </div>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                appearance: 'none',
                minWidth: '200px'
              }}
            >
              <option value="score-desc">Truth Score (Highest First)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="yield-desc">Projected Yield (Highest First)</option>
            </select>
          </div>
        </div>

        {/* Property Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '40px' }}>
          {sortedProperties.map(p => {
            const isSelected = compareList.includes(p.id);
            return (
              <div key={p.id} className="pro-card" style={{ padding: '0', display: 'flex', flexDirection: 'column', borderRadius: '16px', overflow: 'hidden', border: isSelected ? '2px solid var(--color-accent)' : '1px solid var(--color-border)', background: 'var(--color-surface)', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', transform: isSelected ? 'translateY(-8px)' : 'none', boxShadow: isSelected ? '0 30px 60px rgba(230,194,88,0.15)' : '0 10px 30px rgba(0,0,0,0.5)' }}>
                
                {/* Image & Badges */}
                <div style={{ position: 'relative', height: '280px', width: '100%', borderBottom: '1px solid var(--color-border)' }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: isSelected ? 'none' : 'grayscale(30%) brightness(0.9)', transition: 'all 0.4s ease' }} />
                  
                  {/* Floating Top Badge */}
                  <div style={{ position: 'absolute', top: '24px', left: '24px', background: 'rgba(10,10,12,0.9)', backdropFilter: 'blur(10px)', padding: '10px 20px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(230,194,88,0.4)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-accent)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Truth Score</span>
                    <span style={{ fontSize: '16px', color: 'white', fontWeight: 700 }}>{p.calculatedTruthScore}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '2.4rem', marginBottom: '12px', fontWeight: 400, fontFamily: 'var(--font-serif)', color: 'var(--color-text)', lineHeight: 1.1 }}>{p.name}</h3>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '32px', fontWeight: 500 }}>
                    {p.developer} <span style={{ color: 'var(--color-accent)', margin: '0 8px' }}>•</span> {p.location.split(',')[0]}
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px', padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Ticket Size</div>
                      <div style={{ fontSize: '22px', color: 'white', fontWeight: 400 }}>₹{p.priceCr.toFixed(2)} Cr</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Projected Yield</div>
                      <div style={{ fontSize: '22px', color: 'var(--color-accent)', fontWeight: 400 }}>{p.roiEstimate}</div>
                    </div>
                  </div>

                  {/* Compare Action */}
                  <button 
                    onClick={() => toggleCompare(p.id)}
                    style={{ 
                      width: '100%', marginTop: 'auto', padding: '18px', borderRadius: '12px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                      background: isSelected ? 'var(--color-accent)' : 'transparent',
                      color: isSelected ? '#000' : 'var(--color-accent)',
                      border: isSelected ? 'none' : '1px solid rgba(230,194,88,0.5)',
                      fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '13px',
                      transition: 'all 0.3s ease',
                      boxShadow: isSelected ? '0 10px 20px rgba(230,194,88,0.3)' : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'rgba(230,194,88,0.1)';
                        e.currentTarget.style.border = '1px solid var(--color-accent)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.border = '1px solid rgba(230,194,88,0.5)';
                      }
                    }}
                  >
                    {isSelected ? <><Check size={18} /> Selected for Compare</> : <><Plus size={18} /> Add to Compare</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* Floating Compare Action Bar */}
      {compareList.length > 0 && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, width: '100%', background: 'rgba(28,28,30,0.95)', backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--color-border)', padding: '24px 64px', zIndex: 1000,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          boxShadow: '0 -20px 40px rgba(0,0,0,0.5)',
          animation: 'slideUp 0.3s ease-out'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(230,194,88,0.1)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Scale size={24} />
            </div>
            <div>
              <div style={{ fontSize: '18px', color: 'white', fontWeight: 500, marginBottom: '4px' }}>{compareList.length} {compareList.length === 1 ? 'Property' : 'Properties'} Selected</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Select up to 3 properties to analyze them side-by-side.</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn-minimal" onClick={() => setCompareList([])}>Clear</button>
            <button 
              className="btn-primary" 
              disabled={compareList.length < 2}
              onClick={() => navigate('/compare', { state: { propertyIds: compareList } })}
              style={{ opacity: compareList.length < 2 ? 0.5 : 1, cursor: compareList.length < 2 ? 'not-allowed' : 'pointer' }}
            >
              Compare Assets <ArrowLeft size={16} style={{ transform: 'rotate(180deg)', marginLeft: '8px' }}/>
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default Explore;
