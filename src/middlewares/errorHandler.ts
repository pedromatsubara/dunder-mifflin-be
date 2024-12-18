import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
  details?: string | object | null;
}

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: {
      message,
      status: statusCode,
      details: err.details || null,
    },
  });
};

export default errorMiddleware;
