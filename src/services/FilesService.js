import { ref, listAll, getDownloadURL  } from "firebase/storage";
import { storage } from "@/firebase";

export default {
    // Fetch pdf-files test procedures from Firebase Storage
    async fetchTestProcedures() {
        const pdfList = [];
        const listRef = ref(storage, 'Testprocedures');

        // Retrieve all items (files) in the 'Testprocedures' directory
        const res = await listAll(listRef);

        for (const itemRef of res.items) {
            // Get the download URL for each file reference.
            const url = await getDownloadURL(itemRef);
            pdfList.push({
                name: itemRef.name, // The name of the file
                url: url            // The URL to download the file
            });
        }
        return pdfList;
    }
}