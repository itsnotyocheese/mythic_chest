"use client";
import { useEffect, useState } from "react";
import { auth } from '../lib/firebaseConfig'

export default function Home() {
  const [games, setGames] = useState([]);
  const [userGames, setUserGames] = useState([]);
  

  // Fetch all games
  useEffect(() => {
    const fetchGames = async () => {
      try{
        const res = await fetch("/api/games");
        if (!res.ok) throw new Error ("help!")
        const data = await res.json();
        console.log("Fetched games:", data); // Debugging line
        setGames(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching games: ", error);
      } 
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
    <div className="container mx-auto p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">All Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(games) && games
        .sort((a, b) => a.game_name.localeCompare(b.game_name)) // Sorting by game_name alphabetically
        .map((game) => (
          <div key={game.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{game.game_name}</h2>
            <p className="text-gray-600 mb-2"><strong>Category:</strong> {game.category}</p>
            <p className="text-gray-600 mb-2"><strong>Players:</strong> {game.min_players} - {game.max_players}</p>
            <p className="text-gray-600 mb-2"><strong>Average Play Time:</strong> {game.avg_play_time_minutes} minutes</p>
            <p className="text-gray-600 mb-4"><strong>Co-op/Party vs:</strong> {game.coop_party_vs}</p>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={() => addUserGame(game.id)}
            >
              Add to My List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
