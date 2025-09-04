import express from 'express'
import cors from 'cors'

import taskRouter from './routes/task.routes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api', (_req, res) =>
  res.json({
    name: 'prueba-tecnica-finmarkets',
    description:
      'Resolución de prueba técnica para el puesto de Desarrollador Back-end Node.js Express.js en Finmarkets',
    version: '1.0.0',
  })
)
app.use('/api/tasks', taskRouter)

export default app
