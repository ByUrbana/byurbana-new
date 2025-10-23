# Sistema de Tradução Automática - ByUrbana

Este sistema implementa tradução automática usando a API do Google Cloud Translation para o site ByUrbana.

## 🚀 Funcionalidades

- ✅ Tradução automática de conteúdo usando Google Cloud Translation API
- ✅ Seletor de idioma no header do site
- ✅ Suporte a 11 idiomas diferentes
- ✅ Persistência da preferência de idioma do usuário
- ✅ Tradução dinâmica sem recarregar a página
- ✅ Fallback para texto original em caso de erro

## 🌍 Idiomas Suportados

- 🇪🇸 Español (padrão)
- 🇧🇷 Português
- 🇺🇸 English
- 🇫🇷 Français
- 🇩🇪 Deutsch
- 🇮🇹 Italiano
- 🇯🇵 日本語
- 🇰🇷 한국어
- 🇨🇳 中文
- 🇸🇦 العربية
- 🇷🇺 Русский

## 📁 Estrutura de Arquivos

```
src/
├── components/
│   ├── LanguageSelector.astro    # Componente do seletor de idioma
│   └── Header.astro             # Header atualizado com seletor
├── utils/
│   └── translation.ts            # Utilitários de tradução
├── config/
│   └── env.ts                   # Configuração da API
└── pages/
    └── index.astro              # Página principal com atributos de tradução
```

## 🔧 Como Usar

### 1. Adicionar Atributos de Tradução

Para que um elemento seja traduzido, adicione os seguintes atributos:

```html
<div data-translate data-original-text="Texto original em espanhol">
  Texto original em espanhol
</div>
```

### 2. Atributos Necessários

- `data-translate`: Marca o elemento para tradução
- `data-original-text`: Contém o texto original em espanhol

### 3. Exemplo de Implementação

```html
<h1 data-translate data-original-text="Bienvenido a ByUrbana">
  Bienvenido a ByUrbana
</h1>

<p data-translate data-original-text="Desarrollamos soluciones financieras">
  Desarrollamos soluciones financieras
</p>
```

## ⚙️ Configuração da API

A chave da API está configurada em `src/config/env.ts`:

```typescript
export const GOOGLE_TRANSLATE_API_KEY = 'AIzaSyCO7eGtQ0JEuQ3PAqlOAWBM67HrZB2MVBQ';
```

## 🎯 Como Funciona

1. **Seleção de Idioma**: O usuário seleciona um idioma no seletor
2. **Detecção de Elementos**: O sistema encontra todos os elementos com `data-translate`
3. **Tradução**: Cada texto é enviado para a API do Google Cloud Translation
4. **Atualização**: O conteúdo é atualizado dinamicamente na página
5. **Persistência**: A preferência é salva no localStorage

## 🔄 Fluxo de Tradução

```mermaid
graph TD
    A[Usuário seleciona idioma] --> B[Sistema detecta elementos com data-translate]
    B --> C[Envia textos para API Google Cloud]
    C --> D[Recebe traduções]
    D --> E[Atualiza conteúdo na página]
    E --> F[Salva preferência no localStorage]
```

## 🛠️ Personalização

### Adicionar Novos Idiomas

Edite `src/config/env.ts`:

```typescript
supportedLanguages: {
  'pt': 'Português',
  'en': 'English',
  'es': 'Español',
  // Adicione novos idiomas aqui
  'nl': 'Nederlands', // Exemplo
}
```

### Modificar Idioma Padrão

Altere em `src/config/env.ts`:

```typescript
defaultSourceLanguage: 'es', // Mude para o idioma desejado
```

## 🚨 Tratamento de Erros

O sistema inclui tratamento robusto de erros:

- **Erro de API**: Retorna o texto original
- **Erro de rede**: Log no console e fallback
- **Texto vazio**: Ignora elementos sem conteúdo

## 📊 Performance

- **Cache**: Preferência salva no localStorage
- **Lazy Loading**: Tradução apenas quando necessário
- **Fallback**: Texto original sempre disponível
- **Otimização**: Tradução em lote para múltiplos textos

## 🔒 Segurança

- Chave da API configurada no lado do cliente
- Validação de entrada antes da tradução
- Sanitização de conteúdo traduzido

## 🎨 Estilização

O seletor de idioma inclui estilos responsivos:

```css
.language-selector select {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  /* ... mais estilos */
}
```

## 🚀 Próximos Passos

1. **Cache de Traduções**: Implementar cache local das traduções
2. **Detecção Automática**: Detectar idioma do navegador
3. **SEO**: Meta tags dinâmicas por idioma
4. **Analytics**: Rastrear idiomas mais utilizados

## 📝 Notas Importantes

- A API do Google Cloud Translation tem limites de uso
- Textos muito longos podem ser divididos em chunks
- Alguns idiomas podem ter melhor qualidade de tradução
- Teste sempre as traduções antes de publicar

## 🆘 Suporte

Para dúvidas ou problemas:

1. Verifique se a chave da API está correta
2. Confirme que os atributos `data-translate` estão presentes
3. Verifique o console do navegador para erros
4. Teste com diferentes idiomas

---

**Desenvolvido para ByUrbana** 🚀
