# AI Context - Documento de Continuidad

## Objetivo
Este documento sirve como fuente de verdad para que cualquier modelo de IA o desarrollador entienda el estado y la dirección del proyecto "Sistema de Gestión de Préstamos Bancarios".

## Estado Actual (22-06-2026)
- [x] Inicialización de repositorios (`api` y `web`) en `D:\projects\personalProjects`.
- [x] Configuración de GitFlow (ramas `main` y `develop`).
- [x] Estructura de carpetas creada (Hexagonal en Backend, Modular en Frontend).
- [x] Documentación SDD Inicial (000-002).
- [x] Desarrollo de Autenticación MOCK y Login Page Premium.
- [x] Creación de `DashboardLayout` con Sidebar y Header persistentes.
- [/] Implementando Dashboard de Usuario y Solicitud de Préstamos.

## Arquitectura y Convenciones
- **Backend:** .NET 10, Arquitectura Hexagonal.
- **Frontend:** React 19.2.7, Vite, Tailwind CSS, TanStack Query.
- **Estado Global:** Context API para Auth, TanStack Query para Datos.
- **Commits:** Conventional Commits.

## Tareas Pendientes Inmediatas
1. Finalizar `UserDashboard` (Lista de préstamos MOCK).
2. Crear `LoanRequestPage` con formulario validado.
3. Desarrollar `AdminDashboard` con filtros de estado.
4. Iniciar fase de Backend (.NET 10).

## Riesgos y Deuda Técnica
- Implementación de persistencia de Mocks en memoria (se reinician al recargar si no usamos localStorage para la data fake).
