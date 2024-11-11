// services/firebaseService.js
import { auth, db } from "../lib/firebaseConfig";
import { collection, addDoc, doc, getDoc, setDoc, getDocs } from "firebase/firestore";


// Add a game to the user's list
export const addUserGame = async (userId, gameId) => {
  const userGameRef = doc(db, `users/${userId}/userGames`, gameId);
  await setDoc(userGameRef, { addedAt: new Date() });
};

//Get all
export const getAllGames = async () => {
    const gamesSnapshot = await getDocs(collection(db, "games"));
    return gamesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
  

// Get the user's game list
export const getUserGames = async (userId) => {
    const userGamesRef = collection(db, `users/${userId}/userGames`);
    const userGamesSnapshot = await getDocs(userGamesRef);
  
    const gameDetails = await Promise.all(
      userGamesSnapshot.docs.map(async (docSnapshot) => {
        const gameId = docSnapshot.id;
        const gameRef = doc(db, "games", gameId);
        const gameDoc = await getDoc(gameRef);
        return gameDoc.exists() ? { id: gameId, ...gameDoc.data() } : null;
      })
    );
  
    // Filter out any `null` values if some games were not found
    return gameDetails.filter(game => game !== null);
  };
  
