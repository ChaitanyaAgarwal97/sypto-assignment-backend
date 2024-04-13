// Steps to create postback:
// 1. Login to API Dashboard.
// 2.Once you have logged into the Dashboard, you will see a block where you need to update your webhook URL, webhook secret, and the webhook preference (Cancel, Rejected, Pending, Traded). Here you can add multiple webhooks by clicking on the "Add webhook" button.
// 3. After entering the required details, click on the "Create App" button by accepting the terms and conditions.

const express = require("express");
const EventEmitter = require("node:events");

const router = express.Router();
const eventEmitter = new EventEmitter();

eventEmitter.on("receive", (request, response) => {
  response.status(200).json(request.body);
});

// URL to this route will be the webhook URL we will add while creating the postback
router.post("/postback", async (req, res) => {
  console.log(req.body);
  eventEmitter.emit("receive", req, res);

  //   Sample response that we will receive from webhook and will be forwarded
  //   {
  //     "orderDateTime": "18-Jul-2023 11:44:29",
  //     "id": "23071800238607",
  //     "exchOrdId": "2500000061319029",
  //     "side": -1,
  //     "segment": 11,
  //     "instrument": 15,
  //     "productType": "MARGIN",
  //     "status": 2,
  //     "qty": 5400,
  //     "remainingQuantity": 0,
  //     "filledQty": 5400,
  //     "limitPrice": 2.15,
  //     "stopPrice": 0,
  //     "type": 2,
  //     "discloseQty": 0,
  //     "dqQtyRem": 0,
  //     "orderValidity": "DAY",
  //     "source": "M",
  //     "fyToken": "101123072754619",
  //     "offlineOrder": false,
  //     "message": "Completed",
  //     "orderNumStatus": "23071800238607:2",
  //     "tradedPrice": 2.15,
  //     "exchange": 10,
  //     "pan": "",
  //     "clientId": "xxxx",
  //     "symbol": "NSE:ABCAPITAL23JUL190CE"
  //   }
});

module.exports = router;
