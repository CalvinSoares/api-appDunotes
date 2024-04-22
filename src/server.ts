import express, { Request, Response, NextFunction } from "express";
import connectToDataBase from "./db";
import userRouter from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import taskRoutes from "./routes/task.routes";
import cors from "cors";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};

const app = express();
const PORT = 1337;

app.listen(PORT, () => {
  console.log("Server up and running", PORT);
});

app.use(express.json());
app.use(cors());

connectToDataBase();

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong");
});

app.use(errorHandler);

app.use("/user", userRouter);
app.use("/category", categoryRoutes);
app.use("/task", taskRoutes);
