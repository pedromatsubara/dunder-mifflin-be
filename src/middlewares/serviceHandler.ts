import { NextFunction, Request, Response } from "express";

export const serviceHandler = <T>(
  controller: (req: Request) => Promise<T>,
  status: number = 200
) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: T = await controller(req);
    res.status(status).json(result);
  } catch (error) {
    next(error);
  }
};
