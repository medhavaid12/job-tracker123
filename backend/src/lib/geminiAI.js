import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

const prompt = `
    You are an expert text parser and extractor. Given a raw job description text blob, extract meaningful data strictly without changing or rephrasing any content. Output ONLY the data in this exact JSON format:

    {
        "job": {
            "title": "",
            "location": "",
            "posted_ago": "",
            "applicants_count": "",
            "employment_type": "",
            "work_location_type": "",
            "skills_match_summary": "",
            "overview": "",
            "qualifications_and_skills": [],
            "roles_and_responsibilities": [],
            "desired_skills": []
        },
        "company": {
            "name": "",
            "industry": "",
            "employee_count": "",
            "linkedin_followers": "",
            "description": "",
            "headquarters_location": ""
        },
        "applicant_insights": {
            "employee_growth_rate": "",
            "education_level_distribution": {
                "bachelor_of_technology": ""
            },
            "seniority_level_distribution": {
                "entry_level": ""
            }
        }
    }

    - Use exact text from the input for each field.
    - For array fields, extract each bullet or list item as a separate string element.
    - If any field cannot be found, leave it as an empty string or empty array.
    - Do not paraphrase or summarize; preserve the original wording exactly.
    - Ignore irrelevant sections.
    - STRICTLY DO NOT respond with anything other than this JSON output.

    Job Data:
  `;

export default async function sendRequest(data) {
  const request = prompt + data.data;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: request }],
      },
    ],
  });

  const textOutput = response.candidates?.[0]?.content?.parts?.[0]?.text;
  const result = textOutput
    .match(/```json\b[\s\S]*?```/)[0]
    .replace(/```json\b|```/g, "")
    .trim();
  return result;
}
