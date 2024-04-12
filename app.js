const express = require("express");
const { getFyersObj } = require("./fyers-obj");

export const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.urlencoded());
app.use(express.json());

export const fyersReqObj = getFyersObj();

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
