import { Request, Response, NextFunction } from 'express';
import AppError from '../shared/errors/AppError';

export const errorHandlerApp = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      statusCode: error.statusCode,
      error: error.error,
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    error: '',
    message: 'Internal server error',
  });
};
