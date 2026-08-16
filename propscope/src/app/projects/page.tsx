import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import ProjectCard from './ProjectCard';
import { desc, eq } from 'drizzle-orm';

export const revalidate = 0; // Dynamic for V1

export default async function ProjectsPage() {
  const allProjects = await db.query.projects.findMany({
    where: eq(schema.projects.isPublished, true),
    with: {
      builder: true,
      sector: true,
      microMarket: true,
      score: true,
      // In a real app we'd filter areaDevelopments by sectorId explicitly, 
      // but for V1 we just fetch all to demonstrate the momentum badge logic easily.
    },
  });

  // Fetch all area developments
  const allDevs = await db.query.areaDevelopments.findMany();

  // Attach developments to projects based on sector/microMarket
  const projectsWithDevs = allProjects.map(p => {
    const devs = allDevs.filter(d => d.sectorId === p.sectorId || d.microMarketId === p.microMarketId);
    return { ...p, areaDevelopments: devs };
  });

  // Sort by composite score by default
  projectsWithDevs.sort((a, b) => {
    const scoreA = parseFloat(a.score?.compositeScore || "0");
    const scoreB = parseFloat(b.score?.compositeScore || "0");
    return scoreB - scoreA;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-black text-2xl tracking-tighter text-slate-900">PROP<span className="text-blue-600">SCOPE</span></div>
          <nav className="flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="text-blue-600">Explore</a>
            <a href="/methodology" className="hover:text-slate-900">Methodology</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Filters Sidebar (Static for now) */}
        <aside className="w-64 shrink-0 hidden md:block">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 sticky top-24">
            <h2 className="font-bold text-lg mb-4">Filters</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="rounded" defaultChecked /> High Rise</label>
                  <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="rounded" /> Low Rise</label>
                  <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="rounded" /> SCO</label>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Micro Market</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="rounded" defaultChecked /> Dwarka Expressway</label>
                  <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="rounded" /> Golf Course Ext.</label>
                  <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="rounded" /> New Gurgaon</label>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Budget</h3>
                <input type="range" className="w-full" />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>₹1 Cr</span>
                  <span>₹10+ Cr</span>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors">
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Project Grid */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Curated Projects</h1>
            <select className="bg-white border border-slate-200 text-sm font-medium rounded-lg px-3 py-2 outline-none">
              <option>Sort by: Score (High to Low)</option>
              <option>Price (Low to High)</option>
              <option>Price (High to Low)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projectsWithDevs.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
          
          {projectsWithDevs.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              No published projects found. Check the admin panel to publish them!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
