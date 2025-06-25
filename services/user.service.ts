import { db } from "@/lib/firebase";
import { getDoc, doc } from "firebase/firestore";

export const getUserData = async(uid: string) => {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null
}