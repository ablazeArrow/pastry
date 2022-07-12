import { Router } from "express";
import routeGuard from "../api/route.guard.middleware";
import { currentOrder } from "./handler.dashboard";

const dashboardRoutes = Router();

dashboardRoutes.get("/users/:id/active-order", routeGuard, currentOrder);

export default dashboardRoutes;
