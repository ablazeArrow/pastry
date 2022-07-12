import Purchases from "./model.order";
import { Request, Response } from "express";

const purchase = new Purchases();

export const index = async (req: Request, res: Response) => {
  try {
    const purchaseList = await purchase.getOrders();
    res.json(purchaseList);
  } catch (error) {
    res.json(`fail to get orders: ${error}`)
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const purchaseList = await purchase.showOrder(req.params.id);
    res.json(purchaseList);
  } catch (error) {
    res.json(`fail to get requested order: ${error}`)
  }
};

//protected route with token
export const create = async (req: Request, res: Response) => {
  try {
    const purchaseList = await purchase.addOrder(req.body);
    res.json(purchaseList);
  } catch (error) {
    res.json(`fail to add order: ${error}`)
  }
};

export const addProduct = async (req: Request, res: Response) => {
  try {
    const order_id = req.params.id
    const { product_id, quantity } = req.body
    const shopingList = await purchase.addProduct(order_id, product_id as string, quantity);
    res.json(shopingList);
  } catch (error) {
    res.json(`fail to add order: ${error}`)
  }
};
