export const leadTypes = {
    share: {
        title: "Share Interest Form",
        collection: "shareLeads",
    },
    member: {
        title: "Membership Interest Form",
        collection: "memberLeads",
    },
    // 🔮 add more types here in the future
} as const;

// Type-safe keys, e.g. "share" | "member"
export type LeadType = keyof typeof leadTypes;