import { body } from 'express-validator'

import validationResultHandler from '../middlewares/validationResultHandler.js'

export const validateCreateTask = [
  body('titulo', 'Title is required and must be less than 100 characters')
    .trim()
    .notEmpty()
    .isLength({ max: 100 }),
  body('descripcion', 'Description must be less than 500 characters').trim().isLength({ max: 500 }),
  validationResultHandler,
]

export const validateUpdateTask = [
  body('status', 'Status is required').trim().notEmpty(),
  validationResultHandler,
]
