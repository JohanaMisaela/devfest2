const app = require("express")();
require("dotenv").config({ path: "./src/config/.env" });
require("./src/config/db");
const userRouter = require("./src/routes/user.routes");
const postRouter = require("./src/routes/post.routes");
const actuRouter = require("./src/routes/actu.routes");
const badgeRouter = require("./src/routes/badge.routes");
const plainteRouter = require("./src/routes/plainte.routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const {
  checkUser,
  requireAuth,
} = require("./src/middleware/auth.middleware.js");

const corsOption = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "content-type"],
  exposedHeaders: ["sessionId"],
  methods: "*",
  prefLightContinue: false,
};
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/actu", actuRouter);
app.use("/api/plainte", plainteRouter);
app.use("/api/badge", badgeRouter);

app.listen(process.env.PORT, () =>
  console.log(`Listening on -> http://localhost:${process.env.PORT},`)
);
