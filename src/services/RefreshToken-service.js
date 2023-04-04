const config = require("../config/config");
const { default: axios } = require("axios");

const get_refresh_token = async (code) => {

  //Setting up the refresh parameters
  const refresh_params = {
    client_id: config.CLIENT_ID,
    scope: config.SCOPES,
    refresh_token: code,
    client_secret: config.CLIENT_SECRET,
    grant_type: "refresh_token",
  };

  const refresh_token_endpoint = `${config.COMMON}/oauth2/v2.0/token?`;
  
  //Post Request to refresh token endpoint
  return await axios
    .post(refresh_token_endpoint, refresh_params, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    })
    .then((response) => {
      return response.data;
    });
};

module.exports = get_refresh_token;
