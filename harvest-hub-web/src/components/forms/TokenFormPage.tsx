import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { validateFormToken } from '../../config/formTokens';
import type { LeadType } from '../../domain/models/Lead';
import LeadForm from './LeadForm';

export default function TokenFormPage(): React.ReactElement {
    const { token } = useParams<{ token: string }>();
    
    // Validate the token and get the form type
    const formType: LeadType | null = token ? validateFormToken(token) : null;
    
    // If invalid token, redirect to home or show error
    if (!formType) {
        return <Navigate to="/" replace />;
    }
    
    // Render the appropriate form
    return <LeadForm type={formType} />;
}