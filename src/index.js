import { server } from './app.js'
import { env } from './config.js'

server.listen(env.port, () => {
  console.log('Server on ' + env.api_base_url)
})
