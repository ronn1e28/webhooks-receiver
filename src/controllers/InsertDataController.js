const httpstatus = require("http-status");
const {
  accessToken_service,
  refreshToken_service,
  worksheetID_service,
  insertData_service,
} = require("../services/index");

/**
 *
 * @param {Objec} req
 * @param {Object} res
 * @param {Function} next
 * @returns
 */

// Route Function for /webhook

const EnterDataToWorksheet = async (req, res, next) => {
  const data = req.body;

  //Getting the access token and Worksheet ID from Microsoft Graph API
  const access_code = await accessToken_service().catch((err) => {
    console.log(err);
    res.status(httpstatus.INTERNAL_SERVER_ERROR).send(err);
    return;
  });

  const worksheetID = await worksheetID_service(access_code.access_token).catch(
    (err) => {
      console.log(err);
      res.status(httpstatus.INTERNAL_SERVER_ERROR).send(err);
      return;
    }
  );

  // Refreshing the Access Token
  const refresh_token = await refreshToken_service(
    access_code.refresh_token
  ).catch((err) => {
    console.log(err);
    res.status(httpstatus.INTERNAL_SERVER_ERROR).send(err);
    return;
  });

  //Inserting the data to the Worksheet and Databse
  const result = await insertData_service(
    refresh_token,
    worksheetID,
    data
  ).catch((err) => {
    console.log(err);
    res.status(httpstatus.INTERNAL_SERVER_ERROR).send(err);
    return;
  });

  if (result) {
    res.status(httpstatus.OK).send({ Status: "Success" });
    return;
  }
};

module.exports = EnterDataToWorksheet;
