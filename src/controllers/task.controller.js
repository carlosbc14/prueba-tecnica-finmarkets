import db from '../database.js'
import { io } from '../app.js'

export const getTasks = async (_req, res) => {
  try {
    const tasks = await db.task.findMany()

    return res.json({
      data: tasks,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

export const getTaskById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const task = await db.task.findFirst({ where: { id } })

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      })
    }

    return res.json({
      data: task,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

export const createTask = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body

    const task = await db.task.create({
      data: { titulo, descripcion },
    })

    io.emit('newTask', task)

    return res.status(201).json({
      message: 'Task saved successfully',
      data: task,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

export const updateTaskById = async (req, res) => {
  try {
    const { status } = req.body
    const id = parseInt(req.params.id)

    const task = await db.task.findFirst({ where: { id } })

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      })
    }

    const taskUpdated = await db.task.update({
      data: { status },
      where: { id },
    })

    io.emit('taskUpdated', { id: task.id, status: task.status })

    return res.json({
      message: 'Task updated successfully',
      data: taskUpdated,
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}

export const deleteTaskById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    const task = await db.task.findFirst({ where: { id } })

    if (!task) {
      return res.status(404).json({
        message: 'Task not found',
      })
    }

    await db.task.delete({ where: { id } })

    io.emit('taskDeleted', { id })

    return res.json({
      message: 'Task deleted successfully',
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    })
  }
}
