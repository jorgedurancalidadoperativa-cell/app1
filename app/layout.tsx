import "./globals.css";
import {StoreProvider} from "@/lib/store";
export const metadata={title:"POS Inventario Profesional",description:"Sistema web de punto de venta e inventario"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es-MX"><body><StoreProvider>{children}</StoreProvider></body></html>}
