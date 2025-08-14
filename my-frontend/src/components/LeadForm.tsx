import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import type { Lead } from "../types/lead";

export const LeadForm: React.FC<{ type: "member" | "share" }> = ({ type }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newLead: Lead = {
            type,
            name,
            email,
            createdAt: new Date(),
        };

        try {
            await addDoc(collection(db, "leads"), {
                ...newLead,
                createdAt: Timestamp.fromDate(newLead.createdAt),
            });
            alert("Lead submitted!");
            setName("");
            setEmail("");
        } catch (err) {
            console.error(err);
            alert("Error submitting lead");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>{type === "member" ? "Membership Lead" : "Share Lead"}</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};
