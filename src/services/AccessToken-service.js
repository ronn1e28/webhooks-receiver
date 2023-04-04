const config = require("../config/config");
const { default: axios } = require("axios");

/**
 *
 * @returns {Object}
 */

//Function to get the access token from the Microsoft Graph API
const get_access_token = async () => {
  //SEtting up the Query Parameters
  const query_params = {
    client_id: config.CLIENT_ID,
    scope: config.SCOPES,
    username: config.EMAIL,
    password: config.EMAIL_PASSWORD,
    client_secret: config.CLIENT_SECRET,
    grant_type: "password",
  };
  const access_token_endpoint = config.ACCESS_TOKEN_URL;

  //Post request to the Microsoft Graph API
  return await axios
    .post(access_token_endpoint, query_params, {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    })
    .then((response) => {
      return response.data;
    });
};

module.exports = get_access_token;
