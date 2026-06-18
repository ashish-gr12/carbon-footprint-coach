import { GoogleGenerativeAI }
from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY
  );

export async function getAIRecommendations(
  emissionData
) {
  const model =
    genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

  const prompt = `
You are a sustainability expert.

User Emissions:

Transport: ${emissionData.transport}
Flights: ${emissionData.flights}
Electricity: ${emissionData.electricity}
Fuel: ${emissionData.fuel}
LPG: ${emissionData.gas}
Food: ${emissionData.food}
Shopping: ${emissionData.shopping}
Electronics: ${emissionData.electronics}
Travel: ${emissionData.travel}

Return ONLY valid JSON.

{
  "concern": "",
  "recommendations": [
    "",
    "",
    "",
    ""
  ],
  "reduction": ""
}

Do not return markdown.
Do not use code blocks.
Do not explain anything.
Only return JSON.
`;


try {

  const result =
    await model.generateContent(prompt);

  const text =
    result.response.text();

  const cleaned =
    text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

  return JSON.parse(cleaned);

} catch (error) {

  console.error(error);

  return {
    concern:
      "Gemini API quota exceeded.",
    recommendations: [
      "Free daily quota has been reached.",
      "Try again tomorrow.",
      "Or switch to another API key."
    ],
    reduction:
      "Unavailable"
  };
}
}