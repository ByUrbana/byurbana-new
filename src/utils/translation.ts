// Utilitário para tradução usando Google Cloud Translation API
import { TRANSLATION_CONFIG } from '../config/env';

export interface TranslationResult {
  translatedText: string;
  detectedSourceLanguage?: string;
}

// Função para decodificar entidades HTML
function decodificarEntidadesHTML(texto: string): string {
  let resultado = texto;
  
  // Substituir entidades numéricas decimais (&#39;, &#34;, etc.)
  resultado = resultado.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(parseInt(dec, 10));
  });
  
  // Substituir entidades hexadecimais (&#x27;, &#x22;, etc.)
  resultado = resultado.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  // Substituir entidades nomeadas comuns
  const entidadesNomeadas: { [key: string]: string } = {
    '&quot;': '"',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&nbsp;': ' '
  };
  
  for (const [entidade, caractere] of Object.entries(entidadesNomeadas)) {
    resultado = resultado.replace(new RegExp(entidade.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), caractere);
  }
  
  return resultado;
}

// Função para corrigir traduções específicas por idioma
function corrigirTraducoesEspecificas(texto: string, idiomaAlvo: string): string {
  let resultado = texto;
  
  // Correções específicas para português
  if (idiomaAlvo === 'pt') {
    // Manter "home" em vez de "Lar"
    resultado = resultado.replace(/\bLar\b/g, 'Home');
    resultado = resultado.replace(/\blar\b/g, 'Home');
    resultado = resultado.replace(/\bLAR\b/g, 'HOME');
  }
  
  return resultado;
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
    let textoTraduzido = dados.data.translations[0].translatedText;
    
    // Decodificar entidades HTML
    textoTraduzido = decodificarEntidadesHTML(textoTraduzido);
    
    // Aplicar correções específicas por idioma
    textoTraduzido = corrigirTraducoesEspecificas(textoTraduzido, idiomaAlvo);
    
    return textoTraduzido;
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
    return dados.data.translations.map((t: TranslationResult) => {
      let textoTraduzido = decodificarEntidadesHTML(t.translatedText);
      textoTraduzido = corrigirTraducoesEspecificas(textoTraduzido, idiomaAlvo);
      return textoTraduzido;
    });
  } catch (error) {
    console.error('Erro ao traduzir textos:', error);
    return textos; // Retorna os textos originais em caso de erro
  }
}

// Idiomas suportados
export const IDIOMAS_SUPORTADOS = TRANSLATION_CONFIG.supportedLanguages;

export type IdiomaCodigo = keyof typeof IDIOMAS_SUPORTADOS;
