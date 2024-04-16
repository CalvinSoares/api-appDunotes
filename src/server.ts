import express, { Request, Response } from "express";
import connectToDataBase from "./db";
import userRouter from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import taskRoutes from "./routes/task.routes";

const app = express();

const PORT = 1337;

connectToDataBase();

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong");
});

app.listen(PORT, () => {
  console.log("Server up and running", PORT);
});

app.use(express.json());

app.use("/user", userRouter);
app.use("/category", categoryRoutes);
app.use("/task", taskRoutes);
