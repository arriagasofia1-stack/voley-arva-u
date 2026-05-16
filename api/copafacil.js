const EVENT_ID = "-p5ljd";
const PHASE_ID = "wgbo";
const DB_URL   = "https://copafacil-web-default-rtdb.firebaseio.com";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");

  const { type } = req.query;

  try {
    if (type === "explore") {
      const r = await fetch(`${DB_URL}/events/${EVENT_ID}.json?shallow=true`);
      const data = await r.json();
      return res.status(200).json(data);
    }
    if (type === "standing") {
      const paths = [
        `/events/${EVENT_ID}@${PHASE_ID}/standing.json`,
        `/events/${EVENT_ID}/standing.json`,
        `/events/${EVENT_ID}@${PHASE_ID}/standings.json`,
        `/events/${EVENT_ID}/standings.json`,
      ];
      for (const path of paths) {
        const r = await fetch(`${DB_URL}${path}`);
        const json = await r.json();
        if (json && !json.error) return res.status(200).json({ path, data: json });
      }
      return res.status(404).json({ error: "not found" });
    }
    if (type === "teams") {
      const r = await fetch(`${DB_URL}/events/${EVENT_ID}/teams.json?shallow=true`);
      return res.status(200).json(await r.json());
    }
    if (type === "matchs") {
      const r = await fetch(`${DB_URL}/events/${EVENT_ID}/matchs.json`);
      return res.status(200).json(await r.json());
    }
    const [matchsR, exploreR] = await Promise.all([
      fetch(`${DB_URL}/events/${EVENT_ID}/matchs.json`),
      fetch(`${DB_URL}/events/${EVENT_ID}.json?shallow=true`),
    ]);
    return res.status(200).json({ matchs: await matchsR.json(), structure: await exploreR.json() });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
