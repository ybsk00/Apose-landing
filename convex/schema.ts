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
    hospital_chatbot_leads: defineTable({
        privacy_consent: v.boolean(),
        hospital_name: v.string(),
        contact_name: v.string(),
        phone: v.string(),
        email: v.string(),
    }),
});
