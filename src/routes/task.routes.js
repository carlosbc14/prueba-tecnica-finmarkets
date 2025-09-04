import { Router } from 'express'
import { validateCreateTask, validateUpdateTask } from '../validations/task.validations.js'
import {
  createTask,
  deleteTaskById,
  getTaskById,
  getTasks,
  updateTaskById,
} from '../controllers/task.controller.js'

const router = Router()

router.get('/', getTasks)
router.post('/', validateCreateTask, createTask)
router.get('/:id', getTaskById)
router.put('/:id', validateUpdateTask, updateTaskById)
router.delete('/:id', deleteTaskById)

export default router
