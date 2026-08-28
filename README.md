# POS Inventario Profesional

Aplicación web independiente de Punto de Venta (POS) + Inventario.

## Stack
- Next.js 16 App Router
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL
- API routes para operaciones de negocio

## Desarrollo
1. Copia `.env.example` a `.env.local`.
2. Configura `DATABASE_URL`.
3. Ejecuta `npm install`.
4. Ejecuta `npx prisma generate`.
5. Ejecuta `npx prisma db push`.
6. Ejecuta `npm run dev`.

## Vercel
- Conecta este repositorio a Vercel.
- Configura `DATABASE_URL`, `AUTH_SECRET` y `NEXT_PUBLIC_APP_NAME`.
- Build command: `npm run build`.
- Vercel detectará Next.js automáticamente.

## Alcance inicial
Incluye shell profesional, login demo, dashboard, POS, catálogo, inventario, entradas, ventas, proveedores, reportes, usuarios y configuración.
Las rutas API están preparadas para conectarse a PostgreSQL mediante Prisma.
