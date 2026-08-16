import Link from 'next/link';
import { getScoreBand } from '@/lib/scoring';
import { MapPin, TrendingUp, Building2, Ruler } from 'lucide-react';

export default function ProjectCard({ project }: { project: any }) {
  const { compositeScore } = project.score || {};
  const scoreNum = parseFloat(compositeScore || "0");
  const band = getScoreBand(scoreNum);
  
  // Area Momentum Badge logic
  const areaDevs = project.areaDevelopments || [];
  let positiveCount = 0;
  let negativeCount = 0;
  areaDevs.forEach((dev: any) => {
    if (dev.impactDirection === 'positive') positiveCount++;
    else if (dev.impactDirection === 'negative') negativeCount++;
  });
  
  let momentumBadge = null;
  if (positiveCount > negativeCount) {
    momentumBadge = <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-1"><TrendingUp size={12} /> Area Improving</span>;
  } else if (negativeCount > positiveCount) {
    momentumBadge = <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-800 rounded-full flex items-center gap-1"><TrendingUp size={12} className="rotate-180" /> Area Concerns</span>;
  } else if (positiveCount > 0) {
    momentumBadge = <span className="text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-1">Area Mixed</span>;
  }

  const imageUrl = project.galleryImageUrls?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80';

  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative h-48 bg-slate-100">
          <img src={imageUrl} alt={project.name} className="w-full h-full object-cover" />
          
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <div 
              className="px-3 py-1.5 rounded-lg shadow-sm font-bold text-white flex items-center gap-2"
              style={{ backgroundColor: band.color }}
            >
              <span className="text-lg">{scoreNum.toFixed(1)}</span>
              <span className="text-xs font-medium opacity-90 uppercase tracking-wider">{band.band}</span>
            </div>
          </div>

          <div className="absolute top-3 right-3">
            {momentumBadge}
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{project.name}</h3>
              <p className="text-sm text-slate-500 font-medium flex items-center gap-1">
                <Building2 size={14} /> {project.builder?.name}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Starts From</span>
              <span className="text-lg font-bold text-slate-900">₹{(parseFloat(project.minTicketSize) / 10000000).toFixed(2)} Cr</span>
            </div>
          </div>

          <p className="text-slate-600 text-sm mb-4 line-clamp-2">{project.uspText}</p>

          <div className="flex items-center gap-4 text-sm text-slate-600 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1.5">
              <MapPin size={16} className="text-slate-400" />
              <span>{project.sector?.name}, {project.microMarket?.name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ruler size={16} className="text-slate-400" />
              <span className="capitalize">{project.category.replace(/_/g, ' ')}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
