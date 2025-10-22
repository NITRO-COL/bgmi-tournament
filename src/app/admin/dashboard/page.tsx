"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin, logoutAdmin } from "@/lib/adminAuth";

interface Team {
  _id: string;
  teamName: string;
  playerNames: string[];
  email: string;
  phone: string;
  registeredAt: string;
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-950 text-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-blue-100">Admin Dashboard</h1>
          <p className="text-blue-200 mb-8">
            Welcome to the Battleground Arena Tournament Organizer Admin Dashboard.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-800/30 p-6 rounded-lg border border-blue-700">
              <h2 className="text-xl font-semibold mb-2">Tournaments</h2>
              <p className="text-blue-200">Manage ongoing and upcoming tournaments</p>
            </div>
            
            <div className="bg-blue-800/30 p-6 rounded-lg border border-blue-700">
              <h2 className="text-xl font-semibold mb-2">Players</h2>
              <p className="text-blue-200">View and manage player registrations</p>
            </div>
            
            <div className="bg-blue-800/30 p-6 rounded-lg border border-blue-700">
              <h2 className="text-xl font-semibold mb-2">Settings</h2>
              <p className="text-blue-200">Configure tournament settings and rules</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
