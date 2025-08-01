import { FirestoreService } from "@/firebase/firestoreService";
import { Product } from "@/types/backend/models";

export async function fetchProducts() {
    const docs = await FirestoreService.getAllDocs("products")

    return docs as Product[]
}
