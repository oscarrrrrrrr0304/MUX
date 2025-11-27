# Manual Rappi UI

Interfaz moderna creada con React + Tailwind CSS para presentar un manual de usuario de la app Rappi.

## Requisitos

- Node.js 18+
- npm 9+

## Scripts disponibles

```bash
npm install       # Instala dependencias
npm run dev       # Inicia el entorno de desarrollo en http://localhost:5173
npm run build     # Genera la versión optimizada para producción
npm run preview   # Sirve la compilación de producción de forma local
```

## Estructura principal

- `src/App.jsx`: Vista principal del manual interactivo.
- `src/index.css`: Estilos base y directivas Tailwind.
- `tailwind.config.js`: Personalización de tema (colores Rappi y fondos).
- `vite.config.js`: Configuración del bundler Vite.

## Notas

- El proyecto usa Inter como tipografía principal cargada desde Google Fonts.
- El layout está optimizado para pantallas desktop y tablet; Tailwind facilita ajustes móviles adicionales.
- Puedes exportar la vista a PDF desde el navegador para compartirlo offline.
