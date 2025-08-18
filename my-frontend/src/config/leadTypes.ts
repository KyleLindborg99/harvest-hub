export const leadTypes = {
    share: {
        title: "Share Interest Form",
        collection: "leads", // Single collection for all leads
    },
    member: {
        title: "Membership Interest Form",
        collection: "leads", // Single collection for all leads
    },
} as const;

export type LeadType = keyof typeof leadTypes;