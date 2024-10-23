import express from "express";
import { env } from "./infrastructure/env";
import cors from "cors";
import { createRouter } from "./infrastructure/routes";
import { dbconnection, sequelize } from "./api/config/db";

const app = express();

const port = env.APPPORT;
app.use(
  cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use(express.json());

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

dbconnection();
sequelize.authenticate();
app.get("/", (req, res) => {
  res.send("user route is working")
})
app.use("/v1", createRouter());



app.listen(port, () => {
  console.log(`APP listening on port:${port}`);
});
