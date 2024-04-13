const express = require("express");
const { fyersReqObj } = require("../app");

const router = express.Router();

router.get("/current-holdings", async (req, res) => {
  try {
    const response = fyersReqObj.get_holdings();

    if ((response.s = "ok")) {
      const { overall, holdings } = response;

      res.status(200).json({
        s: "ok",
        overall,
        holdings,
      });
    }
  } catch (error) {
    res.status(400).json({
      s: "Something is not right with the request",
    });
  }
});
// -------------------------------------------------------------------------------------------------------------------
//  Sample success Response
// -------------------------------------------------------------------------------------------------------------------
// {
//     "code": 200,
//     "message": "",
//     "s": "ok",
//     "overall": {
//         "count_total": 2,
//         "pnl_perc": -1.529,
//         "total_current_value": 12531.6,
//         "total_investment": 37642.15,
//         "total_pl": -575.5499999999984
//     },
//     "holdings": [
//         {
//             "costPrice": 1456.35,
//             "id": 0,
//             "fyToken": "10100000009581",
//             "symbol": "NSE:METROPOLIS-EQ",
//             "isin": "INE112L01020",
//             "quantity": 9,
//             "exchange": 10,
//             "segment": 10,
//             "qty_t1": 0,
//             "remainingQuantity": 9,
//             "collateralQuantity": 0,
//             "remainingPledgeQuantity": 9,
//             "pl": -575.5499999999984,
//             "ltp": 1392.4,
//             "marketVal": 12531.6,
//             "holdingType": "HLD"
//         },
//         {
//             "costPrice": 490.7,
//             "id": 1,
//             "fyToken": "101000000014732",
//             "symbol": "NSE:DLF-EQ",
//             "isin": "INE271C01023",
//             "quantity": 50,
//             "exchange": 10,
//             "segment": 10,
//             "qty_t1": 0,
//             "remainingQuantity": 0,
//             "collateralQuantity": 0,
//             "remainingPledgeQuantity": 0,
//             "pl": 0,
//             "ltp": 514.3,
//             "marketVal": 0,
//             "holdingType": "HLD"
//         }
//     ]
// }

module.exports = router;
