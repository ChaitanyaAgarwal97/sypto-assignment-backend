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
      fyersSocketObj.subscribe(req.body.symbolOrIndex, true); // This will be the index or symbol to which we want to subscribe // The true tells that we want to get market depth data
      fyersSocketObj.mode(fyersSocketObj.LiteMode);
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

    fyersSocketObj.unsubscribe(req.body.symbolOrIndex, req.body.sellPosition); // symbolOrIndex is an array that tells which indexes or symbols to unsubscribe to and sellPosition is a boolean to determine whether to sell position or not
  } catch (error) {
    res.status(500).json({
      s: "Something went wrong",
    });
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------
// Sample Success Response
// ------------------------------------------------------------------------------------------------------------------------------------------

// {
//   symbol: 'NSE:IDEA-EQ',
//   ltp: 7.55,
//   type: 'sf'
// }

module.exports = router;
