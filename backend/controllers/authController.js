const db = require('../models');

const { sendEmail } = require('../helpers/sendEmail');
let jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const { OAuth2Client } = require('google-auth-library');


const client = new OAuth2Client(process.env.CLIENTID);
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

exports.getUserData = async (req, res) => {
    const user = await User.findById(req.docId,'-password' ).populate({
        path: 'scheduledemails',
        populate: {
            path: 'email',
        }
    }
    );
    if(!user){
        res.status(500).send({message:"Some error Occurred"});
        }
        else{
            res.status(200).send(user);
        }
}

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
        { id: user.id, email: user.email },
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

    user = await User.findOne({ email: req.query.lId });


    if (!user) {
        return res.status(401).send({ message: false });
    }

    res.status(200).send({ message: true });

};

exports.tokenVerify = (req, res) => {
    res.status(200).send({ message: 'Token Verified' });
};


function makePassword(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
exports.googleLogin = async (req, res) => {
    const { tokenId } = req.body;
    client.verifyIdToken({ idToken: tokenId, audience: process.env.CLIENTID }).then(response => {
        const { email_verified, name, email } = response.payload;
        if (email_verified) {
            User.findOne({ email }).exec(async (err, user) => {
                if (err) {
                    res.status(400).send({
                        message: 'Some error Occurred'
                    });
                }
                else {
                    if (user) {
                        const token = jwt.sign(
                            { id: user.id, email: user.email },
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
                    }
                    else {
                        const password = makePassword(8);
                        const hash = await argon2.hash(password, {
                            type: argon2.argon2id,
                        });
                        await sendEmail({
                            from: 'Simple Mail info@simplemail.xyz',
                            to: email,
                            subject: 'Welcome to Simple Mail ',
                            body: `Your Account has been created. From next time you can login with google or can use the password : ${password}`,
                        })
                        const user = new User({
                            name: name,
                            email: email,
                            password: hash,
                        });
                        await user.save(async (err, user) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            } else {
                                const token = jwt.sign(
                                    { id: user.id, email: user.email },
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
                            }
                        });
                    }
                }
            })
        }
    });
}
