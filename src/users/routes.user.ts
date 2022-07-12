import { Router } from "express";
import routeGuard from "../api/route.guard.middleware";
import { authenticate, create, index, show } from "./handler.user";

const userRoutes = Router();

userRoutes
  .post("/users/auth", authenticate)
  .post("/users", create)
  .get("/users", routeGuard, index)
  .get("/users/:id", routeGuard, show);

export default userRoutes;
