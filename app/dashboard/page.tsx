import AppShell from "@/components/AppShell";
export default function Dashboard(){
 return <AppShell>
  <div><h1 className="title">Dashboard</h1><p className="subtitle">Resumen operativo del negocio</p></div>
  <div className="grid grid4" style={{marginTop:20}}>
   {[
    ["Ventas de hoy","$18,420.00","24 tickets","+12%"],
    ["Esta semana","$96,850.00","128 tickets","+8%"],
    ["Este mes","$384,210.00","534 ventas","+14%"],
    ["Inventario","$612,780.00","1,248 productos","18 bajos"]
   ].map(([a,b,c,d])=><div className="card" key={a}><div className="muted">{a}</div><div className="kpi">{b}</div><div style={{display:"flex",justifyContent:"space-between"}}><span className="muted">{c}</span><span className="badge ok">{d}</span></div></div>)}
  </div>
  <div className="grid grid2" style={{marginTop:18}}>
   <div className="card"><h2>Ventas por día</h2><div className="chart">{[52,75,42,88,94,61,80].map((v,i)=><div key={i} style={{flex:1}}><div className="bar" style={{height:`${v}%`}}></div><div className="barLabel">{["L","M","M","J","V","S","D"][i]}</div></div>)}</div></div>
   <div className="card"><h2>Productos más vendidos</h2>{["Coca Cola 600 ml","Agua 1 L","Pan Blanco","Leche 1 L","Papas 45 g"].map((x,i)=><div key={x} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid var(--line)"}}><span>{i+1}. {x}</span><strong>{250-i*31} pzas</strong></div>)}</div>
  </div>
  <div className="grid grid3" style={{marginTop:18}}>
   <div className="card"><div className="muted">Productos con stock bajo</div><div className="kpi">18</div><span className="badge warn">Revisar</span></div>
   <div className="card"><div className="muted">Productos agotados</div><div className="kpi">6</div><span className="badge danger">Urgente</span></div>
   <div className="card"><div className="muted">Ticket promedio</div><div className="kpi">$767.50</div><span className="badge ok">+5.2%</span></div>
  </div>
 </AppShell>
}
