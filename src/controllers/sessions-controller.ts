import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { authConfig } from "@/configs/auth";
import { sign } from "jsonwebtoken";

class SessionsController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;

    const dummy = {
      id: "1",
      username: "rasgen",
      password: "1234",
      role: "customer",
    };

    if (username !== dummy.username || password !== dummy.password) {
      throw new AppError("Wrong username or password.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ role: dummy.role }, secret, {
      expiresIn,
      subject: String(dummy.id),
    });

    return response.json({ token });
  }
}

export { SessionsController };
