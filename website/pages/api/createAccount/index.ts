import type { NextApiRequest, NextApiResponse } from "next";
import connectToDb from "src/database/mongo-db";
import { auth } from "src/lib/server/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import UserDataDocument from "src/database/models/UserData";
import { CreateAccountErrorType } from "src/lib/types/users";
import { isValidUsername } from "src/lib/server/accounts/helpers";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST":
        await handlePost(req, res);
        break;
      default:
        res.status(404).end();
    }
  } catch (err) {
    res.status(400).end(err);
  }
};

export default handler;

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, username } = req.body;
  if (!isValidUsername(username)) {
    throw CreateAccountErrorType.BAD_USERNAME;
  }

  await connectToDb();
  const existingUser = await UserDataDocument.findOne({
    username: { $regex: new RegExp(`^${username}$`, "i") },
  });
  if (existingUser) {
    throw CreateAccountErrorType.USERNAME_EXISTS;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(userCredential.user);
    const newUserData = new UserDataDocument({
      username,
      uid: userCredential.user.uid,
    });
    await newUserData.save();
    res.status(200).end();
  } catch (error: any) {
    const errorCode = error.code;

    switch (errorCode) {
      case "auth/weak-password":
        throw CreateAccountErrorType.WEAK_PASSWORD;
      case "auth/email-already-in-use":
        throw CreateAccountErrorType.EMAIL_IN_USE;
      case "auth/invalid-email":
        throw CreateAccountErrorType.EMAIL_INVALID;
      default:
        throw CreateAccountErrorType.ERROR;
    }
  }
};
