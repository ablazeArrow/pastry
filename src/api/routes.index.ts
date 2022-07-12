import { Router, Request, Response } from "express";
import orderRoutes from "../orders/routes.order";
import productRoutes from "../products/routes.products";
import dashboardRoutes from "../services/routes.dashboard";
import userRoutes from "../users/routes.user";

//main route handler
const home = async (req: Request, res: Response) => {
  res.send(`Hello WOrld!`);
};

//main route
const routes = Router();
routes.get("/", home);

//users routes
routes.use(userRoutes);

//products routes
routes.use(productRoutes);

//orders routes
routes.use(orderRoutes);

//dashboard routes
routes.use(dashboardRoutes);

export default routes;
