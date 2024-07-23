import { CartItem } from "@/src/types/cart";
import { getTotalPrice } from "@/src/utils/general";
import { prisma } from "@/src/utils/prisma";
import { ORDERSTATUS } from "@prisma/client";
import exp from "constants";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "GET") {
    const vaild = String(req.query.orderSeq)
    if(!vaild) return res.status(401).send("Bad request")
      const orders = await prisma.order.findMany({where: {orderSeq: vaild}})
    return res.status(200).send({orders});
  } else if (method === "POST") {
    const { tableId, cartItems } = req.body;
    const isVaild = tableId && cartItems.length;
    if (!isVaild) return res.status(405).send("Bad request");
    const order = await prisma.order.findFirst({
      where: {
        tableId,
        status: { in: [ORDERSTATUS.COOKING, ORDERSTATUS.PENDING] },
      },
    });
    //Making orderSequence (it's importanting for making order)
    const orderSeq = order ? order.orderSeq : nanoid();
    const totalPrice = order
      ? order.totalPrice + getTotalPrice(cartItems)
      : getTotalPrice(cartItems);
    //why did we use "for of loops"
    // "for of loops" is wait "promise" others are not wait
    for (const item of cartItems) {
      const hasAddon = item.addon.length > 0;
      if (hasAddon) {
        for (const addon of item.addon) {
          await prisma.order.create({
            data: {
              menuId: item.menu.id,
              orderSeq,
              quantity: item.quantity,
              totalPrice,
              tableId,
              status: ORDERSTATUS.PENDING,
              addonId: addon.id,
              itemId: item.id
            },
          });
        }
      } else {
        await prisma.order.create({
          data: {
            menuId: item.menu.id,
            orderSeq,
            quantity: item.quantity,
            totalPrice,
            tableId,
            status: ORDERSTATUS.PENDING,
            itemId: item.id
          },
        });
      }
      
    }
    await prisma.order.updateMany({
      data: { totalPrice },
      where: { orderSeq },
    });

    const orders = await prisma.order.findMany({where: {orderSeq}})
    return res.status(200).send({orders});
  } else if (method === "PUT") {
    return res.status(200).send("Order put method is okay");
  } else if (method === "DELETE") {
    return res.status(200).send("Order delete method is okay");
  }
  return res.status(405).send("method is not allow");
};

export default handler;
