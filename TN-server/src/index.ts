import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'

import router from './routes'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use('/api/v1', router)

app.listen(PORT, () => {
  console.log('Listening at', PORT)
})
