"use client";
import { useEffect, useState } from "react";
import { auth } from "./lib/firebaseConfig";
import { useRouter } from "next/navigation";

export default function UserGames() {
  const [userGames, setUserGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    players: "",
    coopPartyVs: "",
  });
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

  // Filter function
  const filteredGames = userGames.filter((game) => {
    return (
      (filters.category ? game.category === filters.category : true) &&
      (filters.players ? game.min_players <= filters.players && game.max_players >= filters.players : true) &&
      (filters.coopPartyVs ? game.coop_party_vs === filters.coopPartyVs : true)
    );
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <p>Loading your games...</p>;
  }

  return (
    <div className="container mx-auto p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Your Games</h1>

      {/* Filter Controls */}
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-md w-full"
            >
              <option value="">Select Category</option>
              <option value="Action">Action</option>
              <option value="Strategy">Strategy</option>
              <option value="Puzzle">Puzzle</option>
              {/* Add more categories here */}
            </select>
          </div>

          <div>
            <label htmlFor="players" className="block text-gray-700 font-medium mb-2">Number of Players</label>
            <select
              name="players"
              value={filters.players}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-md w-full"
            >
              <option value="">Select Players</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              {/* Add more player options if needed */}
            </select>
          </div>

          <div>
            <label htmlFor="coopPartyVs" className="block text-gray-700 font-medium mb-2">Co-op/Party vs</label>
            <select
              name="coopPartyVs"
              value={filters.coopPartyVs}
              onChange={handleFilterChange}
              className="px-4 py-2 border rounded-md w-full"
            >
              <option value="">Select Co-op/Party vs</option>
              <option value="Co-op">Co-op</option>
              <option value="Party">Party</option>
              <option value="Vs">Vs</option>
              {/* Add more options here */}
            </select>
          </div>
        </div>
      </div>

      {/* Display filtered games */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{game.game_name}</h2>
              <p className="text-gray-600 mb-2">
                <strong>Category:</strong> {game.category}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Players:</strong> {game.min_players} - {game.max_players}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Average Play Time:</strong> {game.avg_play_time_minutes} minutes
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Co-op/Party vs:</strong> {game.coop_party_vs}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-8">
          No games match your filters.
        </p>
      )}
    </div>
  );
}
