const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let EmailSchema = new Schema(
    {
        name: {
            type: String,
            required :true,
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
            required:true,
        },
        body: {
            type: String,
            required: true
        },
        from:{
            type:String,
            required:true,
        }
    },
    { collection: "EMAILS" },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model("EMAIL", EmailSchema);