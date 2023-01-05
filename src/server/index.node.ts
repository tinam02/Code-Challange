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
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.get("/orders/", (req: any, result: any) => {
  orderCollection.find({ date: { $lt: Date.now() } }, (err: any, res: any) => {
    res.toArray((err2: any, res2: any) => {
      console.log(res2);
      return result.send(res2);
    });
  });
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
