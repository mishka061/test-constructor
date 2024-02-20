import { ObjectId } from 'mongodb';
import { getTokenAndCookie } from './token.js';
import fs from 'fs';
import { messagesError } from "../messages/messagesError.js";
import { messagesSusses } from "../messages/messagesSusses.js";

export async function getEditTest(req, res, testdb, usersdb) {
    try {
        const { login, tokenIsPresent, userId } = await getTokenAndCookie(req, usersdb);
        let user = await usersdb.findOne({ _id: new ObjectId(userId), login: login });
        if (user && tokenIsPresent) {
            let id = req.params.id;
            let test = await testdb.findOne({ _id: new ObjectId(id) });
            let testResult1 = test.testResult[0]
            let testResult2 = test.testResult[1]
            let testResult3 = test.testResult[2]
            res.render('editTest', {
                test: test,
                id: id,
                tokenIsPresent: tokenIsPresent,
                userId: userId,
                titles: messagesSusses.success.titleEditTest + '-' + test.name,
                testResult1: testResult1,
                testResult2: testResult2,
                testResult3: testResult3,
            });
        }
    } catch (err) {
        console.error(messagesError.errors.getEditTestError, err);
        res.status(500).send(messagesError.errors.internalServerError);
    }
}

export async function postEditTest(req, res, testdb, usersdb) {
    try {
        const userId = await getTokenAndCookie(req, usersdb);
        let {id, visibility, name, description, questions,testResult0, testResult1, testResult2, index} = req.body;
        let images = req.files || [];
        for (const image of images) {
            if (image && image.originalname) {
                let imagePath = `img/${image.originalname}`;
                fs.writeFileSync(imagePath, fs.readFileSync(image.path));
            }
        }
        let oneImage = req.files[0]
        const questionsWithImages = questions.map((question, index) => {
           return {
                title: `Вопрос номер ${index}`,
                ...question,
                image: images[index+1] && images[index+1].originalname,
            };
        });
        let checkingResponses = [];
        questionsWithImages.forEach((question, index) => {
            if (question.twoOptions && question.radio !== undefined) {
                checkingResponses.push(question.twoOptions[question.radio]);
            } else if (question.manyOptions && question.checkbox) {
                let selectedOptions = question.manyOptions.filter((option, i) => question.checkbox[i] === 'on');
                checkingResponses.push(selectedOptions.join(', '));
            } else {
                checkingResponses.push(null); 
            }
        });
       let testResult = [testResult0, testResult1, testResult2]

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
        await testdb.updateOne({ _id: new ObjectId(id) }, { $set: form });
        console.log(messagesSusses.success.udateTestbd)
        res.redirect('/');
    } catch (error) {
        console.error(messagesError.errors.postEditTestError, error);
        res.status(500).send(messagesError.errors.internalServerError);
    }
}












