import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, doc, Timestamp, orderBy, limit } from "firebase/firestore";

export const fetchTotalOwed = async (user: string) => {
    const userRef = doc(db, "users", user);
    const q = query(
        collection(db,"activity"),
        where("type","==","borrow"),
        where("status","==","pending"),
        where("userRef","==",userRef)
    );
      const snapshot = await getDocs(q);

  let total = 0;
  snapshot.forEach((doc) => {
    const data = doc.data();
    total += data.amount ?? 0;
  });

  return total;
}

export const fetchTotalReceive = async (user:string) => {
    const userRef = doc(db,"users", user);
    const q = query(
        collection(db,"activity"),
        where("type","==","lend"),
        where("status","==","pending"),
        where("userRef","==",userRef)
    );
    const snapshot = await getDocs(q);

    let total = 0;
    snapshot.forEach((doc)=>{
        const data = doc.data();
        total+= data.amount ?? 0;
    })
    return total;
}

export const fetchNextTransaction = async (user:string) =>{
    const userRef = doc(db,"users", user);
    const today = new Date();
    const q = query(
        collection(db,"activity"),
        where("status","==","pending"),
        where("userRef","==",userRef),
        where("dueDate",">=",Timestamp.fromDate(today)),
        orderBy("dueDate","asc"),
        limit(1)
    );
    const snapshot = await getDocs(q);
    return snapshot.empty ? null : snapshot.docs[0].data();
}