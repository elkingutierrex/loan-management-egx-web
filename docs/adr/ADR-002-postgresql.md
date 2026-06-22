# ADR-002: Decisiones de Tecnologías de Datos y Estado

## Contexto
Se requiere persistencia relacional en el backend y un manejo eficiente de estados asíncronos en el frontend.

## Decisión
1. **Backend:** Usar **PostgreSQL** con **Entity Framework Core**. Es maduro, soporta transacciones y se alinea con el stack solicitado.
2. **Frontend:** Usar **TanStack Query** para la sincronización de datos con el servidor.

## Alternativas
- SQL Server (Descartado por ser solicitado PostgreSQL).
- Redux Toolkit (Descartado para privilegiar la simplicidad y potencia de Query para estados de servidor).

## Consecuencias
- Manejo automático de caché y re-validación en el frontend.
- Esquema de base de datos sólido y migrado mediante código (Code First).
