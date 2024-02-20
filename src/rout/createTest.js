import fs from "fs";
import { getTokenAndCookie } from "./token.js";
import { ObjectId } from "mongodb";
import { messagesError } from "../messages/messagesError.js";
import { messagesSusses } from "../messages/messagesSusses.js";
export async function getCreateTest(req, res, usersdb) {
  try {
    const { login, tokenIsPresent, userId } = await getTokenAndCookie(
      req,
      usersdb
    );

    if (login && tokenIsPresent && userId) {
      let user = await usersdb.findOne({
        _id: new ObjectId(userId),
        login: login,
      });
      if (user) {
        res.render("createTest", {
          token: req.cookies.token,
          tokenIsPresent: tokenIsPresent,
          user: user,
          titles: messagesSusses.success.titleCreate,
        });
      } else {
        res.redirect("/registration");
      }
    } else {
      res.redirect("/registration");
    }
  } catch (err) {
    res.redirect("/registration");
    console.error(err, messagesError.errors.getCreateTestError, err);
  }
}
export async function postCreateTest(req, res, testdb, usersdb) {
  try {
    const userId = await getTokenAndCookie(req, usersdb);
    let {
      visibility,
      name,
      description,
      questions,
      questionsTitle,
      testResult1,
      testResult2,
      testResult3,
    } = req.body;
    let images = req.files || [];
    for (const image of images) {
      if (image && image.originalname) {
        let imagePath = `img/${image.originalname}`;
        fs.writeFileSync(imagePath, fs.readFileSync(image.path));
      }
    }
    let oneImage = req.files[0];
    const questionsWithImages = questions.slice(1).map((question, index) => {
      return {
        title: questionsTitle[index] || `Вопрос номер ${index + 1}`,
        ...question,
        image: images[index + 1] && images[index + 1].originalname,
      };
    });

    let checkingResponses = [];

    questionsWithImages.forEach((question, index) => {
      console.log("question.manyOptions:", question.manyOptions);
      console.log("question.checkbox:", question.checkbox);
      if (question.twoOptions && question.radio !== undefined) {
        checkingResponses.push(question.twoOptions[question.radio]);
      } else if (question.manyOptions && question.checkbox) {
        let selectedOptions = question.manyOptions.filter(
          (option, i) => question.checkbox[i] === "on"
        );
        console.log("selectedOptions", selectedOptions);
        checkingResponses.push(selectedOptions.join(", "));
      } else {
        checkingResponses.push(null);
      }
    });

    let testResult = [testResult1, testResult2, testResult3];

    let form = {
      visibility: visibility,
      images: oneImage.originalname,
      userId: userId.userId,
      name: name,
      description: description,
      questions: questionsWithImages,
      testResult: testResult,
      checkingResponses: checkingResponses,
    };
    console.log("form", form);
    await testdb.insertOne(form);
    console.log(messagesSusses.success.createTestAdd);
    res.redirect("/");
  } catch (error) {
    console.error(error, messagesError.errors.processingCreationRequest);
    res.status(500).send(messagesError.errors.internalServerError);
  }
}
