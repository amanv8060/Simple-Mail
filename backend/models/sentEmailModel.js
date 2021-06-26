const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let SentEmailSchema = new Schema(
    {
        email: {
            type: Schema.Types.ObjectId,
            ref: "EMAIL"
        },
        sentTime: {
            type: Date,
        },
    },
    { collection: "SENTEMAILS" },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model("SENTEMAILS", SentEmailSchema);