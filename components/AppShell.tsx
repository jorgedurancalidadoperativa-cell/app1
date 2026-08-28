 "use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {LayoutDashboard,ShoppingCart,ReceiptText,Package,Boxes,Truck,BarChart3,Users,Settings,Store as StoreIcon,Menu,X,LogOut} from "lucide-react";

const adminItems=[["/admin/dashboard","Dashboard",LayoutDashboard],["/admin/tiendas","Tiendas",StoreIcon],["/admin/usuarios","Usuarios",Users],["/admin/productos","Productos",Package],["/admin/proveedores","Proveedores",Truck],["/admin/entradas","Entradas",Truck],["/admin/inventario","Inventario",Boxes],["/admin/ventas","Ventas",ReceiptText],["/admin/reportes","Reportes",BarChart3],["/admin/configuracion","Configuración",Settings]] as const;
const cashierItems=[["/cajero/pos","Punto de Venta",ShoppingCart],["/cajero/ventas","Mis Ventas",ReceiptText]] as const;

export default function AppShell({children,role="ADMIN"}:{children:React.ReactNode;role?:"ADMIN"|"CASHIER"}){
 const pathname=usePathname(); const [open,setOpen]=useState(false); const items=role==="ADMIN"?adminItems:cashierItems;
 return <div className="app"><aside className={`sidebar ${open?"open":""}`}><div className="brand">POS INVENTARIO</div><nav className="nav">{items.map(([href,label,Icon])=><Link href={href} key={href} className={pathname===href?"active":""} onClick={()=>setOpen(false)}><Icon size={18}/>{label}</Link>)}<Link href="/login"><LogOut size={18}/>Cerrar sesión</Link></nav></aside><section className="main"><header className="topbar"><button className="btn" onClick={()=>setOpen(!open)}><>{open?<X size={19}/>:<Menu size={19}/>}</></button><div><strong>{role==="ADMIN"?"ADMINISTRADOR":"CAJERO"}</strong></div></header><main className="content">{children}</main></section></div>
}