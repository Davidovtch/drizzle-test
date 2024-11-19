import { Hono } from "hono";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import { classes, student_class, students } from "./db/schema.ts";

const app = new Hono();
const db = drizzle(Deno.env.get("DATABASE_URL"));

app.get("/students", async (c) => {
  const result = await db.select().from(students);
  return c.json(result);
});

app.get("students/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const result = await db.select().from(students).where(eq(students.id, id));
  return c.json(result);
});

app.post("/students", async (c) => {
  const body = await c.req.json();
  const result = await db.insert(students).values(body).returning();
  return c.json(result);
});

app.put("/students/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const result = await db.update(students).set(body).where(eq(students.id, id))
    .returning();
  return c.json(result);
});

app.delete("/students/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const result = await db.delete(students).where(eq(students.id, id)).returning(
    { id: students.id, name: students.name },
  );
});

Deno.serve({ port: Deno.env.get("PORT") }, app.fetch);
