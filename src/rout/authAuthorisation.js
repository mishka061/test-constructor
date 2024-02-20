import jwt from "jsonwebtoken";
import secretKey from "./token.js";
import { messagesError } from "../messages/messagesError.js";
import { messagesSusses } from "../messages/messagesSusses.js";
import bcrypt from 'bcrypt';

export async function getAuthorisation(req, res) {
  res.render("authorization", {
    layout: "registr",
    titles: messagesSusses.success.titleAuthorisation
  });
}

export async function postAuthorisation(req, res, usersdb) {
  try {
    let { email, password } = req.body;
    if (req.body.submit) {
      let user = await usersdb.findOne({ email });
      if (user) {
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
          let token = jwt.sign(
            {
              login: user.login,
              password: user.password,
              userId: user._id,
            },
            secretKey,
            { expiresIn: "12h" }
          );
          res.cookie("token", token);
          console.log(messagesSusses.success.successfulAuthorization);
          res.redirect(`/profile/${user._id}`);
        } else {
          let errorAuthorization = messagesError.errors.emailEndLoginlNotFoundError;
          res.render("authorization", {
            layout: "registr",
            errorAuthorization: errorAuthorization,
          });
          console.error(messagesError.errors.authorizationError);
        }
      } else {
        let errorAuthorization = messagesError.errors.emailEndLoginlNotFoundError;
        res.render("authorization", {
          layout: "registr",
          errorAuthorization: errorAuthorization,
        });
        console.error(messagesError.errors.authorizationError);
      }
    } else {
      console.error(messagesError.errors.postRegistrationError);
    }
  } catch (err) {
    console.error(messagesError.errors.postAuthorizationError, err);
  }
}
