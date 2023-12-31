import { ref, listAll, getDownloadURL, uploadBytes, deleteObject  } from "firebase/storage";
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
    async uploadPhoto(path, file) {
        // Get the list of already uploaded file names for the given path
        const existingFileNames = await this.getUploadedFileNames(path);

        // Check if the file name already exists in the uploaded files
        if (existingFileNames.includes(file.name)) {
            return null;
        }

        // Continue with upload if not already uploaded
        const storageRef = ref(storage, `Photos/${path}/${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    },

    // Delete specific photo
    async deletePhoto(photoUrl) {
        const photoRef = ref(storage, photoUrl);
        await deleteObject(photoRef);
    },

    // Get a list of file names of uploaded photos
    async getUploadedFileNames(path) {
        const listRef = ref(storage, `Photos/${path}`);
        const { items } = await listAll(listRef);
        return items.map(itemRef => itemRef.name);
    },

    // Upload profile picture
    async uploadProfilePicture(file, userID) {
        const storageRef = ref(storage, `Profile pictures/${userID}`); // Unique file path to the user and will be overwritten if a new picture is uploaded.
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
    },

    // Delete profile picture
    async deleteProfilePicture(userID) {
        const photoRef = ref(storage, `Profile pictures/${userID}`);
        await deleteObject(photoRef);
    },

    // Clear Photos directory
    async deleteAllPhotos() {
        const deleteFolderContents = async (path) => {
            const folderRef = ref(storage, path);
            const { items, prefixes } = await listAll(folderRef);
      
            // Delete all files in the current folder
            for (const itemRef of items) {
              await deleteObject(itemRef);
            }
      
            // Recursively delete files in sub-folders
            for (const prefixRef of prefixes) {
              await deleteFolderContents(prefixRef.fullPath);
            }
          };
      
        await deleteFolderContents('Photos');
    }
}