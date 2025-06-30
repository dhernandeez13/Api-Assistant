import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "./firebase";

export async function addFavorite(uid, favApi) {
  const docRef = doc(db, "favorites", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, {
      apis: arrayUnion(favApi)
    });
  } else {
    await setDoc(docRef, {
      apis: [favApi]
    });
  }
}

export async function getFavorites(uid) {
  const docRef = doc(db, "favorites", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().apis;
  } else {
    return [];
  }
}

export async function removeFavorite(uid, favApi) {
  const docRef = doc(db, "favorites", uid);
  await updateDoc(docRef, {
    apis: arrayRemove(favApi)
  });
}