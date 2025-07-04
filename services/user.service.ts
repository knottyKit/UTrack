import { db } from "@/lib/firebase";
import { getDoc, doc } from "firebase/firestore";

export const getUserData = async(uid: string) => {
    try {
        const ref = doc(db, "users", uid);
        const snap = await getDoc(ref);
        return snap.exists() ? snap.data() : null;
    } catch (error) {
        console.error("ERROR in getUserData:", error);
        return null;
    }
}