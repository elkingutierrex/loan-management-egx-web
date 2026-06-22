# 001 - Requerimientos del Sistema

## Requerimientos Funcionales (RF)

| ID | Requerimiento | Descripción | Prioridad |
|----|---------------|-------------|-----------|
| RF-01 | Autenticación | El sistema debe permitir el login de usuarios y administradores con JWT. | Alta |
| RF-02 | Solicitar Préstamo | Un usuario puede registrar una solicitud con un monto (`> 0`) y plazo (`> 0`). | Alta |
| RF-03 | Listar Préstamos | El usuario debe poder ver el historial de sus solicitudes con su estado. | Alta |
| RF-04 | Detalle de Préstamo | Los usuarios y administradores pueden ver los detalles de una solicitud. | Media |
| RF-05 | Gestionar Solicitudes | El administrador puede aprobar o rechazar préstamos pendientes. | Alta |
| RF-06 | Motivo de Rechazo | Al rechazar un préstamo, el administrador debe registrar un motivo. | Media |

## Requerimientos No Funcionales (RNF)

| ID | Requerimiento | Descripción |
|----|---------------|-------------|
| RNF-01 | Arquitectura | Backend bajo Arquitectura Hexagonal y Frontend modular. |
| RNF-02 | Seguridad | Protección contra SQL Injection, XSS y CSRF. Auth vía JWT. |
| RNF-03 | Rendimiento | Respuestas de API inferiores a 500ms. |
| RNF-04 | UX/UI | Diseño premium, responsivo y moderno (Tailwind CSS). |
| RNF-05 | Testing | Cobertura mínima del 70% en pruebas automatizadas. |
| RNF-06 | Multi-fuente | Frontend capaz de alternar entre DATA_SOURCE=MOCK y API. |
