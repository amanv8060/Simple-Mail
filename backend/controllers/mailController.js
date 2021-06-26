const db = require('../models');

const { sendEmail } = require('../helpers/sendEmail');
let jwt = require('jsonwebtoken');
const argon2 = require('argon2');

const { ToadScheduler, SimpleIntervalJob, AsyncTask } = require('toad-scheduler');
const { sentemail } = require('../models');

const scheduler = new ToadScheduler()

const User = db.user;
const Schedule = db.schedules;
const Email = db.email;
const SentEmail = db.sentemail;

exports.getSentMails = async (req, res) => {
    const emails = await User.findById(req.docId, 'sentemails').populate({
        path: 'sentemails',
        populate: {
            path: 'email',
        }
    }
    );
    if (!emails) {
        res.status(500).send({ message: 'Something went wrong' });
    }
    res.status(200).send(emails);
};

exports.editSchedule = async (req, res) => {
    if (req.body.id == undefined || req.body.id == null) {
        res.status(500).send({ message: "Id not specified" });
        return
    }
    const findEmail = await Schedule.findById({ _id: req.body.id }).populate('email');
    if (!findEmail) {
        res.status(500).send({ message: "No email found with that id" });
        return;
    }

    const email = new Email({
        name: req.body.name,
        to: req.body.to,
        subject: req.body.subject,
        body: req.body.body,
        from: "simplemail@ophilia.in",
        cc: req.body.cc,
    })
    email.save(async (err, response) => {
        scheduler.stopById(findEmail.email._id);
        if (err) {
            res.status(500).send({ message: "Error Creating Email" });
        }
        const task = new AsyncTask(
            "Send Email",
            async () => {
                const tempSentEmail = new SentEmail({
                    sentTime: Date.now(),
                    email: response._id
                })
                await sendEmail({
                    from: `${response.name} ${response.from}`,
                    to: response.to,
                    subject: response.subject,
                    text: response.body,
                    cc: response.cc,
                })
                await tempSentEmail.save(async (err, sentmailres) => {
                    const user = await User.findOneAndUpdate({ _id: req.docId },
                        {
                            $push: {
                                sentemails: [sentmailres._id],
                            }
                        })
                });
                return;
            },
            (err) => { console.log(err); }
        )
        const job = new SimpleIntervalJob(req.body.interval, task, response._id,);
        scheduler.addSimpleIntervalJob(job)

        const tempschedule = await Schedule.findOneAndUpdate({ email: findEmail.email._id }, {
            interval: req.body.interval,
            email: response._id,
            jobid: response._id,
        });

        task.execute();
        if (!tempschedule) {
            res.status(500).send({ message: "Some Error Occurred" });
        }
        else {
            res.status(200).send({ message: "Successful" });
        }

    });
}

exports.createEmail = async (req, res) => {
    const email = new Email({
        name: req.body.name,
        to: req.body.to,
        subject: req.body.subject,
        body: req.body.body,
        from: "simplemail@ophilia.in",
        cc: req.body.cc,
    })
    email.save(async (err, response) => {
        if (err) {
            res.status(500).send({ message: "Error Creating Email" });
        }
        const task = new AsyncTask(
            "Send Email",
            async () => {
                const tempSentEmail = new SentEmail({
                    sentTime: Date.now(),
                    email: response._id
                })
                await sendEmail({
                    from: `${response.name} ${response.from}`,
                    to: response.to,
                    subject: response.subject,
                    text: response.body,
                    cc: response.cc,
                })
                await tempSentEmail.save(async (err, sentmailres) => {
                    const user = await User.findOneAndUpdate({ _id: req.docId },
                        {
                            $push: {
                                sentemails: [sentmailres._id],
                            }
                        })
                });

                return;
            },
            (err) => { console.log(err); }
        )
        const job = new SimpleIntervalJob(req.body.interval, task, response._id,);
        scheduler.addSimpleIntervalJob(job)

        const tempschedule = new Schedule({
            interval: req.body.interval,
            email: response._id,
            jobid: response._id,
        });
        tempschedule.save(async (err, tempschedule) => {
            if (err) {
                res.status(500).send({ message: "Some Error Occurred" });
            }
            const user = await User.findOneAndUpdate({ _id: req.docId },
                {
                    $push: {
                        scheduledemails: [tempschedule._id],
                    }
                })

            task.execute();
            if (!user) {
                res.status(500).send({ message: "Some Error Occurred" });
            }
            else {
                res.status(200).send({ message: "Successful" });
            }

        });

    });
}

exports.deleteSchedule = async (req, res) => {
    const user = await User.findOneAndUpdate({ _id: req.docId }, { $pull: { scheduledemails: req.query.sId } });

    if (!user) {
        res.status(500).send({ message: "Something went wrong" });
        return;
    }
    const findEmail = await Schedule.findById({ _id: req.query.sId }).populate('email');
    if (!findEmail) {
        res.status(500).send({ message: "No email found with that id" });
        return;
    }
    scheduler.stopById(findEmail.email._id);
    await Schedule.findByIdAndRemove(req.query.sId);

    res.status(200).send({ message: "Schedule Deleted" });
}

