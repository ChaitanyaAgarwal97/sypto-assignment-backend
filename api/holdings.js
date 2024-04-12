const express = require("express");
const { fyersReqObj } = require("../app");

const router = express.Router();

router.get("/current-holdings", async (req, res) => {
  try {
    const response = fyersReqObj.get_holdings();

    if ((response.s = "ok")) {
      const { overall, holdings } = response;

      res.status(200).json({
        overall,
        holdings,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something is not right with the request",
    });
  }
});
