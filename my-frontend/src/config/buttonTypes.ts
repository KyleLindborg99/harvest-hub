export const buttonTypes = {
    primary: {
        className: "bg-blue-600 text-white hover:bg-blue-700",
        htmlType: "button", // Default HTML type for primary buttons
    },
    secondary: {
        className: "bg-gray-600 text-white hover:bg-gray-700",
        htmlType: "button", // Default HTML type for secondary buttons
    },
    danger: {
        className: "bg-red-600 text-white hover:bg-red-700",
        htmlType: "button", // Default HTML type for danger buttons
    },
    success: {
        className: "bg-green-600 text-white hover:bg-green-700",
        htmlType: "button", // Default HTML type for success buttons
    },
    submit: {
        className: "bg-blue-600 text-white hover:bg-blue-700",
        htmlType: "submit", // Specific HTML type for submit buttons
    },
    // 🔮 Add more button types here in the future
} as const;

// Type-safe keys, e.g., "primary" | "secondary" | "danger" | "success" | "submit"
export type ButtonType = keyof typeof buttonTypes;