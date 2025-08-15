# 🎓 CursoIA - Plataforma de Educação a Distância

Uma plataforma moderna de educação online com autenticação Google e sistema completo de cursos.

## 🚀 Características

- **Autenticação Google OAuth 2.0** - Login seguro com conta Google
- **Dashboard Interativo** - Acompanhe seu progresso em tempo real
- **Catálogo de Cursos** - Cursos organizados por categoria e nível
- **Sistema de Progresso** - Acompanhe suas conquistas e certificados
- **Interface Responsiva** - Funciona perfeitamente em desktop e mobile
- **Modo Demo** - Teste a plataforma sem configuração OAuth

## 📁 Estrutura do Projeto

```
CursoIA/
├── index.html          # Página principal
├── styles.css          # Estilos da aplicação
├── auth.js            # Sistema de autenticação Google
├── education.js       # Sistema de educação e cursos
├── app.js             # Aplicação principal
└── README.md          # Este arquivo
```

## 🛠️ Como Usar

### 1. Modo Demo (Imediato)
1. Abra `index.html` no navegador
2. Clique em "Entrar com Google" 
3. O sistema entrará em modo demo automaticamente
4. Explore todas as funcionalidades!

### 2. Configuração Google OAuth (Produção)

#### Passo 1: Criar Projeto no Google Cloud Console
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione existente
3. Ative a API "Google+ API" ou "Google Identity"

#### Passo 2: Configurar OAuth 2.0
1. Vá em "Credenciais" → "Criar Credenciais" → "ID do cliente OAuth 2.0"
2. Tipo: "Aplicação da Web"
3. Origens JavaScript autorizadas:
   - `http://localhost:3000` (desenvolvimento)
   - `https://seudominio.com` (produção)
4. Copie o **Client ID** gerado

#### Passo 3: Configurar na Aplicação
```javascript
// No console do navegador ou no código:
cursoIA.configureAuth('SEU_GOOGLE_CLIENT_ID_AQUI');
```

## 🎯 Funcionalidades Principais

### Dashboard
- **Visão Geral**: Estatísticas de progresso
- **Meus Cursos**: Cursos inscritos e progresso
- **Catálogo**: Todos os cursos disponíveis
- **Progresso**: Acompanhamento detalhado
- **Certificados**: Certificados conquistados
- **Comunidade**: Interação com outros alunos

### Cursos Disponíveis
- 🤖 **Fundamentos de IA** (Gratuito)
- 🐍 **Python para Iniciantes** (R$ 197)
- 🎨 **Design UI/UX Moderno** (R$ 297)
- 📈 **Marketing Digital** (R$ 397)
- 📊 **Ciência de Dados** (R$ 497)
- ⚛️ **React Avançado** (R$ 447)

## 🔧 Comandos de Debug

Abra o console do navegador (F12) e use:

```javascript
// Configurar autenticação Google
cursoIA.configureAuth('seu-client-id');

// Adicionar cursos demo para teste
cursoIA.addDemo();

// Resetar todos os dados
cursoIA.reset();

// Acessar sistemas internos
cursoIA.auth;      // Sistema de autenticação
cursoIA.education; // Sistema de educação
```

## 📱 Responsividade

A plataforma é totalmente responsiva e funciona em:
- 💻 Desktop (1200px+)
- 📱 Tablet (768px - 1199px)
- 📱 Mobile (< 768px)

## 🎨 Personalização

### Cores Principais
- **Azul Principal**: `#2563eb`
- **Verde Sucesso**: `#10b981`
- **Vermelho Erro**: `#ef4444`
- **Cinza Texto**: `#64748b`

### Fontes
- **Principal**: Inter (Google Fonts)
- **Peso**: 300, 400, 500, 600, 700

## 🔒 Segurança

- Autenticação OAuth 2.0 do Google
- Dados salvos localmente (localStorage)
- Validação de formulários
- Proteção contra XSS

## 🚀 Deploy

### Hospedagem Estática
1. Faça upload dos arquivos para qualquer servidor web
2. Configure o Client ID do Google OAuth
3. Atualize as origens autorizadas no Google Cloud Console

### Recomendações
- **Netlify**: Deploy automático via Git
- **Vercel**: Otimizado para aplicações web
- **GitHub Pages**: Gratuito para projetos públicos

## 📞 Suporte

Para dúvidas ou sugestões:
- 📧 Email: suporte@cursoia.com
- 💬 Chat: Disponível na plataforma
- 📚 Documentação: [docs.cursoia.com](https://docs.cursoia.com)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ para democratizar a educação online**
