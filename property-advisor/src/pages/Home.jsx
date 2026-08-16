import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bot, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Portal mask transition logic
      if (scrollY < vh * 0.5) {
        setScrollProgress(0);
      } else if (scrollY > vh * 2.5) {
        setScrollProgress(1);
      } else {
        const progress = (scrollY - vh * 0.5) / (vh * 2);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });
    
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-mask, .reveal-mask-left').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/results?q=${encodeURIComponent(query)}`);
    }
  };

  const portalScale = 1 + scrollProgress * 15;
  const portalOpacity = 1 - scrollProgress * 1.5;

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      {/* 1. HERO SECTION */}
      <section style={{ position: 'relative', minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 20px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.2) grayscale(80%)' }}></div>
        
        {/* Glow */}
        <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 60%)', animation: 'spin 20s linear infinite', zIndex: 0, pointerEvents: 'none' }}></div>

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '1000px' }}>
          <div className="data-label" style={{ marginBottom: '32px', letterSpacing: '0.4em', color: 'var(--color-accent)', opacity: 0.8 }}>TRUTH ESTATE ENGINE</div>
          <h1 className="magazine-title reveal" style={{ fontSize: '8.5rem', marginBottom: '50px', lineHeight: 0.9, textShadow: '0 20px 40px rgba(0,0,0,0.8)' }}>EVIDENCE<br/><span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>over</span> illusion.</h1>
          
          <form onSubmit={handleSearch} className="search-bar reveal-scale" style={{ display: 'flex', alignItems: 'center', background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(30px)', border: '1px solid rgba(212,175,55,0.4)', padding: '12px 12px 12px 32px', borderRadius: '60px', width: '100%', maxWidth: '800px', margin: '0 auto 30px', boxShadow: '0 30px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
            <Bot size={28} style={{ color: 'var(--color-accent)', marginRight: '20px' }} />
            <input 
              type="text" 
              placeholder="Ask the engine: '3BHK under 2 Cr with zero litigation...'" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: '20px', outline: 'none', fontWeight: 300, letterSpacing: '0.02em' }}
            />
            <button type="submit" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #AA8000 100%)', color: '#000', border: 'none', padding: '16px 40px', borderRadius: '50px', fontSize: '16px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', boxShadow: '0 10px 30px rgba(212,175,55,0.3)', transition: 'all 0.3s ease' }}>
              <Search size={20} style={{ marginRight: '12px' }} /> Engage
            </button>
          </form>

          <div className="reveal" style={{ marginBottom: '60px' }}>
            <button onClick={() => navigate('/explore')} className="btn-minimal" style={{ fontSize: '13px', borderBottom: '1px solid var(--color-accent)' }}>
              Or explore our directory of forensic-audited assets <ArrowRight size={14} style={{ marginLeft: '8px' }}/>
            </button>
          </div>

          <p className="reveal" style={{ color: 'var(--color-text-muted)', letterSpacing: '0.3em', fontSize: '12px', textTransform: 'uppercase' }}>Scroll to Discover</p>
          <div className="reveal-scale" style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, var(--color-accent), transparent)', margin: '24px auto 0' }}></div>
        </div>
      </section>

      {/* 2. PREMIUM FULL-SCREEN RECTANGLE MASK TRANSITION */}
      <section style={{ position: 'relative', height: '200vh', width: '100%', background: '#000' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          
          <div style={{ position: 'absolute', zIndex: 1, textAlign: 'center', opacity: portalOpacity }}>
            <h2 className="magazine-title" style={{ fontSize: '5rem' }}>THE BROKERAGE <br/><span style={{ color: 'var(--color-accent)' }}>ILLUSION</span></h2>
          </div>

          <div style={{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            background: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000) center/cover',
            clipPath: `inset(${Math.max(0, 35 - scrollProgress * 35)}vh ${Math.max(0, 40 - scrollProgress * 40)}vw round ${Math.max(0, 20 - scrollProgress * 20)}px)`,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: `brightness(${0.4 + scrollProgress * 0.6})`,
            transition: 'clip-path 0.1s ease-out'
          }}>
            <div style={{ opacity: Math.max(0, (scrollProgress - 0.5) * 2), textAlign: 'center', color: 'white', padding: '40px' }}>
               <h2 style={{ fontSize: '8rem', fontFamily: 'var(--font-serif)', lineHeight: 0.9, textShadow: '0 20px 40px rgba(0,0,0,0.8)' }}>Absolute <br/><span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Clarity.</span></h2>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM (CHAOS VS CLARITY) */}
      <section style={{ padding: '200px 40px', width: '100%', background: 'var(--color-bg)', position: 'relative', overflow: 'hidden' }}>
        <div className="reveal-mask" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000)', backgroundSize: 'cover', backgroundAttachment: 'fixed', filter: 'blur(5px)' }}></div>
        <div className="container" style={{ maxWidth: '1200px', position: 'relative', zIndex: 10 }}>
          <div className="reveal data-label" style={{ color: 'var(--color-text-muted)', marginBottom: '40px' }}>The Problem</div>
          <h2 className="reveal" style={{ fontSize: '7rem', fontFamily: 'var(--font-serif)', lineHeight: 0.9, marginBottom: '80px', letterSpacing: '-0.02em' }}>
            The industry is built on <span style={{ color: 'var(--color-accent)', fontStyle: 'italic' }}>marketing.</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
            <div className="reveal-left">
              <p style={{ fontSize: '24px', fontWeight: 300, lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
                90% of real estate buyers rely on advice from entities whose sole financial incentive is to close a transaction. It is a system fundamentally designed to prioritize commissions over truth.
              </p>
            </div>
            <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ fontSize: '14px', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Hidden Litigation</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', fontWeight: 300 }}>Brokers will not tell you if the land title is contested in the National Green Tribunal.</p>
              </div>
              <div style={{ paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ fontSize: '14px', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Fake Yields</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '16px', fontWeight: 300 }}>"Assured Return" schemes are often mathematically impossible marketing gimmicks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INFINITE MARQUEE */}
      <section className="marquee-container" style={{ padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="marquee-content">
          <span>RERA VERIFIED</span><span style={{ color: 'var(--color-accent)', margin: '0 40px' }}>•</span>
          <span>LITIGATION AUDITED</span><span style={{ color: 'var(--color-accent)', margin: '0 40px' }}>•</span>
          <span>DEVELOPER HISTORY CHECKED</span><span style={{ color: 'var(--color-accent)', margin: '0 40px' }}>•</span>
          <span>ROI MATHEMATICALLY MODELED</span><span style={{ color: 'var(--color-accent)', margin: '0 40px' }}>•</span>
          <span>RERA VERIFIED</span><span style={{ color: 'var(--color-accent)', margin: '0 40px' }}>•</span>
          <span>LITIGATION AUDITED</span><span style={{ color: 'var(--color-accent)', margin: '0 40px' }}>•</span>
          <span>DEVELOPER HISTORY CHECKED</span><span style={{ color: 'var(--color-accent)', margin: '0 40px' }}>•</span>
          <span>ROI MATHEMATICALLY MODELED</span><span style={{ color: 'var(--color-accent)', margin: '0 40px' }}>•</span>
        </div>
      </section>

      {/* 5. THE EVALUATION MATRIX (BENTO GRID) */}
      <section className="container" style={{ padding: '160px 20px', width: '100%', position: 'relative' }}>
        {/* Legendary Panning Clouds */}
        <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', backgroundImage: 'url(https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=2000)', backgroundSize: 'cover', opacity: 0.15, filter: 'blur(40px) grayscale(100%)', animation: 'spin 60s linear infinite', zIndex: 0, pointerEvents: 'none' }}></div>
        {/* Golden Radial Glow */}
        <div className="reveal-mask" style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 1, pointerEvents: 'none' }}></div>
        
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px', position: 'relative', zIndex: 10 }}>
          <h2 className="magazine-title" style={{ fontSize: '6rem' }}>Forensic <br/><span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>Evaluation Matrix.</span></h2>
        </div>

        <div className="bento-grid" style={{ position: 'relative', zIndex: 10 }}>
          <div className="glass-panel bento-col-8 reveal-scale" style={{ position: 'relative', overflow: 'hidden', padding: '40px' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                <ShieldCheck size={32} style={{ color: 'var(--color-accent)' }} />
                <span className="data-label">01 / RISK ASSESSMENT</span>
              </div>
              <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '24px' }}>Legal & Litigation Deep Dive</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '18px', lineHeight: 1.6 }}>We scan land registry titles, RERA tribunals, and National Green Tribunal (NGT) records. If a property has pending litigation, our matrix instantly flags it red. We only recommend assets with unassailable titles.</p>
            </div>
          </div>
          <div className="glass-panel bento-col-4 reveal-scale" style={{ transitionDelay: '0.2s', position: 'relative', overflow: 'hidden', padding: '40px' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <span className="data-label" style={{ marginBottom: '24px', display: 'block' }}>02 / DELIVERY</span>
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>Execution Risk</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>We mathematically analyze the developer's historical delivery timelines. We don't trust promises; we trust track records.</p>
            </div>
          </div>
          <div className="glass-panel bento-col-12 reveal-scale" style={{ transitionDelay: '0.4s', position: 'relative', overflow: 'hidden', padding: '40px' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <span className="data-label" style={{ marginBottom: '24px', display: 'block' }}>03 / FINANCIAL MODELING</span>
              <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', marginBottom: '16px', lineHeight: 1.1 }}>5-Year Yield<br/>Projections.</h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>We don't use arbitrary appreciation guesses. We model 5-year capital appreciation curves using localized infrastructure development data (airports, metros, highways) to calculate true ROI.</p>
                </div>
                <div style={{ flex: 1 }}>
                   <svg viewBox="0 0 400 200" style={{ width: '100%', filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.5))' }}>
                      <path d="M0 180 Q 100 180, 200 120 T 400 40" fill="none" stroke="var(--color-accent)" strokeWidth="4" />
                   </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 STORYTELLING: THE PHILOSOPHY (MAGAZINE COVER STYLE) */}
      <section style={{ position: 'relative', minHeight: '120vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg)', overflow: 'hidden' }}>
        
        {/* Full Bleed Parallax Background */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120%', backgroundImage: 'url(https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', filter: 'brightness(0.25) grayscale(80%) sepia(20%) hue-rotate(340deg)', zIndex: 0 }}></div>
        
        {/* Ambient Gradient Overlays */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, #0f0f11 0%, transparent 20%, transparent 80%, #0f0f11 100%)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(ellipse at center, transparent 0%, rgba(15,15,17,0.8) 100%)', zIndex: 1 }}></div>

        {/* Content Container */}
        <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 40px' }}>
          
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '60px' }}>
            <div style={{ width: '80px', height: '1px', background: 'var(--color-accent)' }}></div>
            <span style={{ fontSize: '12px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 600 }}>VOL 1. THE PARADIGM SHIFT</span>
            <div style={{ width: '80px', height: '1px', background: 'var(--color-accent)' }}></div>
          </div>

          <h2 className="reveal-scale" style={{ fontSize: 'clamp(6rem, 12vw, 15rem)', fontFamily: 'var(--font-serif)', lineHeight: 0.85, letterSpacing: '-0.03em', color: 'white', textShadow: '0 30px 60px rgba(0,0,0,0.8)', marginBottom: '40px' }}>
            We refused <br/>
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.4)', textShadow: 'none' }}>to play</span><br/>
            <span style={{ color: 'var(--color-accent)' }}>the game.</span>
          </h2>

          <div className="reveal" style={{ display: 'flex', gap: '80px', maxWidth: '1000px', marginTop: '60px', textAlign: 'left', background: 'rgba(15,15,17,0.4)', backdropFilter: 'blur(20px)', padding: '60px', border: '1px solid rgba(230,194,88,0.2)', borderRadius: '24px', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
            <div style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '40px' }}>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', lineHeight: 2, fontWeight: 300 }}>
                Instead of hiring salesmen to push properties, we built a proprietary forensic engine. We scraped RERA databases, analyzed decades of developer delivery timelines, and audited hidden litigations.
              </p>
            </div>
            <div style={{ flex: 1, paddingLeft: '40px' }}>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', lineHeight: 2, fontWeight: 300 }}>
                We modeled infrastructural appreciation curves using real mathematical data. The result is an advisory platform that doesn't just list real estate—it aggressively, mathematically audits it.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* 7. THE ANATOMY OF TRUTH (BUTTERY SMOOTH PARALLAX) */}
      <section style={{ position: 'relative', width: '100%', background: 'var(--color-bg)' }}>
        {/* Sticky Layer 1 */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}>
             <div className="bg-animated" style={{ width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=2000)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', filter: 'brightness(0.3) grayscale(100%)' }}></div>
          </div>
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '40px' }}>
            <div className="data-label" style={{ color: 'var(--color-accent)', marginBottom: '24px' }}>Layer 01</div>
            <h2 className="reveal-scale" style={{ fontSize: '8rem', fontFamily: 'var(--font-serif)', color: 'white', lineHeight: 0.9, textShadow: '0 20px 40px rgba(0,0,0,0.8)' }}>The <span style={{ fontStyle: 'italic' }}>Title</span></h2>
            <p className="reveal" style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '32px auto 0', fontWeight: 300 }}>We forensically trace land ownership back 30 years to ensure absolute zero encumbrances.</p>
          </div>
        </div>

        {/* Sticky Layer 2 */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, boxShadow: '0 -60px 120px rgba(0,0,0,1)' }}>
             <div className="bg-animated" style={{ animationDelay: '-10s', width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1481253127861-534498168948?auto=format&fit=crop&q=80&w=2000)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', filter: 'brightness(0.4) sepia(20%) hue-rotate(-20deg)' }}></div>
          </div>
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '40px' }}>
            <div className="data-label" style={{ color: 'var(--color-text)', marginBottom: '24px' }}>Layer 02</div>
            <h2 className="reveal-scale" style={{ fontSize: '8rem', fontFamily: 'var(--font-serif)', color: 'white', lineHeight: 0.9, textShadow: '0 20px 40px rgba(0,0,0,0.8)' }}>The <span style={{ fontStyle: 'italic' }}>Blueprint</span></h2>
            <p className="reveal" style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '32px auto 0', fontWeight: 300 }}>We cross-reference RERA sanctioned plans against developer marketing brochures. No surprises.</p>
          </div>
        </div>

        {/* Sticky Layer 3 */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, boxShadow: '0 -60px 120px rgba(0,0,0,1)' }}>
             <div className="bg-animated" style={{ animationDelay: '-20s', width: '100%', height: '100%', backgroundImage: 'url(https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=2000)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', filter: 'brightness(0.3) grayscale(50%)' }}></div>
          </div>
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '40px' }}>
            <div className="data-label" style={{ color: 'var(--color-accent)', marginBottom: '24px' }}>Layer 03</div>
            <h2 className="reveal-scale" style={{ fontSize: '8rem', fontFamily: 'var(--font-serif)', color: 'white', lineHeight: 0.9, textShadow: '0 20px 40px rgba(0,0,0,0.8)' }}>The <span style={{ fontStyle: 'italic' }}>Yield</span></h2>
            <p className="reveal" style={{ fontSize: '20px', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '32px auto 0', fontWeight: 300 }}>Advanced capital appreciation modeling based on verified infrastructural data points.</p>
          </div>
        </div>
      </section>

      {/* 8. THE DATA ENGINE (ANIMATED PREMIUM) */}
      <section style={{ padding: '240px 40px', width: '100%', backgroundColor: '#020202', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        
        {/* Animated Golden Grid & Glow */}
        <div className="animated-grid-bg"></div>
        <div className="premium-pulse-bg" style={{ position: 'absolute', top: '50%', left: '50%', width: '150%', height: '150%', transform: 'translate(-50%, -50%)', zIndex: 0, pointerEvents: 'none' }}></div>
        
        {/* Deep Vignette Fade for seamless blending */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(ellipse at center, transparent 30%, #020202 80%)', zIndex: 1, pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, #000 0%, transparent 20%, transparent 80%, var(--color-bg) 100%)', zIndex: 2, pointerEvents: 'none' }}></div>

        <div className="reveal-mask" style={{ textAlign: 'center', position: 'relative', zIndex: 10, marginBottom: '120px' }}>
          <h2 style={{ fontSize: 'clamp(6rem, 15vw, 14rem)', fontFamily: 'var(--font-serif)', color: 'white', lineHeight: 0.8, letterSpacing: '-0.05em', textShadow: '0 20px 60px rgba(212,175,55,0.4)' }}>100,000+</h2>
          <p style={{ fontSize: '24px', color: 'var(--color-accent)', fontStyle: 'italic', marginTop: '32px', letterSpacing: '0.05em' }}>Data points parsed per property.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', width: '100%', maxWidth: '1200px', position: 'relative', zIndex: 10 }}>
          
          <div className="glass-panel reveal-scale" style={{ textAlign: 'center', padding: '60px 40px' }}>
            <div style={{ fontSize: '5rem', fontFamily: 'var(--font-serif)', color: 'white', marginBottom: '16px' }}>0%</div>
            <div className="data-label" style={{ color: 'var(--color-accent)' }}>Developer Commissions</div>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '24px', fontSize: '15px', lineHeight: 1.8, fontWeight: 300 }}>We accept zero kickbacks. Our algorithms rank assets purely on absolute mathematical yield potential.</p>
          </div>

          <div className="glass-panel reveal-scale" style={{ textAlign: 'center', padding: '60px 40px', transitionDelay: '0.2s' }}>
            <div style={{ fontSize: '5rem', fontFamily: 'var(--font-serif)', color: 'white', marginBottom: '16px' }}>100%</div>
            <div className="data-label" style={{ color: 'var(--color-accent)' }}>Objective Mathematics</div>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '24px', fontSize: '15px', lineHeight: 1.8, fontWeight: 300 }}>No human bias. Every recommendation is backed by localized infrastructural appreciation modeling.</p>
          </div>

          <div className="glass-panel reveal-scale" style={{ textAlign: 'center', padding: '60px 40px', transitionDelay: '0.4s' }}>
            <div style={{ fontSize: '5rem', fontFamily: 'var(--font-serif)', color: 'white', marginBottom: '16px' }}>24/7</div>
            <div className="data-label" style={{ color: 'var(--color-accent)' }}>Forensic Monitoring</div>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '24px', fontSize: '15px', lineHeight: 1.8, fontWeight: 300 }}>Our engines continuously scan RERA databases and NGT tribunals for real-time litigation flags.</p>
          </div>

        </div>
      </section>

      {/* 9. PREMIUM MAGAZINE FOOTER & CTA */}
      <footer style={{ position: 'relative', width: '100%', background: 'radial-gradient(ellipse at bottom, rgba(50, 45, 20, 0.3) 0%, #0f0f11 100%)', borderTop: '1px solid rgba(230,194,88,0.2)', overflow: 'hidden', padding: '140px 40px 40px' }}>
        
        {/* Inline styles for footer animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes watermark-drift {
            0% { transform: translateX(-48%) scale(1); opacity: 0.03; }
            50% { transform: translateX(-52%) scale(1.02); opacity: 0.05; }
            100% { transform: translateX(-48%) scale(1); opacity: 0.03; }
          }
          .footer-link {
            transition: all 0.3s ease;
            position: relative;
            display: inline-block;
          }
          .footer-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 1px;
            bottom: -2px;
            left: 0;
            background-color: var(--color-accent);
            transition: width 0.3s ease;
          }
          .footer-link:hover {
            color: white !important;
            transform: translateX(4px);
          }
          .footer-link:hover::after {
            width: 100%;
          }
        `}} />

        {/* Massive Glowing Watermark */}
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', fontSize: '32vw', fontFamily: 'var(--font-serif)', color: 'rgba(230,194,88,1)', whiteSpace: 'nowrap', zIndex: 0, pointerEvents: 'none', lineHeight: 0.8, textShadow: '0 0 100px rgba(230,194,88,0.2)', animation: 'watermark-drift 20s ease-in-out infinite' }}>TRUTH</div>

        <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '100px' }}>
          
          {/* Top Half: Newsletter & CTA */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '80px', alignItems: 'center' }}>
            <div className="reveal-left">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <div style={{ width: '40px', height: '1px', background: 'var(--color-accent)' }}></div>
                <div className="data-label" style={{ color: 'var(--color-accent)', margin: 0 }}>THE INNER CIRCLE</div>
              </div>
              <h2 style={{ fontSize: '5.5rem', fontFamily: 'var(--font-serif)', color: 'white', lineHeight: 1, marginBottom: '24px', textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>Market Truths. <br/><span style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>No Noise.</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', fontWeight: 300, maxWidth: '450px', lineHeight: 1.6 }}>Join 2,500+ ultra-high-net-worth investors receiving our unfiltered forensic real estate analysis.</p>
            </div>
            
            <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(230,194,88,0.3)', borderRadius: '100px', overflow: 'hidden', padding: '6px 6px 6px 32px', boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)' }}>
                <input type="email" placeholder="ENTER YOUR EMAIL ADDRESS" style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: '13px', letterSpacing: '0.15em', outline: 'none' }} />
                <button style={{ background: 'linear-gradient(135deg, #E6C258 0%, #B89222 100%)', border: 'none', color: '#000', fontSize: '13px', letterSpacing: '0.15em', cursor: 'pointer', fontWeight: 700, padding: '18px 40px', borderRadius: '100px', transition: 'all 0.3s ease', boxShadow: '0 0 20px rgba(230,194,88,0.6)' }}>SUBSCRIBE</button>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em', lineHeight: 1.6, paddingLeft: '24px', borderLeft: '2px solid rgba(230,194,88,0.4)' }}>By subscribing, you agree to our strict no-spam and data privacy policies. We do not share lists with developers.</p>
            </div>
          </div>

          {/* Glowing Separator Line */}
          <div className="reveal" style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(230,194,88,0.4) 50%, transparent 100%)', margin: '20px 0' }}></div>

          {/* Bottom Half: Navigation */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '80px' }}>
            
            <div className="reveal-scale" style={{ transitionDelay: '0.1s' }}>
              <h3 style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', color: 'white', marginBottom: '24px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Truth Estate.</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.8, maxWidth: '300px' }}>An independent, fee-only real estate advisory platform fundamentally redesigning how high-stakes property decisions are made.</p>
            </div>

            <div className="reveal-scale" style={{ transitionDelay: '0.2s' }}>
              <h4 style={{ fontSize: '12px', color: 'var(--color-accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '32px', fontWeight: 600 }}>Platform</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <li><a href="#" className="footer-link" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>TruthGuide Engine</a></li>
                <li><a href="#" className="footer-link" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>Forensic Reports</a></li>
                <li><a href="#" className="footer-link" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>Portfolio Analytics</a></li>
                <li><a href="#" className="footer-link" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>Deal Room</a></li>
              </ul>
            </div>

            <div className="reveal-scale" style={{ transitionDelay: '0.3s' }}>
              <h4 style={{ fontSize: '12px', color: 'var(--color-accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '32px', fontWeight: 600 }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <li><a href="#" className="footer-link" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>Our Philosophy</a></li>
                <li><a href="#" className="footer-link" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>Manifesto</a></li>
                <li><a href="#" className="footer-link" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>Careers</a></li>
                <li><a href="#" className="footer-link" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>Contact</a></li>
              </ul>
            </div>

            <div className="reveal-scale" style={{ transitionDelay: '0.4s' }}>
              <h4 style={{ fontSize: '12px', color: 'var(--color-accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '32px', fontWeight: 600 }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <li><a href="#" className="footer-link" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>Privacy Policy</a></li>
                <li><a href="#" className="footer-link" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>Terms of Service</a></li>
                <li><a href="#" className="footer-link" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '14px' }}>Advisory Disclosures</a></li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '40px', paddingBottom: '40px' }}>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 500 }}>© 2026 TRUTH ESTATE. ALL RIGHTS RESERVED.</div>
            <div style={{ display: 'flex', gap: '24px' }}>
               <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 500 }}>GURUGRAM</div>
               <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-accent)', alignSelf: 'center' }}></div>
               <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 500 }}>NEW DELHI</div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Home;
