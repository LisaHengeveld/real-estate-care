import { auth } from "@/firebase";
import { signInWithEmailAndPassword, updatePassword, reauthenticateWithCredential, EmailAuthProvider, updateEmail, updateProfile } from "firebase/auth";

export default {
    login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    },

    getEmail() {
        return auth.currentUser?.email;
    },

    updateEmail(newEmail) {
        // Official code below, but needs verification email:
        // return updateEmail(auth.currentUser, newEmail);

        // Since no real email addresses will be used for this course project mock data will be used:
        // Simulate an async operation with a promise
        return new Promise((resolve, reject) => {
            // Simulate updating email
            console.log(`Email would be updated to: ${newEmail}`);
            // Simulate a delay
            setTimeout(resolve, 1000);
        });
    },

    async updatePassword(currentPassword, newPassword) {
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(
                user.email,
                currentPassword
            );

            // Reauthenticate user
            await reauthenticateWithCredential(user, credential);
            // If reauthentication is successful, update the password.
            await updatePassword(user, newPassword);
    },

    fetchUserID() {
        return auth.currentUser?.uid;
    },

    getProfilePictureUrl() {
        return auth.currentUser?.photoURL;
    },

    async updateProfilePicture(photoURL) {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('No authenticated user found');
        }
        await updateProfile(user, { photoURL: photoURL });
    }
}