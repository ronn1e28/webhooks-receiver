const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Webhook configuration Schema
let webhookSchema = new Schema(
  {
    data: Object,
  },
  {
    collection: "webhooks",
    timestamps: true,
    strict: false,
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

//Exporting the schema
module.exports = mongoose.model("webhookSchema", webhookSchema);
