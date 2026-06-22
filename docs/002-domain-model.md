# Roles de la Aplicación

## 1. Usuario (Prestatario)
- `email`: usuario@test.com
- `password`: 123
- **Acciones:**
  - Login
  - Crear Solicitud (Monto, Plazo)
  - Listar Mis Préstamos
  - Ver Detalle

## 2. Administrador
- `email`: admin@test.com
- `password`: 123
- **Acciones:**
  - Login
  - Listar Todas las Solicitudes
  - Aprobar Solicitud (Solo Pendientes)
  - Rechazar Solicitud (Solo Pendientes + Motivo)
  - Ver Detalle de cualquier préstamo

# Modelo de Dominio (Entidad Préstamo)
- `Id`: string/guid
- `Monto`: number (>0)
- `Plazo`: number (>0 en meses)
- `Estado`: "Pendiente" | "Aprobado" | "Rechazado"
- `FechaSolicitud`: Date
- `MotivoRechazo`: string (opcional)
- `UsuarioId`: string
