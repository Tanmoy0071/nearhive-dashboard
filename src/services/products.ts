import { FirestoreService } from "@/firebase/firestoreService";
import { Product } from "@/types/backend/models";

export async function fetchProducts() {
    const docs = await FirestoreService.getAllDocs("products")

    return docs as Product[]
}

// export async function cre(params:type) {
    
// }



//     const docId = FirestoreService.docId()

//   await  FirestoreService.setDoc("products",docId,{
//       "createdAt": Timestamp.now(),
//         "cuisine": "North Indian",
//         "lowerCuisine": "northindian",
//         "imageUrl": "https://firebasestorage.googleapis.com/v0/b/tnennt-1e1f2.appspot.com/o/products%2FProduct-ID-0278c4c9-c9eb-4e76-96d1-7c5f0862faad%2F48a251b0f2ab6de7d0ba948bdc880e99.jpg?alt=media",
//         "isAvailable": true,
//         "lastUpdated":  Timestamp.now(),
//         "name": "Aloo Bhat",
//         "lowerName": "aloobhat",
//         "productCategory": "Cafes",
//         "productId": docId,
//         "storeCategory": "Biryani Special",
//         "storeId": "UGuFkpi4gR6zu42RFyML",
//         "type": "nonVeg",
//         "variations": {
//             "half": {
//                 "discount": 10,
//                 "mrp": 189,
//                 "price": 171,
//                 "stockQuantity": 1000000
//             }
//         },
//         "rating": 4.2

//     })
