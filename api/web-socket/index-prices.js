const express = require("express");
const getFyersSocketObj = require("./config");

const router = express.Router();
const fyersSocketObj = getFyersSocketObj;

router.get("/subscribe", async (req, res) => {
  try {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    fyersSocketObj.on("connect", (req, res) => {
      fyersSocketObj.subscribe(req.body.index, false); // This will be the index to which we want to subscribe // The false tells that we don't want market depth data
      fyersSocketObj.autoreconnect();

      res.status(200).write(`data: Subscribed\n\n`);
    });

    fyersSocketObj.on("message", (message, res) => {
      res.status(200).write(`data: ${message}\n\n`);
    });

    fyersSocketObj.on("error", (error, res) => {
      res.status(500).write(`data: ${error}\n\n`);
    });

    fyersSocketObj.connect();
  } catch (error) {
    res.status(500).json({
      s: "Something went wrong",
    });
  }
});

router.get("/unsubscribe", (req, res) => {
  try {
    fyersSocketObj.on("close", (res) => {
      res.status(200).write(`data: Unsubscribed\n\n`);
    });

    fyersSocketObj.unsubscribe(req.body.index, req.body.sellPosition); // index is an array that tells which indexes to unsubscribe to and sellPosition is a boolean to determine whether to sell position or not
  } catch (error) {
    res.status(500).json({
      s: "Something went wrong",
    });
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------
// Sample Success Response
// ------------------------------------------------------------------------------------------------------------------------------------------
//
// {
//     symbol: 'NSE:NIFTY50-INDEX',
//     ltp: 19733.55,
//     prev_close_price: 19753.8,
//     high_price: 19795.6,
//     low_price: 19704.6,
//     open_price: 19784,
//     ch: -20.25,
//     chp: -0.1,
//     type: 'if'
//   }

module.exports = router;
