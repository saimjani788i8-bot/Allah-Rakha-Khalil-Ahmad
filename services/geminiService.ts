
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSmartSearchRecommendations(query: string, products: Product[]) {
  const productListContext = products.map(p => `${p.name} (${p.category})`).join(', ');
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the user's query: "${query}", which of the following products are most relevant? 
    Products available: ${productListContext}.
    Provide the response as a JSON array of product names only.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  try {
    const recommendedNames = JSON.parse(response.text);
    return products.filter(p => recommendedNames.includes(p.name));
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return [];
  }
}

export async function getBusinessInsight(salesData: any) {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze these recent sales: ${JSON.stringify(salesData)}. Provide a brief 2-sentence business insight for the retailer to improve profit.`,
  });
  return response.text;
}
