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

    const email = await Email.findOneAndUpdate({ _id: req.body.id }, {
        name: req.body.name,
        to: req.body.to,
        subject: req.body.subject,
        body: req.body.body,
        from: "simplemail@ophilia.in",
        cc: req.body.cc,
    });

    if (!email) {
        res.status(500).send({ message: "Some error Occurred" });
    }
    else {
        scheduler.stopById(email._id);
        const task = new AsyncTask(
            "Send Email",
            async () => {
                const tempSentEmail = new SentEmail({
                    sentTime: Date.now(),
                    email: response._id
                })
                await sendEmail({
                    from: `${email.name} ${email.from}`,
                    to: email.to,
                    subject: email.subject,
                    body: email.body,
                    cc: email.cc,
                })
                await tempSentEmail.save(async (err, sentmailres) => {
                    if(err){
                        console.log(err);
                    }
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
        const job = new SimpleIntervalJob(req.body.interval, task, email._id,);
        scheduler.addSimpleIntervalJob(job)

        const tempschedule = new Schedule({
            interval: req.body.interval,
            email: email._id,
            jobid: email._id,
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
    }

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
                    body: response.body,
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

    await Schedule.findByIdAndRemove(req.query.sId);

    if (!user) {
        res.status(500).send({ message: "Something went wrong" });
        return;
    }
    res.status(200).send({ message: "Schedule Deleted" });
}

