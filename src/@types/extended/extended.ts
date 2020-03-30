
export class Err extends Error {
  [k : string] : any
  constructor(msg : string){
    super(msg)
  }
}

