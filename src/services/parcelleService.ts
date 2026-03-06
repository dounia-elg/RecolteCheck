import { collection, addDoc, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { db, auth } from "../config/firebase";

export async function getParcelles() {
  const userId = auth.currentUser?.uid;
  if (!userId) return [];
  const q = query(collection(db, "parcelles"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function addParcelle(data: any) {
  const userId = auth.currentUser?.uid;
  await addDoc(collection(db, "parcelles"), { ...data, userId });
}

export async function deleteParcelle(id: string) {
  await deleteDoc(doc(db, "parcelles", id));
}
