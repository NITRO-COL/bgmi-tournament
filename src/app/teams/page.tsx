"use client";

import { useState, useEffect } from "react";

interface Team {
  _id: string;
  teamName: string;
  playerNames: string[];
  email: string;
  phone: string;
  registeredAt: string;
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/register");
        const data = await response.json();
        
        if (response.ok) {
          setTeams(data.teams);
        } else {
          setError(data.error || "Failed to fetch teams");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-950 text-blue-50 flex items-center justify-center">
        <p>Loading teams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-950 text-blue-50 flex items-center justify-center">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-950 text-blue-50">
      {/* Teams List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-100">Registered Teams ({teams.length})</h2>
          
          {teams.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-blue-200">No teams registered yet.</p>
              <a 
                href="/" 
                className="inline-block mt-6 bg-blue-600 hover:bg-blue-500 text-blue-50 font-bold py-3 px-6 rounded-lg transition"
              >
                Register Your Team
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <div key={team._id} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-bold text-blue-300 mb-3">{team.teamName}</h3>
                  <div className="space-y-2">
                    <p className="text-blue-100"><span className="font-semibold">Captain:</span> {team.playerNames[0]}</p>
                    <p className="text-blue-100"><span className="font-semibold">Players:</span> {team.playerNames.join(", ")}</p>
                    <p className="text-blue-100"><span className="font-semibold">Contact:</span> {team.email}</p>
                    <p className="text-sm text-blue-200">
                      Registered: {new Date(team.registeredAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}