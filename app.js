const projectsKey = "portfolio_projects";

async function loadRealisations() {
  try {
    const response = await fetch("projects.json");
    const projects = await response.json();
    localStorage.setItem(projectsKey, JSON.stringify(projects));
    renderProjects(projects);
  } catch (error) {
    const stored = localStorage.getItem(projectsKey);
    if (stored) {
      renderProjects(JSON.parse(stored));
    }
  }
}

function renderProjects(projects) {
  const container = document.getElementById("realisations-list");
  if (!container) return;

  container.innerHTML = "";

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "realisation-card";

    const pdfLink = project.compteRenduPdf
      ? `<a href="#" class="pdf-link" data-pdf="${project.compteRenduPdf}">📄 Voir le compte rendu</a>`
      : "";

    card.innerHTML = `
            <h3>${project.title}</h3>
            <span class="project-type">${project.type}</span>
            <p>${project.description}</p>
            <div class="competences"><strong>Compétences :</strong> ${project.competences}</div>
            <br>
            ${pdfLink}
        `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadRealisations();

  document.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("pdf-link") ||
      e.target.closest(".pdf-link")
    ) {
      e.preventDefault();
      const link = e.target.classList.contains("pdf-link")
        ? e.target
        : e.target.closest(".pdf-link");
      const pdfName = link.getAttribute("data-pdf");
      if (pdfName) {
        openPdfModal(null, pdfName);
      }
    }
  });
});

function openPdfModal(data, filename) {
  const modal = document.getElementById("pdf-modal");
  const frame = document.getElementById("pdf-frame");
  const title = document.getElementById("pdf-modal-title");

  if (modal && frame) {
    if (data && data.startsWith("data:")) {
      frame.src = data;
    } else {
      frame.src = filename;
    }
    title.textContent = filename;
    modal.classList.add("active");
  }
}

function closePdfModal() {
  const modal = document.getElementById("pdf-modal");
  const frame = document.getElementById("pdf-frame");
  if (modal && frame) {
    modal.classList.remove("active");
    frame.src = "";
  }
}

window.addEventListener("storage", function (event) {
  if (event.key === projectsKey) {
    loadRealisations();
  }
});

const pdfModalClose = document.getElementById("pdf-modal-close");
if (pdfModalClose) {
  pdfModalClose.addEventListener("click", closePdfModal);
}

window.addEventListener("click", function (e) {
  const modal = document.getElementById("pdf-modal");
  if (e.target === modal) {
    closePdfModal();
  }
});
