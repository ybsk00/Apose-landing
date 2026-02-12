import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: {
        company_name: v.string(),
        contact_name: v.string(),
        email: v.string(),
        phone: v.string(),
        privacy_consent: v.boolean(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("consultations", args);
    },
});

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("consultations").collect();
    },
});
