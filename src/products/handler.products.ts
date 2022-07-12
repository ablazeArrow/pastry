import Product from "./model.products";
import { Request, Response } from "express";
import { Secret, sign } from "jsonwebtoken";
import { SECRET as secret } from "../configs/config";

const product = new Product();

export const index = async (req: Request, res: Response) => {
  try {
    const usersList = await product.getItems();
    res.json(usersList);
  } catch (error) {
    res.json(`fail to get users list: ${error}`);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const u = await product.showItem(req.params.id);
    res.json(u);
  } catch (error) {
    res.json(`fail to get requested user: ${error}`);
  }
};

//protected route with token
export const create = async (req: Request, res: Response) => {
  try {
    const item = await product.addItem(req.body);
    res.json(item);
  } catch (error) {
    res.json(`fail to register: ${error}`);
  }
};
