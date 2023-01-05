import { IOrder } from "../client/types";
import { createExampleOrder, randomIntFromInterval } from "./mockData";

const express = require("express");
var cors = require("cors");

const app = express();
const port = 4000;
app.use(cors());

/** Setup DB */
const Tingodb = require("tingodb")({ memStore: true }).Db;
const db = new Tingodb("./db", {});
const orderCollection = db.collection("orders");

/** Setup Express */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

//GET all
app.get("/orders/", (req: any, result: any) => {
  orderCollection.find({ date: { $lt: Date.now() } }, (err: any, res: any) => {
    res.toArray((err2: any, res2: IOrder[]) => {
      console.log(res2);
      return result.send(res2);
    });
  });
});

//GET 1
app.get("/orders/:id", (req: any, result: any) => {
  console.log("testing get by refnum");
  orderCollection
    .find({ refNumber: parseInt(req.params.id) })
    .toArray((err: any, res: any) => result.send(res));
});

let index = 0;
const setupDb = () => {
  // Create Mock Data
  for (index; index < 100; index++) {
    orderCollection.insert(createExampleOrder(index, false));
  }
};

const start = async () => {
  setupDb();

  // Create Orders after 1.3 Sec
  setInterval(() => {
    orderCollection.insert(createExampleOrder(index, true));
    index++;
  }, 13000);
};

start();
