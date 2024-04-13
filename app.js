const express = require("express");
const { getFyersObj } = require("./fyers-obj");

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.urlencoded());
app.use(express.json());

const fyersReqObj = getFyersObj();

const holdingsRoutes = require("./api/holdings");
const orderRoutes = require("./api/order");
const postBackRoutes = require("./api/postback");
const symbolPricesRoutes = require("./api/web-socket/symbol-prices");
const indexPricesRoutes = require("./api/web-socket/index-prices");
const marketDepthRoutes = require("./api/web-socket/market-depth");
const liteModeRoutes = require("./api/web-socket/lite-mode");

app.use("/api/holdings", holdingsRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/postback", postBackRoutes);
app.use("/api/websocket/symbolPrices", symbolPricesRoutes);
app.use("/api/websocket/indexPrices", indexPricesRoutes);
app.use("/api/websocket/marketDepth", marketDepthRoutes);
app.use("/api/websocket/liteMode", liteModeRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

module.exports = {
  fyersReqObj,
  app,
};
