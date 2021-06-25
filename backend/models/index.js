const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.user = require("./userModel");
db.schedules=require('./scheduleModel');
db.email=require("./emailModel");

module.exports = db;