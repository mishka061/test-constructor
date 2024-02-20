import expressHandlebars from "express-handlebars";
import mongodb from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import __dirname from "./__dirname.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from 'path';
import { getRegistration, postRegistration } from "./src/rout/authRegistration.js";
import {
  getAuthorisation,
  postAuthorisation,
} from "./src/rout/authAuthorisation.js";
import { getCreateTest, postCreateTest } from "./src/rout/createTest.js";
import { getProfile } from "./src/rout/profile.js";
import { getMain } from "./src/rout/main.js";
import { getTakeTest, postTakeTest } from "./src/rout/takeTest.js";
import { getDeleteTest } from "./src/rout/deleteTest.js";
import { getEditTest, postEditTest } from "./src/rout/editTest.js";

const handlebars = expressHandlebars.create({
  defaultLayout: "main",
  extname: "hbs",
});

let app = express();
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/src/views/"));

app.use(express.static(__dirname + "/dist/images/"));
app.use(express.static(__dirname + "/dist/img/"));
app.use(express.static(__dirname + "/dist/"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });
let mongoClient = new mongodb.MongoClient("mongodb://127.0.0.1:27017/");

try {
  let mongo = await mongoClient.connect();
  let db = mongo.db("test-constructor");
  let usersdb = db.collection("users");
  let testdb = db.collection("test");

  app.get("/", async function (req, res) {
    await getMain(req, res, testdb, usersdb);
  });

  app.get("/takeTest/:id", async function (req, res) {
    await getTakeTest(req, res, testdb, usersdb);
  });

  app.post("/takeTest/:id", async function (req, res) {
    await postTakeTest(req, res, testdb, usersdb);
  });

  app.get("/test", async function (req, res) {
    await getCreateTest(req, res, usersdb, testdb);
  });

  app.post("/test", upload.array("image[]"), async function (req, res) {
    await postCreateTest(req, res, testdb, usersdb);
  });

  app.get("/registration", async function (req, res) {
    await getRegistration(req, res);
  });

  app.post("/registration", async function (req, res) {
    await postRegistration(req, res, usersdb);
  });

  app.get("/authorization", async function (req, res) {
    await getAuthorisation(req, res, usersdb);
  });

  app.post("/authorization", async function (req, res) {
    await postAuthorisation(req, res, usersdb);
  });
  app.get("/profile/:login", async function (req, res) {
    await getProfile(req, res, usersdb, testdb);
  });

  app.get("/delete/:id", async function (req, res) {
    await getDeleteTest(req, res, testdb, usersdb);
  });

  app.get("/edit/:id", async function (req, res) {
    await getEditTest(req, res, testdb, usersdb);
  });

  app.post("/edit/:id", upload.array("image[]"), async function (req, res) {
    await postEditTest(req, res, testdb, usersdb);
  });
} catch (err) {
  console.error(err);
}

app.use(function (req, res) {
  res.status(404).send("not found");
});

app.listen(3000, function () {
  console.log("running");
});
