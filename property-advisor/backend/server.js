import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, 'database.sqlite');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Helper for DB queries
const queryDB = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// GET /api/explore - Fetch with sorting and pagination
app.get('/api/explore', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'score-desc';

    let orderClause = 'ORDER BY truthScore DESC';
    if (sortBy === 'price-asc') orderClause = 'ORDER BY priceCr ASC';
    else if (sortBy === 'price-desc') orderClause = 'ORDER BY priceCr DESC';
    else if (sortBy === 'yield-desc') orderClause = 'ORDER BY numericYield DESC';

    const sql = `SELECT * FROM properties ${orderClause} LIMIT ? OFFSET ?`;
    const countSql = `SELECT COUNT(*) as count FROM properties`;

    const rows = await queryDB(sql, [limit, offset]);
    const countResult = await queryDB(countSql);
    const totalItems = countResult[0].count;

    // Transform flat DB rows back to nested objects for frontend compatibility
    const properties = rows.map(row => ({
      id: row.id,
      name: row.name,
      developer: row.developer,
      location: row.location,
      priceCr: row.priceCr,
      sizeSqFt: row.sizeSqFt,
      pricePerSqFt: row.pricePerSqFt,
      type: row.type,
      possession: row.possession,
      riskScore: row.riskScore,
      vastuScore: row.vastuScore,
      sunlightScore: row.sunlightScore,
      roiEstimate: row.roiEstimate,
      amenities: row.amenities.split('|'),
      verdict: row.verdict,
      image: row.image,
      litigationHistory: { status: row.litigationStatus, detail: row.litigationDetail },
      constructionQuality: { status: row.constructionStatus, detail: row.constructionDetail },
      priceToValueRatio: { status: row.valueStatus, detail: row.valueDetail },
      connectivity: { status: row.connectivityStatus, detail: row.connectivityDetail },
      reraStatus: { status: row.reraStatus, detail: row.reraDetail },
      confidenceTag: row.confidenceTag,
      subScores: {
        location: row.scoreLocation,
        developer: row.scoreDeveloper,
        construction: row.scoreConstruction,
        legal: row.scoreLegal,
        usps: row.scoreUsps
      },
      calculatedTruthScore: row.truthScore
    }));

    res.json({
      data: properties,
      pagination: {
        total: totalItems,
        page,
        limit,
        totalPages: Math.ceil(totalItems / limit)
      }
    });
  } catch (error) {
    console.error("Error in /api/explore:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/recommend - Algorithmic Matching for Buyer DNA
app.post('/api/recommend', async (req, res) => {
  try {
    const preferences = req.body;
    // We fetch all properties to run the JS-based matching engine 
    // (In production, this would be a complex SQL query or vector search)
    const sql = `SELECT * FROM properties`;
    const rows = await queryDB(sql);
    
    let scoredProperties = rows.map(row => {
      let score = 0;
      let matchFactors = [];
      
      // Ticket Size Matching
      if (preferences.budget === '1-3' && row.priceCr >= 1 && row.priceCr <= 3) { score += 30; matchFactors.push({ factor: 'Capital', text: 'Perfect ticket size match.', matched: true }); }
      else if (preferences.budget === '3-5' && row.priceCr >= 3 && row.priceCr <= 5) { score += 30; matchFactors.push({ factor: 'Capital', text: 'Perfect ticket size match.', matched: true }); }
      else if (preferences.budget === '5-10' && row.priceCr >= 5 && row.priceCr <= 10) { score += 30; matchFactors.push({ factor: 'Capital', text: 'Perfect ticket size match.', matched: true }); }
      else if (preferences.budget === '10+' && row.priceCr >= 10) { score += 30; matchFactors.push({ factor: 'Capital', text: 'Perfect ticket size match.', matched: true }); }
      else { matchFactors.push({ factor: 'Capital', text: 'Outside optimal budget range.', matched: false }); }

      // Timeline Matching
      if (preferences.timeline === 'ready' && row.possession === 'Ready to Move') { score += 30; matchFactors.push({ factor: 'Timeline', text: 'Ready possession verified.', matched: true }); }
      else if (preferences.timeline === '1-2' && row.possession.includes('2025')) { score += 30; matchFactors.push({ factor: 'Timeline', text: 'Matches 1-2 year timeline.', matched: true }); }
      else if (preferences.timeline === '3+' && (row.possession.includes('2026') || row.possession.includes('2027'))) { score += 30; matchFactors.push({ factor: 'Timeline', text: 'Long-term play matched.', matched: true }); }
      else { matchFactors.push({ factor: 'Timeline', text: 'Possession timeline mismatch.', matched: false }); }

      // Priority Matching
      if (preferences.priority === 'roi' && row.numericYield >= 10) { score += 40; matchFactors.push({ factor: 'Yield', text: 'High yield asset confirmed.', matched: true }); }
      else if (preferences.priority === 'end-use' && row.vastuScore > 8) { score += 40; matchFactors.push({ factor: 'End Use', text: 'Premium livability and Vastu.', matched: true }); }
      else if (preferences.priority === 'safety' && row.riskScore > 9) { score += 40; matchFactors.push({ factor: 'Risk', text: 'Zero execution risk.', matched: true }); }
      else { matchFactors.push({ factor: 'Objective', text: 'Secondary objective alignment.', matched: false }); }

      // Transform object
      const property = {
        id: row.id,
        name: row.name,
        developer: row.developer,
        location: row.location,
        priceCr: row.priceCr,
        sizeSqFt: row.sizeSqFt,
        pricePerSqFt: row.pricePerSqFt,
        type: row.type,
        possession: row.possession,
        riskScore: row.riskScore,
        vastuScore: row.vastuScore,
        sunlightScore: row.sunlightScore,
        roiEstimate: row.roiEstimate,
        amenities: row.amenities.split('|'),
        verdict: row.verdict,
        image: row.image,
        litigationHistory: { status: row.litigationStatus, detail: row.litigationDetail },
        constructionQuality: { status: row.constructionStatus, detail: row.constructionDetail },
        priceToValueRatio: { status: row.valueStatus, detail: row.valueDetail },
        connectivity: { status: row.connectivityStatus, detail: row.connectivityDetail },
        reraStatus: { status: row.reraStatus, detail: row.reraDetail },
        confidenceTag: row.confidenceTag,
        subScores: { location: row.scoreLocation, developer: row.scoreDeveloper, construction: row.scoreConstruction, legal: row.scoreLegal, usps: row.scoreUsps },
        calculatedTruthScore: row.truthScore,
        matchScore: score,
        matchFactors
      };
      return property;
    });

    // Sort by match score and then by truth score
    scoredProperties.sort((a, b) => {
      if (b.matchScore === a.matchScore) return b.calculatedTruthScore - a.calculatedTruthScore;
      return b.matchScore - a.matchScore;
    });

    res.json({ data: scoredProperties.slice(0, 4) });
  } catch (error) {
    console.error("Error in /api/recommend:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Truth Engine Backend running at http://localhost:${port}`);
});
