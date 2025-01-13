import { Lucia } from "lucia";
import db from "./db";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";

const adapter = new BetterSqlite3Adapter(db, {
  // where is your data table?
  user: "users",
  // which table you want to use for storing sessions?
  session: "sessions",
});

const Lucia = new Lucia(adapter, {
  sessionCookie: {
    // should always be false for next js as per doc
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});
