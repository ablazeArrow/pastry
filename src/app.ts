import express from "express";
import cors from "cors";
import routes from "./api/routes.index";

const app: express.Application = express();
const port: number = 8000;

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, () => {
    console.log(`To start navigate to localhost:${port} on your browser`)
});

export default app;
