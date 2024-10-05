"use client"

import { useState } from "react";
import { storage, db } from "../services/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useUser } from "../utils/context/UserContext";

export default function ManagePaintings() {
  const { showAlert } = useUser()

  const [paintingData, setPaintingData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null, // To store the selected image
  });

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setPaintingData((prev) => ({ ...prev, image: files[0] })); // Store the image file
    } else {
      setPaintingData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(paintingData)
    if (!paintingData.image) {
      alert("Please upload an image!");
      return;
    }

    // Upload the image to Firebase Storage
    const storageRef = ref(storage, `paintings/${paintingData.image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, paintingData.image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress); // Show progress to the user
      },
      (error) => {
        console.error("Image upload failed:", error);
      },
      async () => {
        // Get the image URL from Firebase Storage after upload is complete
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Save the painting metadata along with the image URL to Firestore
        await addDoc(collection(db, "paintings"), {
          name: paintingData.name,
          price: parseFloat(paintingData.price),
          category: paintingData.category,
          description: paintingData.description || "", // Optional field
          imageUrl: downloadURL, // Store the image URL in Firestore
          createdAt: new Date(),
        });

        showAlert("Painting added successfully!", "success");
        setPaintingData({
          name: "",
          price: "",
          category: "",
          description: "",
          image: null,
        });
        setUploadProgress(0);
      }
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl text-center mb-6">Add New Painting</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mx-auto w-full sm:w-2/3 lg:w-2/4">
        <div>
          <label htmlFor="name" className="block font-semibold">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border p-2 rounded-md w-full"
            value={paintingData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block font-semibold">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            className="border p-2 rounded-md w-full"
            value={paintingData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block font-semibold">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            className="border p-2 rounded-md w-full"
            value={paintingData.category}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-semibold">Description (Optional):</label>
          <textarea
            id="description"
            name="description"
            className="border p-2 rounded-md w-full"
            value={paintingData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image" className="block font-semibold">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="border p-2 rounded-md w-full"
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
        >
          Add Painting
        </button>
        {uploadProgress > 0 && (
          <div className="mt-2">
            Uploading: {Math.round(uploadProgress)}%
          </div>
        )}
      </form>
    </div>
  );
}
