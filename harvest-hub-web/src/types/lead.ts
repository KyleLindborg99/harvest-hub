export interface Lead {
    id?: string;
    type: "member" | "share";  // different lead types
    name: string;
    email: string;
    message?: string;
    createdAt: Date;
}