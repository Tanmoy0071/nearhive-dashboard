import { FirestoreService } from "@/firebase/firestoreService";
import { Middlemen } from "@/types/backend/models";

export async function fetchMiddlemen() {
    
    const docs = await FirestoreService.getAllDocs("Middlemens")

    return docs as Middlemen[]
}
