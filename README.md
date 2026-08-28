# POS Inventario Profesional

Proyecto **independiente de J D O SERVICES**. Aplicación Next.js para punto de venta e inventario.

## IMPORTANTE: subir correctamente a GitHub

Después de extraer el ZIP, la carpeta del proyecto debe conservar esta estructura. **No subas los archivos de `app` a la raíz uno por uno.**

```text
app/
components/
lib/
prisma/
package.json
next.config.mjs
tsconfig.json
vercel.json
```

En particular, debe existir:

```text
app/page.tsx
app/layout.tsx
app/globals.css
app/login/page.tsx
app/dashboard/page.tsx
app/pos/page.tsx
app/ventas/page.tsx
app/productos/page.tsx
app/inventario/page.tsx
app/entradas/page.tsx
app/proveedores/page.tsx
app/reportes/page.tsx
app/usuarios/page.tsx
app/configuracion/page.tsx
```

## Desarrollo

```bash
npm install
cp .env.example .env.local
npx prisma generate
npx prisma db push
npm run build
npm run dev
```

## Vercel

Conecta el repositorio a Vercel. Usa `npm run build` como build command. Para las APIs y persistencia PostgreSQL configura `DATABASE_URL` y `AUTH_SECRET` en Environment Variables.

## Nota sobre la versión inicial

La interfaz y el flujo POS funcionan con almacenamiento local del navegador para permitir una demostración inmediata. El esquema Prisma y las API transaccionales están incluidos para conectar persistencia PostgreSQL real. Antes de producción se debe configurar la base de datos y autenticación server-side.

Demo inicial:
- admin / admin123
- caja1 / caja123
