import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-4">
            <h1 className="text-2xl font-bold">Lead Form Test Home</h1>
            <p>Click a button to go to a lead form:</p>

            <div className="flex flex-col space-y-3">
                <Button
                    onClick={() => navigate("/lead/shares")}
                    type="primary"
                >
                    Go to Share Lead Form
                </Button>

                <Button
                    onClick={() => navigate("/lead/members")}
                    type="success"
                >
                    Go to Member Lead Form
                </Button>

                <Button
                    onClick={() => alert("Danger Button Clicked")}
                    type="danger"
                >
                    Danger Button
                </Button>
            </div>
        </div>
    );
}
