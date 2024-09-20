import express from "express";
import { UserRoute } from "../api/interface/routes/user";
import { adminRoute } from "../api/interface/routes/admin";

/** crate global router */
export const createRouter = (): express.Router => {
  const router = express.Router();

  UserRoute(router);
  adminRoute(router);

  return router;
};
