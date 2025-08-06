import { FirestoreService } from "@/firebase/firestoreService";
import { Campaign } from "@/types/backend/models";

// Fetch all campaigns 
export async function fetchCampaigns() {

    const campaigns = await FirestoreService.getAllDocs("Campaigns") as Campaign[];

    return campaigns;
}


// create campaign
export async function createCampaign({ title, productIds = [] }: Campaign) {

    const campaign = await FirestoreService.addDoc("Campaigns", {
        title,
        productIds
    });

    return campaign;
}


// update campaign
export async function updateCampaign(campaignId: string, { title, productIds }: Campaign) {

    const campaign = await FirestoreService.updateDoc("Campaigns", campaignId, {
        title,
        productIds
    });

    return campaign;
}
