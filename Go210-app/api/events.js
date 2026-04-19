{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 export default async function handler(req, res) \{\
  try \{\
    const response = await fetch(\
      `https://serpapi.com/search.json?q=events+San+Antonio+this+week&api_key=$\{process.env.SERPAPI_KEY\}`\
    );\
\
    const data = await response.json();\
\
    const events = (data.events_results || []).map((e) => \{\
      let day = "unknown";\
\
      if (e.date?.start_date) \{\
        const d = new Date(e.date.start_date);\
        day = d.toLocaleDateString("en-US", \{ weekday: "short" \}); // Mon, Tue, etc.\
      \}\
\
      return \{\
        name: e.title,\
        date: e.date?.start_date || "",\
        day: day,\
        time: e.date?.when || "",\
        location: e.address?.[0] || "San Antonio",\
        description: e.description || "",\
        type: "event",\
        free: e.ticket_info?.some(t => t.includes("Free")) || false\
      \};\
    \});\
\
    res.status(200).json(events);\
\
  \} catch (err) \{\
    console.error(err);\
    res.status(500).json(\{ error: "Failed to fetch events" \});\
  \}\
\}}