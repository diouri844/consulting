import { plainToClass } from 'class-transformer';
import { validate, ValidationError, ValidationOptions } from 'class-validator';
import * as express from 'express';
import HttpException from '../exceptions/httpException';

function validationMiddleware<T>(type: any): express.RequestHandler {
  return async (req, res, next): Promise<void> => {
    const errors = await validate(plainToClass(type, req.body), {
      validationError: { target: false },
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    });
    if (errors.length > 0) {
      const message = errors
        .map(
          (error: ValidationError) =>
            error.constraints && Object.values(error.constraints),
        )
        .join(', ');
      next(new HttpException(400, message));
    } else {
      next();
    }
  };
}

export default validationMiddleware;
