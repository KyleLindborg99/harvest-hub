// Custom Hook - Handles form state and business logic
import { useState } from 'react';
import { LeadFormData, LeadType } from '../../domain/models/Lead';
import { CreateLeadUseCase } from '../../application/usecases/CreateLeadUseCase';
import { container } from '../../infrastructure/di/Container';

interface UseLeadFormResult {
    formData: LeadFormData;
    loading: boolean;
    success: boolean;
    error: string | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    resetForm: () => void;
}

export function useLeadForm(type: LeadType): UseLeadFormResult {
    const [formData, setFormData] = useState<LeadFormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        notes: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createLeadUseCase = container.resolve<CreateLeadUseCase>('CreateLeadUseCase');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null); // Clear error on input change
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createLeadUseCase.execute(formData, type);
            setSuccess(true);
            resetForm();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to submit the form. Please try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            notes: "",
        });
    };

    return {
        formData,
        loading,
        success,
        error,
        handleChange,
        handleSubmit,
        resetForm
    };
}