import { Router } from "express";
import routeGuard from "../api/route.guard.middleware";
import { addProduct, create, index, show } from "./handler.orders";

const orderRoutes = Router();

orderRoutes
  .post("/orders", create)
  .get("/orders", index)
  .get("/orders/:id", show)
  .post("/orders/:id/products", routeGuard, addProduct);

export default orderRoutes;
