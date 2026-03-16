// Projets par défaut
function getDefaultProjects() {
    return [
        {
            title: "Application de gestion de bibliothèque",
            type: "SLAM",
            description: "Développement d'une application de gestion de bibliothèque permettant l'emprunt et le retour de livres, la gestion des membres et le suivi des emprunts.",
            competences: "C#, WPF, SQL Server, MVVM",
            compteRendu: "",
            compteRenduPdf: null
        },
        {
            title: "Site web e-commerce",
            type: "SLAM",
            description: "Création d'un site web e-commerce avec panier, paiement et gestion des commandes.",
            competences: "HTML, CSS, JavaScript, PHP, MySQL",
            compteRendu: "",
            compteRenduPdf: null
        },
        {
            title: "Application de gestion de stock",
            type: "Stage",
            description: "Développement d'une application de gestion de stock pour une entreprise de vente.",
            competences: "Python, SQLite, Tkinter",
            compteRendu: "",
            compteRenduPdf: null
        }
    ];
}

// Charger et afficher les projets sur la page principale
function loadRealisations() {
    const projectsKey = 'portfolio_projects';
    let projects = JSON.parse(localStorage.getItem(projectsKey));
    
    if (!projects || projects.length === 0) {
        projects = getDefaultProjects();
        localStorage.setItem(projectsKey, JSON.stringify(projects));
    }
    
    const container = document.getElementById('realisations-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'realisation-card';
        
        let compteRenduHtml = '';
        if (project.compteRenduPdf) {
            compteRenduHtml = `
                <a href="#" class="compte-rendu-link" data-pdf="${project.compteRenduPdf}" onclick="openPdfModal('${project.compteRenduPdf}', '${project.title}'); return false;">
                    📄 Voir le compte rendu (PDF)
                </a>
            `;
        } else if (project.compteRendu) {
            compteRenduHtml = `
                <div class="compte-rendu">
                    <h4>Compte rendu</h4>
                    <p>${project.compteRendu}</p>
                </div>
            `;
        }
        
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p class="projet-type">${project.type}</p>
            <p class="projet-description">${project.description}</p>
            <p class="competences-utilisees"><strong>Compétences :</strong> ${project.competences}</p>
            ${compteRenduHtml}
        `;
        container.appendChild(card);
    });
}

// Charger le CV
function loadCV() {
    const cvData = localStorage.getItem('portfolio_cv');
    const cvLink = document.querySelector('.pdf-link');
    
    if (cvLink) {
        if (cvData) {
            cvLink.setAttribute('data-pdf', cvData);
            cvLink.onclick = function() {
                openPdfModal(cvData, 'Mon CV');
                return false;
            };
        } else {
            // Vérifier si le fichier CV existe dans le dossier
            cvLink.setAttribute('data-pdf', 'CV_BTS_SIO_Stage_Developpement.pdf');
            cvLink.onclick = function() {
                openPdfModal('CV_BTS_SIO_Stage_Developpement.pdf', 'Mon CV');
                return false;
            };
        }
    }
}

// Modal PDF
function openPdfModal(pdfData, title) {
    const modal = document.getElementById('pdf-modal');
    const iframe = document.getElementById('pdf-frame');
    const modalTitle = document.getElementById('pdf-modal-title');
    
    modalTitle.textContent = title;
    
    // Si c'est une chaîne base64
    if (pdfData.startsWith('data:')) {
        iframe.src = pdfData;
    } else {
        // C'est un nom de fichier
        iframe.src = pdfData;
    }
    
    modal.classList.add('active');
}

function closePdfModal() {
    const modal = document.getElementById('pdf-modal');
    const iframe = document.getElementById('pdf-frame');
    modal.classList.remove('active');
    iframe.src = '';
}

// Event listeners pour le modal PDF
document.addEventListener('DOMContentLoaded', function() {
    loadRealisations();
    loadCV();
    
    const closeBtn = document.getElementById('pdf-modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closePdfModal);
    }
    
    const modal = document.getElementById('pdf-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closePdfModal();
            }
        });
    }
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && !this.classList.contains('pdf-link') && !this.classList.contains('compte-rendu-link')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Fonctions globales pour admin
window.openPdfModal = openPdfModal;
window.closePdfModal = closePdfModal;