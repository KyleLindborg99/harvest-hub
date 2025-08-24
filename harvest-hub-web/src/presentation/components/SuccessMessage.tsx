// Pure UI Component - Success state
import React from 'react';

interface SuccessMessageProps {
    message?: string;
}

export function SuccessMessage({ message = "✅ Thank you! We'll be in touch soon." }: SuccessMessageProps): React.ReactElement {
    return (
        <div className="success-message text-center p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-green-800 font-medium">{message}</p>
        </div>
    );
}