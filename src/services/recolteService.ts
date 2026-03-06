import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { db, auth } from "../config/firebase";

export async function getRecoltes() {
  const userId = auth.currentUser?.uid;
  if (!userId) return [];
  const q = query(collection(db, "recoltes"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addRecolte(data: any) {
  const userId = auth.currentUser?.uid;
  await addDoc(collection(db, "recoltes"), { ...data, userId });
}

export async function deleteRecolte(id: string) {
  await deleteDoc(doc(db, "recoltes", id));
}
