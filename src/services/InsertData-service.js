const webhookSchema = require("../models/webhooks.model");
const { default: axios } = require("axios");
const { refreshToken_service } = require("../services/index");

/**
 *
 * @param {String} code
 * @param {String} id
 * @param {Object} data1
 * @returns
 */

//Function to Insert data into the database and Excel Worksheet based on the worksheet id
const EnterDataToWorksheet = async (code, id, data1) => {
  let data = [];
  sheetLink = `https://graph.microsoft.com/v1.0/me/drive/items/${id}/workbook/worksheets('Sheet1')/`;

  //Entering the data into the database
  webhookSchema.create(data1, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Entered data into database successfully");
    }
  });

  //Getting the information of the used range in the worksheet
  const rangeinfo = await axios
    .get(sheetLink + `usedRange`, {
      headers: {
        Authorization: `Bearer ${code.access_token}`,
      },
    })
    .then((response) => {
      return response.data;
    });
  
  // Refreshing the access token
  const new_accesscode = await refreshToken_service(code.refresh_token).catch(
    (error) => {
      console.log(error);
    }
  );

  //Checking if the worksheet is empty or not.
  if (
    rangeinfo.rowIndex === 0 &&
    rangeinfo.columnIndex === 0 &&
    rangeinfo.values[0][0] === ""
  ) {
    //If worksheet is empty Entering data with labels 
    data = [Object.keys(data1), Object.values(data1)];
    return axios.patch(
      sheetLink + `range(address='A1:B${data.length}')`,
      { values: data },
      {
        headers: {
          Authorization: `Bearer ${new_accesscode.access_token}`,
        },
      }
    );
  } else {
    //Entering data without the labels
    data = [Object.values(data1)];
    return axios.patch(
      sheetLink +
        `range(address='A${rangeinfo.rowCount + 1}:B${
          rangeinfo.rowCount + data.length
        }')`,
      { values: data },
      {
        headers: {
          Authorization: `Bearer ${new_accesscode.access_token}`,
        },
      }
    );
  }
};

module.exports = EnterDataToWorksheet;
