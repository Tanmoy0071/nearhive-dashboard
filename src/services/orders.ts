import { FirestoreService } from "@/firebase/firestoreService";

export async function getAllOrders() {
    const docs = await FirestoreService.getAllDocs("Orders")

    console.log(docs);
    
    return docs
}