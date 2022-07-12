import { Router, Request, Response } from "express";
import Dashboard from "./model.dashboard";


const dashboard = new Dashboard()

//users/:user_id/orders/:order_id/products
export const currentOrder = async (req: Request, res: Response) => {
    try {
        const order = await dashboard.getCurrentOrderForUser(req.params.id)
        res.json(order);
    } catch (error) {

    }
}
