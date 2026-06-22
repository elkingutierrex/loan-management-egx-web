# AI Context - Documento de Continuidad

## Objetivo
Este documento sirve como fuente de verdad para que cualquier modelo de IA o desarrollador entienda el estado y la dirección del proyecto "Sistema de Gestión de Préstamos Bancarios".

## Estado Actual (22-06-2026)
- [x] Inicialización de repositorios (`api` y `web`) en `D:\projects\personalProjects`.
- [x] Configuración de GitFlow (ramas `main` y `develop`) sincronizadas.
- [x] Estructura de carpetas creada (Hexagonal en Backend, Modular en Frontend).
- [x] Documentación SDD Inicial y ADR-001 al ADR-003 completados.
- [x] Frontend 100% Funcional con Mocks (Login, User Dash, Loan Request, Admin Dash).
- [x] Backend (.NET 10) compila correctamente con Inyección de Dependencias y Auth JWT.
- [x] Pruebas Unitarias al 100% de éxito (xUnit + Moq).
- [/] Dockerización en proceso.

## Arquitectura y Convenciones
- **Backend:** .NET 11, Arquitectura Hexagonal.
- **Frontend:** React 19, Tailwind CSS, TanStack Query.
- **Gestión de Versiones:** Commits atómicos, GitFlow respetado.
- **Git Hygiene:** .gitignore actualizado y repositorios limpios de basura técnica.

## Tareas Pendientes Inmediatas
1. Implementar Dockerfile y Docker-compose.
2. Finalizar ADRs restantes (Testing Strategy, Frontend State).
3. Revisión final de requerimientos (RF-01 a RF-05).

## Riesgos y Deuda Técnica
- Falta implementación de Refresh Tokens (Considerado punto extra).
