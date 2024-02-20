import { getTokenAndCookie } from './token.js';
import { messagesError } from "../messages/messagesError.js";
import { messagesSusses } from "../messages/messagesSusses.js";

export async function getMain(req, res, testdb) {
   try {
        let arrTest = await testdb.find().toArray();
        const tokenIsPresent = await getTokenAndCookie(req);
        const publicTests = arrTest.filter(test => test.visibility === 'публичный');
        res.render('main', {
            arrTest: publicTests,
            tokenIsPresent: tokenIsPresent,
            titles: messagesSusses.success.titleIndex,

        });
    } catch (err) {
        console.error(messagesError.errors.getMainError, err);
        res.status(500).send(messagesError.errors.internalServerError);
    }
}





































// ;

// export async function getCreateTest(req, res, usersdb) {
//     console.log('getCreateTest');
//     try {
//         const { login, tokenIsPresent, userId } = await getTokenAndCookie(req, usersdb);
//         let user = await usersdb.findOne({ _id: new ObjectId(userId), login: login });
//         if (user && tokenIsPresent) {
//             res.render('createTest', {
//                 token: req.cookies.token,
//                 tokenIsPresent: tokenIsPresent,
//                 user: user
//             });
//         }
//     } catch (err) {
//         console.log(err);
//         res.redirect('/registration');
//     }
// }










