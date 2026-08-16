import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { getScoreBand } from '@/lib/scoring';
import { Building2, MapPin, ExternalLink, Calendar, Scale, Trees, ShieldCheck, Download, Share2 } from 'lucide-react';
import Link from 'next/link';

function ScoreBar({ label, score, weight }: { label: string, score: string | null, weight: number }) {
  const numScore = parseFloat(score || "0");
  const band = getScoreBand(numScore);
  const width = `${(numScore / 10) * 100}%`;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1 font-medium">
        <span className="text-slate-700">{label} <span className="text-slate-400 font-normal text-xs ml-1">({weight}%)</span></span>
        <span style={{ color: band.color }} className="font-bold">{numScore.toFixed(1)}/10</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000"
          style={{ width, backgroundColor: band.color }}
        />
      </div>
    </div>
  );
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await db.query.projects.findFirst({
    where: eq(schema.projects.slug, params.slug),
    with: {
      builder: true,
      sector: true,
      microMarket: true,
      score: true,
    }
  });

  if (!project || !project.isPublished) notFound();

  // Fetch Area Devs for this sector
  const areaDevs = await db.query.areaDevelopments.findMany({
    where: eq(schema.areaDevelopments.sectorId, project.sectorId!)
  });

  const { compositeScore, locationScore, builderScore, layoutScore, densityScore, amenitiesScore, legalScore, valueForMoneyScore } = project.score || {};
  const compScoreNum = parseFloat(compositeScore || "0");
  const compBand = getScoreBand(compScoreNum);
  const heroImage = project.galleryImageUrls?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80';

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/projects" className="font-black text-xl tracking-tighter text-slate-900">
            PROP<span className="text-blue-600">SCOPE</span>
          </Link>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-md">
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-6 px-4">
        {/* Hero Image */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6 shadow-sm border border-slate-200">
          <img src={heroImage} alt={project.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {project.category.replace(/_/g, ' ')}
                </span>
                <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  {project.status.replace(/_/g, ' ')}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
              <p className="text-white/80 flex items-center gap-2 text-sm font-medium">
                <MapPin size={16} /> {project.sector?.name}, {project.microMarket?.name}
                <span className="opacity-50">|</span>
                <Building2 size={16} /> {project.builder?.name}
              </p>
            </div>
            
            <div 
              className="bg-white px-5 py-3 rounded-xl text-center shadow-xl"
              style={{ borderTop: `4px solid ${compBand.color}` }}
            >
              <div className="text-3xl font-black text-slate-900 leading-none">{compScoreNum.toFixed(1)}</div>
              <div className="text-xs font-bold uppercase mt-1 tracking-wider" style={{ color: compBand.color }}>
                {compBand.band}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            
            {/* USP */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-lg text-slate-700 font-medium leading-relaxed italic">
                "{project.uspText}"
              </p>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                {project.detailedDescription}
              </p>
            </div>

            {/* Score Breakdown */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between">
                7-Pillar Score Breakdown
                <Link href="/methodology" className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
                  Methodology <ExternalLink size={12} />
                </Link>
              </h2>
              
              <ScoreBar label="Location & Connectivity" score={locationScore} weight={25} />
              <ScoreBar label="Builder Track Record" score={builderScore} weight={20} />
              <ScoreBar label="Layout & Design" score={layoutScore} weight={18} />
              <ScoreBar label="Density & Spacing" score={densityScore} weight={12} />
              <ScoreBar label="Amenities" score={amenitiesScore} weight={10} />
              <ScoreBar label="Legal Status" score={legalScore} weight={10} />
              <ScoreBar label="Value for Money" score={valueForMoneyScore} weight={5} />
            </div>

            {/* Area Momentum */}
            {areaDevs.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Area Momentum</h2>
                <div className="space-y-4">
                  {areaDevs.map(dev => (
                    <div key={dev.id} className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl">
                      <div className={`p-2 rounded-lg ${dev.impactDirection === 'positive' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                        <TrendingUp size={20} className={dev.impactDirection === 'negative' ? 'rotate-180 text-red-600' : ''} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">{dev.description}</h4>
                        <p className="text-xs text-slate-600 mt-1">{dev.impactNote}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 px-2 py-0.5 rounded text-slate-600">
                            {dev.developmentType.replace(/_/g, ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Facts */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg shrink-0"><Calendar size={18} /></div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Possession Date</div>
                    <div className="text-sm font-semibold text-slate-900">{project.expectedPossessionDate ? new Date(project.expectedPossessionDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg shrink-0"><Trees size={18} /></div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Density</div>
                    <div className="text-sm font-semibold text-slate-900">{project.unitsPerAcre} units/acre</div>
                    <div className="text-xs text-slate-500">{project.openSpacePct}% Open Space</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg shrink-0"><ShieldCheck size={18} /></div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">RERA Status</div>
                    <div className="text-sm font-semibold text-slate-900 line-clamp-1" title={project.reraNumber || ""}>{project.reraNumber || 'Not Registered'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg shrink-0"><Scale size={18} /></div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Legal Title</div>
                    <div className="text-sm font-semibold capitalize text-slate-900">{project.landTitleStatus?.replace(/_/g, ' ')}</div>
                    {project.pendingCourtCases > 0 && <div className="text-xs text-red-500 font-medium">{project.pendingCourtCases} pending cases</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Downloads */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-3">Resources</h3>
              <button className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl border border-slate-200 text-sm font-medium text-slate-700">
                <span className="flex items-center gap-2"><Download size={16} className="text-blue-600" /> Brochure</span>
              </button>
            </div>

            {/* Builder */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-3">Developed By</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-black text-xl text-slate-400">
                  {project.builder?.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{project.builder?.name}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{project.builder?.tier?.replace('_', ' ')}</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-4 line-clamp-3">
                {project.builder?.description || `${project.builder?.name} has ${project.builder?.yearsInBusiness} years of experience with a delivery record of ${project.builder?.onTimeDeliveryPct}%.`}
              </p>
              <Link href={`/builders/${project.builder?.slug}`} className="text-sm font-medium text-blue-600 hover:underline">
                View Builder Profile &rarr;
              </Link>
            </div>

          </div>
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="max-w-4xl mx-auto px-4 mt-12 text-center text-xs text-slate-400">
        PropScope scores are opinions derived from stated criteria and publicly available data. They do not constitute investment advice. All property decisions should involve independent due diligence. PropScope is operated by a RERA-registered broker.
      </footer>
    </div>
  );
}
