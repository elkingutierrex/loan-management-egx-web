# AI Context - Documento de Continuidad

## Objetivo
Este documento sirve como fuente de verdad para que cualquier modelo de IA o desarrollador entienda el estado y la dirección del proyecto "Sistema de Gestión de Préstamos Bancarios".

## Estado Actual (22-06-2026)
- [x] Inicialización de repositorios (`api` y `web`) en `D:\projects\personalProjects`.
- [x] Configuración de GitFlow (ramas `main` y `develop`).
- [x] Estructura de carpetas creada (Hexagonal en Backend, Modular en Frontend).
- [x] Inicio de Documentación SDD (000-vision, 001-requirements).
- [/] Configuración base de React 19 + Tailwind (Procediendo a instalar paquetes).

## Arquitectura y Convenciones
- **Backend:** .NET 10, Arquitectura Hexagonal.
- **Frontend:** React 19.2.7, Vite, Tailwind CSS, TanStack Query.
- **Base de Datos:** PostgreSQL.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).

## Tareas Pendientes Inmediatas
1. Completar documentación SDD (Casos de uso, Modelos de dominio).
2. Configurar entorno de desarrollo React (Vite, Tailwind, Router).
3. Implementar capa de Mocks en Frontend.
4. Desarrollar interfaces de Login y Dashboard.

## Riesgos y Deuda Técnica
- Configuración de `docker-compose` pendiente para fase de integración.
- Asegurar consistencia entre tipos de Dominio (Backend) y Typescript (Frontend).
