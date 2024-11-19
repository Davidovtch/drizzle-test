import { Hono } from "hono";
import { drizzle } from "drizzle-orm/postgres-js";
import { usersTable } from "./db/schema.ts";

const app = new Hono();
const db = drizzle(Deno.env.get("DATABASE_URL"));

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

Deno.serve({ port: Deno.env.get("PORT") }, app.fetch);
