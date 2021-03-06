import "reflect-metadata"
import AppServer from './appServer'
import { connectDb } from './config'

const appServer = new AppServer()
const port = 8080

connectDb()
  .then(res => {
    appServer.start(port)
  })
  .catch(e => console.log(e.message))

// export default appServer
