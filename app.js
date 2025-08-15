// Aplicação principal CursoIA
class CursoIAApp {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupGlobalEventListeners();
        this.checkAuthStatus();
        console.log('🚀 CursoIA inicializado com sucesso!');
    }
    
    setupGlobalEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeApp();
        });
        
        // Listener para mudanças de autenticação
        window.addEventListener('storage', (e) => {
            if (e.key === 'cursoai-user') {
                this.handleAuthChange();
            }
        });
    }
    
    initializeApp() {
        // Verifica se o usuário está logado
        const userData = googleAuth.getUserData();
        if (userData) {
            this.showDashboard();
        } else {
            this.showLandingPage();
        }
        
        // Configura smooth scrolling
        this.setupSmoothScrolling();
    }
    
    checkAuthStatus() {
        const userData = googleAuth.getUserData();
        if (userData) {
            console.log('👤 Usuário logado:', userData.name);
        } else {
            console.log('🔓 Usuário não logado');
        }
    }
    
    handleAuthChange() {
        const userData = googleAuth.getUserData();
        if (userData) {
            this.showDashboard();
        } else {
            this.showLandingPage();
        }
    }
    
    showLandingPage() {
        const landingPage = document.getElementById('landingPage');
        const dashboard = document.getElementById('dashboard');
        
        if (landingPage) landingPage.style.display = 'block';
        if (dashboard) dashboard.style.display = 'none';
    }
    
    showDashboard() {
        const landingPage = document.getElementById('landingPage');
        const dashboard = document.getElementById('dashboard');
        
        if (landingPage) landingPage.style.display = 'none';
        if (dashboard) dashboard.style.display = 'block';
        
        // Atualiza dados do dashboard
        educationSystem.updateStats();
    }
    
    setupSmoothScrolling() {
        // Adiciona smooth scrolling para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Configuração do Google OAuth (para ser chamada pelo usuário)
    configureGoogleAuth(clientId) {
        googleAuth.setClientId(clientId);
        console.log('✅ Google OAuth configurado com Client ID:', clientId);
    }
    
    // Função para demonstração - adiciona alguns cursos ao usuário (apenas com login real)
    addDemoCourses() {
        if (!googleAuth.isUserLoggedIn() || !googleAuth.clientId) {
            console.log('⚠️ Faça login com Google primeiro e configure o OAuth para adicionar cursos demo');
            alert('É necessário fazer login com Google para usar esta funcionalidade.');
            return;
        }
        
        const demoCourses = ['ia-fundamentos', 'python-iniciante'];
        demoCourses.forEach(courseId => {
            if (!educationSystem.isEnrolled(courseId)) {
                educationSystem.enrollCourse(courseId);
            }
        });
        
        // Simula algum progresso
        educationSystem.userProgress['ia-fundamentos'] = 25;
        educationSystem.userProgress['python-iniciante'] = 10;
        educationSystem.saveUserProgress();
        educationSystem.updateStats();
        
        console.log('🎯 Cursos demo adicionados com progresso simulado');
    }
    
    // Função para resetar dados do usuário
    resetUserData() {
        localStorage.removeItem('cursoai-user');
        localStorage.removeItem('cursoai-progress');
        localStorage.removeItem('cursoai-enrolled');
        
        googleAuth.signOut();
        console.log('🔄 Dados do usuário resetados');
    }
}

// Inicializa a aplicação
const cursoIAApp = new CursoIAApp();

// Funções globais para console/debug
window.cursoIA = {
    configureAuth: (clientId) => cursoIAApp.configureGoogleAuth(clientId),
    addDemo: () => cursoIAApp.addDemoCourses(),
    reset: () => cursoIAApp.resetUserData(),
    auth: googleAuth,
    education: educationSystem
};

// Log de boas-vindas
console.log(`
🎓 CursoIA - Plataforma de Educação a Distância
==============================================

✅ GOOGLE OAUTH CONFIGURADO E ATIVO

Para adicionar cursos demo (após login):
cursoIA.addDemo()

Para resetar dados:
cursoIA.reset()

🚀 PLATAFORMA PRONTA PARA USO:
1. Clique em "Entrar com Google" na página
2. Faça login com sua conta Gmail
3. Acesse todos os cursos e funcionalidades
4. Explore o dashboard educacional completo
`);
