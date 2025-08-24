import "./LeadForm.css";
import { leadTypes } from "../../config/leadTypes";
import { type LeadType } from "../../domain/models/Lead";
import Button from "../shared/Button";
import BackgroundCollage from "./BackgroundCollage";
import { useLeadForm } from "../../presentation/hooks/useLeadForm";
import { LeadFormFields } from "../../presentation/components/LeadFormFields";
import { SuccessMessage } from "../../presentation/components/SuccessMessage";
import { ErrorMessage } from "../../presentation/components/ErrorMessage";

interface LeadFormProps {
    type: LeadType;
}

export default function LeadForm({ type }: LeadFormProps) {
    const {
        formData,
        loading,
        success,
        error,
        handleChange,
        handleSubmit
    } = useLeadForm(type);

    if (success) return <SuccessMessage />;

    const leadConfig = leadTypes[type];

    return (
        <>
            <BackgroundCollage formType={type} />
            <div className="lead-page">
                <div className="lead-form-wrapper">
                    <form onSubmit={handleSubmit} className="lead-form max-w-md mx-auto p-4 border rounded space-y-3">
                        <h2 className="lead-form-title text-xl font-bold">{leadConfig.title}</h2>

                        {error && <ErrorMessage error={error} />}

                        <LeadFormFields
                            formData={formData}
                            onChange={handleChange}
                            disabled={loading}
                        />

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}