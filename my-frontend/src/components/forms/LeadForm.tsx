import "./LeadForm.css";
import { useState } from "react";
import { saveLead } from "../../repositories/LeadRepository";
import { leadTypes, type LeadType } from "../../config/leadTypes";
import Button from "../shared/Button";

interface LeadFormProps {
    type: LeadType; // Type-safe lead type
}

export default function LeadForm({ type }: LeadFormProps) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        notes: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const leadConfig = leadTypes[type]; // Fetch lead type configuration
            await saveLead(leadConfig.collection, { ...formData, type });
            setSuccess(true);
            setFormData({ firstName: "", lastName: "", email: "", phone: "", notes: "" });
        } catch (err) {
            console.error("Error saving lead:", err);
        }

        setLoading(false);
    };

    if (success) return <p>✅ Thank you! We’ll be in touch soon.</p>;

    const leadConfig = leadTypes[type]; // Fetch lead type configuration

    return (
        <form onSubmit={handleSubmit} className="lead-form max-w-md mx-auto p-4 border rounded space-y-3">
            <h2 className="lead-form-title text-xl font-bold">{leadConfig.title}</h2>
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="lead-form-input w-full p-2 border rounded"
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="lead-form-input w-full p-2 border rounded"
            />
            <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="lead-form-input w-full p-2 border rounded"
            />
            <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="lead-form-input w-full p-2 border rounded"
            />
            <textarea
                name="notes"
                placeholder="Additional Notes"
                value={formData.notes}
                onChange={handleChange}
                className="lead-form-textarea w-full p-2 border rounded"
            />
            <Button
                type="submit" // Automatically fetches `htmlType` and styles from the configuration
                disabled={loading}
                className="w-full"
            >
                {loading ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
}