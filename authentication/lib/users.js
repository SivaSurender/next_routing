import db from "./db";

export function createUser(email, password) {
  const stmt = db
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(email, password);
  return stmt.lastInsertRowid;
}
