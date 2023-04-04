const express = require("express");
const InsertData = require("../controllers/InsertDataController");
const validate = require("../middlewares/validate");
const whvalidation = require("../validations/webhook.validation");


//Setting up the Express Router
const WebhookExpressRoute = express.Router();

//Setting up the Webhook Routes
WebhookExpressRoute.use("/",validate(whvalidation),  InsertData);

module.exports = WebhookExpressRoute;
