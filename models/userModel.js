const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let UserSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address",
            ],
        },
        password: {
            type: String,
        },
        emails: [
            {
                type: Schema.Types.ObjectId,
                ref: "EMAIL"
            }
        ]
    },
    { collection: "USER" },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model("USER", UserSchema);