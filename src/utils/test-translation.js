// Script de teste para verificar se a tradução está funcionando
// Execute este script no console do navegador para testar

async function testTranslation() {
  console.log('🧪 Testando sistema de tradução...');
  
  // Verificar se os elementos com data-translate existem
  const elementsToTranslate = document.querySelectorAll('[data-translate]');
  console.log(`📊 Encontrados ${elementsToTranslate.length} elementos para traduzir`);
  
  // Verificar se a API está configurada
  const apiKey = 'AIzaSyCO7eGtQ0JEuQ3PAqlOAWBM67HrZB2MVBQ';
  console.log('🔑 Chave da API configurada:', apiKey ? '✅' : '❌');
  
  // Testar tradução de um texto simples
  try {
    const testText = 'Hola mundo';
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: testText,
          target: 'pt',
          source: 'es',
        }),
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Teste de API bem-sucedido:', data.data.translations[0].translatedText);
    } else {
      console.log('❌ Erro na API:', response.status, response.statusText);
    }
  } catch (error) {
    console.log('❌ Erro no teste:', error);
  }
  
  // Verificar se o seletor de idioma existe
  const languageSelector = document.getElementById('language-select');
  console.log('🌍 Seletor de idioma:', languageSelector ? '✅ Encontrado' : '❌ Não encontrado');
  
  // Verificar localStorage
  const savedLanguage = localStorage.getItem('idioma-preferido');
  console.log('💾 Idioma salvo:', savedLanguage || 'Nenhum');
  
  console.log('🎯 Teste concluído!');
}

// Executar teste automaticamente
if (typeof window !== 'undefined') {
  testTranslation();
}

// Exportar para uso manual
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testTranslation };
}
