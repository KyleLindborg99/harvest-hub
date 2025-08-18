export const buttonTypes = {
    primary: {
        className: "btn btn-primary",
        htmlType: "button",
    },
    secondary: {
        className: "btn btn-secondary",
        htmlType: "button",
    },
    danger: {
        className: "btn btn-danger",
        htmlType: "button",
    },
    success: {
        className: "btn btn-success",
        htmlType: "button",
    },
    submit: {
        className: "btn btn-primary",
        htmlType: "submit",
    },
} as const;

// Type-safe keys, e.g., "primary" | "secondary" | "danger" | "success" | "submit"
export type ButtonType = keyof typeof buttonTypes;