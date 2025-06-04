import express, { Request, Response } from "express";
import "dotenv/config";
import user from "./router/user.router";
import login from "./router/login.router";
import nail from "./router/nail.router";
import cors from "cors";
import path from "path";
import helmet from "helmet";

const app = express();
const allowedOrigins = ["https://selena.beauty", "http://localhost:65084"];

// Middlewares
app.use(express.text());
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//Routes
app.use("/user", user);
app.use("/auth", login);
app.use("/nail", nail);
app.use(
  "/public",
  (req, res, next) => {
    const origin = req.headers.origin;
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  },
  express.static(path.join(__dirname, "../public"))
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
