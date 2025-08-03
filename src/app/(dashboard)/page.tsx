"use client";


import { fetchBlogs } from "@/services/blogs";
import { useEffect } from "react";

function page() {
  const datafn = async () => {
    console.log( 
    await  fetchBlogs() ,
    );
    
  };

  useEffect(() => {
    datafn();
  }, []);

  return <div>page</div>;
}

export default page;
