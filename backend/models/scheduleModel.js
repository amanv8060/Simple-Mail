const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ScheduleModelSchema = new Schema(
    {
        jobid: {
            type: String
        },
        email: {
            type: Schema.Types.ObjectId,
            ref: "EMAIL"
        },
        interval: {
            days: {
                type: Number
            },
            hours: {
                type: Number
            },
            minutes: {
                type: Number
            },
            seconds: {
                type: Number
            }
        }
    },
    { collection: "SCHEDULES" },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model("SCHEDULES", ScheduleModelSchema);