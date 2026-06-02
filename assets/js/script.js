document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic Year setting
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // 2. Light / Dark Theme Toggler
  const themeBtn = document.getElementById("theme-btn");
  const themeIcon = document.getElementById("theme-icon");
  const htmlElement = document.documentElement;

  // SVG path helpers
  const sunPath =
    '<path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>';
  const moonPath = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';

  // Load theme preference
  let savedTheme = localStorage.getItem("theme") || "light";
  htmlElement.setAttribute("data-theme", savedTheme);
  updateThemeUI(savedTheme);

  themeBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const targetTheme = currentTheme === "light" ? "dark" : "light";
    htmlElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
    updateThemeUI(targetTheme);
  });

  function updateThemeUI(theme) {
    if (theme === "light") {
      themeIcon.innerHTML = moonPath;
      themeBtn.setAttribute("aria-label", "Activar modo oscuro");
    } else {
      themeIcon.innerHTML = sunPath;
      themeBtn.setAttribute("aria-label", "Activar modo claro");
    }
  }

  // 3. Mobile Navigation Menu Toggle
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close mobile navigation on link clicks
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  // 4. Highlight Nav Menu items on scroll
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".topnav nav a");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 120; // offset

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentSectionId}`) {
        item.classList.add("active");
      }
    });
  });

  // 5. Interactive Project Filtering
  const filterButtons = document.querySelectorAll(".filter-btn[data-filter]");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Reset active states
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (filterValue === "all" || cardCategory === filterValue) {
          card.style.display = "flex";
          // minor fade-in transition
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 150); // wait for scale out
        }
      });
    });
  });

  // 6. Interactive Experience Timeline Filtering (Laboral, Académica, etc.)
  const expFilterBtns = document.querySelectorAll(
    ".filter-btn[data-exp-filter]",
  );
  const timelineRows = document.querySelectorAll(
    "#experience-timeline .log-row",
  );

  expFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      expFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const categoryFilter = btn.getAttribute("data-exp-filter");

      timelineRows.forEach((row) => {
        const rowCat = row.getAttribute("data-exp-cat");
        if (categoryFilter === "all" || rowCat === categoryFilter) {
          row.style.display = "grid";
          setTimeout(() => {
            row.style.opacity = "1";
            row.style.transform = "translateX(0)";
          }, 10);
        } else {
          row.style.opacity = "0";
          row.style.transform = "translateX(-10px)";
          setTimeout(() => {
            row.style.display = "none";
          }, 150);
        }
      });
    });
  });

  // 7. Contact Form interactive handling & custom toast animation
  const contactForm = document.getElementById("portfolio-form");
  const toast = document.getElementById("form-toast");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Mantenemos esto para que la página no se recargue

    const nameVal = document.getElementById("name").value;
    const emailVal = document.getElementById("email").value;
    const messageVal = document.getElementById("message").value;

    if (nameVal && emailVal && messageVal) {
      // Enviamos los datos a FormSubmit usando Fetch de fondo
      fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // Si el envío fue exitoso, mostramos tu toast
            toast.classList.add("active");
            contactForm.reset();

            // Ocultar toast después de 4s
            setTimeout(() => {
              toast.classList.remove("active");
            }, 4000);
          } else {
            alert("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Ocurrió un error de red. Inténtalo más tarde.");
        });
    }
  });
});
