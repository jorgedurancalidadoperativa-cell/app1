"use client";
import React,{createContext,useContext,useEffect,useMemo,useState} from "react";

export type Product={id:string;barcode:string;name:string;brand:string;category:string;unit:string;purchasePrice:number;salePrice:number;stock:number;minimumStock:number;active:boolean;supplier:string};
export type SaleItem={productId:string;name:string;barcode:string;quantity:number;unitPrice:number;discount:number;subtotal:number};
export type Sale={id:string;ticketNumber:string;date:string;user:string;payment:string;subtotal:number;discount:number;total:number;cashReceived:number;change:number;status:"COMPLETED"|"CANCELLED";items:SaleItem[]};
export type Movement={id:string;date:string;productId:string;productName:string;quantity:number;type:string;user:string;reason:string;reference:string};
export type Entry={id:string;number:string;date:string;supplier:string;reference:string;items:{productId:string;productName:string;quantity:number;purchasePrice:number}[];notes:string};
export type User={id:string;name:string;username:string;role:"ADMIN"|"CASHIER";active:boolean};

type State={products:Product[];sales:Sale[];movements:Movement[];entries:Entry[];users:User[];config:{businessName:string;address:string;phone:string;email:string;rfc:string;legend:string;currency:string;taxEnabled:boolean;taxRate:number;allowNegative:boolean;defaultMinimum:number};setProducts:React.Dispatch<React.SetStateAction<Product[]>>;setSales:React.Dispatch<React.SetStateAction<Sale[]>>;setMovements:React.Dispatch<React.SetStateAction<Movement[]>>;setEntries:React.Dispatch<React.SetStateAction<Entry[]>>;setUsers:React.Dispatch<React.SetStateAction<User[]>>;setConfig:React.Dispatch<React.SetStateAction<State["config"]>>};
const Ctx=createContext<State|null>(null);
const seedProducts:Product[]=[
{id:"1",barcode:"7501055300011",name:"Coca Cola 600 ml",brand:"Coca Cola",category:"Bebidas",unit:"PZA",purchasePrice:12,salePrice:18,stock:42,minimumStock:10,active:true,supplier:"Distribuidora Central"},
{id:"2",barcode:"7501055300012",name:"Coca Cola 1.5 L",brand:"Coca Cola",category:"Bebidas",unit:"PZA",purchasePrice:19,salePrice:29,stock:28,minimumStock:8,active:true,supplier:"Distribuidora Central"},
{id:"3",barcode:"7501055300013",name:"Coca Cola 3 L",brand:"Coca Cola",category:"Bebidas",unit:"PZA",purchasePrice:30,salePrice:45,stock:16,minimumStock:5,active:true,supplier:"Distribuidora Central"},
{id:"4",barcode:"7501000123456",name:"Agua 1 L",brand:"Agua",category:"Bebidas",unit:"PZA",purchasePrice:8,salePrice:14,stock:80,minimumStock:15,active:true,supplier:"Bebidas del Norte"},
{id:"5",barcode:"7501012345678",name:"Pan Blanco",brand:"Pan",category:"Abarrotes",unit:"PZA",purchasePrice:28,salePrice:42,stock:21,minimumStock:8,active:true,supplier:"Abarrotes del Golfo"},
{id:"6",barcode:"7501098765432",name:"Leche 1 L",brand:"Leche",category:"Lácteos",unit:"PZA",purchasePrice:19,salePrice:28,stock:35,minimumStock:8,active:true,supplier:"Abarrotes del Golfo"}
];
function read<T>(key:string,fallback:T):T{try{const x=localStorage.getItem(key);return x?JSON.parse(x):fallback}catch{return fallback}}
function persist(key:string,value:unknown){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
export function StoreProvider({children}:{children:React.ReactNode}){
 const [products,setProducts]=useState<Product[]>(seedProducts),[sales,setSales]=useState<Sale[]>([]),[movements,setMovements]=useState<Movement[]>([]),[entries,setEntries]=useState<Entry[]>([]),[users,setUsers]=useState<User[]>([{id:"u1",name:"Administrador",username:"admin",role:"ADMIN",active:true},{id:"u2",name:"Cajero 1",username:"caja1",role:"CASHIER",active:true}]),[config,setConfig]=useState<State["config"]>({businessName:"Mi Negocio",address:"",phone:"",email:"",rfc:"",legend:"Gracias por su compra",currency:"MXN",taxEnabled:false,taxRate:0,allowNegative:false,defaultMinimum:5});
 useEffect(()=>{setProducts(read("pos_products",seedProducts));setSales(read("pos_sales",[]));setMovements(read("pos_movements",[]));setEntries(read("pos_entries",[]));setUsers(read("pos_users",[{id:"u1",name:"Administrador",username:"admin",role:"ADMIN",active:true},{id:"u2",name:"Cajero 1",username:"caja1",role:"CASHIER",active:true}]));setConfig(read("pos_config",config))},[]);
 useEffect(()=>persist("pos_products",products),[products]);useEffect(()=>persist("pos_sales",sales),[sales]);useEffect(()=>persist("pos_movements",movements),[movements]);useEffect(()=>persist("pos_entries",entries),[entries]);useEffect(()=>persist("pos_users",users),[users]);useEffect(()=>persist("pos_config",config),[config]);
 return <Ctx.Provider value={{products,sales,movements,entries,users,config,setProducts,setSales,setMovements,setEntries,setUsers,setConfig}}>{children}</Ctx.Provider>
}
export function useStore(){const x=useContext(Ctx);if(!x)throw new Error("useStore must be used inside StoreProvider");return x}
export const money=(n:number)=>new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN"}).format(n);
export const todayKey=()=>new Date().toISOString().slice(0,10);
