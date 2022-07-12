import { Router } from "express";
import routeGuard from "../api/route.guard.middleware";
import { create, index, show } from "./handler.products";

const productRoutes = Router();

productRoutes
  .post("/products", routeGuard, create)
  .get("/products", index)
  .get("/products/:id", show);

export default productRoutes;
