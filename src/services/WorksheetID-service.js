const { default: axios } = require("axios");
const config = require("../config/config");

const get_worksheet_id = async (access_token, res) => {
  //URL to get the worksheet ID
  const findWorkbookUrl = `https://graph.microsoft.com/v1.0/me/drive/root:${config.FOLDER_PATH}/${config.BOOKNAME}:`;


  //Post Request to Graph API for Workbook ID
  return await axios
    .get(findWorkbookUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((response) => {
      return response.data.id;
    });
};

module.exports = get_worksheet_id;
