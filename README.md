# 🍽️ A Mi Antojo · Menú Digital

Menú digital tipo **pizarra (blackboard)** pensado para escanearse con un **código QR** y verse perfecto desde el celular. Ligero, elegante y sin dependencias pesadas.

**Tecnologías:** HTML5 · Bootstrap 5.3 · CSS3 · JavaScript Vanilla · Bootstrap Icons.
Sin React, sin backend, sin base de datos. Funciona abriendo `index.html`.

---

## 📂 Estructura del proyecto

```
.
├── index.html        # Estructura de la página
├── css/
│   └── style.css     # Diseño pizarra (negro · blanco · dorado)
├── js/
│   └── app.js        # Datos del menú + render + animaciones
├── img/              # Imágenes de los platos
└── README.md
```

---

## ▶️ Cómo ejecutar el proyecto

**Opción 1 — Abrir directo:**
Haz doble clic en `index.html` y se abrirá en tu navegador. ¡Listo!

**Opción 2 — Servidor local (recomendado para desarrollo):**

```bash
# Con Python instalado
python3 -m http.server 8000
```

Luego abre `http://localhost:8000` en el navegador.

---

## 🖼️ Cómo cambiar las imágenes

1. Coloca tu foto dentro de la carpeta `img/` (por ejemplo `img/silpancho.jpg`).
2. Abre `js/app.js` y actualiza la ruta `img` del plato:

```js
{
  img: "img/silpancho.jpg",   // ← tu nueva imagen
  nombre: "Silpancho",
  ...
}
```

> **Recomendado:** imágenes en formato horizontal (relación 4:3), de aprox. **800×600 px** y optimizadas (`.webp` o `.jpg`) para que carguen rápido.

---

## ✏️ Cómo modificar los platos

Todo el menú vive en **un solo lugar**: el objeto `menu` al inicio de `js/app.js`.
No necesitas tocar el HTML.

**Editar un plato existente:**

```js
{
  img: "img/silpancho.svg",
  nombre: "Silpancho",
  descripcion: "Milanesa de carne apanada sobre arroz y papa...",
  precio: 35,
}
```

**Agregar un plato nuevo** a una sección (por ejemplo, otra entrada):

```js
platos: [
  { img: "img/huevo-relleno.svg", nombre: "Huevo Relleno", descripcion: "...", precio: 12 },
  { img: "img/ceviche.svg", nombre: "Ceviche", descripcion: "...", precio: 20 }, // ← nuevo
]
```

**Cambiar la moneda** (arriba del objeto `menu`):

```js
const menu = {
  moneda: "Bs",   // cámbialo por "$", "S/", "€", etc.
  ...
};
```

**Agregar / quitar bebidas:** edita el array `bebidas`, con su lista de `opciones` (nombre y precio).

---

## 🚀 Cómo publicarlo gratis

El sitio es 100% estático, así que se publica sin build. Tienes dos opciones gratuitas y permanentes:

### Opción 1 · GitHub Pages

1. Sube el proyecto a un repositorio **público** de GitHub.
2. Ve a **Settings → Pages**.
3. En **Source**, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
4. Guarda. En un par de minutos tu menú estará en:

   ```
   https://TU-USUARIO.github.io/TU-REPOSITORIO/
   ```

> GitHub Pages es gratis y permanente para repositorios públicos (no caduca). El método "Deploy from a branch" no requiere workflows ni permisos especiales.

### Opción 2 · Netlify

1. Entra a [netlify.com](https://www.netlify.com) y crea una cuenta (puedes usar tu login de GitHub).
2. **Add new site → Import an existing project → GitHub** y elige este repositorio.
3. Netlify lee el archivo `netlify.toml` incluido: **sin comando de build** y **carpeta de publicación = raíz**. Solo pulsa **Deploy**.
4. Tu menú quedará en una URL tipo:

   ```
   https://TU-SITIO.netlify.app
   ```

   (puedes renombrar el subdominio en *Site settings → Change site name*).

Cada vez que hagas *push* a `main`, Netlify vuelve a desplegar solo.

---

## 📱 Generar el código QR

Con la URL pública (de Pages o Netlify), genera un **código QR** en cualquier generador gratuito e imprímelo para las mesas. 🎉

---

## ♿ Accesibilidad y rendimiento

- Etiquetas HTML **semánticas** (`header`, `main`, `section`, `article`, `footer`).
- Todas las imágenes incluyen atributo `alt`.
- Imágenes con carga diferida (`loading="lazy"`).
- Animaciones suaves que respetan `prefers-reduced-motion`.
- Sin librerías pesadas: carga rápida incluso en datos móviles.

---

Hecho con cariño para practicar cocina y desarrollo web. 👨‍🍳
