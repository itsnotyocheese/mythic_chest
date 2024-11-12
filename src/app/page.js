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
        router.push("/profile/login"); // Redirect to login if not authenticated
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
    <div className="container mx-auto p-8 bg-gray-50">
  <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Your Games</h1>
  {userGames.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {userGames.map((game) => (
        <div key={game.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{game.game_name}</h2>
          <p className="text-gray-600 mb-2"><strong>Category:</strong> {game.category}</p>
          <p className="text-gray-600 mb-2"><strong>Players:</strong> {game.min_players} - {game.max_players}</p>
          <p className="text-gray-600 mb-2"><strong>Average Play Time:</strong> {game.avg_play_time_minutes} minutes</p>
          <p className="text-gray-600 mb-4"><strong>Co-op/Party vs:</strong> {game.coop_party_vs}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-600 mt-8">You haven't added any games yet.</p>
  )}
</div>
  );
}
