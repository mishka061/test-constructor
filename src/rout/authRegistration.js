import bcrypt from 'bcrypt';
import { messagesError } from "../messages/messagesError.js";
import { messagesSusses } from "../messages/messagesSusses.js";

const saltRounds = 10;
export async function getRegistration(req, res, titles) {
  console.log('getRegistration');

  res.render("registration", {
    layout: 'registr',
    titles: messagesSusses.success.titleRegistration
  });
}

export async function postRegistration(req, res, usersdb) {
  try {
    let { login, email, password } = req.body;
    if (req.body.submit) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const existingEmail = await usersdb.findOne({ email: email });
      const existingLogin = await usersdb.findOne({ login: login });

      if(existingEmail && existingLogin){
        let errorLoginEndEmail = messagesError.errors.loginEndEmailError
        res.render('registration', {
          layout: 'registr',
          errorLoginEndEmail: errorLoginEndEmail
        });
      }else if (existingEmail || existingLogin) {
        let errorEmail = messagesError.errors.notEmailError;
        let errorLogin = messagesError.errors.notLoginError

        res.render('registration', {
          layout: 'registr',
          errorEmail: existingEmail ? errorEmail : '',
          errorLogin: existingLogin ? errorLogin : '',
        });
      }else {
        let user = {
          login: login,
          email: email,
          password: hashedPassword,
        };
        await usersdb.insertOne(user);
        res.redirect("/authorization");
        console.log(messagesSusses.success.successfulRegistration);
      }
    } else {
      console.error(messagesError.errors.registrationError);
    }
  } catch (error) {
    console.error(error, messagesError.errors.postRegistrationError);
  }
}
