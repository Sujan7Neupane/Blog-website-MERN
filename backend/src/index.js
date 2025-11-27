import dotenv from "dotenv";
import dbConnect from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

app.on("error", (error) => {
  console.log(error);
  throw error;
});

dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`The app is listening to PORT: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error", error);
  });
