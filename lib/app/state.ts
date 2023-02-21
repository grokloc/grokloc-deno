import { Pool } from "pg/mod.ts";
import { Level } from "../env.ts";

class State {
  master: Pool;
  replicas: Array<Pool>;

  constructor(level: Level) {
    if (level === Level.UNIT) {
      const connStr = Deno.env.get("POSTGRES_APP_URL");
      if (connStr === undefined) {
        throw new Deno.errors.NotFound("env var POSTGRES_APP_URL not set");
      }
      this.master = new Pool(connStr, 4, true);
      this.replicas = [this.master];
    } else {
      throw new Deno.errors.NotSupported("level not supported yet");
    }
  }

  randomReplica(): Pool {
    if (this.replicas.length == 0) {
      throw new Error("no replicas to pick from");
    }
    return this.replicas[Math.floor(Math.random() * this.replicas.length)];
  }
}

export { State };
