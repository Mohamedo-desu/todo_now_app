import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    username: v.string(),
    email: v.string(),
    image: v.string(),
    clerkId: v.string(),
  }).index('by_clerk_id', ['clerkId']),

  tasks: defineTable({
    userId: v.id('users'),
    title: v.string(),
    description: v.string(),
    status: v.union(v.literal('in-progress'), v.literal('done')),
    priority: v.boolean(),
    dueDate: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_status', ['status'])
    .index('by_user_title', ['userId', 'title']),
});
