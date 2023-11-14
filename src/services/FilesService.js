import { ref, listAll, getDownloadURL, uploadBytes  } from "firebase/storage";
import { storage } from "@/firebase";

export default {
    // Fetch the PDF files from the Firebase Storage (in the given directory)
    async fetchPDFs(directory) {
        const pdfList = [];
        const listRef = ref(storage, directory);

        // Retrieve all items (files) in the directory
        const res = await listAll(listRef);

        for (const itemRef of res.items) {
            // Get the download URL for each file reference
            const url = await getDownloadURL(itemRef);
            pdfList.push({
                name: itemRef.name, // The name of the file
                url: url            // The URL to download the file
            });
        }
        return pdfList;
    },

    // Fetch a specific PDF file by its name from the given directory
    async fetchPDFFile(directory, fileName) {
        // Create a reference to the specific file in the given directory
        const fileRef = ref(storage, `${directory}/${fileName}`);

        // Retrieve the download URL for the file
        const url = await getDownloadURL(fileRef);
        return {
            name: fileName,
            url: url
        };
    },

    // Upload photos
    async uploadPhoto(file) {
        const storageRef = ref(storage, `Photos/${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    },
}