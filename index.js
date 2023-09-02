import express, {request} from "express";
import userRoute from "./routes/userRoute.js";
import itemRoute from "./routes/itemRoute.js";
import cartRoute from "./routes/cartRoute.js";
import authRoute from "./routes/authRoute.js";
import { errorResp } from "./util/response.js";

const app = express();
const port = 8000;
const host = "localhost";

app.use(express.json());
app.use("/users", userRoute);
app.use("/items", itemRoute);
app.use("/carts", cartRoute);
app.use("/auth", authRoute);

app.use((error, request, response, next) => {
    const message = "internal server error";
    console.log(error.message);
    errorResp(response, message, 500)
});

app.listen(port, host, ()=> {
    console.log(`Server berjalan di http://${host}:${port}`)
})