import { Request } from 'express';
import { validationResult } from 'express-validator';

export const validarRequest = ( req: Request ) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        throw error.array();
    }
}