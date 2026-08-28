export type Role = "ADMIN" | "CASHIER";
export const demoUser = { id:"demo-admin", name:"Administrador", role:"ADMIN" as Role, storeId:"store-001", storeName:"Tienda Principal" };
export const demoProducts = [
  {id:"p1",barcode:"7501055300011",name:"Coca Cola 600 ml",purchasePrice:12,salePrice:18,stock:42,minimumStock:10},
  {id:"p2",barcode:"7501055300012",name:"Coca Cola 1.5 L",purchasePrice:19,salePrice:29,stock:28,minimumStock:8},
  {id:"p3",barcode:"7501000123456",name:"Agua 1 L",purchasePrice:8,salePrice:14,stock:80,minimumStock:15},
  {id:"p4",barcode:"7501012345678",name:"Pan Blanco",purchasePrice:28,salePrice:42,stock:5,minimumStock:8},
  {id:"p5",barcode:"7501098765432",name:"Leche 1 L",purchasePrice:19,salePrice:28,stock:0,minimumStock:5}
];