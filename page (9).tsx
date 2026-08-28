 "use client";
import AppShell from "@/components/AppShell";
import {useMemo,useState} from "react";
type P={id:string;name:string;barcode:string;price:number;stock:number};
const products:P[]=[
 {id:"1",name:"Coca Cola 600 ml",barcode:"7501055300011",price:18,stock:42},
 {id:"2",name:"Coca Cola 1.5 L",barcode:"7501055300012",price:29,stock:28},
 {id:"3",name:"Coca Cola 3 L",barcode:"7501055300013",price:45,stock:16},
 {id:"4",name:"Agua 1 L",barcode:"7501000123456",price:14,stock:80},
 {id:"5",name:"Pan Blanco",barcode:"7501012345678",price:42,stock:21},
 {id:"6",name:"Leche 1 L",barcode:"7501098765432",price:28,stock:35}
];
export default function POS(){
 const [q,setQ]=useState(""); const [cart,setCart]=useState<(P&{qty:number})[]>([]);
 const add=(p:P)=>setCart(c=>{const e=c.find(x=>x.id===p.id);return e?c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...c,{...p,qty:1}]});
 const filtered=products.filter(p=>(p.name+" "+p.barcode).toLowerCase().includes(q.toLowerCase()));
 const subtotal=useMemo(()=>cart.reduce((s,x)=>s+x.price*x.qty,0),[cart]);
 const total=subtotal;
 return <AppShell><div className="pos">
   <section>
    <h1 className="title">Punto de Venta</h1><p className="subtitle">Escáner, búsqueda y cobro rápido</p>
    <div className="toolbar"><input autoFocus className="input" placeholder="Escanea o escribe código / nombre..." value={q} onChange={e=>setQ(e.target.value)} style={{maxWidth:560}}/><button className="btn btnPrimary">Abrir cámara</button></div>
    <div className="productGrid">{filtered.map(p=><button key={p.id} className="productCard" onClick={()=>add(p)} style={{textAlign:"left"}}><h3>{p.name}</h3><p className="muted">{p.barcode}</p><p className="price">${p.price.toFixed(2)}</p><span className={p.stock<=5?"badge danger":"badge ok"}>Stock {p.stock}</span></button>)}</div>
   </section>
   <aside className="card cart"><h2>Carrito</h2>{cart.length===0?<p className="muted">Escanea o selecciona productos.</p>:cart.map(x=><div key={x.id} style={{padding:"10px 0",borderBottom:"1px solid var(--line)"}}><div style={{display:"flex",justifyContent:"space-between"}}><strong>{x.name}</strong><strong>${(x.price*x.qty).toFixed(2)}</strong></div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}><span className="muted">${x.price.toFixed(2)} × {x.qty}</span><div style={{display:"flex",gap:5}}><button className="btn btnGhost" onClick={()=>setCart(c=>c.map(y=>y.id===x.id?{...y,qty:Math.max(1,y.qty-1)}:y))}>−</button><button className="btn btnGhost" onClick={()=>add(x)}>+</button></div></div></div>)}
    <div style={{marginTop:18,display:"grid",gap:10}}><div style={{display:"flex",justifyContent:"space-between"}}><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><div style={{display:"flex",justifyContent:"space-between"}}><span>Descuento</span><strong>$0.00</strong></div><hr/><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span>Total</span><span className="total">${total.toFixed(2)}</span></div><button className="btn btnPrimary" style={{padding:14}}>Cobrar</button></div>
   </aside>
  </div></AppShell>
}
