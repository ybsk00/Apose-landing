import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    consultations: defineTable({
        company_name: v.string(),
        contact_name: v.string(),
        email: v.string(),
        phone: v.string(),
        privacy_consent: v.boolean(),
    }),
});
