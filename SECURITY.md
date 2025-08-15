# 🔒 Guia de Segurança - CursoIA

## ⚠️ IMPORTANTE: Antes de Subir para GitHub

### ❌ NÃO faça isso:
- **NÃO** inclua Client IDs hardcoded no código
- **NÃO** commite arquivos `.env` com credenciais
- **NÃO** exponha chaves de API em repositórios públicos

### ✅ Faça isso:

#### 1. Remova Credenciais Sensíveis
```bash
# Certifique-se de que estes arquivos estão no .gitignore:
.env
.env.local
.env.production
```

#### 2. Use o Arquivo .env.example
```bash
# Copie o .env.example para .env e configure:
cp .env.example .env
# Edite o .env com suas credenciais reais
```

#### 3. Configure Client ID Localmente
No `index.html`, descomente e configure:
```javascript
window.GOOGLE_CLIENT_ID = 'SEU_CLIENT_ID_AQUI';
```

#### 4. Para Produção
Use variáveis de ambiente do seu provedor:
- **Netlify**: Site Settings → Environment Variables
- **Vercel**: Project Settings → Environment Variables
- **GitHub Pages**: Use GitHub Secrets

## 🛡️ Boas Práticas de Segurança

### Client ID do Google OAuth
- ✅ **É seguro** expor em aplicações frontend
- ✅ **Pode** ser público (não é uma chave secreta)
- ⚠️ **MAS** evite hardcoded para flexibilidade

### Configuração Recomendada
1. **Desenvolvimento**: Variável global ou localStorage
2. **Produção**: Variáveis de ambiente
3. **Backup**: Configuração manual via console

## 🚀 Deploy Seguro

### Checklist Pré-Deploy
- [ ] Client ID removido do código
- [ ] Arquivo `.env` no `.gitignore`
- [ ] Variáveis de ambiente configuradas
- [ ] Origens autorizadas no Google Cloud Console
- [ ] Teste de autenticação funcionando

### Comandos de Verificação
```bash
# Verificar se não há credenciais no código:
grep -r "apps.googleusercontent.com" . --exclude-dir=node_modules

# Verificar .gitignore:
cat .gitignore | grep -E "\\.env"
```

## 📞 Em Caso de Exposição Acidental

Se você acidentalmente expôs credenciais:

1. **Revogue** as credenciais no Google Cloud Console
2. **Gere** novas credenciais
3. **Atualize** a configuração
4. **Force push** para limpar histórico se necessário

## 🔍 Monitoramento

- Monitore logs de acesso no Google Cloud Console
- Revise periodicamente as origens autorizadas
- Mantenha as credenciais atualizadas
