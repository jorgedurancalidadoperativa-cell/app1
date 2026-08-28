import {existsSync} from "node:fs";import {join} from "node:path";
const required=["app","app/layout.tsx","app/page.tsx","app/login/page.tsx","prisma/schema.prisma","package.json"];
for(const x of required)if(!existsSync(join(process.cwd(),x)))throw new Error("[POS] Falta "+x);
if(existsSync(join(process.cwd(),"schema.prisma")))throw new Error("[POS] schema.prisma incorrecto en la raíz; use prisma/schema.prisma");
console.log("[POS] Estructura verificada.");