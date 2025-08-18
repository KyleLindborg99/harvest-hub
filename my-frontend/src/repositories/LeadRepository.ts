import { db } from "../services/firebase";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { type LeadType } from "../config/leadTypes";

interface LeadData {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    notes?: string;
    type: LeadType;
    createdAt?: Timestamp;
}

export async function saveLead(collectionName: string, data: LeadData) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        throw new Error("Please enter a valid email address.");
    }

    const docId = `${data.email}_${data.type}`; // Combine email and lead type for unique ID
    const docRef = doc(db, collectionName, docId);

    console.log(`Checking existence for docId: ${docId}`);

    try {
        // Attempt to check if the document exists
        await getDoc(docRef);
        // If no error, the document does not exist
    } catch (error: any) {
        if (error.code === "permission-denied") {
            // If permission is denied, assume the document exists
            throw new Error(`A lead with email "${data.email}" and type "${data.type}" has already been submitted.`);
        } else {
            console.error("Unexpected error during getDoc:", error);
            throw new Error("An unexpected error occurred while checking the lead. Please try again.");
        }
    }

    // Save the new lead
    await setDoc(docRef, {
        ...data,
        createdAt: Timestamp.now(),
    });
}