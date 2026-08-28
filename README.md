# POS INVENTARIO V3

Proyecto independiente de Punto de Venta + Inventario.

## Diseño
- Fondo negro
- Botones grises
- Letras blancas
- POS enfocado en velocidad

## Roles
### ADMINISTRADOR
Acceso a dashboard, tiendas, usuarios, productos, proveedores, entradas, inventario, ventas, reportes y configuración.

### CAJERO
Acceso únicamente a POS y sus ventas.

## Arquitectura
Next.js + TypeScript + Prisma + PostgreSQL.
Las operaciones críticas se implementan en transacciones de servidor.

## Vercel
Configurar:
- DATABASE_URL
- AUTH_SECRET
- NEXT_PUBLIC_APP_NAME

Comando de build:
npm run build
