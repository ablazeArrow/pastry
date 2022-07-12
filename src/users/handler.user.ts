import User from "./model.user";
import { Request, Response } from "express";
import { Secret, sign } from "jsonwebtoken";
import { SECRET as secret } from "../configs/config";

const user = new User();

export const create = async (req: Request, res: Response) => {
  try {
    const u = await user.register(req.body);
    const token = sign({ user: u }, secret as Secret);
    res.json({ ...u, token });
  } catch (error) {
    res.json(`fail to register: ${error}`);
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    const usersList = await user.getUsers();
    res.json(usersList);
  } catch (error) {
    res.json(`fail to get users list: ${error}`);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const u = await user.showUser(req.params.id);
    res.json(u);
  } catch (error) {
    res.json(`fail to get requested user: ${error}`);
  }
};

export const authenticate = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const u = await user.signIn(username, password);
    if (u) {
      const token = sign({ user: u }, secret as Secret);
      res.json({ ...u, token });
      return;
    }
    res.status(401).json({
      status: "error",
      message: `login error, wrong username or password`,
    });
  } catch (error) {
    res.json(`fail to authenticate: ${error}`);
  }
};
