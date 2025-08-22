// Pure UI Component - Only handles rendering form fields
import React from 'react';
import { LeadFormData } from '../../domain/models/Lead';

interface LeadFormFieldsProps {
    formData: LeadFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    disabled?: boolean;
}

export function LeadFormFields({ formData, onChange, disabled = false }: LeadFormFieldsProps): React.ReactElement {
    return (
        <>
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={onChange}
                required
                disabled={disabled}
                className="lead-form-input w-full p-2 border rounded"
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={onChange}
                required
                disabled={disabled}
                className="lead-form-input w-full p-2 border rounded"
            />
            <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={onChange}
                required
                disabled={disabled}
                className="lead-form-input w-full p-2 border rounded"
            />
            <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone || ""}
                onChange={onChange}
                disabled={disabled}
                className="lead-form-input w-full p-2 border rounded"
            />
            <textarea
                name="notes"
                placeholder="Additional Notes"
                value={formData.notes || ""}
                onChange={onChange}
                disabled={disabled}
                className="lead-form-textarea w-full p-2 border rounded"
                rows={3}
            />
        </>
    );
}