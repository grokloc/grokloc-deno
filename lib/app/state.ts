import { Client } from "pg/mod.ts";

class _State {
  master: Client;
  replicas: Array<Client>;
}