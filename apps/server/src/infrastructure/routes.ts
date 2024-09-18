import express from "express";
import { UserRoute } from "../api/interface/routes/user";

/** crate global router */
export const createRouter = (): express.Router => {
  const router = express.Router();

  UserRoute(router);

  return router;
};
