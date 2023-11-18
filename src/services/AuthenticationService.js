import { auth } from "@/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export default {
    login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
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
    }
}