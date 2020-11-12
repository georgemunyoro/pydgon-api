import * as express from "express";
import jwt from "jsonwebtoken";
import { createHash } from "crypto";
import { User } from "../models/user";
import applicationConfig from "../../config/config.json";

interface UserRegistrationForm {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

interface UserLoginFOrm {
  email: string;
  password: string;
}

interface JWT {
  id: number;
  iat: number;
  exp: number;
}

export async function registerUser(req: express.Request, res: express.Response) {
  const { firstname, lastname, email, username, password }: UserRegistrationForm = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      const newUser: UserRegistrationForm = { firstname, lastname, email, username, password };
      newUser.password = createHash("sha256").update(newUser.password).digest("base64");

      const createdUser = await User.create(newUser);

      return res.status(200).json({
        message: "Created User",
        data: {
          createdUser,
        },
      });
    }

    return res.status(422).json({
      message: "error",
      data: {
        error: "This email has already been registered.",
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "ERR",
      data: {
        error,
      },
    });
  }
}

export async function loginUser(req: express.Request, res: express.Response) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(422).json({
        message: "An error ocurred",
        data: {
          error: "User with given email does not exist",
        },
      });
    }

    const correctPassword =
      user.getDataValue("password") == createHash("sha256").update(password).digest("base64");
    if (correctPassword) {
      const token = jwt.sign({ id: user.getDataValue("id") }, applicationConfig.secret, {
        expiresIn: "24h",
      });

      return res.status(200).json({
        message: "User Login",
        data: {
          token,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "An error ocurred",
      data: {
        error,
      },
    });
  }
}

export async function getRequestAuthUser(req: express.Request): Promise<[boolean, any]> {
  const token: any = req.header("X-Auth");
  try {
    const decoded: any = jwt.verify(token, applicationConfig.secret);
    const authenticatedUser = await User.findByPk(decoded.id);
    return [false, { authenticatedUser }];
  } catch (error) {
    return [true, error];
  }
}

export async function authenticatedUser(req: express.Request, res: express.Response) {
  try {
    const [err, data] = await getRequestAuthUser(req);

    if (!err) {
      return res.status(200).json({
        message: "Authenticated User",
        data,
      });
    }

    return res.status(403).json({
      message: "An error ocurred",
      data: {
        errors: [data.message],
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error ocurred",
      data: {
        errors: [error],
      },
    });
  }
}
