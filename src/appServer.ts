// import {Application, application} from 'express'
// import * as express from 'express'
import 'reflect-metadata'
import 
{
  static as staticFiles
}                from 'express'
import {Server, Middleware}  from '@overnightjs/core'
import {Logger}  from '@overnightjs/logger'
import {json}    from 'body-parser'
import cors      from 'cors'

import history   from './middleware/history'
import * as controllers from './controllers'

export default class AppServer extends Server {
  private readonly SERVER_START = 'server start on port : '
  constructor(){
    super(true)
    // setup Middlewares
    this.app.use(json())
    this.app.use(cors())
    this.app.use(history(this))
    this.app.use(staticFiles('public'))
    this.setupControllers()
  }

  private setupControllers() : void {
    const ctlrInstances = []
    for (const name in controllers) {
      if (controllers.hasOwnProperty(name)) {
        const controller = (controllers as any)[name]
        ctlrInstances.push(new controller())
      }
    }
    // Logger.Info(ctlrInstances)
    super.addControllers(ctlrInstances)
  }

  public start(port : number) : void {
    this.app.listen(port,()=> {
      Logger.Warn(this.SERVER_START + port)
    })
  }

  get appInstance(): any {
    return this.app
  }

}