const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.user = require("./userModel");
db.schedules=require('./scheduleModel');
db.email=require("./emailModel");
db.sentemail = require("./sentEmailModel");

module.exports = db;