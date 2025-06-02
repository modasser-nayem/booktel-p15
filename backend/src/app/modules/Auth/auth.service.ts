import { userRepository } from "../../db/repositories/user.repository";
import AppError from "../../errors/AppError";
import passwordHelper from "../../utils/hash";
import jwtHelper from "../../utils/jwt";
import { TLoginUser, TSignupUser } from "./auth.interface";

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

const getUsers = async () => {
  return await userRepository.getUsers();
};

export const authService = { signupUser, loginUser, getUsers };
