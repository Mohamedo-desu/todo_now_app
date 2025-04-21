import { v } from 'convex/values';
import { mutation } from './_generated/server';
import { getAuthenticatedUser } from './users';

export const addTask = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    status: v.union(v.literal('in-progress'), v.literal('done')),
    priority: v.boolean(),
    dueDate: v.number(),
  },
  handler: async (ctx, args) => {
    const { db } = ctx;

    const user = await getAuthenticatedUser(ctx);

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { title, description, status, priority, dueDate } = args;

    const taskId = await db.insert('tasks', {
      userId: user._id,
      title,
      description,
      status,
      priority,
      dueDate,
    });
    return taskId;
  },
});
