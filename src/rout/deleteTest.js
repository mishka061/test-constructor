import { ObjectId } from "mongodb";
import { getTokenAndCookie } from "./token.js";
import { messagesError } from "../messages/messagesError.js";
import { messagesSusses } from "../messages/messagesSusses.js";

export async function getDeleteTest(req, res, testdb, usersdb) {
  try {
    const { login, tokenIsPresent, userId } = await getTokenAndCookie(
      req,
      usersdb
    );
    let user = await usersdb.findOne({
      _id: new ObjectId(userId),
      login: login,
    });
    if (user && tokenIsPresent) {
      let test = req.params.id;

      await testdb.deleteOne({ _id: new ObjectId(test) });
      console.log(messagesSusses.success.deletingTest);
      res.redirect(`/profile/${login}`);
    } else {
      res.redirect("/registration");
    }
  } catch (err) {
    console.error(err, messagesError.errors.getDeleteTestError);
    res.status(500).send(messagesSusses.success.internalServerError);
  }
}
