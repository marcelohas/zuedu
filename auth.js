// Sistema de Autenticação Google OAuth 2.0 para CursoIA
class GoogleAuth {
    constructor() {
        // Carrega Client ID de variável de ambiente ou config
        this.clientId = this.loadClientId();
        this.isSignedIn = false;
        this.currentUser = null;
        this.gapi = null;
        
        this.init();
    }
    
    loadClientId() {
        // Usa a configuração global se disponível
        if (window.config && window.config.googleClientId) {
            return window.config.googleClientId;
        }
        
        // Fallback para outras fontes
        return process.env.GOOGLE_CLIENT_ID || 
               window.GOOGLE_CLIENT_ID || 
               localStorage.getItem('google_client_id') || 
               '';
    }
    
    async init() {
        try {
            // Carrega a biblioteca Google API
            await this.loadGoogleAPI();
            
            // Só inicializa se tiver Client ID
            if (this.clientId) {
                await this.initGoogleAuth(this.clientId);
                console.log('🔑 Sistema de autenticação inicializado com sucesso');
                console.log('✅ Google OAuth configurado e pronto para uso');
            } else {
                console.log('⚠️ Client ID não configurado. Configure antes de usar.');
                console.log('💡 Use: cursoIA.configureAuth("SEU_CLIENT_ID") ou defina GOOGLE_CLIENT_ID');
            }
            
        } catch (error) {
            console.error('❌ Erro ao inicializar autenticação:', error);
        }
    }
    
    loadGoogleAPI() {
        return new Promise((resolve, reject) => {
            if (window.gapi) {
                resolve();
                return;
            }
            
            // A biblioteca já está carregada no HTML
            if (window.gapi) {
                window.gapi.load('auth2', resolve);
            } else {
                // Fallback se não carregou
                setTimeout(() => {
                    if (window.gapi) {
                        window.gapi.load('auth2', resolve);
                    } else {
                        resolve(); // Continua sem erro para demo
                    }
                }, 1000);
            }
        });
    }
    
    async initGoogleAuth(clientId) {
        this.clientId = clientId;
        
        return new Promise((resolve, reject) => {
            if (!window.gapi) {
                reject(new Error('Google API não carregada'));
                return;
            }
            
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init({
                    client_id: this.clientId,
                    scope: 'profile email'
                }).then(() => {
                    this.gapi = window.gapi;
                    this.checkAuthStatus();
                    resolve();
                }).catch(reject);
            });
        });
    }
    
    checkAuthStatus() {
        if (!this.gapi) return;
        
        const authInstance = this.gapi.auth2.getAuthInstance();
        this.isSignedIn = authInstance.isSignedIn.get();
        
        if (this.isSignedIn) {
            this.currentUser = authInstance.currentUser.get();
            this.saveUserData();
            this.updateUI();
        }
    }
    
    async signIn() {
        // Verifica se o Google OAuth está configurado
        if (!this.clientId) {
            alert('⚠️ Sistema não configurado!\n\nPara usar esta plataforma, é necessário configurar a autenticação Google OAuth 2.0.\n\nConsulte o README.md para instruções de configuração.');
            console.error('❌ Client ID do Google não configurado. Use: cursoIA.configureAuth("SEU_CLIENT_ID")');
            return;
        }
        
        if (!this.gapi) {
            alert('❌ Erro ao carregar Google API. Verifique sua conexão com a internet.');
            return;
        }
        
        try {
            const authInstance = this.gapi.auth2.getAuthInstance();
            const user = await authInstance.signIn();
            
            this.isSignedIn = true;
            this.currentUser = user;
            
            this.saveUserData();
            this.updateUI();
            
            console.log('✅ Login realizado com sucesso');
            
        } catch (error) {
            console.error('❌ Erro no login:', error);
            if (error.error === 'popup_closed_by_user') {
                alert('Login cancelado pelo usuário.');
            } else {
                alert('Erro ao fazer login com Google. Verifique sua conexão e tente novamente.');
            }
        }
    }
    
    async signOut() {
        if (!this.gapi) {
            alert('❌ Erro no sistema de autenticação.');
            return;
        }
        
        try {
            const authInstance = this.gapi.auth2.getAuthInstance();
            await authInstance.signOut();
            
            this.isSignedIn = false;
            this.currentUser = null;
            
            localStorage.removeItem('cursoai-user');
            this.updateUI();
            
            console.log('✅ Logout realizado com sucesso');
            
        } catch (error) {
            console.error('❌ Erro no logout:', error);
            alert('Erro ao fazer logout. Recarregue a página.');
        }
    }
    
    
    saveUserData() {
        if (!this.currentUser) return;
        
        const profile = this.currentUser.getBasicProfile();
        const userData = {
            id: profile.getId(),
            name: profile.getName(),
            email: profile.getEmail(),
            picture: profile.getImageUrl(),
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('cursoai-user', JSON.stringify(userData));
    }
    
    getUserData() {
        const stored = localStorage.getItem('cursoai-user');
        return stored ? JSON.parse(stored) : null;
    }
    
    updateUI() {
        const landingPage = document.getElementById('landingPage');
        const dashboard = document.getElementById('dashboard');
        const loginBtn = document.getElementById('loginBtn');
        const userInfo = document.getElementById('userInfo');
        
        if (this.isSignedIn && this.currentUser) {
            // Usuário logado - mostra dashboard
            if (landingPage) landingPage.style.display = 'none';
            if (dashboard) dashboard.style.display = 'block';
            if (loginBtn) loginBtn.style.display = 'none';
            if (userInfo) userInfo.style.display = 'flex';
            
            // Atualiza dados do usuário
            this.updateUserProfile();
            
        } else {
            // Usuário não logado - mostra landing page
            if (landingPage) landingPage.style.display = 'block';
            if (dashboard) dashboard.style.display = 'none';
            if (loginBtn) loginBtn.style.display = 'flex';
            if (userInfo) userInfo.style.display = 'none';
        }
    }
    
    updateUserProfile() {
        const userData = this.getUserData();
        if (!userData) return;
        
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');
        const userEmail = document.getElementById('userEmail');
        const welcomeMessage = document.getElementById('welcomeMessage');
        
        if (userAvatar) userAvatar.src = userData.picture;
        if (userName) userName.textContent = userData.name;
        if (userEmail) userEmail.textContent = userData.email;
        if (welcomeMessage) {
            welcomeMessage.textContent = `Bem-vindo de volta, ${userData.name.split(' ')[0]}!`;
        }
    }
    
    isUserLoggedIn() {
        return this.isSignedIn && (this.currentUser !== null || this.getUserData() !== null);
    }
    
    // Configura o Client ID do Google
    setClientId(clientId) {
        this.clientId = clientId;
        this.initGoogleAuth(clientId);
    }
}

// Inicializa o sistema de autenticação
const googleAuth = new GoogleAuth();

// Funções globais para os botões
function signInWithGoogle() {
    googleAuth.signIn();
}

function signOutFromGoogle() {
    googleAuth.signOut();
}

// Verifica se já está logado ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Remove dados salvos de sessões anteriores se não há autenticação real
    if (!googleAuth.gapi || !googleAuth.clientId) {
        localStorage.removeItem('cursoai-user');
        localStorage.removeItem('cursoai-progress');
        localStorage.removeItem('cursoai-enrolled');
    }
    
    const userData = googleAuth.getUserData();
    if (userData && googleAuth.gapi && googleAuth.clientId) {
        googleAuth.isSignedIn = true;
        googleAuth.updateUI();
    } else {
        // Força exibição da landing page
        googleAuth.isSignedIn = false;
        googleAuth.currentUser = null;
        googleAuth.updateUI();
    }
});
