import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middlewares/Error.js";
import cors from "cors";
// import stripe from "stripe";

config({
  path: "./config/config.env",
});

// export const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
// using Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

//Importing and using routes

import user from "./routes/userRoutes.js";
import product from "./routes/productRoutes.js";
import shop from "./routes/shopRoutes.js";
import other from "./routes/otherRoutes.js";
import payment from "./routes/paymentRoutes.js";

app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", shop);
app.use("/api/v1", other);
app.use("/api/v1", payment);

export default app;

app.get("/", (req, res) => res.send(`<h1>Site is Working</h1>`));
app.use(ErrorMiddleware);
