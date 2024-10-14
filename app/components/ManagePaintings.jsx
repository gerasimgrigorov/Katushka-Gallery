"use client";

import { useState, useEffect } from "react";
import { storage, db } from "../services/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useUser } from "../utils/context/UserContext";
import Image from "next/image";
import Spinner from "./Spinner";

export default function ManagePaintings() {
  const { showAlert } = useUser();

  const [paintingData, setPaintingData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [paintings, setPaintings] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPaintings = async () => {
    setLoading(true);
    const paintingsCollection = collection(db, "paintings");
    const paintingsSnapshot = await getDocs(paintingsCollection);
    const paintingsList = paintingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPaintings(paintingsList);
    setLoading(false);
  };

  useEffect(() => {
    fetchPaintings();
  }, []);

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
    setIsSubmitting(true);
    if (!paintingData.image) {
      setIsSubmitting(false);
      showAlert("Please upload an image!");
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
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Image upload failed:", error);
      },
      async () => {
        // Get the image URL from Firebase Storage after upload is complete
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        await addDoc(collection(db, "paintings"), {
          name: paintingData.name,
          price: parseFloat(paintingData.price),
          category: paintingData.category,
          description: paintingData.description || "",
          imageUrl: downloadURL,
          status: "Available",
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
        setIsSubmitting(false);
        await fetchPaintings();
      }
    );
  };

  const handleDeletePainting = async (id) => {
    try {
      const paintingSnap = doc(db, "paintings", id);
      await deleteDoc(paintingSnap);
      showAlert("Painting deleted successfully", "success");
      await fetchPaintings();
    } catch (e) {
      console.log("Error deleting image: ", e);
      showAlert("An error occured. Try again later.");
    }
  };

  const handleUpdatePainting = async (id, updatedData) => {
    const paintingRef = doc(db, "paintings", id);
    await updateDoc(paintingRef, updatedData);
    showAlert("Painting updated successfully!", "success");
    await fetchPaintings();
  };

  if (loading) return <p className="text-center">Loading paintings...</p>;

  return (
    <div className="sm:p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl text-center mb-4">Add New Painting</h2>
      <form onSubmit={handleSubmit} className="space-y-3 md:w-3/4 mx-auto">
        <div>
          <label htmlFor="name" className="block font-semibold">
            Name:
          </label>
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
          <label htmlFor="price" className="block font-semibold">
            Price:
          </label>
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
          <label htmlFor="category" className="block font-semibold">
            Category:
          </label>
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
          <label htmlFor="description" className="block font-semibold">
            Description (Optional):
          </label>
          <textarea
            id="description"
            name="description"
            className="border p-2 rounded-md w-full"
            value={paintingData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image" className="block font-semibold">
            Upload Image:
          </label>
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
          disabled={isSubmitting}
          type="submit"
          className="w-full mt-4 py-2 bg-violet-800 text-white rounded-md hover:bg-violet-600 transition duration-300 disabled:bg-gray-500"
        >
          {isSubmitting ? <Spinner /> : "Add Painting"}
        </button>
        {/* {uploadProgress > 0 && (
          <div className="mt-2">Uploading: {Math.round(uploadProgress)}%</div>
        )} */}
      </form>

      {/* Display Current Paintings */}
      <h2 className="text-2xl text-center mt-6 mb-2">Current Paintings</h2>
      <div className="overflow-x-auto">
        {paintings.length === 0 ? (
          <p>No paintings found.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Image</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Category</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paintings.map((painting) => (
                <tr key={painting.id}>
                  <td className="border border-gray-300 justify-center py-1">
                    <Image
                      className="mx-auto"
                      src={painting.imageUrl}
                      alt={`${painting.name} - Image`}
                      width={50}
                      height={50}
                    />{" "}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {painting.name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {painting.description || "No description."}
                  </td>
                  <td className="border border-gray-300 p-2">
                    ${painting.price}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {painting.category}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {painting.status}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      disabled={isSubmitting}
                      onClick={() => handleDeletePainting(painting.id)}
                      className="bg-red-700 rounded-md text-white p-1 hover:bg-red-600 transition duration-300 disabled:bg-gray-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
