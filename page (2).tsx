 "use client";
import {useRouter} from "next/navigation";
import {useState} from "react";
export default function Login(){
  const router=useRouter(); const [username,setUsername]=useState("admin"); const [password,setPassword]=useState("admin123");
  const submit=(e:React.FormEvent)=>{e.preventDefault(); if(username && password) router.push("/dashboard");};
  return <div className="loginWrap"><form className="loginCard formGrid" onSubmit={submit}>
    <div><h1>POS Inventario</h1><p className="muted">Acceso al sistema</p></div>
    <div className="field"><label className="label">Usuario</label><input className="input" value={username} onChange={e=>setUsername(e.target.value)}/></div>
    <div className="field"><label className="label">Contraseña</label><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)}/></div>
    <button className="btn btnPrimary" type="submit">Iniciar sesión</button>
    <small className="muted">Demo inicial: admin / admin123</small>
  </form></div>;
}
