const express = require("express");
const { fyersReqObj } = require("../app");

const router = express.Router();

// This route to place buy order
router.post("/buy", async (req, res) => {
  // This is a sample request body
  // The original values will come from req obj sent along with request
  // I have marked them beside each key
  const reqBody = {
    symbol: "NSE:SBIN-EQ", // req.body.symbol // This tells about the entity to order
    qty: 1, // req.body.qty // The quantity should be in multiples of lot size for derivatives
    type: 1, // req.body.type // This tell whether the order is limit order , etc.
    side: 1, // req.body.side // 1 for buying order
    productType: "INTRADAY", // req.body.productType // Tells what type of product to place order for
    limitPrice: 355, // req.body.limitPrice // Default is 0. But if limit or stopLimit order then should be a valid price
    stopPrice: 0, // req.body.stopPrice // Default is 0. But if stop or stopLimit order then a valid price
    disclosedQty: 0, // req.body.disclosedQty // For equity orders
    validity: "DAY", // req.body.validity // Tells about the validity of the order
    offlineOrder: false, // req.body.offlineOrder // Boolean. true => When placing AMO order, false => When market is open
    stopLoss: 0, // req.body.stopLoss // Default is 0. If BO and CO order then a valid price
    takeProfit: 0, // req.body.takeProfit // Default is 0. If BO then valid price.
    orderTag: "tag1", // req.body.orderTag // (Optional) Tag you want to assign to the specific order
  };

  try {
    const response = await fyersReqObj.place_order(reqBody);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    es.status(400).json({
      s: "Something is not right with the request",
    });
  }

  // -------------------------------------------------------------------------------------------------------------------
  //  Sample Success Response
  //  ------------------------------------------------------------------------------------------------------------------------------------------
  //      {
  //              s: 'ok',
  //              code: 1101,
  //              message: 'Order submitted successfully.
  //              Your Order Ref. No.52104097616',
  //              id: '52104097616'
  //      }
});

// This route is for sell order
router.post("/sell", async (req, res) => {
  // This is a sample request body
  // The original values will come from req obj sent along with request
  // I have marked them beside each key
  //   Everything is same as buy order only the side key changes
  const reqBody = {
    symbol: "NSE:SBIN-EQ", // req.body.symbol // This tells about the entity to order
    qty: 1, // req.body.qty // The quantity should be in multiples of lot size for derivatives
    type: 1, // req.body.type // This tell whether the order is limit order , etc.
    side: -1, // req.body.side // -1 for selling order
    productType: "INTRADAY", // req.body.productType // Tells what type of product to place order for
    limitPrice: 355, // req.body.limitPrice // Default is 0. But if limit or stopLimit order then should be a valid price
    stopPrice: 0, // req.body.stopPrice // Default is 0. But if stop or stopLimit order then a valid price
    disclosedQty: 0, // req.body.disclosedQty // For equity orders
    validity: "DAY", // req.body.validity // Tells about the validity of the order
    offlineOrder: false, // req.body.offlineOrder // Boolean. true => When placing AMO order, false => When market is open
    stopLoss: 0, // req.body.stopLoss // Default is 0. If BO and CO order then a valid price
    takeProfit: 0, // req.body.takeProfit // Default is 0. If BO then valid price.
    orderTag: "tag1", // req.body.orderTag // (Optional) Tag you want to assign to the specific order
  };

  try {
    const response = await fyersReqObj.place_order(reqBody);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      s: "Something is not right with the request",
    });
  }

  // -------------------------------------------------------------------------------------------------------------------
  //  Sample Success Response
  //  ------------------------------------------------------------------------------------------------------------------------------------------
  //      {
  //              s: 'ok',
  //              code: 1101,
  //              message: 'Order submitted successfully.
  //              Your Order Ref. No.52104097616',
  //              id: '52104097616'
  //      }
});

// This route is to place multiple orders simultaneously
// It can be either buy order or sell order or a mixture of both
// Upto 10 orders can be placed simultaneously
router.post("multi-order", async (req, res) => {
  // An array of size at most 10 elements with each element a valid order request should be passed
  // This is a sample requestBody for order
  const reqBody = [
    {
      symbol: "NSE:SBIN-EQ",
      qty: 1,
      type: 2,
      side: 1,
      productType: "INTRADAY",
      limitPrice: 0,
      stopPrice: 0,
      disclosedQty: 0,
      validity: "DAY",
      offlineOrder: "TRUE",
      stopLoss: 0,
      takeProfit: 0,
    },
    {
      symbol: "NSE:SBIN-EQ",
      qty: 1,
      type: 1,
      side: 1,
      productType: "INTRADAY",
      limitPrice: 355,
      stopPrice: 0,
      disclosedQty: 0,
      validity: "DAY",
      offlineOrder: "TRUE",
      stopLoss: 0,
      takeProfit: 0,
    },
    {
      symbol: "NSE:SBIN-EQ",
      qty: 1,
      type: 3,
      side: 1,
      productType: "INTRADAY",
      limitPrice: 0,
      stopPrice: 165.1,
      disclosedQty: 0,
      validity: "DAY",
      offlineOrder: "TRUE",
      stopLoss: 0,
      takeProfit: 0,
    },
    {
      symbol: "NSE:SBIN-EQ",
      qty: 1,
      type: 4,
      side: 1,
      productType: "INTRADAY",
      limitPrice: 320.1,
      stopPrice: 325,
      disclosedQty: 0,
      validity: "DAY",
      offlineOrder: "TRUE",
      stopLoss: 0,
      takeProfit: 0,
    },
  ];

  try {
    const response = await fyersReqObj.place_multi_order();

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      s: "Something is not right with the request",
    });
  }

  //  ------------------------------------------------------------------------------------------------------------------------------------------
  //  Sample Success Response
  //  ------------------------------------------------------------------------------------------------------------------------------------------
  //      {
  //        "s":"ok",
  //        "code":200,
  //        "message":"",
  //        "data":[{"statusCode":200,
  //                "body":
  //                    {
  //                      "s":"ok",
  //                      "code":1101,
  //                      "message":"Order submitted successfully.
  //                                Your Order Ref. No.52104097619",
  //                      "id":"52104097619"
  //                    },
  //                "statusDescription":"HTTP OK"
  //              },
  //              {
  //                "statusCode":200,
  //                "body":{
  //                        "s":"ok",
  //                        "code":1101,
  //                        "message":"Order submitted successfully.
  //                                  Your Order Ref. No.52104097620",
  //                        "id":"52104097620"
  //                        },
  //                  "statusDescription":"HTTP OK"
  //              },
  //              {
  //                "statusCode":200,
  //                "body":
  //                        {
  //                        "s":"ok",
  //                        "code":1101,
  //                        "message":"Order submitted successfully.
  //                                  Your Order Ref. No.52104097621",
  //                        "id":"52104097621"
  //                        },
  //                  "statusDescription":"HTTP OK"
  //                },
  //                {
  //                  "statusCode":400,
  //                  "body":
  //                        {
  //                          "s":"error",
  //                          "code":-392,
  //                          "message":"Price should be in
  //                                    multiples of tick size.",
  //                          "id":""
  //                        },
  //                  "statusDescription":"400 Bad Request"
  //                }]
  //             }
});

module.exports = router;
