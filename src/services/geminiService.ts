import { GoogleGenAI } from "@google/genai";
import { Property } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function analyzeProperty(property: Partial<Property>) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        Você é um especialista em investimentos rurais e agronegócio.
        Analise a seguinte propriedade e forneça um resumo estratégico para um potencial comprador/investidor.
        
        Propriedade: ${property.title}
        Localização: ${property.city}, ${property.state}
        Área: ${property.totalArea} ${property.areaUnit}
        Preço: R$ ${property.totalPrice}
        Aptidões: ${property.aptitudes?.join(', ')}
        Descrição: ${property.description}
        
        Forneça:
        1. Pontos Fortes (Até 3)
        2. Perfil Ideal de Comprador
        3. Estimativa de Potencial Produtivo (baseado na região e aptidões)
        4. Sugestão estratégica de negociação.
        
        Responda em formato JSON estruturado.
      `,
    });
    
    const text = response.text;
    if (!text) return { error: 'No response from AI' };
    
    // Attempt to parse JSON from text (handling potential markdown formatting)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return { error: 'Could not parse analysis' };
  } catch (error) {
    console.error('Error analyzing property:', error);
    return null;
  }
}

