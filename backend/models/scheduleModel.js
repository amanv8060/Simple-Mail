const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ScheduleModelSchema = new Schema(
    {
        id:{
            type:String
        }
    },
    { collection: "SCHEDULES" },
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model("SCHEDULES", ScheduleModelSchema);