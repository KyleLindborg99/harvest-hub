// Infrastructure Layer - Firebase implementation
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import { ILeadRepository } from "../../domain/repositories/ILeadRepository";
import { Lead, LeadFormData, LeadType, LeadId } from "../../domain/models/Lead";

export class FirebaseLeadRepository implements ILeadRepository {
    private readonly collectionName = 'leads';

    async save(leadData: LeadFormData, type: LeadType): Promise<void> {
        const leadId = new LeadId(leadData.email, type);
        const docRef = doc(db, this.collectionName, leadId.toString());

        await setDoc(docRef, {
            ...leadData,
            type,
            createdAt: Timestamp.now(),
        });
    }

    async exists(email: string, type: LeadType): Promise<boolean> {
        const leadId = new LeadId(email, type);
        const docRef = doc(db, this.collectionName, leadId.toString());

        try {
            const docSnap = await getDoc(docRef);
            return docSnap.exists();
        } catch (error: any) {
            if (error.code === "permission-denied") {
                // If permission is denied, assume the document exists
                return true;
            }
            throw new Error("An unexpected error occurred while checking the lead. Please try again.");
        }
    }

    async findById(id: string): Promise<Lead | null> {
        const docRef = doc(db, this.collectionName, id);
        
        try {
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                return null;
            }

            const data = docSnap.data();
            return {
                id: docSnap.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                notes: data.notes,
                type: data.type,
                createdAt: data.createdAt.toDate()
            };
        } catch (error) {
            console.error("Error fetching lead:", error);
            return null;
        }
    }
}