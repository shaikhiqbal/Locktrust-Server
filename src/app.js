import express from "express";

import cors from "cors";


const app = express();




app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);



 
//** json for accept json data from client */
app.use(express.json({ limit: "16kb" }));

//** urlencode use for access data came as a params */

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);


import userRoutes from './routes/user.router.js'

app.use("/auth", userRoutes)

export {app}
