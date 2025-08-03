import { FirestoreService } from "@/firebase/firestoreService";
import { Blog } from "@/types/backend/models";
import { Timestamp } from "firebase/firestore";

// Fetch all blogs 
export async function fetchBlogs() {
  const blogs = await FirestoreService.getAllDocs("Blogs") as Blog[];

  return blogs;
}

// create blog
export async function createBlog({
  title,
  description,
  thumbnail,
  content
}: {
  title: string;
  description: string;
  thumbnail: File;
  content: string;
}) {

  const docId = FirestoreService.docId();

  try {
    const blog: Blog = {
      blogId: docId,
      title,
      description,
      content,
      thumbnail: await FirestoreService.uploadFile(thumbnail, "Blogs"),
      createdAt: Timestamp.now(),
    };

    await FirestoreService.setDoc("Blogs", docId, blog);

    return {
      success: true,
      message: " Blog created successfully!",
      data: blog,
    };
  } catch (error) {
    console.error("Error creating blog:", error);
    return {
      success: false,
      message: " Failed to create blog. Please try again later.",
      error: (error as Error).message,
    };
  } 

}
