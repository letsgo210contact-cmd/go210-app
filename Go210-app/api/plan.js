export default async function handler(req, res) {
  try {
    const { location, budget, group, energy, interests, extra } = req.body;

    const prompt = `
You are a fun San Antonio local.

Create a personalized day plan with:
Morning, Afternoon, Evening.

Area: ${location}
Budget: ${budget}
Group: ${group}
Vibe: ${energy}
Interests: ${interests}
Notes: ${extra}
`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5.3",
        input: prompt,
        max_output_tokens: 800
      })
    });

    const data = await response.json();

    res.status(200).json({
      plan: data.output?.[0]?.content?.[0]?.text || "No plan generated."
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to generate plan" });
  }
}
