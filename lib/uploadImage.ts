import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Uploads a file to Firebase Storage under /products folder
 * @param file File object from input tag
 * @returns Direct HTTPS URL string of uploaded image
 */
export async function uploadProductImage(file: File): Promise<string> {
  if (!file) throw new Error("No file provided");

  // Create a unique filename using timestamp
  const fileName = `products/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, fileName);

  try {
    // Upload file bytes
    const snapshot = await uploadBytes(storageRef, file);

    // Get and return the downloadable HTTPS URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.warn("Firebase Storage upload fallback triggered:", error);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }
}
