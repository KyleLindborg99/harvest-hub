import React from "react";
import { buttonTypes, type ButtonType } from "../../config/buttonTypes";

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    type?: ButtonType; // Dynamically fetch styles and behavior based on type
    className?: string; // Allow additional custom styles
    disabled?: boolean;
}

export default function Button({
    onClick,
    children,
    type = "primary", // Default to primary type
    className = "",
    disabled,
}: ButtonProps) {
    const buttonConfig = buttonTypes[type]; // Fetch button type configuration

    return (
        <button
            onClick={onClick}
            type={buttonConfig.htmlType} // Use `htmlType` from the configuration
            className={`px-6 py-3 rounded font-bold transition-colors ${buttonConfig.className} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}