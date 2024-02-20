import { getTokenAndCookie } from './token.js';
import { ObjectId } from 'mongodb';
import { messagesError } from "../messages/messagesError.js";
import { messagesSusses } from "../messages/messagesSusses.js";

export async function getProfile(req, res, usersdb, testdb) {
    try {
        const { login, tokenIsPresent, userId } = await getTokenAndCookie(req, usersdb);
        let user = await usersdb.findOne({ _id: new ObjectId(userId), login: login });
        if (user && tokenIsPresent) {
            let arrTest = await testdb.find({ userId: userId}).toArray()

            console.log('arrtest', arrTest)
            res.render('profile', {
                arrTest: arrTest,
                tokenIsPresent: tokenIsPresent,
                login: login,
                titles: messagesSusses.success.titleProfile
            });
        }else{
            console.error(messagesError.errors.userNotDefined)
        }
    } catch (err) {
        console.log(err, messagesError.errors.getProfileError);
        res.redirect('/registration');
    }
}









