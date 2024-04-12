fyersModel = require("fyers-api-v3").fyersModel;

export const getFyersObj = () => {
  let fyers = new fyersModel();

  // "xxxxx-xxx" will be replaced by actual app id
  fyers.setAppId("xxxxx-xxx");

  // This will take a URL as argument where auth code will be sent
  fyers.setRedirectUrl("Redirect URL here");

  // Step1: Getting auth code
  const generateAuthcodeURL = fyers.generateAuthCode();

  //use url to generate auth code
  // example response = {
  //     s: "ok" or "error",
  //     code: "Unique code to identify individual responses",
  //     message: "Error message if any",
  //     auth_code: "this will be further used to generate access token",
  //     state: "this will be the same value that we sent with request"
  // }
  console.log(generateAuthcodeURL);
  let authcode = "";
  fetch(generateAuthcodeURL, {
    //   client_id: "App ID that is generated when app is created", // This we have set above
    //   redirect_uri: "This is also provided at app creation in dashboard", // This we have set above too
    response_type: "code", // This is value is always "code"
    state: "nucdshui", // A random value which is sent back same after successful login
  })
    .then((response) => {
      if (response.s == "ok") {
        authcode = response.auth_code;
      }
    })
    .catch((error) => {
      console.error(error.message);
    });

  // Step 2: Getting access token
  fyers
    .generate_access_token({
      //   client_id: "App ID that is generated when app is created", // This we have set above
      secret_key: "secret",
      auth_code: authcode,
    })
    .then((response) => {
      if (response.s == "ok") {
        fyers.setAccessToken(response.access_token);
      } else {
        console.log("error generating access token", response);
      }
    });

  return fyers;
};
