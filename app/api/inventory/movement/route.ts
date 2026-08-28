import {db} from "@/lib/db";
import {z} from "zod";
const schema=z.object({productId:z.string(),quantity:z.number().positive(),userId:z.string(),type:z.enum(["ENTRY","POSITIVE_ADJUSTMENT","NEGATIVE_ADJUSTMENT","RETURN"]),reason:z.string().optional(),reference:z.string().optional()});
export async function POST(req:Request){
 const b=schema.parse(await req.json());
 const result=await db.$transaction(async tx=>{
  const delta=b.type==="NEGATIVE_ADJUSTMENT"?-b.quantity:b.quantity;
  const product=await tx.product.update({where:{id:b.productId},data:{stock:{increment:delta}}});
  await tx.inventoryMovement.create({data:{productId:b.productId,quantity:b.quantity,type:b.type,userId:b.userId,reason:b.reason,reference:b.reference}});
  return product;
 });
 return Response.json(result);
}
