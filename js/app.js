/* =========================================================
   A MI ANTOJO · Menú Digital
   JavaScript Vanilla · Sin dependencias
   =========================================================
   Para editar el menú solo modifica el objeto `menu` de abajo.
   ========================================================= */

/* ---------- 1. Datos del menú ----------
   Cada plato: imagen, nombre, descripción y precio.
   Las bebidas usan una lista de opciones. */
const menu = {
  moneda: "Bs",
  bebidasBanner: "img/bebidas.png",
  secciones: [
    {
      id: "entrada",
      titulo: "Entrada",
      icono: "bi-egg",
      banner: "img/entrada.png",
      platos: [
        {
          img: "img/huevos.jpg",
          nombre: "Huevo Relleno",
          descripcion:
            "Huevo cocido relleno de una cremosa mezcla de yema, mostaza y un toque de pimentón.",
          precio: 12,
        },
      ],
    },
    {
      id: "plato-principal",
      titulo: "Plato Principal",
      icono: "bi-egg-fried",
      banner: "img/plato-principal.png",
      platos: [
        {
          img: "img/silpancho.jpg",
          nombre: "Silpancho",
          descripcion:
            "Milanesa de carne apanada sobre arroz y papa, coronada con huevo frito y ensalada fresca.",
          precio: 35,
        },
      ],
    },
    {
      id: "postre",
      titulo: "Postre",
      icono: "bi-cup-straw",
      banner: "img/postre.png",
      platos: [
        {
          img: "img/gelatina.jpg",
          nombre: "Gelatina",
          descripcion:
            "Refrescante gelatina de frutos rojos, servida bien fría en copa de cristal.",
          precio: 8,
        },
      ],
    },
  ],
  bebidas: [
    {
      titulo: "Gaseosa",
      icono: "bi-cup-straw",
      opciones: [
        { nombre: "Coca-Cola", precio: 10 },
        { nombre: "Fanta", precio: 10 },
        { nombre: "Sprite", precio: 10 },
      ],
    },
    {
      titulo: "Agua",
      icono: "bi-droplet-half",
      opciones: [
        { nombre: "Con gas", precio: 8 },
        { nombre: "Sin gas", precio: 6 },
      ],
    },
  ],
};

/* ---------- 2. Utilidades de render ---------- */
const money = (valor) => `${menu.moneda} ${valor}`;

/** Tarjeta de un plato (entrada, principal, postre). */
function dishCard(plato) {
  return `
    <div class="col-12 col-md-6 col-lg-4">
      <article class="dish-card fade-in">
        <div class="dish-card__media">
          <img
            class="dish-card__img"
            src="${plato.img}"
            alt="${plato.nombre}"
            loading="lazy"
          />
        </div>
        <div class="dish-card__body">
          <h3 class="dish-card__name">${plato.nombre}</h3>
          <p class="dish-card__desc">${plato.descripcion}</p>
          <p class="dish-card__price">
            <i class="bi bi-tag-fill"></i> ${money(plato.precio)}
          </p>
        </div>
      </article>
    </div>`;
}

/** Encabezado de sección: usa la imagen de banner si existe, si no el badge. */
function sectionHead(titulo, icono, banner) {
  const inner = banner
    ? `<h2 class="section-banner-wrap">
          <img class="section-banner" src="${banner}" alt="${titulo}" loading="lazy" />
        </h2>`
    : `<h2 class="section-title"><i class="bi ${icono}"></i>${titulo}</h2>`;
  return `<div class="section-head fade-in">${inner}</div>`;
}

/** Sección de platos con su encabezado. */
function dishSection(seccion) {
  return `
    <section class="menu-section" id="${seccion.id}">
      ${sectionHead(seccion.titulo, seccion.icono, seccion.banner)}
      <div class="row g-4 justify-content-center">
        ${seccion.platos.map(dishCard).join("")}
      </div>
    </section>`;
}

/** Tarjeta de una categoría de bebida. */
function drinkCard(bebida) {
  const items = bebida.opciones
    .map(
      (op) => `
        <li>
          <span>${op.nombre}</span>
          <span class="price">${money(op.precio)}</span>
        </li>`
    )
    .join("");

  return `
    <div class="col-12 col-md-6">
      <div class="drink-card fade-in">
        <h3 class="drink-card__title">
          <i class="bi ${bebida.icono}"></i>${bebida.titulo}
        </h3>
        <ul class="drink-card__list">${items}</ul>
      </div>
    </div>`;
}

/** Sección completa de bebidas. */
function drinksSection() {
  return `
    <section class="menu-section" id="bebidas">
      ${sectionHead("Bebidas", "bi-cup-straw", menu.bebidasBanner)}
      <div class="row g-4 justify-content-center">
        ${menu.bebidas.map(drinkCard).join("")}
      </div>
    </section>`;
}

/* ---------- 3. Montaje del menú ---------- */
function renderMenu() {
  const root = document.getElementById("menu-root");
  if (!root) return;

  const html =
    menu.secciones.map(dishSection).join("") + drinksSection();
  root.innerHTML = html;
}

/* ---------- 4. Animación de entrada (fade-in) ---------- */
let revealed = false;

/** Observa todos los elementos .fade-in y los revela al entrar en pantalla. */
function revealContent() {
  if (revealed) return;
  revealed = true;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document
    .querySelectorAll(".fade-in")
    .forEach((item) => observer.observe(item));
}

/* ---------- 5. Preloader ---------- */
function hidePreloader() {
  const pre = document.getElementById("preloader");
  if (pre) {
    pre.classList.add("is-hidden");
    pre.addEventListener("transitionend", () => pre.remove(), { once: true });
  }
  // Revela el contenido justo cuando el preloader se retira.
  revealContent();
}

function initPreloader() {
  // Oculta cuando todo (imágenes incl.) haya cargado.
  window.addEventListener("load", hidePreloader);
  // Red de seguridad: nunca dejar el preloader más de 5 s.
  setTimeout(hidePreloader, 5000);
}

/* ---------- 6. Inicio ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  initPreloader();

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
