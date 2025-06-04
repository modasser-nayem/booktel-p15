import config from "../../config";
import { userRepository } from "../../db/repositories/user.repository";
import AppError from "../../errors/AppError";
import { emailHelper } from "../../utils/email";
import passwordHelper from "../../utils/hash";
import jwtHelper from "../../utils/jwt";
import {
  TForgotPassword,
  TLoginUser,
  TResetPassword,
  TSignupUser,
} from "./auth.interface";

const signupUser = async (payload: { data: TSignupUser }) => {
  payload.data.password = await passwordHelper.hashPassword(
    payload.data.password,
  );

  const user = await userRepository.findUserByEmail(payload.data.email);

  if (user) {
    throw new AppError(
      400,
      `User with the email ${payload.data.email} already exist`,
    );
  }

  const result = await userRepository.createNewUser({
    name: payload.data.name,
    email: payload.data.email,
    password: payload.data.password,
  });

  const htmlTemplate = emailHelper.mailTemplate.accountCreationEmail(
    result.name,
  );

  await emailHelper.sendEmail({
    to: result.email,
    subject: "Booktel Account successfully created",
    htmlTemplate,
  });

  return result;
};

const loginUser = async (payload: { data: TLoginUser }) => {
  const user = await userRepository.findUserByEmail(payload.data.email, true);

  // check user exist
  if (!user) {
    throw new AppError(400, "User not found!");
  }

  if (!user.password) {
    throw new AppError(400, "Password not found!");
  }

  // check password match
  if (
    !(await passwordHelper.comparePassword(
      payload.data.password,
      user.password,
    ))
  ) {
    throw new AppError(400, "incorrect password!");
  }

  const access_token = jwtHelper.signAccessToken({
    id: user.id,
    email: user.email,
  });

  return { access_token };
};

const forgotPassword = async (payload: { data: TForgotPassword }) => {
  const user = await userRepository.findUserByEmail(payload.data.email);

  // check user exist
  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const token = jwtHelper.signForgotPassToken({
    userId: user.id,
  });

  const resetLink = `${config.RESET_PASS_URL}?token=${token}`;

  const htmlTemplate = emailHelper.mailTemplate.forgotPasswordEmail(
    user.name,
    resetLink,
    config.JWT_FORGOT_PASS_EXPIRES_IN,
  );

  await emailHelper.sendEmail({
    to: user.email,
    subject: "Booktel forgot password request!",
    htmlTemplate,
  });

  return null;
};

const resetPassword = async (payload: {
  data: TResetPassword;
  token?: string;
}) => {
  if (!payload.token) {
    throw new AppError(403, "invalid request");
  }

  const decode = jwtHelper.verifyForgotPassToken(payload.token);

  const user = await userRepository.findUSerById(decode.userId);

  // check user exist
  if (!user) {
    throw new AppError(403, "invalid request");
  }

  // hash new password
  payload.data.newPassword = await passwordHelper.hashPassword(
    payload.data.newPassword,
  );

  // update in db
  await userRepository.updatePassword({
    userId: user.id,
    newPassword: payload.data.newPassword,
  });

  return null;
};

const getUsers = async () => {
  return await userRepository.getUsers();
};

export const authService = {
  signupUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUsers,
};
