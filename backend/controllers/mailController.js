const db = require('../models');

const { sendEmail } = require('../helpers/sendEmail');
let jwt = require('jsonwebtoken');
const argon2 = require('argon2');


const User = db.user;

exports.createUser = async (req, res) => {

    const hash = await argon2.hash(req.body.password, {
        type: argon2.argon2id,
    });

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else {
            res.status(200).send({ message: 'User Registered Successfully' });
        }
    });
};


exports.userSignin = async (req, res) => {
    let user;


    user = await User.findOne({ email: req.body.email }).populate('scheduledemails');
    if (!user) {
        return res.status(404).send({ message: 'Email Not found.' });
    }

    if (!(await argon2.verify(user.password, req.body.password))) {
        return res.status(401).send({ message: 'Invalid Password' });
    }
    const token = jwt.sign(
        { id: user.id, userType: user.userType },
        process.env.SECRET_KEY,
        {
            expiresIn: 604800, // 7 Days (in sec)
        }
    );

    res.cookie('x-access-token', token, {
        secure: true,
        maxAge: 604800000, // 7 Days (in millisec)
        httpOnly: false,
    });
    res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        avtarUrl: user.avtarUrl,
        scheduledemails: user.scheduledemails,
        token: token,
    });
};


exports.checkLoginId = async (req, res) => {
    let user;

    if (isNumeric(req.query.lId)) {
        user = await User.findOne({ phone: req.query.lId });
    } else {
        user = await User.findOne({ email: req.query.lId });
    }

    if (!user) {
        return res.status(401).send({ message: false });
    }

    res.status(200).send({ message: true });
};

exports.tokenVerify = (req, res) => {
    res.status(200).send({ message: 'Token Verified' });
};  