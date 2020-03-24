import App from './app'
import {connectDb} from './config'

const app : App = new App()
const port = 8080

connectDb((err : any,res : any) => {
	if (err) return console.log(err.message)
  app.start(port)
})

export default app
