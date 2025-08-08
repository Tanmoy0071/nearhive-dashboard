import { FirestoreService } from "@/firebase/firestoreService";
import { User } from "@/types/backend/models";

// Fetch pending creators 
export async function fetchPendingCreators() {

    const creators = await FirestoreService.getByConditions("Users",[ { field : 'isWaiting' , operator : "==" , value : true } ]) as User[];

    return creators;
}


// Fetch verified creators
export async function fetchVerifiedCreators() {

    const creators = await FirestoreService.getByConditions("Users",[ { field : 'isCreator' , operator : "==" , value : true } ]) as User[];

    return creators;
}