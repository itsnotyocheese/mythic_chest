"use client";
import { useEffect, useState } from "react";
import { auth } from "./lib/firebaseConfig"; // Adjust this path if necessary
import { useRouter } from "next/navigation";

export default function UserGames() {
  const [userGames, setUserGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserGames = async () => {
      if (!auth.currentUser) {
        router.push("/login"); // Redirect to login if not authenticated
        return;
      }

      const userId = auth.currentUser.uid;
      try {
        const res = await fetch(`/api/user/games?userId=${userId}`);
        const data = await res.json();
        setUserGames(data);
      } catch (error) {
        console.error("Failed to fetch user games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserGames();
  }, [router]);

  if (loading) {
    return <p>Loading your games...</p>;
  }

  return (
    <div>
      <h1>Your Games</h1>
      {userGames.length > 0 ? (
        <ul>
          {userGames.map((game) => (
          <li key={game.id}>
            {game.name}
          </li>
        ))}
        </ul>
      ) : (
        <p>You haven't added any games yet.</p>
      )}
    </div>
  );
}
