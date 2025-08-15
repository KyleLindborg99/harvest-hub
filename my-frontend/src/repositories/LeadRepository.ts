import { db } from "../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

interface LeadData {
    [key: string]: any; // Generic data structure for leads
    createdAt?: Timestamp;
}

export async function saveLead(collectionName: string, data: LeadData) {
    return await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Timestamp.now(),
    });
}