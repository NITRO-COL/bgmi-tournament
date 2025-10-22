"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [teamName, setTeamName] = useState("");
  const [playerNames, setPlayerNames] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{type: string, text: string} | null>(null);

  const handlePlayerNameChange = (index: number, value: string) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = value;
    setPlayerNames(newPlayerNames);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!teamName.trim()) {
      setSubmitMessage({type: "error", text: "Please enter a team name"});
      return;
    }
    
    if (playerNames.some(name => !name.trim())) {
      setSubmitMessage({type: "error", text: "Please enter all player names"});
      return;
    }
    
    if (!email.trim()) {
      setSubmitMessage({type: "error", text: "Please enter your email"});
      return;
    }
    
    if (!phone.trim()) {
      setSubmitMessage({type: "error", text: "Please enter your phone number"});
      return;
    }
    
    if (!agreedToRules) {
      setSubmitMessage({type: "error", text: "Please agree to the tournament rules"});
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage(null);
    
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamName,
          playerNames,
          email,
          phone
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitMessage({type: "success", text: "Team registered successfully!"});
        // Reset form
        setTeamName("");
        setPlayerNames(["", "", "", ""]);
        setEmail("");
        setPhone("");
        setAgreedToRules(false);
      } else {
        setSubmitMessage({type: "error", text: data.error || "Failed to register team"});
      }
    } catch (error) {
      setSubmitMessage({type: "error", text: "Network error. Please try again."});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-950 text-blue-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800/50 to-gray-900/50 relative overflow-hidden">
        {/* Background logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Image 
            src="/bgmi-logo.png" 
            alt="Battleground Arena Logo" 
            width={800} 
            height={800} 
            className="object-contain"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-blue-300">Battleground Arena</span> Tournament 2025
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-10">
            Join the ultimate battleground and compete with the best players for exciting prizes
          </p>
          <div className="flex justify-center">
            <button className="bg-blue-600 hover:bg-blue-500 text-blue-50 font-bold py-3 px-8 rounded-lg transition transform hover:scale-105">
              Register Now
            </button>
          </div>
        </div>
      </section>

      {/* Tournament Info */}
      <section className="py-16 bg-gray-800/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-100">Tournament Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg text-center border border-gray-700">
              <div className="text-blue-300 text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-2 text-blue-100">Date & Time</h3>
              <p className="text-blue-200">March 15-17, 2025</p>
              <p className="text-blue-200">Daily from 6:00 PM IST</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg text-center border border-gray-700">
              <div className="text-blue-300 text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2 text-blue-100">Prizes</h3>
              <p className="text-blue-200">1st Place: ₹50,000</p>
              <p className="text-blue-200">2nd Place: ₹30,000</p>
              <p className="text-blue-200">3rd Place: ₹20,000</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg text-center border border-gray-700">
              <div className="text-blue-300 text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2 text-blue-100">Format</h3>
              <p className="text-blue-200">Team Size: 4 Players</p>
              <p className="text-blue-200">Registration Fee: ₹500</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-100">Register Your Team</h2>
          <div className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-lg border border-gray-700">
            {submitMessage && (
              <div className={`mb-6 p-4 rounded-lg ${submitMessage.type === "success" ? "bg-green-800/50 border border-green-600" : "bg-red-800/50 border border-red-600"}`}>
                {submitMessage.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-blue-100 mb-2" htmlFor="teamName">Team Name</label>
                <input 
                  type="text" 
                  id="teamName" 
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-100"
                  placeholder="Enter your team name"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-blue-100 mb-2">Player Names</label>
                {playerNames.map((name, index) => (
                  <input 
                    key={index}
                    type="text" 
                    value={name}
                    onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                    className="w-full px-4 py-2 mb-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-100"
                    placeholder={`Player ${index + 1}${index === 0 ? ' (Captain)' : ''}`}
                  />
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-blue-100 mb-2" htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-100"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-blue-100 mb-2" htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-100"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-blue-100">
                  <input 
                    type="checkbox" 
                    checked={agreedToRules}
                    onChange={(e) => setAgreedToRules(e.target.checked)}
                    className="mr-2"
                  />
                  I agree to the tournament rules and regulations
                </label>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 font-bold rounded-lg transition transform hover:scale-105 ${
                  isSubmitting 
                    ? "bg-blue-700 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-500 text-blue-50"
                }`}
              >
                {isSubmitting ? "Registering..." : "Register Team"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}