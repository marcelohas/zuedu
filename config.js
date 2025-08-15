// Configuração da aplicação CursoIA
class Config {
    constructor() {
        this.loadConfig();
    }
    
    loadConfig() {
        // Configuração do Google OAuth
        this.googleClientId = this.getGoogleClientId();
        
        // Outras configurações
        this.appName = 'CursoIA';
        this.version = '1.0.0';
        this.environment = this.getEnvironment();
    }
    
    getGoogleClientId() {
        // Ordem de prioridade para carregar Client ID:
        // 1. Variável de ambiente (para produção)
        // 2. Variável global do window (para desenvolvimento)
        // 3. localStorage (para configuração manual)
        // 4. Vazio (requer configuração)
        
        if (typeof process !== 'undefined' && process.env && process.env.GOOGLE_CLIENT_ID) {
            return process.env.GOOGLE_CLIENT_ID;
        }
        
        if (window.GOOGLE_CLIENT_ID) {
            return window.GOOGLE_CLIENT_ID;
        }
        
        const stored = localStorage.getItem('google_client_id');
        if (stored) {
            return stored;
        }
        
        return '';
    }
    
    getEnvironment() {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'development';
        }
        return 'production';
    }
    
    // Método para configurar Client ID programaticamente
    setGoogleClientId(clientId) {
        this.googleClientId = clientId;
        localStorage.setItem('google_client_id', clientId);
        console.log('✅ Google Client ID configurado:', clientId);
    }
    
    // Método para limpar configurações
    clearConfig() {
        localStorage.removeItem('google_client_id');
        this.googleClientId = '';
        console.log('🧹 Configurações limpas');
    }
    
    // Verifica se está configurado
    isConfigured() {
        return this.googleClientId !== '';
    }
    
    // Log de status da configuração
    logStatus() {
        console.log('📋 Status da Configuração:');
        console.log('- Google Client ID:', this.isConfigured() ? '✅ Configurado' : '❌ Não configurado');
        console.log('- Ambiente:', this.environment);
        console.log('- Versão:', this.version);
    }
}

// Instância global da configuração
const config = new Config();
