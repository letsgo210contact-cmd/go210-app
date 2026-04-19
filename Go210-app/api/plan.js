{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 export default async function handler(req, res) \{\
  try \{\
    const \{ location, budget, group, energy, interests, extra \} = req.body;\
\
    const prompt = `\
You are a fun, in-the-know San Antonio local.\
\
Create a personalized plan for the user. It can be for TODAY or THIS WEEKEND depending on what makes sense.\
\
Include:\
- Real San Antonio areas (Pearl, Southtown, Downtown, The Rim, etc.)\
- Specific types of places (coffee, tacos, patios, bars, activities)\
- A mix of chill + fun options based on their vibe\
\
User preferences:\
Area: $\{location || "San Antonio"\}\
Budget: $\{budget\}\
Group: $\{group\}\
Vibe: $\{energy\}\
Interests: $\{interests\}\
Notes: $\{extra || "none"\}\
\
Format it like this:\
\
DAY PLAN\
\
Morning:\
- (what to do + where)\
\
Afternoon:\
- (what to do + where)\
\
Evening:\
- (what to do + where)\
\
Make it feel local, fun, and realistic\'97not generic.\
`;\
\
    const response = await fetch("https://api.openai.com/v1/responses", \{\
      method: "POST",\
      headers: \{\
        "Authorization": `Bearer $\{process.env.OPENAI_API_KEY\}`,\
        "Content-Type": "application/json"\
      \},\
      body: JSON.stringify(\{\
        model: "gpt-5.3",\
        input: prompt,\
        max_output_tokens: 800\
      \})\
    \});\
\
    const data = await response.json();\
\
    const text = data.output?.[0]?.content?.[0]?.text || "No plan generated.";\
\
    res.status(200).json(\{ plan: text \});\
\
  \} catch (error) \{\
    console.error(error);\
    res.status(500).json(\{ error: "Something went wrong building the plan." \});\
  \}\
\}}