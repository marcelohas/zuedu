// Sistema de Educação para CursoIA
class EducationSystem {
    constructor() {
        this.courses = [];
        this.userProgress = {};
        this.userCourses = [];
        
        this.initializeEducationSystem();
    }
    
    initializeEducationSystem() {
        this.loadCourses();
        this.loadUserProgress();
        this.setupEventListeners();
    }
    
    loadCourses() {
        // Catálogo de cursos disponíveis
        this.courses = [
            {
                id: 'ia-fundamentos',
                title: 'Fundamentos de Inteligência Artificial',
                description: 'Aprenda os conceitos básicos de IA, machine learning e suas aplicações práticas no mundo real.',
                category: 'ia',
                level: 'Iniciante',
                duration: '6 semanas',
                price: 'Gratuito',
                icon: '🤖',
                modules: [
                    {
                        id: 'module-1',
                        title: 'Introdução à IA',
                        lessons: [
                            { id: 'lesson-1', title: 'O que é Inteligência Artificial?', duration: '20 min', type: 'video' },
                            { id: 'lesson-2', title: 'História da IA', duration: '15 min', type: 'reading' },
                            { id: 'lesson-3', title: 'Tipos de IA', duration: '25 min', type: 'interactive' }
                        ]
                    },
                    {
                        id: 'module-2',
                        title: 'Machine Learning Básico',
                        lessons: [
                            { id: 'lesson-4', title: 'Conceitos de ML', duration: '30 min', type: 'video' },
                            { id: 'lesson-5', title: 'Algoritmos Supervisionados', duration: '35 min', type: 'interactive' },
                            { id: 'lesson-6', title: 'Projeto Prático', duration: '60 min', type: 'project' }
                        ]
                    }
                ]
            },
            {
                id: 'python-iniciante',
                title: 'Python para Iniciantes',
                description: 'Domine a linguagem Python do zero com projetos práticos e exercícios interativos.',
                category: 'programacao',
                level: 'Iniciante',
                duration: '8 semanas',
                price: 'R$ 197',
                icon: '🐍',
                modules: [
                    {
                        id: 'module-1',
                        title: 'Primeiros Passos',
                        lessons: [
                            { id: 'lesson-1', title: 'Instalação e Configuração', duration: '15 min', type: 'video' },
                            { id: 'lesson-2', title: 'Variáveis e Tipos', duration: '25 min', type: 'interactive' },
                            { id: 'lesson-3', title: 'Primeiro Programa', duration: '20 min', type: 'exercise' }
                        ]
                    }
                ]
            },
            {
                id: 'design-ui-ux',
                title: 'Design UI/UX Moderno',
                description: 'Crie interfaces incríveis e experiências de usuário memoráveis com as melhores práticas.',
                category: 'design',
                level: 'Intermediário',
                duration: '10 semanas',
                price: 'R$ 297',
                icon: '🎨',
                modules: [
                    {
                        id: 'module-1',
                        title: 'Fundamentos do Design',
                        lessons: [
                            { id: 'lesson-1', title: 'Princípios do Design', duration: '30 min', type: 'video' },
                            { id: 'lesson-2', title: 'Psicologia das Cores', duration: '25 min', type: 'interactive' }
                        ]
                    }
                ]
            },
            {
                id: 'marketing-digital',
                title: 'Marketing Digital Estratégico',
                description: 'Estratégias comprovadas para crescer seu negócio online e gerar resultados consistentes.',
                category: 'marketing',
                level: 'Intermediário',
                duration: '12 semanas',
                price: 'R$ 397',
                icon: '📈',
                modules: [
                    {
                        id: 'module-1',
                        title: 'Estratégia Digital',
                        lessons: [
                            { id: 'lesson-1', title: 'Planejamento Estratégico', duration: '40 min', type: 'video' }
                        ]
                    }
                ]
            },
            {
                id: 'data-science',
                title: 'Ciência de Dados na Prática',
                description: 'Analise dados, crie insights e tome decisões baseadas em dados com Python e ferramentas modernas.',
                category: 'ia',
                level: 'Avançado',
                duration: '16 semanas',
                price: 'R$ 497',
                icon: '📊',
                modules: [
                    {
                        id: 'module-1',
                        title: 'Análise Exploratória',
                        lessons: [
                            { id: 'lesson-1', title: 'Pandas e NumPy', duration: '45 min', type: 'video' }
                        ]
                    }
                ]
            },
            {
                id: 'react-avancado',
                title: 'React Avançado',
                description: 'Domine React com hooks, context, performance e as melhores práticas para aplicações profissionais.',
                category: 'programacao',
                level: 'Avançado',
                duration: '14 semanas',
                price: 'R$ 447',
                icon: '⚛️',
                modules: [
                    {
                        id: 'module-1',
                        title: 'Hooks Avançados',
                        lessons: [
                            { id: 'lesson-1', title: 'Custom Hooks', duration: '35 min', type: 'video' }
                        ]
                    }
                ]
            }
        ];
    }
    
    loadUserProgress() {
        const stored = localStorage.getItem('cursoai-progress');
        this.userProgress = stored ? JSON.parse(stored) : {};
        
        const enrolledStored = localStorage.getItem('cursoai-enrolled');
        this.userCourses = enrolledStored ? JSON.parse(enrolledStored) : [];
    }
    
    saveUserProgress() {
        localStorage.setItem('cursoai-progress', JSON.stringify(this.userProgress));
        localStorage.setItem('cursoai-enrolled', JSON.stringify(this.userCourses));
    }
    
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderCatalog();
            this.renderUserCourses();
            this.updateStats();
            this.setupNavigation();
            this.setupFilters();
        });
    }
    
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.showSection(section);
                
                // Atualiza navegação ativa
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }
    
    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.filterCourses(category);
                
                // Atualiza filtro ativo
                filterBtns.forEach(filter => filter.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
    
    showSection(sectionId) {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => section.classList.remove('active'));
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
    
    renderCatalog() {
        const catalogContainer = document.getElementById('courseCatalog');
        if (!catalogContainer) return;
        
        catalogContainer.innerHTML = this.courses.map(course => `
            <div class="course-card" data-category="${course.category}">
                <div class="course-image">
                    ${course.icon}
                </div>
                <div class="course-content">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    <div class="course-meta">
                        <span class="course-duration">⏱️ ${course.duration}</span>
                        <span class="course-level">${course.level}</span>
                    </div>
                    <div class="course-price">
                        <strong>${course.price}</strong>
                    </div>
                    <button class="enroll-btn" onclick="educationSystem.enrollCourse('${course.id}')">
                        ${this.isEnrolled(course.id) ? '✅ Inscrito' : '📚 Inscrever-se'}
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    renderUserCourses() {
        const coursesContainer = document.getElementById('enrolledCourses');
        if (!coursesContainer) return;
        
        if (this.userCourses.length === 0) {
            coursesContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📚</div>
                    <h3>Nenhum curso ainda</h3>
                    <p>Explore nosso catálogo e comece sua jornada de aprendizado!</p>
                    <button class="btn-primary" onclick="educationSystem.showSection('catalog')">
                        Ver Catálogo
                    </button>
                </div>
            `;
            return;
        }
        
        const enrolledCourses = this.courses.filter(course => 
            this.userCourses.includes(course.id)
        );
        
        coursesContainer.innerHTML = enrolledCourses.map(course => {
            const progress = this.getCourseProgress(course.id);
            return `
                <div class="course-card enrolled">
                    <div class="course-image">
                        ${course.icon}
                    </div>
                    <div class="course-content">
                        <h3 class="course-title">${course.title}</h3>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <p class="progress-text">${progress}% concluído</p>
                        <button class="enroll-btn" onclick="educationSystem.continueCourse('${course.id}')">
                            ${progress === 0 ? '🚀 Começar' : '📖 Continuar'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    filterCourses(category) {
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    enrollCourse(courseId) {
        if (this.isEnrolled(courseId)) {
            this.continueCourse(courseId);
            return;
        }
        
        this.userCourses.push(courseId);
        this.saveUserProgress();
        
        // Atualiza UI
        this.renderCatalog();
        this.renderUserCourses();
        this.updateStats();
        this.addActivity(`Inscrito no curso: ${this.getCourse(courseId).title}`);
        
        // Mostra mensagem de sucesso
        this.showNotification(`✅ Inscrito com sucesso no curso: ${this.getCourse(courseId).title}`);
        
        // Vai para a seção de cursos
        this.showSection('courses');
        document.querySelector('[data-section="courses"]').classList.add('active');
        document.querySelector('[data-section="catalog"]').classList.remove('active');
    }
    
    continueCourse(courseId) {
        const course = this.getCourse(courseId);
        if (!course) return;
        
        // Simula abertura do curso
        this.showNotification(`📖 Abrindo curso: ${course.title}`);
        console.log('Continuando curso:', course);
        
        // Aqui seria implementada a navegação para o player do curso
    }
    
    getCourse(courseId) {
        return this.courses.find(course => course.id === courseId);
    }
    
    isEnrolled(courseId) {
        return this.userCourses.includes(courseId);
    }
    
    getCourseProgress(courseId) {
        return this.userProgress[courseId] || 0;
    }
    
    updateStats() {
        const totalCoursesEl = document.getElementById('totalCourses');
        const completedLessonsEl = document.getElementById('completedLessons');
        const studyHoursEl = document.getElementById('studyHours');
        const certificatesEl = document.getElementById('certificates');
        
        if (totalCoursesEl) totalCoursesEl.textContent = this.userCourses.length;
        if (completedLessonsEl) completedLessonsEl.textContent = this.getCompletedLessons();
        if (studyHoursEl) studyHoursEl.textContent = this.getStudyHours() + 'h';
        if (certificatesEl) certificatesEl.textContent = this.getCertificates();
    }
    
    getCompletedLessons() {
        return Object.values(this.userProgress).reduce((total, progress) => {
            return total + Math.floor(progress / 10); // Simula lições concluídas
        }, 0);
    }
    
    getStudyHours() {
        return Math.floor(this.getCompletedLessons() * 0.5); // 30 min por lição em média
    }
    
    getCertificates() {
        return Object.values(this.userProgress).filter(progress => progress === 100).length;
    }
    
    addActivity(message) {
        const activityList = document.getElementById('recentActivity');
        if (!activityList) return;
        
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">📚</div>
            <div class="activity-content">
                <p><strong>${message}</strong></p>
                <span class="activity-time">Agora mesmo</span>
            </div>
        `;
        
        activityList.insertBefore(activityItem, activityList.firstChild);
    }
    
    showNotification(message) {
        // Cria notificação temporária
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            font-weight: 500;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Inicializa o sistema de educação
const educationSystem = new EducationSystem();

// Função global para mostrar seções
function showSection(sectionId) {
    educationSystem.showSection(sectionId);
}
