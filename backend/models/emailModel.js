const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let EmailSchema = new Schema(
    {
        name: {
            type: String,
        },
        to: {
            type: String,
            required: true,
        },
        cc: [
            {
                type: String,
            }
        ],
        subject: {
            type: String,
        },
        body: {
            type: String,
            required: true
        },
        sentTime: {
            type: Date,
        }
    },
    { collection: "EMAILS" },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model("EMAIL", EmailSchema);