// desc: "Description",
//       heading: "North Indian",
//       lowerHeading: "northindian",
//       image: "https://firebasestorage.googleapis.com/v0/b/tnennt-1e1f2.appspot.com/o/products%2FProduct-ID-0278c4c9-c9eb-4e76-96d1-7c5f0862faad%2F48a251b0f2ab6de7d0ba948bdc880e99.jpg?alt=media",
//       banner: "https://firebasestorage.googleapis.com/v0/b/tnennt-1e1f2.appspot.com/o/products%2FProduct-ID-0278c4c9-c9eb-4e76-96d1-7c5f0862faad%2F48a251b0f2ab6de7d0ba948bdc880e99.jpg?alt=media",
//       subHeading: "sub  heading",
//       about: "about",
//       products : [
//         {
//           imageUrl : "https://firebasestorage.googleapis.com/v0/b/tnennt-1e1f2.appspot.com/o/products%2FProduct-ID-0278c4c9-c9eb-4e76-96d1-7c5f0862faad%2F48a251b0f2ab6de7d0ba948bdc880e99.jpg?alt=media",
//           title : "title",
//           desc : "description"
//         }
//       ]





import { FirestoreService } from "@/firebase/firestoreService";
import { toLowerNoSpaces } from "@/helper/helper";
import { Cuisine } from "@/types/backend/models";

type Product = {
    imageUrl: string;
    title: string;
    desc: string;
};

type CuisineCreate = {
    desc: string;
    heading: string;
    lowerHeading: string;
    image: File;
    banner: File;
    subHeading: string;
    about: string;
    products: Product[];
};



// Fetch all cuisines 
export async function fetchCuisines() {

    const cuisines = await FirestoreService.getAllDocs("CuisineItems") as Cuisine[];

    return cuisines;
}

export async function createCuisine({ heading, image, banner, subHeading, about, products, desc }: CuisineCreate) {

    try {

    const cuisine: Cuisine = {
        heading: heading,
        lowerHeading: toLowerNoSpaces(heading),
        subHeading: subHeading,
        about: about,
        desc: desc,
        image: await FirestoreService.uploadFile(image, "Cuisine"),
        banner: await FirestoreService.uploadFile(banner, "Cuisine"),
        products: products

    }

    await FirestoreService.addDoc("CuisineItems", cuisine)

    return cuisine

    } catch (error) {

        throw new Error("Failed to create cuisine")
        
    }


}