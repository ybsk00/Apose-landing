import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: {
        privacy_consent: v.boolean(),
        hospital_name: v.string(),
        contact_name: v.string(),
        phone: v.string(),
        email: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("hospital_chatbot_leads", args);
    },
});

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("hospital_chatbot_leads").collect();
    },
});
