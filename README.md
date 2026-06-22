# Bank Loan Management - Frontend 🎨

Interfaz de usuario moderna y de alto impacto visual para la gestión de préstamos bancarios. Diseñada para ofrecer una experiencia fluida tanto en escritorio como en dispositivos móviles.

## 🌈 Diseño y Estética
- **Dark Mode Premium:** Paleta de colores slate/primary para una apariencia profesional.
- **Glassmorphism:** Efectos de transparencia y desenfoque en la UI.
- **Ultra-Responsive:** Layout adaptativo con Sidebar móvil y diseño ancho para Desktop.
- **Micro-interacciones:** Feedback visual con SweetAlert2 y animaciones suaves.

## 🚀 Tecnologías
- **React 19**: Versión más reciente con mejoras en rendimiento.
- **TypeScript**: Tipado estricto para un código más robusto.
- **Tailwind CSS**: Estilizado moderno y eficiente.
- **TanStack Query (v5)**: Gestión inteligente de caché y estados de carga.
- **Axios**: Cliente HTTP con interceptores JWT para seguridad automática.
- **Lucide React**: Set de iconos vectoriales modernos.

## ⚙️ Integración con el Backend
La aplicación está configurada para conectarse a la API en el puerto `5000`. 
El archivo `src/constants/config.ts` controla el origen de los datos:
```typescript
VITE_DATA_SOURCE=API // Cambiar a 'MOCK' para pruebas sin servidor
```

## 🛠️ Cómo levantar la Web
1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   *La aplicación estará disponible en `http://localhost:3000`.*

---

## 🔐 Flujo de Autenticación
El sistema utiliza **JWT**. Al loguearte, el token se guarda en el `localStorage` y el interceptor de Axios lo inyecta automáticamente en cada petición a la API.
