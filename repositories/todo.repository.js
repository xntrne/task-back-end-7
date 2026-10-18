import { eq, not } from "drizzle-orm";
import { db } from "../db/index.js";
import { todos } from "../db/schema.js";

export const todoRepository = {
  // create
  async create({ title, body }) {
    const [todo] = await db.insert(todos).values({ title, body }).returning();
    return todo;
  },

  // getAll
  async getAll() {
    return db.select().from(todos).orderBy(todos.id);
  },

  // update
  async update(id, { title, body }) {
    const [todo] = await db
      .update(todos)
      .set({ title, body })
      .where(eq(todos.id, id))
      .returning();
    return todo ?? null;
  },

  // toggleDone
  async toggleDone(id) {
    const [todo] = await db
      .update(todos)
      .set({ done: not(todos.done) })
      .where(eq(todos.id, id))
      .returning();
    return todo ?? null;
  },

  // delete
  async delete(id) {
    const deleted = await db.delete(todos).where(eq(todos.id, id)).returning({ id: todos.id });
    return deleted.length > 0;
  },
};
