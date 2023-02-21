// import { Client } from "pg/mod.ts";
import { Level } from "../env.ts";

class State {
  //master: Client;
  //replicas: Array<Client>;

  constructor(level: Level) {
    switch (level) {
      case Level.UNIT:
        console.log('UNIT');
        break;
      default:
        throw new Deno.errors.NotSupported();
    }
  }
}

export { 
  State
};