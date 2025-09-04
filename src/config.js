import { config } from 'dotenv'

config()

export const env = {
  mode: process.env.MODE || 'development',
  port: process.env.PORT || 8000,

  api_base_url: process.env.API_BASE_URL || 'http://localhost:8000',

  database_url: process.env.DATABASE_URL || 'file:./dev.db',
}
