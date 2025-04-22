import { paginationOptsValidator } from 'convex/server';
import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getAuthenticatedUser } from './users';

export const fetchTasks = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const { db } = ctx;

    const user = await getAuthenticatedUser(ctx);

    if (!user) {
      return [];
    }

    const tasks = await db
      .query('tasks')
      .withIndex('by_user', q => q.eq('userId', user._id))
      .order('desc')
      .paginate(args.paginationOpts);

    if (!tasks) {
      return [];
    }

    return tasks;
  },
});

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

export const editTask = mutation({
  args: {
    id: v.id('tasks'),
    status: v.optional(v.union(v.literal('in-progress'), v.literal('done'))),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    priority: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, status, title, description, dueDate, priority }) => {
    const { db } = ctx;
    const user = await getAuthenticatedUser(ctx);
    if (!user) throw new Error('Not authenticated');

    // Fetch the existing task
    const task = await db.get(id);
    if (!task) throw new Error('Task not found');
    if (task.userId !== user._id) throw new Error('Not authorized to edit this task');

    // Build the partial update object
    const updates: Record<string, any> = { status };
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (dueDate !== undefined) updates.dueDate = dueDate;
    if (priority !== undefined) updates.priority = priority;

    await db.patch(id, updates);
    return { ...task, ...updates };
  },
});

export const deleteTask = mutation({
  args: {
    id: v.id('tasks'),
  },
  handler: async (ctx, { id }) => {
    const { db } = ctx;
    const user = await getAuthenticatedUser(ctx);
    if (!user) throw new Error('Not authenticated');

    // Ensure task exists and belongs to the user
    const task = await db.get(id);
    if (!task) throw new Error('Task not found');
    if (task.userId !== user._id) throw new Error('Not authorized to delete this task');

    await db.delete(id);
    return true;
  },
});
