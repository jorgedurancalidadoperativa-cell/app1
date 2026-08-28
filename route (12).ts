import {db} from "@/lib/db";
import {z} from "zod";
const saleSchema=z.object({userId:z.string(),paymentMethodId:z.string(),cashReceived:z.number().nonnegative(),discount:z.number().nonnegative().default(0),items:z.array(z.object({productId:z.string(),quantity:z.number().positive(),unitPrice:z.number().positive(),discount:z.number().nonnegative().default(0)})).min(1)});
export async function POST(req:Request){
  const body=saleSchema.parse(await req.json());
  const result=await db.$transaction(async(tx)=>{
    let subtotal=0;
    for(const item of body.items){
      const p=await tx.product.findUnique({where:{id:item.productId}});
      if(!p) throw new Error("Producto no encontrado");
      if(p.stock.lt(item.quantity) && !(await tx.businessConfig.findFirst())?.allowNegativeInventory) throw new Error(`Stock insuficiente: ${p.name}`);
      subtotal += item.unitPrice*item.quantity-item.discount;
    }
    const total=subtotal-body.discount;
    const ticketNumber=`T-${Date.now().toString().slice(-8)}`;
    const sale=await tx.sale.create({data:{ticketNumber,userId:body.userId,paymentMethodId:body.paymentMethodId,subtotal,discount:body.discount,total,cashReceived:body.cashReceived,changeGiven:Math.max(0,body.cashReceived-total),items:{create:body.items.map(i=>({productId:i.productId,quantity:i.quantity,unitPrice:i.unitPrice,discount:i.discount,subtotal:i.unitPrice*i.quantity-i.discount}))}}});
    for(const item of body.items){
      await tx.product.update({where:{id:item.productId},data:{stock:{decrement:item.quantity}}});
      await tx.inventoryMovement.create({data:{productId:item.productId,quantity:item.quantity,type:"SALE",userId:body.userId,reference:ticketNumber}});
    }
    return sale;
  });
  return Response.json(result,{status:201});
}
