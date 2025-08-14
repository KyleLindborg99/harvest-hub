import React from "react";
import { LeadForm } from "../components/LeadForm";

export const Home: React.FC = () => {
    return (
        <div>
            <h1>Farm Nonprofit</h1>
            <LeadForm type="member" />
            <LeadForm type="share" />
        </div>
    );
};