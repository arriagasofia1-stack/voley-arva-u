const EVENT_ID = "-p5ljd";
const PHASE_ID = "wgbo";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD-placeholder",
  databaseURL: "https://copafacil-web-default-rtdb.firebaseio.com",
  projectId: "copafacil-web",
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");

  try {
    const { initializeApp, getApps } = await import("firebase/app");
    const { getDatabase, ref, get } = await import("firebase/database");

    if (!getApps().length) initializeApp(FIREBASE_CONFIG);
    const db = getDatabase();

    const { type } = req.query;

    if (type === "matchs") {
      const snap = await get(ref(db, `events/${EVENT_ID}/matchs`));
      return res.status(200).json(snap.val() || {});
    }

    if (type === "teams") {
      const snap = await get(ref(db, `events/${EVENT_ID}/teams`));
      return res.status(200).json(snap.val() || {});
    }

    if (type === "mset") {
      const snap = await get(ref(db, `events/${EVENT_ID}@${PHASE_ID}/m_set`));
      return res.status(200).json(snap.val() || {});
    }

    const [matchsSnap, teamsSnap, msetSnap] = await Promise.all([
      get(ref(db, `events/${EVENT_ID}/matchs`)),
      get(ref(db, `events/${EVENT_ID}/teams`)),
      get(ref(db, `events/${EVENT_ID}@${PHASE_ID}/m_set`)),
    ]);

    return res.status(200).json({
      matchs: matchsSnap.val(),
      teams:  teamsSnap.val(),
      mset:   msetSnap.val(),
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}