"use client";
import { useEffect, useState } from "react";
import { auth } from '../lib/firebaseConfig'

export default function Home() {
  const [games, setGames] = useState([]);
  const [userGames, setUserGames] = useState([]);
  

  // Fetch all games
  useEffect(() => {
    const fetchGames = async () => {
      const res = await fetch("/api/games");
      const data = await res.json();
      setGames(data);
    };
    fetchGames();
  }, []);

  const addUserGame = async (gameId) => {
    const res = await fetch("/api/user/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: auth.currentUser.uid, gameId })
    });

    if (res.ok) {
      setUserGames((prev) => [...prev, gameId]);
    } else {
      console.error("Failed to add game");
    }
  };

  return (
    <div>
      <h1>All Games</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.name}
            <button onClick={() => addUserGame(game.id)}>Add to My List</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
