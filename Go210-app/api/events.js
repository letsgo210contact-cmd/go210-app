export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://serpapi.com/search.json?q=events+San+Antonio+this+week&api_key=${process.env.SERPAPI_KEY}`
    );

    const data = await response.json();

    const events = (data.events_results || []).map((e) => {
      let day = "unknown";

      if (e.date?.start_date) {
        const d = new Date(e.date.start_date);
        day = d.toLocaleDateString("en-US", { weekday: "short" });
      }

      return {
        name: e.title,
        date: e.date?.start_date || "",
        day: day,
        time: e.date?.when || "",
        location: e.address?.[0] || "San Antonio",
        description: e.description || "",
        type: "event",
        free: e.ticket_info?.some(t => t.includes("Free")) || false
      };
    });

    res.status(200).json(events);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
}
