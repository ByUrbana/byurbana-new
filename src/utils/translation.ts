// Utilitário para tradução usando Google Cloud Translation API
import { TRANSLATION_CONFIG } from '../config/env';

export interface TranslationResult {
  translatedText: string;
  detectedSourceLanguage?: string;
}

export async function traduzirTexto(texto: string, idiomaAlvo: string): Promise<string> {
  try {
    const resposta = await fetch(
      `${TRANSLATION_CONFIG.baseUrl}?key=${TRANSLATION_CONFIG.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: texto,
          target: idiomaAlvo,
          source: TRANSLATION_CONFIG.defaultSourceLanguage,
        }),
      }
    );

    if (!resposta.ok) {
      throw new Error(`Erro na API: ${resposta.status} ${resposta.statusText}`);
    }

    const dados = await resposta.json();
    return dados.data.translations[0].translatedText;
  } catch (error) {
    console.error('Erro ao traduzir texto:', error);
    return texto; // Retorna o texto original em caso de erro
  }
}

// Função para traduzir múltiplos textos
export async function traduzirMultiplosTextos(
  textos: string[], 
  idiomaAlvo: string
): Promise<string[]> {
  try {
    const resposta = await fetch(
      `${TRANSLATION_CONFIG.baseUrl}?key=${TRANSLATION_CONFIG.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: textos,
          target: idiomaAlvo,
          source: "es",
        }),
      }
    );

    if (!resposta.ok) {
      throw new Error(`Erro na API: ${resposta.status} ${resposta.statusText}`);
    }

    const dados = await resposta.json();
    return dados.data.translations.map((t: TranslationResult) => t.translatedText);
  } catch (error) {
    console.error('Erro ao traduzir textos:', error);
    return textos; // Retorna os textos originais em caso de erro
  }
}

// Idiomas suportados
export const IDIOMAS_SUPORTADOS = TRANSLATION_CONFIG.supportedLanguages;

export type IdiomaCodigo = keyof typeof IDIOMAS_SUPORTADOS;
