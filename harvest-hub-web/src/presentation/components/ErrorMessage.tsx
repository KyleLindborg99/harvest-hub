// Pure UI Component - Error state
import React from 'react';

interface ErrorMessageProps {
    error: string;
}

export function ErrorMessage({ error }: ErrorMessageProps): React.ReactElement {
    return (
        <div className="error-message p-3 bg-red-50 border border-red-200 rounded">
            <p className="lead-error text-red-800">{error}</p>
        </div>
    );
}