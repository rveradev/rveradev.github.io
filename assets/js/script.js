document.addEventListener("DOMContentLoaded", () => {
  /* sidebar */
  const navButtons = document.querySelectorAll("[data-nav-link]");
  const articles = document.querySelectorAll("[data-page]");

  navButtons[0].classList.add("active");
  navButtons[4].classList.add("active");
  articles[0].classList.add("active");
  console.log(navButtons);

  for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener("click", function () {
      for (let i = 0; i < articles.length; i++) {
        if (this.innerHTML.toLowerCase() === articles[i].dataset.page) {
          articles[i].classList.add("active");
          navButtons[i].classList.add("active");
          navButtons[i + 4].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          articles[i].classList.remove("active");
          navButtons[i].classList.remove("active");
          navButtons[i + 4].classList.remove("active");
        }
      }
    });
  }

  /*-----------------------------------*\
  # Portafolio
  \*-----------------------------------*/
  // Selecciona todos los botones de filtro
  const filterButtons = document.querySelectorAll("[data-filter]");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (filterValue === "all" || filterValue === itemCategory) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    });
  });

  document.querySelector('[data-filter="all"]').click();

  /*-----------------------------------*\
  # MAPA
  \*-----------------------------------*/
  var map = L.map("map").setView([-33.6895207, -71.2193217], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
});
