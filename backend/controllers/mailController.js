const db = require('../models');

const { sendEmail } = require('../helpers/sendEmail');
let jwt = require('jsonwebtoken');
const argon2 = require('argon2');


const User = db.user;
const Schedule = db.schedules;

exports.getSentMails = async (req, res) => {


};


exports.editSchedule = async (req, res) => {

};

exports.deleteSchedule= async (req,res)=>{
    
}

