# ADR-001: Arquitectura Hexagonal

## Contexto
El sistema requiere una separación clara de responsabilidades para permitir que la lógica de negocio (préstamos) sea independiente de la tecnología (base de datos, framework web).

## Problema
¿Cómo estructurar el backend para garantizar mantenibilidad y facilitar pruebas automatizadas?

## Decisión
Implementar **Arquitectura Hexagonal (Puertos y Adaptadores)**.
- **Domain:** Entidades puras e interfaces de repositorios.
- **Application:** Lógica de orquestación y servicios.
- **Infrastructure:** Implementaciones concretas de DB (EF Core) y configuraciones externas.
- **Api:** Punto de entrada HTTP.

## Consecuencias
- **Positivas:** Desacoplamiento total, facilidad para cambiar PostgreSQL por otra DB, testeo unitario sin mocks complejos de frameworks.
- **Negativas:** Mayor número de proyectos y archivos con mapeos (DTOs).
