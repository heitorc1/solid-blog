import cors from "cors";
import express from "express";
import helmet from "helmet";
import { errorHandler } from "./middlewares/errorHandler";
import router from "./routes";
import morgan from "morgan";

const app = express();
const port = 8080;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
