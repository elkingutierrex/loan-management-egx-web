# ADR-003: Autenticación mediante JWT

## Contexto
El sistema debe manejar dos roles (ADMIN y USER) con rutas protegidas de forma segura.

## Decisión
Implementar **JWT (JSON Web Tokens)** para la autenticación y autorización.
- El token incluirá los Claims `NameIdentifier` y `Role`.
- Firma mediante algoritmo `HMAC SHA256`.

## Consecuencias
- Stateless: El servidor no necesita guardar sesiones.
- Escalable: Facilidad para crecer horizontalmente.
- Requiere manejo cuidadoso del lado del cliente (LocalStorage/Secure Cookies).
