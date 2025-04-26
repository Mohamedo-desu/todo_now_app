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
      return { page: [], isDone: true };
    }

    // Get all tasks for the user sorted by priority
    const tasks = await db
      .query('tasks')
      .withIndex('by_user_priority', q => q.eq('userId', user._id))
      .order('desc')
      .paginate(args.paginationOpts);

    return tasks;
  },
});

export const fetchPendingTasks = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const { db } = ctx;
    const user = await getAuthenticatedUser(ctx);

    if (!user) {
      return { page: [], isDone: true };
    }

    // Use unique cursor for this specific query
    const tasks = await db
      .query('tasks')
      .withIndex('by_user_status_dueDate', q =>
        q.eq('userId', user._id).eq('status', 'in-progress')
      )
      .order('desc')
      .paginate(args.paginationOpts);

    return tasks;
  },
});

export const fetchCompletedTasks = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const { db } = ctx;
    const user = await getAuthenticatedUser(ctx);

    if (!user) {
      return { page: [], isDone: true };
    }

    // Use unique cursor for this specific query
    const tasks = await db
      .query('tasks')
      .withIndex('by_user_status_dueDate', q => q.eq('userId', user._id).eq('status', 'done'))
      .order('desc')
      .paginate(args.paginationOpts);

    return tasks;
  },
});

export const fetchOverdueTasks = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const { db } = ctx;
    const user = await getAuthenticatedUser(ctx);

    if (!user) {
      return { page: [], isDone: true };
    }

    const now = new Date().getTime();

    // Use collect() instead of paginate() to avoid cursor issues
    // This approach doesn't rely on cursors at all
    const allOverdueTasks = await db
      .query('tasks')
      .withIndex('by_user_status_dueDate', q =>
        q.eq('userId', user._id).eq('status', 'in-progress').lt('dueDate', now)
      )
      .order('desc')
      .collect();

    // Manual pagination implementation
    const { numItems, cursor } = args.paginationOpts;
    let startIndex = 0;

    // If cursor is provided, it's a stringified index
    if (cursor) {
      try {
        startIndex = parseInt(cursor);
        if (isNaN(startIndex)) startIndex = 0;
      } catch (e) {
        startIndex = 0;
      }
    }

    const endIndex = startIndex + numItems;
    const page = allOverdueTasks.slice(startIndex, endIndex);
    const nextCursor = endIndex < allOverdueTasks.length ? endIndex.toString() : null;

    return {
      page,
      continueCursor: nextCursor,
      isDone: nextCursor === null,
    };
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
      return { success: false, error: 'Not authenticated' };
    }

    const { title, description, status, priority, dueDate } = args;

    const normalizedTitle = title.toLowerCase().trim();

    try {
      const taskId = await db.insert('tasks', {
        userId: user._id,
        title: normalizedTitle,
        description,
        status,
        priority,
        dueDate,
      });
      return { success: true, taskId };
    } catch (error) {
      return { success: false, error: 'Failed to create task' };
    }
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
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    // Fetch the existing task
    const task = await db.get(id);
    if (!task) {
      return { success: false, error: 'Task not found' };
    }
    if (task.userId !== user._id) {
      return { success: false, error: 'Not authorized to edit this task' };
    }

    // Build the partial update object
    const updates: Record<string, any> = {};
    if (title !== undefined) updates.title = title;
    if (status !== undefined) updates.status = status;
    if (description !== undefined) updates.description = description;
    if (dueDate !== undefined) updates.dueDate = dueDate;
    if (priority !== undefined) updates.priority = priority;

    await db.patch(id, updates);
    return { success: true };
  },
});

export const deleteTask = mutation({
  args: {
    id: v.id('tasks'),
  },
  handler: async (ctx, { id }) => {
    const { db } = ctx;
    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    // Ensure task exists and belongs to the user
    const task = await db.get(id);
    if (!task) {
      return { success: false, error: 'Task not found' };
    }
    if (task.userId !== user._id) {
      return { success: false, error: 'Not authorized to delete this task' };
    }

    await db.delete(id);
    return { success: true };
  },
});

export const searchTask = query({
  args: {
    taskTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const { db } = ctx;

    const user = await getAuthenticatedUser(ctx);
    if (!user) {
      return []; // Return empty array instead of throwing error
    }

    const start = args.taskTitle;
    const end = args.taskTitle + '\uffff';

    const tasks = await db
      .query('tasks')
      .withIndex('by_user_title', q =>
        q.eq('userId', user._id).gte('title', start).lt('title', end)
      )
      .order('desc')
      .collect();

    return tasks;
  },
});
