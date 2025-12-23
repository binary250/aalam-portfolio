/*************************************************
 * SPOTLIGHT EFFECT
 *************************************************/
const spotlight = document.querySelector('.spotlight');
document.addEventListener('mousemove', (e) => {
  if (!spotlight) return;
  spotlight.style.left = (e.clientX - 300) + 'px';
  spotlight.style.top = (e.clientY - 300) + 'px';
});

/*************************************************
 * SMOOTH SCROLL
 *************************************************/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });

      const navMenu = document.getElementById('navMenu');
      const hamburger = document.getElementById('hamburger');
      if (navMenu) navMenu.classList.remove('active');
      if (hamburger) hamburger.classList.remove('active');
    }
  });
});

/*************************************************
 * NAV SCROLL EFFECT
 *************************************************/
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 100);
});

/*************************************************
 * HAMBURGER MENU
 *************************************************/
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

/*************************************************
 * STATS COUNTER
 *************************************************/
const animateCounter = (element) => {
  const target = parseInt(element.getAttribute('data-count'));
  let current = 0;
  const increment = target / 50;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 40);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number')
        .forEach(num => animateCounter(num));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) observer.observe(statsBar);

/*************************************************
 * PROJECT DATA (STATIC)
 *************************************************/
const projectsData = [
  {
    number: "01",
    title: "EasyVyapar OS",
    tag: "Desktop App",
    description:
      "Enterprise-grade billing & accounting software for Indian SMBs with GST compliance, inventory management and real-time sync.",
    technologies: ["Electron", "React", "Node.js", "SQLite", "Express"],
    liveLink: "https://easyvyapar-os.vercel.app",
    githubLink: "https://github.com/binary250/easyvyapar-coming-soon"
  },
  {
    number: "02",
    title: "Softvault",
    tag: "E-Commerce",
    description:
      "High-conversion e-commerce platform with advanced caching, CDN integration, and custom checkout flow.",
    technologies: ["WordPress", "WooCommerce", "PHP", "MySQL"],
    liveLink: "https://www.softvault.in",
    githubLink: "#"
  },
  {
    number: "03",
    title: "TimesMirror",
    tag: "Web Platform",
    description:
      "SEO-optimized news portal handling 100K+ daily visitors with real-time updates and blazing-fast performance.",
    technologies: ["Next.js", "MongoDB", "AWS"],
    liveLink: "https://www.timesmirror.in",
    githubLink: "#"
  },
  {
    number: "04",
    title: "Cloud File Storage",
    tag: "Cloud Platform",
    description:
      "Secure cloud storage system with encryption, version history, and role-based access control.",
    technologies: ["React", "Express", "AWS S3"],
    liveLink: "#",
    githubLink: "#"
  },
  {
  number: "05",
  title: "Desi Chaupal",
  tag: "Community Platform",
  description:
    "A digital platform celebrating desi culture, local stories, community voices, and grassroots connections. Designed to bring the essence of the village chaupal into the digital world.",
  technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  liveLink: "https://www.desichaupal.in",
  githubLink: "#",
  comingSoon: true
}

];

/*************************************************
 * PROJECT MODAL
 *************************************************/
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalContent = document.querySelector('.modal-content');

function openProjectModal(project) {
  if (!projectModal) return;

  document.getElementById('modalNumber').textContent = "Project " + project.number;
  document.getElementById('modalTitle').textContent = project.title;

  const tagEl = document.getElementById('modalTag');

  // ✅ COMING SOON BADGE LOGIC (CORRECT PLACE)
  if (project.comingSoon) {
    tagEl.innerHTML = `
      ${project.tag}
      <span class="coming-soon-badge">Coming Soon</span>
    `;
  } else {
    tagEl.textContent = project.tag;
  }

  document.getElementById('modalDescription').textContent = project.description;

  const techList = document.getElementById('modalTechList');
  techList.innerHTML = '';
  project.technologies.forEach(tech => {
    const span = document.createElement('span');
    span.className = 'tech-item';
    span.textContent = tech;
    techList.appendChild(span);
  });

  const liveBtn = document.getElementById('modalLiveLink');
  const gitBtn = document.getElementById('modalGithubLink');

  // Live link handling
  if (project.liveLink && project.liveLink !== "#") {
    liveBtn.href = project.liveLink;
    liveBtn.target = "_blank";
    liveBtn.style.pointerEvents = "auto";
    liveBtn.style.opacity = "1";
  } else {
    liveBtn.href = "#";
    liveBtn.style.pointerEvents = "none";
    liveBtn.style.opacity = "0.4";
  }

  // GitHub link handling
  if (project.githubLink && project.githubLink !== "#") {
    gitBtn.href = project.githubLink;
    gitBtn.target = "_blank";
    gitBtn.style.pointerEvents = "auto";
    gitBtn.style.opacity = "1";
  } else {
    gitBtn.href = "#";
    gitBtn.style.pointerEvents = "none";
    gitBtn.style.opacity = "0.4";
  }

  projectModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  projectModal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

if (modalClose) modalClose.addEventListener('click', closeModal);

if (projectModal) {
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal();
  });
}

if (modalContent) {
  modalContent.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/*************************************************
 * PROJECT CARD CLICK
 *************************************************/
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.addEventListener('click', () => {
    openProjectModal(projectsData[index]);
  });
});

/*************************************************
 * CONTACT FORM (UI ONLY)
 *************************************************/
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.form-submit');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      formSuccess.classList.add('active');
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      contactForm.reset();

      setTimeout(() => {
        formSuccess.classList.remove('active');
      }, 4000);
    }, 1200);
  });
}
