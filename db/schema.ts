import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const students = pgTable("students", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const classes = pgTable("classes", {
  id: integer().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
});

export const student_class = pgTable("student_class", {
  student_id: integer().references(() => students.id),
  class_id: integer().references(() => classes.id),
});
