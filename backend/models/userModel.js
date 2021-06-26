const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let UserSchema = new Schema(
    {
        name: {
            type: String,
            required:true,
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address",
            ],
            required:true,
        },
        password: {
            type: String,
            required:true,
        },
        sentemails: [
            {
                type: Schema.Types.ObjectId,
                ref: "SENTEMAILS"
            }
        ],
        scheduledemails: [
            {
                type: Schema.Types.ObjectId,
                ref: "SCHEDULES"
            }
        ]
    },
    { collection: "USER" },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model("USER", UserSchema);