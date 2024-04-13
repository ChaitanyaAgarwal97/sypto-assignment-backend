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
      fyersSocketObj.subscribe(req.body.symbol, false); // This will be the symbol to which we want to subscribe // The false tells that we don't want market depth data
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

router.get("unsubscribe", (req, res) => {
  try {
    fyersSocketObj.on("close", (res) => {
      res.status(200).write(`data: Unsubscribed\n\n`);
    });

    fyersSocketObj.unsubscribe(req.body.symbol, req.body.sellPosition); // symbol is an array that tells which symbols to unsubscribe to and sellPosition is a boolean to determine whether to sell position or not
  } catch (error) {
    res.status(500).json({
      s: "Something went wrong",
    });
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------
// Sample Success Response
// ------------------------------------------------------------------------------------------------------------------------------------------

//   {
//     symbol: 'NSE:TCS-EQ',
//     ltp: 3452.05,
//     vol_traded_today: 1956167,
//     last_traded_time: 1690885691,
//     exch_feed_time: 1690885758,
//     bid_size: 0,
//     ask_size: 313,
//     bid_price: 0,
//     ask_price: 3452.05,
//     last_traded_qty: 3,
//     tot_buy_qty: 0,
//     tot_sell_qty: 313,
//     avg_trade_price: 3443.71,
//     low_price: 3415,
//     high_price: 3460,
//     open_price: 3415,
//     prev_close_price: 3355.4,
//     ch: 96.65,
//     chp: 2.88,
//     type: 'sf'
//   }

module.exports = router;
