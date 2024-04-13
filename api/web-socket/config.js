const { access_token } = require("../../fyers-obj");
const FyersSocket = require("fyers-api-v3").fyersDataSocket;

const getFyersSocketObj = () => {
  const fyersdata = new FyersSocket(access_token, false);
  fyersdata.autoreconnect(6); //will try to reconnect 6 times in case of disconnection
  return fyersdata;
};

module.exports = getFyersSocketObj;
