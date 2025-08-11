import { FirestoreService } from "@/firebase/firestoreService";
import { User } from "@/types/backend/models";

// Fetch pending creators 
export async function fetchPendingCreators() {

    const creators = await FirestoreService.getByConditions("Users", [{ field: 'isWaiting', operator: "==", value: true }]) as User[];

    return creators;
}


// Fetch verified creators
export async function fetchVerifiedCreators() {

    const creators = await FirestoreService.getByConditions("Users", [{ field: 'isCreator', operator: "==", value: true }]) as User[];

    return creators;
}

// approve as creator
export async function approveCreator(userId: string) {

    const updatedUser: Partial<User> = {
        isCreator: true,
        isWaiting: false
    }

    await FirestoreService.updateDoc("Users", userId, updatedUser)
}

// remove as creator
export async function removeCreator(userId: string) {

    const updatedUser: Partial<User> = {
        isCreator: false,
        isWaiting: true
    }

    await FirestoreService.updateDoc("Users", userId, updatedUser)
}