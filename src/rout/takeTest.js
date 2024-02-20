import { ObjectId } from "mongodb";
import { messagesError } from "../messages/messagesError.js";
import { messagesSusses } from "../messages/messagesSusses.js";

export async function getTakeTest(req, res, testdb) {
  try {
    let id = req.params.id;
    let test = await testdb.findOne({ _id: new ObjectId(id) });
    let testResult1 = test.testResult[0]
    let testResult2 = test.testResult[1]
    let testResult3 = test.testResult[2]

    res.render("takeTest", {
      test: test,
      id: id,
      testResult1:testResult1,
      testResult2:testResult2,
      testResult3:testResult3,
      titles: messagesSusses.success.titleTakeTest + '-' + test.name
    })
  } catch (err) {
    console.error(err, messagesError.errors.getTakeTestError);
    res.redirect("/registration");
  }
}

export async function postTakeTest(req, res) {
  try {
    let { arrResponse, checkingResponses, testResult1,testResult2,testResult3 , id} = req.body;
    let arrResponseArray = arrResponse.split(",");
    let checkingResponsesArray = checkingResponses.split(",");
    let count = 0;
    for (let i = 0; i < checkingResponsesArray.length; i++) {
      for (let j = 0; j < arrResponseArray.length; j++) {
        if (checkingResponsesArray[i] === arrResponseArray[j]) {
          count++;
        }
      }
    }
    let sum = Math.floor((count / checkingResponsesArray.length) * 100);
    let result;

    if (sum <= 30) {
      result = testResult1;
    }else if (sum > 30 && sum <= 70) {
      result = testResult2;
    }else if(sum > 70) {
      result = testResult3;
    }
    console.log(messagesSusses.success.addComment)
    res.render("takeTest", {
      result: result,
      id: id
    });
  } catch (err) {
    console.error(messagesError.errors.postTakeTestError, err);
    res.status(500).send(messagesError.errors.internalServerError);
  }
}


























