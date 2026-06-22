# Loan Management System - Frontend

Sistema de gestión de préstamos bancarios desarrollado con **React 19.2.7** y **Vite**.

## 🚀 Tecnologías
- **React 19.2.7** (TypeScript)
- **Tailwind CSS**: Estilos premium con Glassmorphism y Dark Mode.
- **TanStack Query (v5)**: Gestión de estado asíncrono y caché.
- **Lucide React**: Iconografía moderna.
- **React Hook Form + Zod**: Validaciones robustas.

## 📦 Estructura del Proyecto
- `src/app`: Configuración de rutas y QueryClient.
- `src/components`: Componentes UI reutilizables.
- `src/pages`: Vistas principales (Login, Dashboard Usuario, Admin).
- `src/services`: Capa de servicios para comunicación con API o Mocks.
- `src/contexts`: Contextos globales (Autenticación).

## 🛠️ Configuración
El frontend puede alternar entre datos simulados (**MOCK**) y una API real (**API**) configurando el archivo `.env`:

```env
VITE_DATA_SOURCE=API
VITE_API_URL=http://localhost:5000/api
```

## 🏃 Ejecución Local
```bash
npm install
npm run dev
```

## 🏗️ Docker
```bash
docker build -t loan-web .
docker run -p 3000:80 loan-web
```
