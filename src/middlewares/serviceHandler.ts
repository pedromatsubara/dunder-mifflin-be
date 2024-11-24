import { NextFunction, Response } from "express";

export const serviceHandler = async <T>(
  serviceCall: () => Promise<T>,
  res: Response,
  next: NextFunction,
  status: number = 200
): Promise<void> => {
  try {
    const result: T = await serviceCall();
    res.status(status).json(result);
  } catch (error) {
    next(error);
  }
};
