"use client";

import { FirestoreService } from "@/firebase/firestoreService";
import { dump } from "@/utils/dump";
import { Timestamp } from "firebase/firestore";
import React, { useEffect } from "react";

export default async function page() {
  const ckData = async () => {
    const docId = FirestoreService.docId();

    await FirestoreService.addDoc("CuisineItems", {
      desc: "Description",
      heading: "North Indian",
      lowerHeading: "northindian",
      image: "https://firebasestorage.googleapis.com/v0/b/tnennt-1e1f2.appspot.com/o/products%2FProduct-ID-0278c4c9-c9eb-4e76-96d1-7c5f0862faad%2F48a251b0f2ab6de7d0ba948bdc880e99.jpg?alt=media",
      banner: "https://firebasestorage.googleapis.com/v0/b/tnennt-1e1f2.appspot.com/o/products%2FProduct-ID-0278c4c9-c9eb-4e76-96d1-7c5f0862faad%2F48a251b0f2ab6de7d0ba948bdc880e99.jpg?alt=media",
      subHeading: "sub  heading",
      about: "about",
      products : [
        {
          imageUrl : "https://firebasestorage.googleapis.com/v0/b/tnennt-1e1f2.appspot.com/o/products%2FProduct-ID-0278c4c9-c9eb-4e76-96d1-7c5f0862faad%2F48a251b0f2ab6de7d0ba948bdc880e99.jpg?alt=media",
          title : "title",
          desc : "description"
        }
      ]
    });

    //   const cutoffDate = new Date("2025-08-05T02:12:20+05:30"); // Your cutoff date

    //  const orders =  await FirestoreService.getByConditions(
    //     "Orders",
    //     [
    //       { field: "couponCode", operator: "==", value: "" }, // condition
    //     ]
    //   );

    //   console.log(orders);
  };

  useEffect(() => {
    ckData();
  }, []);

  return <div>page</div>;
}
