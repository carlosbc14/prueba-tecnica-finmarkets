# 📌 Prueba Técnica: API de Gestión de Tareas (Node.js & Express)

Este proyecto es la resolución de la **prueba técnica** para el puesto de **Desarrollador Back-end Node.js Express.js en Finmarkets**.  
Implementa una **API REST** con **WebSockets** para gestionar tareas en tiempo real.

---

## 🚀 Tecnologías usadas

- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/) + SQLite
- [Socket.IO](https://socket.io/)
- [Nodemon](https://nodemon.io/) (solo desarrollo)

---

## 📂 Estructura del proyecto

```
prueba-tecnica-finmarkets/
├── prisma/
│   └── migrations/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   └── task.controller.js
│   ├── middlewares/
│   │   └── validationResultHandler.js
│   ├── routes/
│   │   └── task.routes.js
│   ├── index.js
│   ├── app.js
│   ├── config.js
│   └── database.js
├── .env.example
├── .gitignore
├── eslint.config.js
├── prettier.config.js
├── package.json
└── README.md
```

---

## ⚙️ Configuración del entorno

### 1. Clonar repositorio

```bash
git clone https://github.com/carlosbc14/prueba-tecnica-finmarkets.git
cd prueba-tecnica-finmarkets
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Variables de entorno

Crear un archivo `.env` en la raíz con este contenido (ejemplo):

```env
MODE=development
PORT=8000
API_BASE_URL=http://localhost:8000
DATABASE_URL="file:./dev.db"
```

### 4. Migrar base de datos

```bash
npx prisma migrate dev --name init
```

---

## ▶️ Ejecución

- **Modo desarrollo** (con recarga automática):

  ```bash
  npm run dev
  ```

- **Modo producción**:
  ```bash
  npm start
  ```

Servidor por defecto: [http://localhost:8000](http://localhost:8000)

---

## 📡 Endpoints API

### GET `/api/tasks`

Obtiene todas las tareas.

### POST `/api/tasks`

Crea una nueva tarea.  
Body JSON:

```json
{ "titulo": "Mi tarea", "descripcion": "Detalle de la tarea" }
```

### GET `/api/tasks/:id`

Obtiene una tarea por ID.

### PUT `/api/tasks/:id`

Actualiza el estado de una tarea.  
Body JSON:

```json
{ "status": "completada" }
```

### DELETE `/api/tasks/:id`

Elimina una tarea por ID.

---

## 🔌 Pruebas de WebSockets

Para probar la funcionalidad en tiempo real, se creó un archivo HTML (`test.html`) que se conecta al servidor de Socket.io y muestra los eventos en la consola del navegador.

### 1. Abre el archivo `test.html` en tu navegador con el siguiente contenido

```html
<script src="http://localhost:8000/socket.io/socket.io.js"></script>
<script>
  const socket = io('http://localhost:8000')

  socket.on('connect', () => {
    console.log('Conectado con id:', socket.id)
  })

  socket.on('newTask', (task) => {
    console.log('Tarea creada recibida:', task)
  })

  socket.on('taskUpdated', (task) => {
    console.log('Tarea actualizada recibida:', task)
  })

  socket.on('taskDeleted', (task) => {
    console.log('Tarea eliminada recibida:', task)
  })
</script>
```

### 2. Crear una nueva tarea

```bash
curl -X POST http://localhost:8000/api/tasks   -H "Content-Type: application/json"   -d '{"titulo":"Tarea de prueba","descripcion":"Ver si llega por socket"}'
```

En la consola del navegador deberías recibir:

```json
{
  "id": 1,
  "titulo": "Tarea de prueba",
  "descripcion": "Ver si llega por socket",
  "status": "pendiente",
  "fechaCreacion": "2025-09-04T20:10:00.000Z",
  "fechaActualizacion": "2025-09-04T20:10:00.000Z"
}
```

### 3. Actualizar una tarea

```bash
curl -X PUT http://localhost:8000/api/tasks/1   -H "Content-Type: application/json"   -d '{"status":"completada"}'
```

Salida esperada en la consola del navegador:

```json
{
  "id": 1,
  "status": "completada"
}
```

### 4. Eliminar una tarea

```bash
curl -X DELETE http://localhost:8000/api/tasks/1
```

Salida esperada en la consola del navegador:

```json
{ "id": 1 }
```

---

## 📌 Decisiones de diseño

- Se utilizó **Prisma ORM** por su facilidad de uso y tipado fuerte en base de datos.
- **SQLite** se eligió por simplicidad, pero el código es portable a PostgreSQL/MySQL cambiando `DATABASE_URL`.
- Los eventos de WebSocket (`newTask`, `taskUpdated`, `taskDeleted`) permiten mantener a todos los clientes sincronizados en tiempo real.
- Se usó una arquitectura modular (**controllers, routes, database, config**) para escalabilidad.

---
